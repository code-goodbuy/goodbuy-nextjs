import { Dispatch, SetStateAction } from "react";

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
	imageURL?: string;
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

export interface AuthDataType {
	email: string;
	username?: string;
	password: string;
	repeatedPassword?: string;
	acceptedTerms?: boolean;
	hasRequiredAge?: boolean;
}

export interface handleAuthType {
	url: string;
	data: AuthDataType;
	specificHandler: any;
	setServerResponse: Dispatch<SetStateAction<string>>;
	setIsSendingData: Dispatch<SetStateAction<boolean>>;
	clearForm: () => void;
}
