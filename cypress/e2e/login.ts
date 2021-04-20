/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test login", () => {
	it("Should log in a user", () => {
		cy.visit("/auth");
		cy.findByPlaceholderText("Email").click().type("tester2@mail.co");
		cy.findByPlaceholderText("Password").click().type("Password1!");
		cy.findByText("Log In").click();
		cy.get(".space-x-4 > .colorful-button").should("have.text", "Log Out");
	});
});
