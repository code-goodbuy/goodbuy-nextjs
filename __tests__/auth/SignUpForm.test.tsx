import { render, act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../components/auth/SignUpForm";

export async function typeInField(selector: string, newValue: string) {
	// given
	const field = screen.getByPlaceholderText(selector);
	// when
	await act(async () => {
		fireEvent.change(field, { target: { value: newValue } });
	});
}

export async function expectFieldError(selector: string, newValue: string) {
	//given + when
	await typeInField(selector, newValue);
	// then
	expect(screen.getByText("Invalid " + selector)).toBeVisible();
}

describe("test sign up form", () => {
	let expected = {
		invalidEmail: "someone(at)email.com",
		invalidUsername: "46468678",
		validPassword: "somePassword1",
		invalidPassword: "1111221"
	};

	it("should display errors and shouldn't have a clickable submit button", async () => {
		// given
		render(<SignUpForm />);
		// when + then
		await expectFieldError("Email", expected.invalidEmail);
		await expectFieldError("Username", expected.invalidUsername);
		await expectFieldError("Password", expected.invalidPassword);
		await expectFieldError("Repeated Password", expected.invalidEmail);
		// then
		expect(screen.getByText("Sign Up")).toBeDisabled();
	});
});
