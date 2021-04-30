/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

describe("Test Profile", () => {
	const expected = {
		invalidURL: "http://image",
		validUrl:
			"https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
		invalidDescription:
			"This description will be longer than 256 characters, so it will be invalid: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamc",
		validDescription: "This is a description"
	};

	it("Should edit the profile", () => {
		cy.request({
			url: "http://localhost:3000/api/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: "goodbuytester@cuvox.de",
				password: "Password1!"
			})
		});
		cy.visit("/user/testergbde");
		cy.findByText("Edit").click();
		cy.findFieldsAndType({ "New Image URL": expected.invalidURL, "New Description": expected.invalidDescription });
		cy.findByText("Invalid New Image URL");
		cy.findByText("Invalid New Description");
	});
});
