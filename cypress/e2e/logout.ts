/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Should test the logout", () => {
	const expected = {
		email: "goodbuytester@cuvox.de",
		password: "Password1!"
	};

	it("Should log out an user", () => {
		// given
		cy.fastLogin(expected.email, expected.password);
		cy.visit("/");
		// when
		cy.get(".space-x-4 > .colorful-button").click();
		// then
		cy.get(".space-x-4 > .colorful-button").should("have.text", "Log In");
		cy.getCookies().should("have.length", 0);
	});
});
