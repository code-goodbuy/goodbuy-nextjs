import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../../components/login/LoginForm";

describe("Test login form", () => {
	let expected: { validEmail: string; invalidEmail: string; password: string };

	beforeEach(() => {
		expected = {
			invalidEmail: "name(at)domain.something",
			validEmail: "name@doamin.something",
			password: "somePassword0"
		};
	});

	it("shouldn't have a clickable button", async () => {
		const { getByPlaceholderText, getByText } = render(<LoginForm />);

		const emailField = getByPlaceholderText("email");
		const passwordField = getByPlaceholderText("password");
		const submit = getByText("Log In");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.invalidEmail } });
			fireEvent.change(passwordField, { target: { value: expected.password } });
		});

		expect(submit).toBeDisabled();
	});

	it("should have a clickable button", async () => {
		const { getByPlaceholderText, getByText } = render(<LoginForm />);

		const emailField = getByPlaceholderText("email");
		const passwordField = getByPlaceholderText("password");
		const submit = getByText("Log In");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.validEmail } });
			fireEvent.change(passwordField, { target: { value: expected.password } });
		});

		expect(submit).not.toBeDisabled();
	});
});
