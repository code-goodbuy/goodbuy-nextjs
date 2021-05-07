import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import { LoginHelper } from "../../lib/apiFunctions/commonFunctions";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const route = new LoginHelper({ proxy, req, res, resolve, reject });
		route.forwardRequest(true);
		route.handleResponse();
	});
}
