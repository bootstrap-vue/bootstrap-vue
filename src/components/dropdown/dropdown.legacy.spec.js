import { loadFixture, testVM } from '../../../tests/utils'

describe('dropdown (legacy tests)', () => {
  beforeEach(loadFixture(__dirname, 'dropdown'))
  testVM()

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
})
