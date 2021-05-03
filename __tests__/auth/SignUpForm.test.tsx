import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../../components/auth/SignUpForm";
import { expectFieldError } from "../../lib/testUtils/testFunctions";

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
