import { render, act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../components/auth/SignUpForm";

async function expectError(selector: string, newValue: string) {
	const field = screen.getByPlaceholderText(selector);

	await act(async () => {
		fireEvent.change(field, { target: { value: newValue } });
	});

	expect(screen.getByText("Invalid " + selector)).toBeVisible();
}

describe("test sign up form", () => {
	let expected: {
		invalidEmail: string;
		invalidUsername: string;
		validPassword: string;
		invalidPassword: string;
	};

	beforeEach(() => {
		expected = {
			invalidEmail: "someone(at)email.com",
			invalidUsername: "46468678",
			validPassword: "somePassword1",
			invalidPassword: "1111221"
		};
	});

	it("should display errors and shouldn't have a clickable submit button", async () => {
		render(<SignUpForm />);

		await expectError("Email", expected.invalidEmail);
		await expectError("Username", expected.invalidUsername);
		await expectError("Password", expected.invalidPassword);
		await expectError("Repeated Password", expected.invalidEmail);

		expect(screen.getByText("Sign Up")).toBeDisabled();
	});
});
