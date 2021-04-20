/// <reference types="cypress" />

describe("Test login", () => {
	it("Should log in a user", () => {
		cy.visit("/auth");
		cy.get('[type="text"]').click().type("tester2@mail.co");
		cy.get('[type="password"]').click().type("Password1!");
		cy.get("#login-form > .colorful-button").click();
		cy.get(".space-x-4 > .colorful-button").should("have.text", "Log Out");
	});
});
