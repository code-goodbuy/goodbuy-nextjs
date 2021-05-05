import "@testing-library/jest-dom";
import { CheckFields } from "../../components/auth/helperFunctions";

describe("test login helper functions", () => {
	let validData = {
		email: "person@mail.co.uk",
		password: "StrongPassw0rd!",
		repeatedPassword: "StrongPassw0rd!",
		username: "username"
	};
	let invalidData = {
		email: "person(at)mail.co.uk",
		password: "1111111",
		repeatedPassword: "2222222",
		username: "user"
	};

	const check = new CheckFields(validData);
	const check2 = new CheckFields(invalidData);

	it("should check the email and return true", () => {
		expect(check.isValidEmail()).toBe(true);
	});

	it("should check the email and return false", () => {
		expect(check2.isValidEmail()).toBe(false);
	});

	it("should check the username and return true", () => {
		expect(check.isValidUsername()).toBe(true);
	});

	it("should check the username and return false", () => {
		expect(check2.isValidUsername()).toBe(false);
	});

	it("should check the password and return true", () => {
		expect(check.isValidPassword()).toBe(true);
	});

	it("should check the password and return false", () => {
		expect(check2.isValidPassword()).toBe(false);
	});

	it("should check the match between passwords and return true", () => {
		expect(check.areSamePasswords()).toBe(true);
	});

	it("should check the match between passwords and return false", () => {
		expect(check2.areSamePasswords()).toBe(false);
	});
});
