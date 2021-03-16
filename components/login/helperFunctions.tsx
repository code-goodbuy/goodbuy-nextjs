import { Dispatch, SetStateAction } from "react";

export const updateWithoutSpaces = (updater: Dispatch<SetStateAction<string>>, value: string) => {
	/**
	 * Takes in input the updater state function and the new value, updates the value in the state only if the new character is not a space
	 */
	const lastChar = value.substr(value.length - 1, 1);
	if (lastChar !== " ") {
		updater(value);
	}
};

export const checkEmail = (updater: Dispatch<SetStateAction<boolean>>, email: string): void => {
	if (email !== "") {
		//only run the function if the email is defined
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email.toLowerCase())) {
			updater(true);
		} else {
			updater(false);
		}
	}
};

export const checkUsername = (
	updater: Dispatch<SetStateAction<boolean>>,
	username: string
): void => {
	if (username !== "") {
		if (username.length > 6 && username.match(/[a-z]+/)) {
			updater(true);
		} else {
			updater(false);
		}
	}
};

export const checkPasswordStrength = (
	updater: Dispatch<SetStateAction<boolean>>,
	password: string
): void => {
	/**
	 * Checks if the password is strong enough.
	 */
	if (password !== "") {
		//only runt the rest of the function if the password is set
		if (
			password.length > 6 &&
			password.match(/[a-z]+/) &&
			password.match(/[A-Z]+/) &&
			password.match(/[0-9]+/)
		) {
			updater(true);
		} else {
			updater(false);
		}
	}
};

export const checkPasswordMatch = (
	updater: Dispatch<SetStateAction<boolean>>,
	repeatedPassword: string,
	password: string
): void => {
	if (repeatedPassword !== "") {
		if (repeatedPassword === password) {
			updater(true);
		} else {
			updater(false);
		}
	}
};