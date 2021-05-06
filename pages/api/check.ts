import type { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../lib/apiFunctions/apiConfig";
import { APIHelper } from "../../lib/apiFunctions/commonFunctions";

export const config = apiConfig;

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject): void => {
		const route = new APIHelper({ req, res, resolve, reject });
		route.resolveIfValid("auth-token", { "message": "logged" });
		route.resolveIfValid("refresh-token", { "message": "refresh" });
		route.resolveWith({ "message": "not logged" });
	});
}
