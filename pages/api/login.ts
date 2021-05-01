import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import {
	forwardRequest,
	handleLogin,
	handleResponse,
	prepareForForwarding
} from "../../lib/apiFunctions/commonFunctions";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		prepareForForwarding({ req });
		forwardRequest({ req, res, proxy, handleRes: true, reject });
		handleResponse({ proxy, resolve, reject, handler: handleLogin });
	});
}
