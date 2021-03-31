import httpProxy from "http-proxy";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "node:http";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";

const API_URL = "https://gb-be.de";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = {
	//configuration: don't parse the whole request, so we can forward it to the backend
	api: {
		bodyParser: false
	}
};

export default (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			//const pathname = new URL(req.url).pathname;
			const pathname = req.url;
			const isLogin = pathname === "/api/login";
			const cookies = new Cookies(req, res);
			const authToken = cookies.get("auth-token");
			//remove "api" from the url
			req.url = req.url.replace(/^\/api/, "");
			// Don't forward cookies to the API:
			req.headers.cookie = "";
			// Set auth-token header from cookie:
			function interceptLoginResponse(proxyRes: any, req: IncomingMessage, res: any) {
				let apiResponseBody = "";
				proxyRes.on("data", (chunk: string) => {
					apiResponseBody += chunk;
				});
				proxyRes.on("end", () => {
					try {
						const { jwtAccessToken } = JSON.parse(apiResponseBody);
						if (jwtAccessToken === undefined) {
							res.status(409).json({ message: "error" });
							reject("error");
						}
						const cookies = new Cookies(req, res);
						cookies.set("auth-token", jwtAccessToken, {
							httpOnly: true,
							sameSite: "lax"
						});
						res.status(200).json({ ...decodeJWT(jwtAccessToken) });
						resolve("success");
					} catch (err) {
						reject(err);
					}
				});
			}
			if (authToken) {
				req.headers["auth-token"] = authToken;
			}

			if (isLogin) {
				proxy.once("proxyRes", (proxyRes, req, res) => {
					interceptLoginResponse(proxyRes, req, res);
				});
			}

			proxy.web(
				req,
				res,
				{
					target: API_URL,
					// we changed the url so don't auto-rewrite
					autoRewrite: false,
					// handle the response if it's login
					selfHandleResponse: isLogin
				},
				(e) => {
					reject(e);
				}
			);
		}
	});
};
