import type { NextApiRequest, NextApiResponse } from "next";
import { initCookies, setTokenCookie } from "../../lib/apiFunctions/responseHelpers";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const cookie = initCookies(req, res);
		setTokenCookie(cookie, "auth-token", "");
		setTokenCookie(cookie, "refresh-token", "");
		res.status(200).json({ message: "logged out" });
		resolve();
	});
}
