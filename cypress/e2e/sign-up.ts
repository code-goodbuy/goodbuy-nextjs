/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test Sign Up", () => {
	it("Should not have a clickable button", () => {
		// given + when
		cy.tryToSignUp({
			"Email": "tester2(at)mail.co",
			"Username": "t",
			"Password": "not a password",
			"Repeated Password": "not a passwrd"
		});
		//then
		cy.get("#signup-form > .colorful-button").should("be.disabled");
	});

	it("Should register a new user", () => {
		// given + when
		cy.intercept(Cypress.config().baseUrl + "/api/register", { status: 200 });
		cy.tryToSignUp({
			"Email": "tester2@mail.co",
			"Username": "testeruser",
			"Password": "Password1!",
			"Repeated Password": "Password1!"
		});
		cy.get("#signup-form > .colorful-button").click();
		// then
		cy.get(".pb-10").should("have.text", "Check your email and then log in");
	});
});
