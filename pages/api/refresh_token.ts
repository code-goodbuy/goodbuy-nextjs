import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import {
	forwardRequest,
	getCommonRequirements,
	handleRefresh,
	handleResponse,
	prepareForForwarding
} from "../../lib/apiFunctions/commonFunctions";
import { initCookies } from "../../lib/apiFunctions/responseHelpers";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const { refreshToken } = getCommonRequirements(initCookies(req, res));
		prepareForForwarding({ req, cookie: `jid=${refreshToken}` });
		forwardRequest({ req, res, proxy, handleRes: true, reject });
		handleResponse({ proxy, resolve, reject, handler: handleRefresh });
	});
}
