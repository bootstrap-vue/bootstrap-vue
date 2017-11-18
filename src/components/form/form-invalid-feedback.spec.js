import { loadFixture, testVM } from '../../../tests/utils'

describe('form-invalid-feedback', async () => {
  beforeEach(loadFixture(__dirname, 'form-invalid-feedback'))
  testVM()

  it('default should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('div')
  })

  it('default should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('invalid-feedback')
  })
})
