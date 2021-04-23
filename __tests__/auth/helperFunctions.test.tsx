import "@testing-library/jest-dom";
import {
	updateWithoutSpaces,
	isValidEmail,
	isValidUsername,
	isPasswordStrong,
	areSamePasswords
} from "../../components/auth/helperFunctions";

describe("test login helper functions", () => {
	let stateValue: any;
	let mockedUpdater = jest.fn().mockImplementation((s) => (stateValue = s));

	beforeEach(() => {
		stateValue = null;
		mockedUpdater.mockReset();
		mockedUpdater = jest.fn().mockImplementation((s) => (stateValue = s));
	});

	it("should update the calue without whitespaces", () => {
		//given + when
		updateWithoutSpaces(mockedUpdater, "  string ");
		//then
		expect(mockedUpdater).toHaveBeenCalledTimes(1);
		expect(stateValue).toEqual("string");
	});

	it("should check the email and return true", () => {
		expect(isValidEmail("person@mail.co.uk")).toBe(true);
	});

	it("should check the email and return false", () => {
		expect(isValidEmail("person(at)mail.co.uk")).toBe(false);
	});

	it("should check the username and return true", () => {
		expect(isValidUsername("username")).toBe(true);
	});

	it("should check the username and return false", () => {
		expect(isValidUsername("123212312")).toBe(false);
	});

	it("should check the password and return true", () => {
		expect(isPasswordStrong("Strong~Passw0rd")).toBe(true);
	});

	it("should check the password and return false", () => {
		expect(isPasswordStrong("123123123")).toBe(false);
	});

	it("should check the match between passwords and return true", () => {
		expect(areSamePasswords("Password123", "Password123")).toBe(true);
	});

	it("should check the match between passwords and return false", () => {
		expect(areSamePasswords("Password123", "Password1231")).toBe(false);
	});
});
