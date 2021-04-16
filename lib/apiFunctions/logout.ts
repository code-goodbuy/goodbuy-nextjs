import type { NextApiRequest, NextApiResponse } from "next";
import {
	setAuthCookies,
	resolveReq,
	prepareForForwarding,
	getCommonRequirements,
	forwardRequest
} from "./commonFunctions";
import { initCookies } from "./responseHelpers";
import type httpProxy from "http-proxy";

export default function logout(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		const cookies = initCookies(req, res);
		const { authToken, refreshToken } = getCommonRequirements(cookies);
		setAuthCookies({ cookie: cookies, jwt: "", refreshToken: "" });
		prepareForForwarding({ req, cookie: refreshToken, token: authToken });
		forwardRequest({ req, res, proxy, handleRes: false, reject });
		return resolveReq(res, resolve, { "message": "logged out" });
	});
}
