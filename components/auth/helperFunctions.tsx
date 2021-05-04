import { Dispatch, SetStateAction } from "react";
import { FieldDataType } from "../../lib/types/AuthTypes";
import { HandleResType, HandleErrType, ResetFormType, handleAuthType } from "../../lib/types/HelperTypes";

export const updateWithoutSpaces = (updater: ((val: string | boolean) => void) | undefined, value: string) => {
	updater && updater(value.replace(/\s/g, ""));
};

export class CheckFields {
	data: FieldDataType;

	constructor(data: FieldDataType) {
		this.data = data;
	}

	updateData(data: FieldDataType) {
		this.data = data;
	}

	isValidEmail() {
		if (this.data.email !== "") {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (re.test(this.data.email.toLowerCase()) && this.data.email.length > 5 && this.data.email.length < 41) {
				return true;
			}
		}
		return false;
	}

	isValidUsername() {
		if (this.data.username && this.data.username !== "") {
			if (
				this.data.username.length > 4 &&
				this.data.username.length < 23 &&
				this.data.username.match(/((^[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i)
			) {
				return true;
			}
		}
		return false;
	}

	isValidPassword() {
		if (this.data.password && this.data.password !== "") {
			const p = this.data.password;
			if (
				p.length > 7 &&
				p.length < 51 &&
				p.match(/[a-z]+/) &&
				p.match(/[A-Z]+/) &&
				p.match(/[0-9]+/) &&
				p.match(/[-_+=()!?@#\$%\^&\*{[}\].,<>'":;/|`~]+$/i)
			) {
				return true;
			}
		}
		return false;
	}

	areSamePasswords() {
		if (this.data.repeatedPassword && this.data.repeatedPassword !== "") {
			if (this.data.repeatedPassword === this.data.password) {
				return true;
			}
		}
		return false;
	}

	isValidSignUp() {
		if (
			this.isValidEmail() &&
			this.isValidUsername() &&
			this.isValidPassword() &&
			this.areSamePasswords() &&
			this.data.acceptedTerms &&
			this.data.hasRequiredAge
		) {
			return true;
		}
		return false;
	}

	isValidLogin() {
		if (this.isValidEmail() && this.data.password !== "") {
			return true;
		}
		return false;
	}
}

export const sendAuthRequest = async (url: string, body: any) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});
	return res;
};

export const handleRes = ({ res, setServerResponse, specificHandler }: HandleResType) => {
	if (res && res.status === 200) {
		specificHandler(res);
	} else {
		setServerResponse("An Error Occured");
	}
};

export const handleErr = ({ err, setServerResponse }: HandleErrType) => {
	console.error(err);
	setServerResponse("An Error Occured");
};

export const resetForm = ({ setIsSendingData, clearForm }: ResetFormType) => {
	clearForm();
	setIsSendingData(false);
};

export const handleAuth = async ({
	url,
	data,
	specificHandler,
	setServerResponse,
	setIsSendingData,
	clearForm
}: handleAuthType) => {
	try {
		let res = await sendAuthRequest(url, data);
		handleRes({ res, setServerResponse, specificHandler });
	} catch (err) {
		handleErr(err);
	} finally {
		resetForm({ setIsSendingData, clearForm });
	}
};

export const dataUpdater = (field: string, data: any, setData: Dispatch<SetStateAction<any>>) => {
	if (field in data) {
		return {
			updater: (val: string | boolean) => {
				//@ts-ignore: manually check the type
				if (typeof data[field] === typeof val) {
					//@ts-ignore: manually check the type
					setData((data) => ({ ...data, [field]: val }));
				}
			}
		};
	}
};
