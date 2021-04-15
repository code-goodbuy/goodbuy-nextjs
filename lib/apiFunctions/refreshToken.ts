import type { NextApiRequest, NextApiResponse } from "next";
import {
	prepareForForwarding,
	rejectIfCondition,
	forwardRequest,
	handleResponse,
	getCommonRequirements,
	handleRefresh
} from "./commonFunctions";
import type httpProxy from "http-proxy";

export default function refreshToken(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		rejectIfCondition(res, reject, req.url === undefined);
		const { refreshToken } = getCommonRequirements(req, res);
		prepareForForwarding({ req, cookie: `jid=${refreshToken}` });
		forwardRequest({ req, res, proxy, handleRes: true, reject });
		handleResponse({ proxy, resolve, reject, handler: handleRefresh });
	});
}
