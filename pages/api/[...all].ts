import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenFromCookie } from "../../lib/apiFunctions/responseHelpers";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			const authToken = getTokenFromCookie(req, res, "auth-token");
			req.url = req.url.replace(/^\/api/, ""); //remove "api" from the url
			req.headers.cookie = ""; //don't send other cookies to the backend
			if (authToken) {
				req.headers["auth-token"] = authToken;
			}
			proxy.web(
				req,
				res,
				{
					target: process.env.backendURL,
					autoRewrite: false,
					selfHandleResponse: false
				},
				(e) => {
					reject(e);
				}
			);
		}
	});
}
