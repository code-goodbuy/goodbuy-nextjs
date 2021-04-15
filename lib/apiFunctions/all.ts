import type { NextApiRequest, NextApiResponse } from "next";
import { getCommonRequirements, prepareForForwarding, rejectIfCondition } from "./commonFunctions";
import type httpProxy from "http-proxy";

export default function all(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		rejectIfCondition(res, reject, req.url === undefined);
		const { authToken } = getCommonRequirements(req, res);
		prepareForForwarding(req);
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
