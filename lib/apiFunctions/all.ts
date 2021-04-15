import type { NextApiRequest, NextApiResponse } from "next";
import { getCommonRequirements, rejectIfInvalid } from "./commonFunctions";
import type httpProxy from "http-proxy";

export default function all(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		rejectIfInvalid(req, res, reject);
		const { authToken } = getCommonRequirements(req, res);
		req.url = req?.url?.replace(/^\/api/, ""); //remove "api" from the url
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
	});
}
