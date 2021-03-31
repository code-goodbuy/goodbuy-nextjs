import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";
import { setJWTCookie, getJWTFromResponse } from "../../lib/apiFunctions/responseHelpers";

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
			req.url = req.url.replace(/^\/api/, ""); //remove "api" from the url
			req.headers.cookie = ""; //don't send other cookies to the backend
			proxy.web(
				req,
				res,
				{
					target: process.env.backendURL,
					autoRewrite: false,
					selfHandleResponse: true
				},
				(e) => {
					reject(e);
				}
			);
			proxy.once("proxyRes", (proxyRes, req, res) => {
				let apiResponseBody = "";
				proxyRes.on("data", (chunk: string) => {
					apiResponseBody += chunk;
				});
				proxyRes.on("end", () => {
					const jwt = getJWTFromResponse(apiResponseBody);
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
	});
};
