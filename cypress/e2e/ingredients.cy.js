import {SELECTORS} from '../support/constant-selectors'

describe("Модальное окно с деталями ингредиента работает верно", () => {
  beforeEach(() => {
    cy.prepareTest()
  });

  it("Открываем окно", () => {
    cy.contains("Конструктор")
    cy.contains("Соберите бургер")
    cy.openModal(SELECTORS.ingredientCard)
    cy.get(SELECTORS.modal).contains("Детали ингредиента")
  });

  it("Закрываем окно по кнопке", () => {
    cy.openModal(SELECTORS.ingredientCard)
    cy.get(SELECTORS.modalClose).click()
    cy.get(SELECTORS.modal).should("not.exist")
  });

  it("Закрываем окно при клике вне окна", () => {
    cy.openModal(SELECTORS.ingredientCard)
    cy.get(SELECTORS.modalOverlay).click()
    cy.get(SELECTORS.modal).should("not.exist")
  })

  it("Закрываем окно при нажатии 'ESC'", () => {
    cy.openModal(SELECTORS.ingredientCard)
    cy.get('body').type('{esc}')
    cy.get(SELECTORS.modal).should("not.exist")
  })
})
