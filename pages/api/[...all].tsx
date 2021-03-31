import httpProxy from "http-proxy";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";
import { setJWTCookie, getJWT } from "../../lib/apiFunctions/loginResponse";

const API_URL = "https://gb-be.de";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = {
	api: {
		bodyParser: false //don't parse the whole request, so we can forward it to the backend
	}
};

export default (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			const pathname = req.url;
			const isLogin = pathname === "/api/login";
			const cookies = new Cookies(req, res);
			const authToken = cookies.get("auth-token");
			req.url = req.url.replace(/^\/api/, ""); //remove "api" from the url
			req.headers.cookie = ""; //don't send other cookies to the backend
			if (authToken) {
				req.headers["auth-token"] = authToken;
			}

			if (isLogin) {
				proxy.once("proxyRes", (proxyRes, req, res) => {
					let apiResponseBody = "";
					proxyRes.on("data", (chunk: string) => {
						apiResponseBody += chunk;
					});
					proxyRes.on("end", () => {
						const jwt = getJWT(apiResponseBody);
						if (jwt === null) {
							res.status(409);
							reject("Error");
						} else {
							setJWTCookie(req, res, jwt);
							res.status(200).json({ ...decodeJWT(jwt) });
							resolve("ok");
						}
					});
				});
			}

			proxy.web(
				req,
				res,
				{
					target: API_URL,
					autoRewrite: false,
					selfHandleResponse: isLogin
				},
				(e) => {
					reject(e);
				}
			);
		}
	});
};
