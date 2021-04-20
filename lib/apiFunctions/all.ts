import type { NextApiRequest, NextApiResponse } from "next";
import { forwardRequest, getCommonRequirements, prepareForForwarding } from "./commonFunctions";
import type httpProxy from "http-proxy";
import { initCookies } from "./responseHelpers";

export default function all(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		const { authToken } = getCommonRequirements(initCookies(req, res));
		prepareForForwarding({ req, token: authToken });
		forwardRequest({ req, res, proxy, handleRes: false, reject });
	});
}
