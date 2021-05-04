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

export interface FormFunctionsType {
	setServerResponse: Dispatch<SetStateAction<string>>;
	setIsSendingData: Dispatch<SetStateAction<boolean>>;
	clearForm: () => void;
	responseHandler: (res?: Response) => any;
}
