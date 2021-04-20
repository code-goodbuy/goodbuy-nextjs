import type { NextApiRequest, NextApiResponse } from "next";
import { prepareForForwarding, forwardRequest, handleResponse, handleLogin } from "./commonFunctions";
import type httpProxy from "http-proxy";

export default function login(req: NextApiRequest, res: NextApiResponse, proxy: httpProxy): Promise<void> {
	return new Promise((resolve, reject): void => {
		prepareForForwarding({ req });
		forwardRequest({ req, res, proxy, handleRes: true, reject });
		handleResponse({ proxy, resolve, reject, handler: handleLogin });
	});
}
