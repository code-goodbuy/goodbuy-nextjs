import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../components/login/SignUpForm";

describe("test sign up logic", () => {
	let expected: {
		validEmail: string;
		validUsername: string;
		validPassword: string;
	};

	beforeEach(() => {
		expected = {
			validEmail: "someone@email.com",
			validUsername: "usertest",
			validPassword: "somePassword1!"
		};
	});

	it("should have a clickable submit button", async () => {
		const { getByPlaceholderText, getByText, getByTestId } = render(<SignUpForm />);

		const emailField = getByPlaceholderText("email");
		const usernameField = getByPlaceholderText("username");
		const passwordField = getByPlaceholderText("password");
		const repeatPasswordField = getByPlaceholderText("repeat password");
		const termsCheckbox = getByTestId("termsCheckbox");
		const ageCheckbox = getByTestId("ageCheckbox");
		const submit = getByText("Sign Up");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.validEmail } });
			fireEvent.change(usernameField, { target: { value: expected.validUsername } });
			fireEvent.change(passwordField, { target: { value: expected.validPassword } });
			fireEvent.change(repeatPasswordField, { target: { value: expected.validPassword } });
			fireEvent.click(termsCheckbox);
			fireEvent.click(ageCheckbox);
		});

		expect(submit).not.toBeDisabled();
	});
});
