import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import { APIHelper } from "../../lib/apiFunctions/commonFunctions";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function refresh_token(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const route = new APIHelper({ proxy, req, res, resolve, reject });
		route.forwardRequest(true);
		route.handleResponse("refresh");
	});
}
