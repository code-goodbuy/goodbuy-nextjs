import { IncomingMessage, ServerResponse } from "node:http";
import Cookies from "cookies";

export function setJWTCookie(req: IncomingMessage, res: ServerResponse, jwtAccessToken: string) {
	const cookies = new Cookies(req, res);
	cookies.set("auth-token", jwtAccessToken, {
		httpOnly: true,
		sameSite: "lax"
	});
}

export function getJWTCookie(req: IncomingMessage, res: ServerResponse) {
	const cookies = new Cookies(req, res);
	return cookies.get("auth-token");
}

export function getJWTFromResponse(apiResponseBody: string): null | string {
	try {
		const { jwtAccessToken } = JSON.parse(apiResponseBody);
		if (jwtAccessToken === undefined) {
			return null;
		}
		return jwtAccessToken;
	} catch (err) {
		return null;
	}
}
