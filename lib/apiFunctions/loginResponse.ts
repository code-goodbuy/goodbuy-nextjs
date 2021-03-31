import { IncomingMessage, ServerResponse } from "node:http";
import Cookies from "cookies";
import { JWTPayloadType } from "../types/HelperTypes";

interface interceptType {
	req: IncomingMessage;
	res: ServerResponse;
	jwtAccessToken: string;
}

export function setJWTCookie(req: IncomingMessage, res: ServerResponse, jwtAccessToken: string) {
	const cookies = new Cookies(req, res);
	cookies.set("auth-token", jwtAccessToken, {
		httpOnly: true,
		sameSite: "lax"
	});
}

export function getJWT(apiResponseBody: string): null | string {
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
