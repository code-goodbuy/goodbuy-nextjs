import type { NextApiRequest, NextApiResponse } from "next";
import { getCommonRequirements, rejectIfInvalid } from "./commonFunctions";
import type httpProxy from "http-proxy";
import { isValidJWT } from "./jwtHelpers";

export default function check(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		rejectIfInvalid(req, res, reject);
		const { authToken, refreshToken } = getCommonRequirements(req, res);
	});
}
