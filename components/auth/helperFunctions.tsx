import { Dispatch, SetStateAction } from "react";
import { FormDataType } from "../../lib/types/AuthTypes";
import { FormFunctionsType } from "../../lib/types/HelperTypes";

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

export class FieldChecker {
	data: FormDataType;

	constructor(data: FormDataType) {
		this.data = data;
	}

	updateData(data: FormDataType) {
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

export class Authenticator {
	url: string;
	body: FormDataType;
	functions: FormFunctionsType;
	res: Response | undefined;

	constructor(url: string, body: FormDataType, formFunctions: FormFunctionsType) {
		this.url = url;
		this.body = body;
		this.functions = formFunctions;

		this.res = undefined;
	}

	async sendRequest() {
		this.res = await fetch(this.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(this.body)
		});
	}

	handleRes() {
		if (this.res && this.res.status === 200) {
			this.functions.responseHandler(this.res);
		} else {
			this.functions.setServerResponse("An Error Occured");
		}
	}

	handleError(err: string) {
		console.error("The following error occurred", err);
		this.functions.setServerResponse("An Error Occured");
	}

	resetForm() {
		this.functions.clearForm();
		this.functions.setIsSendingData(false);
	}

	async handleAuth() {
		this.functions.setIsSendingData(true);
		try {
			await this.sendRequest();
			this.handleRes();
		} catch (err) {
			this.handleError(err);
		} finally {
			this.resetForm();
		}
	}
}
