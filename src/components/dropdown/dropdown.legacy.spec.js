import { loadFixture, testVM } from '../../../tests/utils'

describe('dropdown (legacy tests)', () => {
  beforeEach(loadFixture(__dirname, 'dropdown'))
  testVM()

  it('should have "dropdown-toggle-no-caret" class when no-caret is true', async () => {
    const {
      app: { $refs }
    } = window
    const { dd_7 } = $refs // eslint-disable-line camelcase

    const toggle = Array.from(dd_7.$el.children).find(
      node => node.tagName === 'BUTTON' && node.id === `${dd_7.safeId('_BV_toggle_')}`
    )
    expect(toggle).toHaveClass('dropdown-toggle-no-caret')
  })

  it('should not have "dropdown-toggle-no-caret" class when no-caret and split are true', async () => {
    const {
      app: { $refs }
    } = window
    const { dd_8 } = $refs // eslint-disable-line camelcase

    const toggle = Array.from(dd_8.$el.children).find(
      node => node.tagName === 'BUTTON' && node.id === `${dd_8.safeId('_BV_toggle_')}`
    )
    expect(toggle).not.toHaveClass('dropdown-toggle-no-caret')
  })

  /*
  it('boundary set to viewport should have class position-static', async () => {
    const {app: {$refs}} = window
    const {dd_9} = $refs

    expect(dd_9).toHaveClass('position-static')
  })

  it('boundary not set should not have class position-static', async () => {
    const {app: {$refs}} = window
    const {dd_1} = $refs

    expect(dd_1).not.toHaveClass('position-static')
  })
  */

  it('should have a toggle with the given toggle tag', async () => {
    const {
      app: { $refs }
    } = window
    const { dd_10 } = $refs // eslint-disable-line camelcase

    const toggle = dd_10.$el.querySelector('.dropdown-toggle')
    expect(toggle).toBeElement('div')
  })
})
