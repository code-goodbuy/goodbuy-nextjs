import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import refreshToken from "../../lib/apiFunctions/refreshToken";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return refreshToken(req, res, proxy);
}
