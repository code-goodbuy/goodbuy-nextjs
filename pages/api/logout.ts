import type { NextApiRequest, NextApiResponse } from "next";
import { unsetJWTCookie } from "../../lib/apiFunctions/responseHelpers";
import type { PageConfig } from "next";

export const config: PageConfig = {
	api: {
		bodyParser: false //don't parse the whole request, so we can forward it to the backend
	}
};

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		unsetJWTCookie(req, res);
		res.status(200).json({ message: "logged out" });
		resolve();
	});
}
