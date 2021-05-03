/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test login", () => {
	const expected = {
		email: "goodbuytester@cuvox.de",
		validPassword: "Password1!",
		invalidPassword: "not a password"
	};

	it("Should log in a user", () => {
		// given + when
		cy.formLogin(expected.email, expected.validPassword);
		// then
		cy.url().should("eq", Cypress.config().baseUrl + "/");
		cy.get(".space-x-4 > .colorful-button").should("have.text", "Log Out");
	});

	it("Should display an error", () => {
		// given + when
		cy.formLogin(expected.email, expected.invalidPassword);
		// then
		cy.url().should("eq", Cypress.config().baseUrl + "/auth");
		cy.findByText("An Error Occured");
	});
});
