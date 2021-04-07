import { render, act, fireEvent, getByLabelText } from "@testing-library/react";
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
		const { getByPlaceholderText, getByText, getByLabelText } = render(
			<SignUpForm setAction={() => {}} msBeforeRedirecting={0} />
		);

		const emailField = getByPlaceholderText("Email");
		const usernameField = getByPlaceholderText("Username");
		const passwordField = getByPlaceholderText("Password");
		const repeatPasswordField = getByPlaceholderText("Repeated Password");
		const termsCheckbox = getByLabelText("I read and accept the Terms and Conditions.");
		const ageCheckbox = getByLabelText("I am 16 or older.");
		const submit = getByText("Sign Up");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.invalidEmail } });
			fireEvent.change(usernameField, { target: { value: expected.invalidUsername } });
			fireEvent.change(passwordField, { target: { value: expected.invalidPassword } });
			fireEvent.change(repeatPasswordField, { target: { value: expected.validPassword } });
			fireEvent.click(termsCheckbox);
			fireEvent.click(ageCheckbox);
		});

		const emailError = getByText("Invalid Email");
		const usernameError = getByText("Invalid Username");
		const passwordError = getByText("Invalid Password");
		const repeatedPasswordError = getByText("Invalid Repeated Password");

		expect(emailError).toBeVisible();
		expect(usernameError).toBeVisible();
		expect(passwordError).toBeVisible();
		expect(repeatedPasswordError).toBeVisible();
		expect(submit).toBeDisabled();
	});
});
