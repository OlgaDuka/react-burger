/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import {SELECTORS} from './constant-selectors'

Cypress.Commands.add("prepareTest", () => {
  cy.visit("/")

  window.localStorage.setItem("accessToken", "test-access-token")
  window.localStorage.setItem("refreshToken", "test-refresh-token")

  cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients")
  cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("getUser")
  cy.intercept("POST", "api/orders", { fixture: "order.json" }).as('postOrder')

  cy.url().should("include", "/")
  cy.wait("@getIngredients")
})

Cypress.Commands.add("DnD", (name, dropContainer) => {
  cy.get(SELECTORS.ingredientCard).contains(name).trigger("dragstart")
  cy.get(dropContainer).trigger("drop")
  cy.get(dropContainer).trigger("dragend")
})

Cypress.Commands.add("openModal", (selectorName) => {
  cy.get(selectorName).first().click()
})
