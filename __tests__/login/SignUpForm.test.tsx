import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../components/login/SignUpForm";

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
		const { getByPlaceholderText, getByText, getByTestId } = render(<SignUpForm />);

		const emailField = getByPlaceholderText("email");
		const usernameField = getByPlaceholderText("username");
		const passwordField = getByPlaceholderText("password");
		const repeatPasswordField = getByPlaceholderText("repeat password");
		const termsCheckbox = getByTestId("termsCheckbox");
		const ageCheckbox = getByTestId("ageCheckbox");
		const submit = getByText("Sign Up");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.invalidEmail } });
			fireEvent.change(usernameField, { target: { value: expected.invalidUsername } });
			fireEvent.change(passwordField, { target: { value: expected.invalidPassword } });
			fireEvent.change(repeatPasswordField, { target: { value: expected.validPassword } });
			fireEvent.click(termsCheckbox);
			fireEvent.click(ageCheckbox);
		});

		const emailError = getByTestId("emailError");
		const usernameError = getByTestId("usernameError");
		const passwordError = getByTestId("passwordError");
		const repeatedPasswordError = getByTestId("repeatedPasswordError");

		expect(emailError).toBeVisible();
		expect(usernameError).toBeVisible();
		expect(passwordError).toBeVisible();
		expect(repeatedPasswordError).toBeVisible();
		expect(submit).toBeDisabled();
	});
});
