import { Dispatch, SetStateAction } from "react";

/**
 * TS types for helper functions
 */
export interface InfoCardType {
	number: number;
	unit: string;
	text: string;
	url: string;
}
export interface PersonType {
	fullName: string;
	role: string;
	url: string;
	path: string;
}
export interface JWTPayloadType {
	exp?: number;
	iat?: number;
	jti?: string;
	email?: string;
}

export interface HandleResType {
	res: Response;
	setServerResponse: Dispatch<SetStateAction<string>>;
	specificHandler: () => void;
}

export interface HandleErrType {
	err: string;
	setServerResponse: Dispatch<SetStateAction<string>>;
}

export interface ResetFormType {
	setIsSendingData: Dispatch<SetStateAction<boolean>>;
	clearForm: () => void;
}
