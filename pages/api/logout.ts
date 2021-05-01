import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import httpProxy from "http-proxy";
import { initCookies } from "../../lib/apiFunctions/responseHelpers";
import {
	forwardRequest,
	getCommonRequirements,
	prepareForForwarding,
	resolveReq,
	setAuthCookies
} from "../../lib/apiFunctions/commonFunctions";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const cookies = initCookies(req, res);
		const { authToken, refreshToken } = getCommonRequirements(cookies);
		setAuthCookies({ cookie: cookies, jwt: "", refreshToken: "" });
		prepareForForwarding({ req, cookie: refreshToken, token: authToken });
		forwardRequest({ req, res, proxy, handleRes: false, reject });
		return resolveReq(res, resolve, { "message": "logged out" });
	});
}
