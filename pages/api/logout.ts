import type { NextApiRequest, NextApiResponse } from "next";
import { unsetJWTCookie } from "../../lib/apiFunctions/responseHelpers";

export const config = {
	api: {
		bodyParser: false //don't parse the whole request, so we can forward it to the backend
	}
};

export default (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve, reject): void => {
		if (req.url === undefined) {
			res.status(409).json({ message: "error" });
			reject();
		} else {
			unsetJWTCookie(req, res);
			res.status(200).json({ message: "logged out" });
			resolve("ok");
		}
	});
};
