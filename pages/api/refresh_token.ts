import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";
import {
	setTokenCookie,
	getTokenFromResponse,
	getTokenFromCookie,
	initCookies
} from "../../lib/apiFunctions/responseHelpers";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(500).json({ message: "error" });
			reject();
		} else {
			const cookie = initCookies(req, res);
			const refreshToken = getTokenFromCookie(cookie, "refresh-token");
			req.url = req.url.replace(/^\/api/, ""); //remove "api" from the url
			req.headers.cookie = `jid=${refreshToken}`;

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

			proxy.once("proxyRes", (proxyRes, req, res: any) => {
				let apiResponseBody = "";
				proxyRes.on("data", (chunk: string) => {
					apiResponseBody += chunk;
				});
				proxyRes.on("end", () => {
					const jwt = getTokenFromResponse(apiResponseBody);
					if (jwt === null) {
						res.status(204);
						reject("Error - No Token");
					} else {
						setTokenCookie(cookie, "auth-token", jwt);
						res.status(200).json({ ...decodeJWT(jwt) });
						resolve();
					}
				});
			});
		}
	});
}
