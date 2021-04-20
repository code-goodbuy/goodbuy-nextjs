/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test Sign Up", () => {
	it("Should register a new user", () => {
		cy.intercept(Cypress.config().baseUrl + "/api/register", { status: 200 });

		cy.visit("/auth");
		cy.findByText("Sign Up").click();
		cy.findByPlaceholderText("Email").click().type("tester2@mail.co");
		cy.findByPlaceholderText("Username").click().type("tester-user");
		cy.findByPlaceholderText("Password").click().type("Password1!");
		cy.findByPlaceholderText("Repeated Password").click().type("Password1!");
		cy.findByLabelText("I read and accept the Terms and Conditions.").click();
		cy.findByLabelText("I am 16 or older.").click();
		cy.get("#signup-form > .colorful-button").click();
		cy.get(".pb-10").should("have.text", "Check your email and then log in");
	});

	it.only("Should not be clickable", () => {
		cy.visit("/auth");
		cy.findByText("Sign Up").click();
		cy.findByPlaceholderText("Email").click().type("tester2@mail.co");
		cy.findByPlaceholderText("Username").click().type("?");
		cy.findByPlaceholderText("Password").click().type("not a password");
		cy.findByPlaceholderText("Repeated Password").click().type("not a password");
		cy.findByLabelText("I read and accept the Terms and Conditions.").click();
		cy.findByLabelText("I am 16 or older.").click();
		cy.get("#signup-form > .colorful-button").should("be.disabled");
	});
});
