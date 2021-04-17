import "@testing-library/jest-dom";
import {
	updateWithoutSpaces,
	isValidEmail,
	isValidUsername,
	isPasswordStrong,
	checkPasswordMatch
} from "../../components/auth/helperFunctions";

describe("test login helper functions", () => {
	let stateValue: any;
	let mockedUpdater = jest.fn().mockImplementation((s) => (stateValue = s));

	let assertFn = (v: any) => {
		/**
		 * Standard assert for helper functions.
		 *
		 * arguments: v:any (the expected value)
		 */
		expect(mockedUpdater).toHaveBeenCalledTimes(1);
		expect(stateValue).toEqual(v);
	};

	beforeEach(() => {
		stateValue = null;
		mockedUpdater.mockReset();
		mockedUpdater = jest.fn().mockImplementation((s) => (stateValue = s));
	});

	it("should update the calue without whitespaces", () => {
		updateWithoutSpaces(mockedUpdater, "  string ");

		assertFn("string");
	});

	it("should check the email and return true", () => {
		const res = isValidEmail("person@mail.co.uk");
		expect(res).toBe(true);
	});

	it("should check the email and return false", () => {
		const res = isValidEmail("person(at)mail.co.uk");
		expect(res).toBe(false);
	});

	it("should check the username and return true", () => {
		expect(isValidUsername("user_name")).toBe(true);
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
		checkPasswordMatch(mockedUpdater, "Password123", "Password123");

		assertFn(true);
	});

	it("should check the match between passwords and return false", () => {
		checkPasswordMatch(mockedUpdater, "Password123", "Password1231");

		assertFn(false);
	});
});
