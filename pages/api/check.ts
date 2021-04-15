import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenCookie } from "../../lib/apiFunctions/responseHelpers";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			const token = getTokenCookie(req, res, "auth-token");
			if (token && token !== "") {
				let validJWT = false;
				let data;
				try {
					data = decodeJWT(token);
					validJWT = true;
				} catch {
					validJWT = false;
				}
				if (validJWT && !(data instanceof Error)) {
					res.status(200).json({ message: "logged" });
					resolve();
				} else {
					const refreshToken = getTokenCookie(req, res, "refresh-token");
					let validRefresh = false;
					try {
						refreshToken && decodeJWT(refreshToken);
						validRefresh = true;
					} catch {
						validRefresh = false;
					}
					if (validRefresh) {
						res.status(200).json({ message: "refresh" });
						resolve();
					}
				}
			}
			res.status(200).json({ message: "not logged" });
			resolve();
		}
	});
}
