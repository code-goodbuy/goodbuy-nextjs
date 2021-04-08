import { Dispatch, SetStateAction } from "react";

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
