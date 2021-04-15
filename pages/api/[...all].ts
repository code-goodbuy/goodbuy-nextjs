import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import all from "../../lib/apiFunctions/all";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return all(req, res, proxy);
}
