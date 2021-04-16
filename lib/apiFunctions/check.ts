import type { NextApiRequest, NextApiResponse } from "next";
import { getCommonRequirements, resolveIfValid, resolveReq } from "./commonFunctions";
import { initCookies } from "./responseHelpers";

export default function check(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const { authToken, refreshToken } = getCommonRequirements(initCookies(req, res));
		resolveIfValid({ token: authToken, response: res, resolve, message: "logged" });
		resolveIfValid({ token: refreshToken, response: res, resolve, message: "refresh" });
		return resolveReq(res, resolve, { "message": "not logged" });
	});
}
