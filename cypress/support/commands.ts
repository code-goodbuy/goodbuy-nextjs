// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("findFieldsAndType", (obj) => {
	for (let [key, value] of Object.entries(obj)) {
		typeof value === "string" && cy.findByPlaceholderText(key).type(value);
	}
});

Cypress.Commands.add("clickAll", (list) => {
	for (let e of list) {
		cy.findByLabelText(e).click();
	}
});

Cypress.Commands.add("formLogin", (email: string, password: string) => {
	cy.visit("/auth");
	cy.findFieldsAndType({ "Email": email, "Password": password });
	cy.findByText("Log In").click();
});

Cypress.Commands.add("fastLogin", (email: string, password: string) => {
	cy.request({
		url: "http://localhost:3000/api/login",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	});
});

Cypress.Commands.add("tryToSignUp", (obj: { [key: string]: string }) => {
	cy.visit("/auth?action=sign-up");
	cy.findFieldsAndType(obj);
	cy.clickAll(["I read and accept the Terms and Conditions.", "I am 16 or older."]);
});
