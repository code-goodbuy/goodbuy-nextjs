import { Dispatch, SetStateAction } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import type httpProxy from "http-proxy";
import { IncomingMessage } from "node:http";
import Cookies from "cookies";

export interface SignUpFormTypes {
	setAction: Dispatch<SetStateAction<"login" | "sign-up">>;
	msBeforeRedirecting: number;
}

export interface FieldType {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	isValidValue: boolean;
	type: "text" | "password";
	name: string;
}

export interface CheckboxType {
	condition: boolean;
	updateCondition: Dispatch<SetStateAction<boolean>>;
	children: React.ReactNode;
}

export interface SubmitType {
	updater: () => void;
	disabled: boolean;
	text: string;
}

export interface ResolveIfValidType {
	token: string | undefined;
	response: NextApiResponse;
	resolve: () => void;
	message: string;
}

export interface ForwardRequestType {
	req: NextApiRequest;
	res: NextApiResponse;
	proxy: httpProxy;
	handleRes: boolean;
	reject: () => void;
}

export interface HandleEndType {
	req: IncomingMessage;
	res: NextApiResponse;
	proxyRes?: IncomingMessage;
	body: string;
	resolve: () => void;
	reject: () => void;
}

export interface HandleResponseType {
	proxy: httpProxy;
	resolve: () => void;
	reject: () => void;
	handler: ({}: HandleEndType) => void;
}

export interface setAuthCookiesType {
	cookie: Cookies;
	jwt: string;
	refreshToken: string;
}

export interface PrepareForForwardingType {
	req: NextApiRequest;
	cookie?: string;
	token?: string;
}
