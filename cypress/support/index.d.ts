/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to select DOM element by data-cy attribute.
		 * @example cy.dataCy('greeting')
		 */
		findFieldsAndType(obj: { [string]: string }): Chainable<Element>;
		clickAll(list: string[]): Chainable<Element>;
		formLogin(email: string, password: string): Chainable<Element>;
		fastLogin(email: string, password: string): Chainable<Element>;
	}
}
