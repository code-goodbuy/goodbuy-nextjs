import type { NextApiRequest, NextApiResponse } from "next";
import { forwardRequest, getCommonRequirements, prepareForForwarding, rejectIfCondition } from "./commonFunctions";
import type httpProxy from "http-proxy";

export default function all(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		rejectIfCondition(res, reject, req.url === undefined);
		const { authToken } = getCommonRequirements(req, res);
		prepareForForwarding({ req, token: authToken });
		forwardRequest({ req, res, proxy, handleRes: false, reject });
	});
}
