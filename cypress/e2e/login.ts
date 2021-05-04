/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test login", () => {
	it("Should log in a user", () => {
		// given
		cy.visit("/auth");
		// when
		cy.findFieldsAndType({ "Email": "goodbuytester@cuvox.de", "Password": "Password1!" });
		cy.findByText("Log In").click();
		// then
		cy.url().should("eq", Cypress.config().baseUrl + "/");
		cy.get(".space-x-4 > .colorful-button").should("have.text", "Log Out");
	});

	it("Should display an error", () => {
		// given
		cy.visit("/auth");
		// when
		cy.findFieldsAndType({ "Email": "goodbuytester@cuvox.de", "Password": "not a password" });
		cy.findByText("Log In").click();
		// then
		cy.url().should("eq", Cypress.config().baseUrl + "/auth");
		cy.findByText("An Error Occured");
	});
});
