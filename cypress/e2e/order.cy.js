import {SELECTORS} from '../support/constant-selectors'

describe("Проверка создания и отправки заказа", () => {
  beforeEach(() => {
    cy.prepareTest()
  })

  it("Готовим бургер и отправляем заказ", () => {
    // При пустом конструкторе кнопка неактивна
    cy.get(SELECTORS.orderButton).should("exist").and("be.disabled")
    // Перетаскиваем булку в конструктор
    cy.DnD("Краторная булка N-200i", SELECTORS.dropContainer)
    // Перетаскиваем ингредиенты
    cy.DnD("Соус традиционный галактический", SELECTORS.dropContainer)
    cy.DnD("Соус традиционный галактический", SELECTORS.dropContainer)
    cy.DnD("Мясо бессмертных моллюсков Protostomia", SELECTORS.dropContainer)
    // Отправляем заказ
    cy.wait("@getUser")
    cy.get(SELECTORS.orderButton).should("not.be.disabled")
    cy.get(SELECTORS.orderButton).click()
    cy.wait("@postOrder")
    // Проверка ордера
    cy.get(SELECTORS.orderDetails).should("exist")
    cy.get(SELECTORS.orderNumber).should("have.text", "68449")
    // Закрываем модальное окно с ордером
    cy.get(SELECTORS.modalClose).click()
    cy.get(SELECTORS.modal).should("not.exist")
  })
})