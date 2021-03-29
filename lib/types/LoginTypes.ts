import { Dispatch, SetStateAction } from "react";

export interface SignUpFormTypes {
	setAction: Dispatch<SetStateAction<"login" | "sign-up">>;
}
