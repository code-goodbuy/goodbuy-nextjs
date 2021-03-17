import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../../components/login/LoginForm";

describe("Test login form", () => {
	let expectedValidEmail: string, expectedInvalidEmail: string, expectedPassword: string;

	beforeEach(() => {
		expectedInvalidEmail = "name(at)domain.something";
		expectedValidEmail = "name@doamin.something";
		expectedPassword = "somePassword0";
	});

	it("shouldn't have a clickable button", async () => {
		const { getByPlaceholderText, getByText } = render(<LoginForm />);

		const emailField = getByPlaceholderText("email");
		const passwordField = getByPlaceholderText("password");
		const submit = getByText("Log In");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expectedInvalidEmail } });
			fireEvent.change(passwordField, { target: { value: expectedPassword } });
		});

		expect(submit).toBeDisabled();
	});

	it("should have a clickable button", async () => {
		const { getByPlaceholderText, getByText } = render(<LoginForm />);

		const emailField = getByPlaceholderText("email");
		const passwordField = getByPlaceholderText("password");
		const submit = getByText("Log In");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expectedValidEmail } });
			fireEvent.change(passwordField, { target: { value: expectedPassword } });
		});

		expect(submit).not.toBeDisabled();
	});
});
