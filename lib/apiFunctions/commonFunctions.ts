import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenFromCookie, initCookies } from "./responseHelpers";

export function rejectIfInvalid(req: NextApiRequest, res: NextApiResponse, reject: () => void) {
	if (req.url === undefined) {
		res.status(409).json({ message: "error" });
		reject();
	}
}

export function getCommonRequirements(req: NextApiRequest, res: NextApiResponse) {
	const cookie = initCookies(req, res);
	const authToken = getTokenFromCookie(cookie, "auth-token");
	const refreshToken = getTokenFromCookie(cookie, "refresh-token");
	return { authToken, refreshToken };
}
