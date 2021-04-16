import type { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies, resolveReq } from "./commonFunctions";
import { initCookies } from "./responseHelpers";

export default function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		setAuthCookies({ cookie: initCookies(req, res), jwt: "", refreshToken: "" });
		return resolveReq(res, resolve, { "message": "logged out" });
	});
}
