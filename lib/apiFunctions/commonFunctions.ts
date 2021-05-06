import Cookies from "cookies";
import type { NextApiResponse } from "next";
import { IncomingMessage } from "node:http";
import {
	ForwardRequestType,
	HandleEndType,
	HandleResponseType,
	ResolveIfValidType,
	setAuthCookiesType,
	PrepareForForwardingType,
	APIHelperConfig,
	TokensType,
	CookieHelperType
} from "../types/AuthTypes";
import { JWTHelper } from "./jwtHelpers";
import {
	getTokenFromCookie,
	getTokenFromResponse,
	getTokenFromResponseCookie,
	initCookies,
	setTokenCookie,
	CookieHelper
} from "./responseHelpers";

export class APIHelper {
	config: APIHelperConfig;
	cookie: CookieHelperType;
	tokens: TokensType;
	JWT: typeof JWTHelper;

	constructor(config: APIHelperConfig) {
		this.config = config;
		this.cookie = new CookieHelper(this.config.req, this.config.res);
		this.tokens = this.cookie.getCommonTokens();
		this.JWT = JWTHelper;
	}

	setAuthCookies(authToken: string, refreshToken: string) {
		this.cookie.setToken("auth-token", authToken);
		this.cookie.setToken("refresh-token", refreshToken);
		this.tokens = { "auth-token": authToken, "refresh-token": refreshToken };
	}

	rejectIfCondition(condition: boolean) {
		if (condition) {
			this.config.res.status(409).json({ message: "Error" });
			this.config.reject();
		}
	}

	resolveWith(message: { [key: string]: string | number }) {
		this.config.res.status(200).json(message);
		this.config.resolve();
	}

	resolveWithJWT(token: string) {
		const decoded = new this.JWT(token).decode();
		this.resolveWith({ ...decoded });
	}

	resolveIfValid(tokenType: "auth-token" | "refresh-token", message: { message: string }) {
		const token = this.tokens[tokenType];
		const isTokenValid = token && !new this.JWT(token).isExpired();
		if (isTokenValid) {
			return this.resolveWith(message);
		}
	}

	prepareForForwarding() {
		this.config.req.headers.cookie = `jid=${this.tokens["refresh-token"]}`;
		if (this.tokens["auth-token"] !== "") {
			this.config.req.headers["auth-token"] = this.tokens["auth-token"];
			this.config.req.headers.Authorization = `Bearer ${this.tokens["refresh-token"]}`;
		}
	}

	forwardRequest(handleRes: boolean) {
		const config = {
			target: process.env.backendURL ? process.env.backendURL : "https:gb-be.de",
			autoRewrite: false,
			selfHandleResponse: handleRes
		};
		return this.config.proxy.web(this.config.req, this.config.res, config, () => {
			this.config.reject();
		});
	}

	handleResponse(handler: (body: string, proxyRes: IncomingMessage) => void) {
		return this.config.proxy.once("proxyRes", (proxyRes, req, res) => {
			let body = "";
			proxyRes.on("data", (chunk: string) => {
				body += chunk;
			});
			proxyRes.on("end", () => {
				handler(body, proxyRes);
			});
		});
	}

	handleLogin(body: string, proxyRes: IncomingMessage) {
		const refreshToken = getTokenFromResponseCookie(proxyRes);
		const jwt = getTokenFromResponse(body);
		if (jwt && refreshToken) {
			jwt && refreshToken && this.setAuthCookies(jwt, refreshToken);
			this.resolveWithJWT(jwt);
		} else {
			this.rejectIfCondition(jwt === null || refreshToken === undefined);
		}
	}

	handleRefresh(body: string) {
		const newToken = getTokenFromResponse(body);
		if (newToken) {
			this.cookie.setToken("auth-token", newToken);
			this.resolveWithJWT(newToken);
		} else {
			this.rejectIfCondition(newToken === null);
		}
	}
}

export function rejectIfCondition(res: NextApiResponse, reject: () => void, condition: boolean) {
	if (condition) {
		res.status(409).json({ message: "error" });
		reject();
	}
}

export function getCommonRequirements(cookie: Cookies) {
	const authToken = getTokenFromCookie(cookie, "auth-token");
	const refreshToken = getTokenFromCookie(cookie, "refresh-token");
	return { authToken, refreshToken };
}

export function resolveReq(res: NextApiResponse, resolve: () => void, message: {}) {
	res.status(200).json(message);
	resolve();
}

export function resolveIfValid({ token, response, resolve, message }: ResolveIfValidType) {
	const isTokenValid = token && !new JWTHelper(token).isExpired();
	if (isTokenValid) {
		return resolveReq(response, resolve, { "message": message });
	}
}

export function prepareForForwarding({ req, cookie = "", token = "" }: PrepareForForwardingType) {
	req.headers.cookie = cookie;
	if (token !== "") {
		req.headers["auth-token"] = token;
		req.headers.Authorization = `Bearer ${token}`;
	}
}

export function forwardRequest({ req, res, proxy, handleRes, reject }: ForwardRequestType) {
	const config = {
		target: process.env.backendURL ? process.env.backendURL : "https:gb-be.de",
		autoRewrite: false,
		selfHandleResponse: handleRes
	};
	return proxy.web(req, res, config, () => {
		reject();
	});
}

export function setAuthCookies({ cookie, jwt, refreshToken }: setAuthCookiesType) {
	setTokenCookie(cookie, "auth-token", jwt);
	setTokenCookie(cookie, "refresh-token", refreshToken);
}

export function handleLogin({ req, res, proxyRes, body, resolve, reject }: HandleEndType) {
	const refreshToken = proxyRes && getTokenFromResponseCookie(proxyRes);
	const jwt = getTokenFromResponse(body);
	rejectIfCondition(res, reject, jwt === null || refreshToken === undefined);
	const cookie = initCookies(req, res);
	jwt && refreshToken && setAuthCookies({ cookie, jwt, refreshToken });
	const decoded = jwt && new JWTHelper(jwt).decode();
	jwt && resolveReq(res, resolve, { ...decoded });
}

export function handleRefresh({ req, res, body, resolve, reject }: HandleEndType) {
	const jwt = getTokenFromResponse(body);
	rejectIfCondition(res, reject, jwt === null);
	const cookie = initCookies(req, res);
	jwt && setTokenCookie(cookie, "auth-token", jwt);
	const decoded = jwt && new JWTHelper(jwt).decode();
	jwt && resolveReq(res, resolve, { ...decoded });
}

export function handleResponse({ proxy, resolve, reject, handler }: HandleResponseType) {
	return proxy.once("proxyRes", (proxyRes, req, res: any) => {
		let body = "";
		proxyRes.on("data", (chunk: string) => {
			body += chunk;
		});
		proxyRes.on("end", () => {
			handler({ req, res, proxyRes, body, resolve, reject });
		});
	});
}
