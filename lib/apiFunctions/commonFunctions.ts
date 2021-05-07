import { IncomingMessage } from "node:http";
import { APIHelperConfig, TokensType, CookieHelperType } from "../types/AuthTypes";
import { JWTHelper } from "./jwtHelpers";
import { getTokenFromResponse, getTokenFromResponseCookie, CookieHelper } from "./responseHelpers";

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
		if (this.tokens["auth-token"] !== "" && this.tokens["auth-token"] !== undefined) {
			this.config.req.headers["auth-token"] = this.tokens["auth-token"];
			this.config.req.headers.Authorization = `Bearer ${this.tokens["auth-token"]}`;
		}
	}

	forwardRequest(handleRes: boolean) {
		this.prepareForForwarding();
		const config = {
			target: process.env.backendURL ? process.env.backendURL : "https:gb-be.de",
			autoRewrite: false,
			selfHandleResponse: handleRes
		};
		return this.config.proxy?.web(this.config.req, this.config.res, config, () => {
			this.config.reject();
		});
	}
}

export class LoginHelper extends APIHelper {
	constructor(config: APIHelperConfig) {
		super(config);
	}

	handleResponse() {
		return this.config.proxy?.once("proxyRes", (proxyRes, req, res) => {
			let body = "";
			proxyRes.on("data", (chunk: string) => {
				body += chunk;
			});
			proxyRes.on("end", () => {
				this.handler(body, proxyRes);
			});
		});
	}

	handler(body: string, proxyRes: IncomingMessage) {
		const refreshToken = getTokenFromResponseCookie(proxyRes);
		const newToken = getTokenFromResponse(body);
		if (newToken && refreshToken) {
			this.cookie.setCommonTokens(newToken, refreshToken);
			this.resolveWithJWT(newToken);
		} else {
			this.rejectIfCondition(newToken === null || refreshToken === undefined);
		}
	}
}

export class RefreshHelper extends LoginHelper {
	constructor(config: APIHelperConfig) {
		super(config);
	}

	handler(body: string) {
		const newToken = getTokenFromResponse(body);
		if (newToken) {
			this.cookie.setToken("auth-token", newToken);
			this.resolveWithJWT(newToken);
		} else {
			this.rejectIfCondition(newToken === null);
		}
	}
}
