/// <reference types="cypress" />

describe("it will render something", () => {
	it("should be displayed in cypress", () => {
		cy.visit("http://localhost:3000/auth");
	});
});
