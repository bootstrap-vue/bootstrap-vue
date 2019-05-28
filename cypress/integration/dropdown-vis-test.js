/* global cy */

describe('Dropdown Visual Regression Test', () => {
  it('dropdown open', () => {
    cy.visit('/dropdown')
    cy.eyesOpen({
      appName: 'Bootstrap-Vue',
      testName: 'Dropdown Visual Test',
      browser: {
        width: 1280,
        height: 800
      }
    })
    cy.eyesCheckWindow('Dropdown Page')
    cy.get('.bd-example button:first').click()
    cy.wait(1000)
    cy.eyesCheckWindow('Dropdown Visible')
    cy.wait(500)
    cy.eyesClose()
  })
})
