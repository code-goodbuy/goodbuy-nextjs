/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test login", () => {
	it("Should log in a user", () => {
		cy.visit("/auth");
		cy.findAllAndType({ "Email": "tester2@mail.co", "Password": "Password1!" });
		cy.findByText("Log In").click();
		cy.url().should("eq", Cypress.config().baseUrl + "/");
		cy.get(".space-x-4 > .colorful-button").should("have.text", "Log Out");
	});

	it("Should display an error", () => {
		cy.visit("/auth");
		cy.findAllAndType({ "Email": "tester2@mail.co", "Password": "not a password" });
		cy.findByText("Log In").click();
		cy.url().should("eq", Cypress.config().baseUrl + "/auth");
		cy.findByText("An Error Occured");
	});
});
