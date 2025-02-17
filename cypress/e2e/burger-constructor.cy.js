import {SELECTORS} from '../support/constant-selectors'

describe("Перетаскивание ингредиентов в конструктор работает верно", () => {
  beforeEach(() => {
    cy.prepareTest()
  })

  it("Перетаскиваем булку", () => {
    cy.get(SELECTORS.ingredientCard).should("be.visible")
    cy.DnD("Краторная булка N-200i", SELECTORS.dropContainer)
    cy.get(SELECTORS.dropContainer).contains("Краторная булка N-200i")
  })

  it("Перетаскиваем ингредиент", () => {
    cy.get(SELECTORS.ingredientCard).should("be.visible")
    cy.DnD("Соус традиционный галактический", SELECTORS.dropContainer)
    cy.get(SELECTORS.dropContainer).contains("Соус традиционный галактический")
  })
})