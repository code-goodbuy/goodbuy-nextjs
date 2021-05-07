/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test token refresh", () => {
	const expected = {
		email: "goodbuytester@cuvox.de",
		password: "Password1!"
	};

	it("Should get a new auth token", () => {
		// given
		cy.fastLogin(expected.email, expected.password);
		cy.visit("/");
		// when
		cy.setCookie("auth-token", "", { httpOnly: true, sameSite: "lax" });
		cy.reload();
		// then
		cy.get(".space-x-4 > .colorful-button");
		cy.getCookies()
			.should("have.length", 2)
			.then((cookies) => {
				//@ts-ignore: ts mistakes line below for jest code
				expect(cookies[0].value).to.not.equal("");
			});
	});
});
