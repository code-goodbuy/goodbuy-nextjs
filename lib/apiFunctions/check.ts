import type { NextApiRequest, NextApiResponse } from "next";
import { getCommonRequirements, rejectIfInvalid, resolveReq } from "./commonFunctions";
import { isExpiredJWT } from "./jwtHelpers";
import { ResolveIfValidType } from "../types/AuthTypes";

function resolveIfValid({ token, response, resolve, message }: ResolveIfValidType) {
	const isTokenValid = token && isExpiredJWT(token);
	if (isTokenValid) {
		return resolveReq(response, resolve, message);
	}
}

export default function check(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		rejectIfInvalid(req, res, reject);
		const { authToken, refreshToken } = getCommonRequirements(req, res);
		resolveIfValid({ token: authToken, response: res, resolve, message: "logged" });
		resolveIfValid({ token: refreshToken, response: res, resolve, message: "refresh" });
		return resolveReq(res, resolve, "not logged");
	});
}
