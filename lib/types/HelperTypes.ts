import { userInfo } from "node:os";
import { Dispatch, SetStateAction } from "react";
import { handleAuth } from "../../components/auth/helperFunctions";

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

export interface UserInfoType extends JWTPayloadType {
	username?: string;
	description?: string;
	imageUrl?: string;
	_id?: string;
}

export interface HandleResType {
	res: Response;
	setServerResponse: Dispatch<SetStateAction<string>>;
	specificHandler: any;
}

export interface HandleErrType {
	err: string;
	setServerResponse: Dispatch<SetStateAction<string>>;
}

export interface ResetFormType {
	setIsSendingData: Dispatch<SetStateAction<boolean>>;
	clearForm: () => void;
}

export interface handleAuthType {
	url: string;
	userData: any;
	specificHandler: any;
	setServerResponse: Dispatch<SetStateAction<string>>;
	setIsSendingData: Dispatch<SetStateAction<boolean>>;
	clearForm: () => void;
}
