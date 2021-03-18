import "@testing-library/jest-dom";
import {
	updateWithoutSpaces,
	checkEmail,
	checkUsername,
	checkPasswordStrength,
	checkPasswordMatch
} from "../../components/login/helperFunctions";

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
		checkEmail(mockedUpdater, "person@mail.co.uk");

		assertFn(true);
	});

	it("should check the email and return false", () => {
		checkEmail(mockedUpdater, "person(at)mail.co.uk");

		assertFn(false);
	});

	it("should check the username and return true", () => {
		checkUsername(mockedUpdater, "user_name");

		assertFn(true);
	});

	it("should check the username and return false", () => {
		checkUsername(mockedUpdater, "123212312");

		assertFn(false);
	});

	it("should check the password and return true", () => {
		checkPasswordStrength(mockedUpdater, "StrongPassw0rd");

		assertFn(true);
	});

	it("should check the password and return false", () => {
		checkPasswordStrength(mockedUpdater, "123212312");

		assertFn(false);
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
