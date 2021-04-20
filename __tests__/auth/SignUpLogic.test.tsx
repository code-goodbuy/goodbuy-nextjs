import { render, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../components/auth/SignUpForm";

async function mockFetch() {
	return new Promise((resolve, reject) => {
		resolve({
			ok: true,
			status: 200,
			json: async () => ({ "message": "User creation mocked successfully" })
		});
	});
}

describe("test sign up logic", () => {
	let expected: {
		validEmail: string;
		validUsername: string;
		validPassword: string;
	};

	beforeEach(() => {
		global.fetch = jest.fn().mockImplementation(mockFetch);
		expected = {
			validEmail: "someone@email.com",
			validUsername: "usertest",
			validPassword: "somePassword1!"
		};
	});

	it("should call the fetch API", async () => {
		const { getByPlaceholderText, getByText, getByLabelText } = render(<SignUpForm />);

		const emailField = getByPlaceholderText("Email");
		const usernameField = getByPlaceholderText("Username");
		const passwordField = getByPlaceholderText("Password");
		const repeatPasswordField = getByPlaceholderText("Repeated Password");
		const termsCheckbox = getByLabelText("I read and accept the Terms and Conditions.");
		const ageCheckbox = getByLabelText("I am 16 or older.");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.validEmail } });
			fireEvent.change(usernameField, { target: { value: expected.validUsername } });
			fireEvent.change(passwordField, { target: { value: expected.validPassword } });
			fireEvent.change(repeatPasswordField, { target: { value: expected.validPassword } });
			fireEvent.click(termsCheckbox);
			fireEvent.click(ageCheckbox);
		});

		fireEvent.click(getByText("Sign Up"));

		await waitFor(async () => expect(global.fetch).toHaveBeenCalled());
	});
});
