import { loadFixture, testVM } from '../../../tests/utils'

describe('form-valid-feedback', async () => {
  beforeEach(loadFixture(__dirname, 'form-valid-feedback'))
  testVM()

  it('default should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('div')
  })

  it('default should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('valid-feedback')
  })
})
