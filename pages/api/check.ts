import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import { getCommonRequirements, resolveIfValid, resolveReq } from "../../lib/apiFunctions/commonFunctions";
import { initCookies } from "../../lib/apiFunctions/responseHelpers";

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const { authToken, refreshToken } = getCommonRequirements(initCookies(req, res));
		resolveIfValid({ token: authToken, response: res, resolve, message: "logged" });
		resolveIfValid({ token: refreshToken, response: res, resolve, message: "refresh" });
		return resolveReq(res, resolve, { "message": "not logged" });
	});
}
