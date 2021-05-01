/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test Sign Up", () => {
	it("Should not have a clickable button", () => {
		// given
		cy.visit("/auth?action=sign-up");
		// when
		cy.findFieldsAndType({
			"Email": "tester2(at)mail.co",
			"Username": "t",
			"Password": "not a password",
			"Repeated Password": "not a passwrd"
		});
		cy.clickAll(["I read and accept the Terms and Conditions.", "I am 16 or older."]);
		//then
		cy.get("#signup-form > .colorful-button").should("be.disabled");
	});

	it("Should register a new user", () => {
		// given
		cy.intercept(Cypress.config().baseUrl + "/api/register", { status: 200 });
		cy.visit("/auth?action=sign-up");
		// when
		cy.findFieldsAndType({
			"Email": "tester2@mail.co",
			"Username": "testeruser",
			"Password": "Password1!",
			"Repeated Password": "Password1!"
		});
		cy.clickAll(["I read and accept the Terms and Conditions.", "I am 16 or older."]);
		cy.get("#signup-form > .colorful-button").click();
		// then
		cy.get(".pb-10").should("have.text", "Check your email and then log in");
	});
});
