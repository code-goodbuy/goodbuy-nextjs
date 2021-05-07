import type { NextApiRequest, NextApiResponse } from "next";
import type httpProxy from "http-proxy";
import { JWTPayloadType, UserInfoType } from "./HelperTypes";

export interface APIHelperConfig {
	proxy?: httpProxy;
	req: NextApiRequest;
	res: NextApiResponse;
	resolve: () => void;
	reject: () => void;
}

export interface TokensType {
	"auth-token"?: string;
	"refresh-token"?: string;
}

export interface CookieHelperType {
	setToken: (name: "auth-token" | "refresh-token", token: string) => void;
	getToken: (name: "auth-token" | "refresh-token") => string | undefined;
	getCommonTokens: () => TokensType;
	setCommonTokens: (authToken: string, refreshToken: string) => void;
}

export interface AuthContextType {
	isAuthenticating?: boolean;
	changeIsAuthenticating?: (newValue: boolean) => void;
	isLoggedIn?: boolean;
	toggleIsLoggedIn?: () => void;
	userInfo?: UserInfoType;
	updateUserInfo?: (newInfo: JWTPayloadType) => void;
}

export interface FieldType {
	value: string;
	setValue: ((val: string | boolean) => void) | undefined;
	isValidValue: boolean;
	type?: "text" | "password";
	name: string;
	allowedSpaces?: boolean;
}

export interface CheckboxType {
	condition: boolean;
	updateCondition: ((val: string | boolean) => void) | undefined;
	children: React.ReactNode;
}

export interface SubmitType {
	updater: () => void;
	disabled: boolean;
	text: string;
}

export interface FormDataType {
	email: string;
	username?: string;
	password: string;
	repeatedPassword?: string;
	acceptedTerms?: boolean;
	hasRequiredAge?: boolean;
}
