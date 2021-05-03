import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Field from "../../components/auth/Field";
import { expectFieldError } from "./SignUpForm.test";

describe("Test input field component", () => {
	let stateValue: string;
	let isValidValue: boolean;
	let mockedUpdater = jest.fn().mockImplementation((s: string) => {
		stateValue = s;
		isValidValue = s.length > 10 ? true : false;
	});

	beforeEach(() => {
		stateValue = "PropertyName";
		mockedUpdater.mockReset();
		mockedUpdater = jest.fn().mockImplementation((s) => (stateValue = s));
	});

	it("Should display an error message", async () => {
		// given
		render(
			<Field value={stateValue} setValue={mockedUpdater} isValidValue={isValidValue} type="text" name="Property" />
		);
		// when + then
		await expectFieldError("Property", "fail");
	});
});
