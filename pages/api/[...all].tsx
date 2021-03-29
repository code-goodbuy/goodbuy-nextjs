import httpProxy from "http-proxy";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "node:http";

const API_URL = "https://gb-be.de";

const proxy = httpProxy.createProxyServer();

export const config = {
	//configuration: don't parse the whole request, so we can forward it to the backend
	api: {
		bodyParser: false
	}
};

export default (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve, reject): void => {
		console.log("url is: " + req.url);
		if (req.url === undefined) {
			reject();
		} else {
			//const pathname = new URL(req.url).pathname;
			const pathname = req.url;
			console.log("pathname is" + pathname);
			console.log(pathname === "/api/login");
			const isLogin = pathname === "/api/login"; //this fails. why?
			const cookies = new Cookies(req, res);
			const authToken = cookies.get("auth-token");
			//remove "api" from the url
			req.url = req.url.replace(/^\/api/, "");
			// Don't forward cookies to the API:
			req.headers.cookie = "";
			// Set auth-token header from cookie:
			function interceptLoginResponse(proxyRes: any, req: IncomingMessage, res: any) {
				console.log("Called");
				let apiResponseBody = "";
				proxyRes.on("data", (chunk: string) => {
					apiResponseBody += chunk;
					console.log("api response: " + apiResponseBody);
				});
				proxyRes.on("end", () => {
					try {
						// Extract the jwt from API's response:
						const { jwtAccessToken } = JSON.parse(apiResponseBody);
						console.log("token is: " + jwtAccessToken);
						// Set the authToken as an HTTP-only cookie.
						// We'll also set the SameSite attribute to
						// 'lax' for some additional CSRF protection.
						const cookies = new Cookies(req, res);
						cookies.set("auth-token", jwtAccessToken, {
							httpOnly: true,
							sameSite: "lax"
						});
						res.status(200).json({ loggedIn: true });
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
					console.log("something");
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
					console.error(e);
					reject();
				}
			);
		}
	});
};
