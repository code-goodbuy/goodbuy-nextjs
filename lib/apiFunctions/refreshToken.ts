import type { NextApiRequest, NextApiResponse } from "next";
import {
	prepareForForwarding,
	forwardRequest,
	handleResponse,
	getCommonRequirements,
	handleRefresh
} from "./commonFunctions";
import type httpProxy from "http-proxy";
import { initCookies } from "./responseHelpers";

export default function refreshToken(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		const { refreshToken } = getCommonRequirements(initCookies(req, res));
		prepareForForwarding({ req, cookie: `jid=${refreshToken}` });
		forwardRequest({ req, res, proxy, handleRes: true, reject });
		handleResponse({ proxy, resolve, reject, handler: handleRefresh });
	});
}
