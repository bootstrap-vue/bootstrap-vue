/* global cy */

describe('Radio Visual Regression Test', () => {
  it('radio checked', () => {
    cy.visit('/form-radio')
    cy.eyesOpen({
      appName: 'Bootstrap-Vue',
      testName: 'Form Radio Visual Test',
      browser: {
        width: 1280,
        height: 800
      }
    })
    cy.eyesCheckWindow('Radio Page')
    cy.get('.bd-example .custom-control-label:first').click()
    cy.wait(1000)
    cy.eyesCheckWindow('Radio Checked')
    cy.wait(500)
    cy.eyesClose()
  })
})
