/* global cy */

describe('Modal Visual Regression Test', () => {
  it('modal open', () => {
    cy.visit('/modal')
    cy.eyesOpen({
      appName: 'Bootstrap-Vue',
      testName: 'Modal Visual Test',
      browser: {
        width: 1280,
        height: 800
      }
    })
    cy.eyesCheckWindow('Modal Page')
    cy.get('.bd-example button:first').click()
    cy.wait(1000)
    cy.eyesCheckWindow('Modal Visible')
    cy.wait(500)
    cy.eyesClose()
  })
})
