import { IncomingMessage, ServerResponse } from "node:http";
import Cookies from "cookies";

export class CookieHelper {
	cookie: Cookies;
	constructor(req: IncomingMessage, res: ServerResponse) {
		this.cookie = new Cookies(req, res);
	}

	setToken(name: "auth-token" | "refresh-token", token: string) {
		this.cookie.set(name, token, {
			httpOnly: true,
			sameSite: "lax"
		});
	}

	getToken(name: "auth-token" | "refresh-token") {
		return this.cookie.get(name);
	}

	setCommonTokens(authToken: string, refreshToken: string) {
		this.setToken("auth-token", authToken);
		this.setToken("refresh-token", refreshToken);
	}

	getCommonTokens() {
		return { "auth-token": this.getToken("auth-token"), "refresh-token": this.getToken("refresh-token") };
	}
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

export function getTokenFromResponseCookie(proxyRes: IncomingMessage) {
	return proxyRes.headers["set-cookie"]
		?.toString()
		.substring(4, proxyRes.headers["set-cookie"]?.toString().indexOf(";"));
}
