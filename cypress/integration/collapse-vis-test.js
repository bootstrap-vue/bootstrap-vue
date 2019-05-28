/* global cy */

describe('Collapse Visual Regression Test', () => {
  it('collapse open', () => {
    cy.visit('/collapse')
    cy.eyesOpen({
      appName: 'Bootstrap-Vue',
      testName: 'Collapse Visual Test',
      browser: {
        width: 1280,
        height: 800
      }
    })
    cy.eyesCheckWindow('Collapse Page')
    cy.get('.bd-example button:first').click()
    cy.wait(500)
    cy.get('.bd-example .btn-secondary:first').click()
    cy.wait(1000)
    cy.eyesCheckWindow('Collapse Visible')
    cy.wait(500)
    cy.eyesClose()
  })
})
