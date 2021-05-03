import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../../components/auth/LoginForm";
import { expectFieldError, typeInField } from "../../lib/testUtils/testFunctions";

describe("Test login form", () => {
	let expected = {
		invalidEmail: "name(at)domain.something",
		validEmail: "name@doamin.something",
		password: "somePassword0"
	};

	it("should display errors and shouldn't have a clickable button", async () => {
		// given
		render(<LoginForm />);
		// when + then
		await expectFieldError("Email", expected.invalidEmail);
		await typeInField("Password", expected.password);
		// then
		expect(screen.getByText("Log In")).toBeDisabled();
	});

	it("should have a clickable button", async () => {
		// given
		render(<LoginForm />);
		// when
		await typeInField("Email", expected.validEmail);
		await typeInField("Password", expected.password);
		// then
		expect(screen.getByText("Log In")).not.toBeDisabled();
	});
});
