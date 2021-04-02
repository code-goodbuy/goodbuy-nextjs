import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { getJWTCookie } from "../../lib/apiFunctions/responseHelpers";
import type { PageConfig } from "next";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = {
	api: {
		bodyParser: false //don't parse the whole request, so we can forward it to the backend
	}
};

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			const authToken = getJWTCookie(req, res);
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
