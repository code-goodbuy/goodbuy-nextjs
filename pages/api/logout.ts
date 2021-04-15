import type { NextApiRequest, NextApiResponse } from "next";
import { unsetTokenCookie } from "../../lib/apiFunctions/responseHelpers";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		unsetTokenCookie(req, res, "auth-token");
		unsetTokenCookie(req, res, "refresh-token");
		res.status(200).json({ message: "logged out" });
		resolve();
	});
}
