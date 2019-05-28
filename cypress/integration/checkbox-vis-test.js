/* global cy */

describe('Checkbox Visual Regression Test', () => {
  it('checkbox checked', () => {
    cy.visit('/form-checkbox')
    cy.eyesOpen({
      appName: 'Bootstrap-Vue',
      testName: 'Form Checkbox Visual Test',
      browser: {
        width: 1280,
        height: 800
      }
    })
    cy.eyesCheckWindow('Checkbox Page')
    cy.get('.bd-example .custom-control-label:first').click()
    cy.wait(1000)
    cy.eyesCheckWindow('Checkbox Checked')
    cy.wait(500)
    cy.eyesClose()
  })
})
