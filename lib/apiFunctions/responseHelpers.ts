import { IncomingMessage, ServerResponse } from "node:http";
import Cookies from "cookies";

export function initCookies(req: IncomingMessage, res: ServerResponse) {
	return new Cookies(req, res);
}

export function setTokenCookie(cookie: Cookies, name: "auth-token" | "refresh-token", token: string) {
	cookie.set(name, token, {
		httpOnly: true,
		sameSite: "lax"
	});
}

export function getTokenFromCookie(cookie: Cookies, name: "auth-token" | "refresh-token") {
	return cookie.get(name);
}

export function unsetTokenCookie(cookie: Cookies, name: "auth-token" | "refresh-token") {
	cookie.set(name, "", {
		httpOnly: true,
		sameSite: "lax"
	});
}

export function getTokenFromResponse(apiResponseBody: string): null | string {
	try {
		const body = JSON.parse(apiResponseBody);
		const jwtAccessToken = body.jwtAccessToken ? body.jwtAccessToken : body.accessToken;
		if (jwtAccessToken === undefined) {
			return null;
		}
		return jwtAccessToken;
	} catch (err) {
		return null;
	}
}
