import type { NextApiRequest, NextApiResponse } from "next";
import { getJWTCookie } from "../../lib/apiFunctions/responseHelpers";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";
import type { PageConfig } from "next";

export const config: PageConfig = {
	api: {
		bodyParser: false //don't parse the whole request, so we can forward it to the backend
	}
};

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			const token = getJWTCookie(req, res);
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
					res.status(200).json({ message: "logged", email: data?.email });
					resolve();
				}
			}
			res.status(200).json({ message: "not logged" });
			resolve();
		}
	});
}
