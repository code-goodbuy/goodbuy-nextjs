import type { NextApiRequest, NextApiResponse } from "next";
import {
	ForwardRequestType,
	HandleEndType,
	HandleResponseType,
	ResolveIfValidType,
	setAuthCookiesType
} from "../types/AuthTypes";
import { decodeJWT, isExpiredJWT } from "./jwtHelpers";
import {
	getTokenFromCookie,
	getTokenFromResponse,
	getTokenFromResponseCookie,
	initCookies,
	setTokenCookie
} from "./responseHelpers";

export function rejectIfCondition(res: NextApiResponse, reject: () => void, condition: boolean) {
	if (condition) {
		res.status(409).json({ message: "error" });
		reject();
	}
}

export function getCommonRequirements(req: NextApiRequest, res: NextApiResponse) {
	const cookie = initCookies(req, res);
	const authToken = getTokenFromCookie(cookie, "auth-token");
	const refreshToken = getTokenFromCookie(cookie, "refresh-token");
	return { authToken, refreshToken };
}

export function resolveReq(res: NextApiResponse, resolve: () => void, message: {}) {
	res.status(200).json(message);
	resolve();
}

export function resolveIfValid({ token, response, resolve, message }: ResolveIfValidType) {
	const isTokenValid = token && !isExpiredJWT(token);
	if (isTokenValid) {
		return resolveReq(response, resolve, { "message": message });
	}
}

export function prepareForForwarding(req: NextApiRequest, cookie = "") {
	req.url = req?.url?.replace(/^\/api/, "");
	req.headers.cookie = cookie;
}

export function forwardRequest({ req, res, proxy, handleRes, reject }: ForwardRequestType) {
	const config = {
		target: process.env.backendURL,
		autoRewrite: false,
		selfHandleResponse: handleRes
	};
	return proxy.web(req, res, config, () => {
		reject();
	});
}

export function setAuthCookies({ req, res, jwt, refreshToken }: setAuthCookiesType) {
	const cookie = initCookies(req, res);
	setTokenCookie(cookie, "auth-token", jwt);
	setTokenCookie(cookie, "refresh-token", refreshToken);
}

export function handleLogin({ req, res, proxyRes, body, resolve, reject }: HandleEndType) {
	const refreshToken = proxyRes && getTokenFromResponseCookie(proxyRes);
	const jwt = getTokenFromResponse(body);
	rejectIfCondition(res, reject, jwt === null || refreshToken === undefined);
	jwt && refreshToken && setAuthCookies({ req, res, jwt, refreshToken });
	jwt && resolveReq(res, resolve, { ...decodeJWT(jwt) });
}

export function handleRefresh({ req, res, body, resolve, reject }: HandleEndType) {
	const jwt = getTokenFromResponse(body);
	rejectIfCondition(res, reject, jwt === null);
	const cookie = initCookies(req, res);
	jwt && setTokenCookie(cookie, "auth-token", jwt);
	jwt && resolveReq(res, resolve, { ...decodeJWT(jwt) });
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
