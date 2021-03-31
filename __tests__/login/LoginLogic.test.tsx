import { render, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../../components/login/LoginForm";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

async function mockFetch() {
	return new Promise((resolve, reject) => {
		resolve({
			ok: true,
			status: 200,
			json: async () => ({ "message": "logged in" })
		});
	});
}

describe("Make sure the form behaves as expected", () => {
	let expected: { email: string; password: string };

	beforeEach(() => {
		global.fetch = jest.fn().mockImplementation(mockFetch);
		expected = {
			email: "name@domain.something",
			password: "somePassword0!"
		};
		useRouter.mockImplementation(() => ({
			route: "",
			basePath: "",
			pathname: "/",
			query: {},
			asPath: "",
			push: async () => true,
			replace: async () => true,
			reload: () => null,
			back: () => null,
			prefetch: async () => undefined,
			beforePopState: () => null,
			isFallback: false,
			events: {
				on: () => null,
				off: () => null,
				emit: () => null
			}
		}));
	});
	it("Should redirect the user", async () => {
		const { getByPlaceholderText, getByText } = render(<LoginForm />);

		const emailField = getByPlaceholderText("email");
		const passwordField = getByPlaceholderText("password");

		await act(async () => {
			fireEvent.change(emailField, { target: { value: expected.email } });
			fireEvent.change(passwordField, { target: { value: expected.password } });
		});

		fireEvent.click(getByText("Log In"));

		await waitFor(async () => {
			expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				"body": JSON.stringify({ email: "name@domain.something", password: "somePassword0!" })
			});
			expect(useRouter).toHaveBeenCalled();
		});
	});
});
