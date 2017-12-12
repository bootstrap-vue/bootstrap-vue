import { loadFixture, testVM } from '../../../tests/utils'

describe('button-toolbar', async () => {
  beforeEach(loadFixture(__dirname, 'button-toolbar'))
  testVM()

  it('toolbar should contain base class', async () => {
    const { app: { $refs } } = window

    expect($refs.toolbar).toHaveClass('btn-toolbar')
  })

  it('toolbar should have role', async () => {
    const { app: { $refs } } = window

    expect($refs.toolbar.$el.getAttribute('role')).toBe('toolbar')
  })
})
