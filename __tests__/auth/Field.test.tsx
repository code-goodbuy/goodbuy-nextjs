import "@testing-library/jest-dom";
import { render, act, fireEvent } from "@testing-library/react";
import Field from "../../components/auth/Field";

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
		const { getByPlaceholderText, getByText } = render(
			<Field value={stateValue} setValue={mockedUpdater} isValidValue={isValidValue} type="text" name="Property" />
		);
		const field = getByPlaceholderText("Property");
		// when
		await act(async () => {
			fireEvent.change(field, { target: { value: "fail" } });
		});
		// then
		expect(getByText("Invalid Property")).toBeVisible();
	});
});
