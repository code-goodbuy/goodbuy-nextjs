import { Dispatch, SetStateAction } from "react";
import { HandleResType, HandleErrType, ResetFormType, handleAuthType } from "../../lib/types/HelperTypes";

export const updateWithoutSpaces = (updater: Dispatch<SetStateAction<string>>, value: string) => {
	updater(value.replace(/\s/g, ""));
};

export const isValidEmail = (email: string) => {
	if (email !== "") {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email.toLowerCase()) && email.length > 5 && email.length < 41) {
			return true;
		}
	}
	return false;
};

export const isValidUsername = (username: string): boolean => {
	if (username !== "") {
		if (username.length > 5 && username.length < 23 && username.match(/[a-z]+/)) {
			return true;
		}
	}
	return false;
};

export const isPasswordStrong = (password: string): boolean => {
	if (password !== "") {
		if (
			password.length > 7 &&
			password.length < 51 &&
			password.match(/[a-z]+/) &&
			password.match(/[A-Z]+/) &&
			password.match(/[0-9]+/) &&
			password.match(/[-_+=()!?@#\$%\^&\*{[}\].,<>'":;/|\\`~]+/)
		) {
			return true;
		}
	}
	return false;
};

export const areSamePasswords = (repeatedPassword: string, password: string): boolean => {
	if (repeatedPassword !== "") {
		if (repeatedPassword === password) {
			return true;
		}
	}
	return false;
};

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
	userData,
	specificHandler,
	setServerResponse,
	setIsSendingData,
	clearForm
}: handleAuthType) => {
	try {
		let res = await sendAuthRequest(url, userData);
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
