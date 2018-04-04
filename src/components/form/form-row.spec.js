import { loadFixture, testVM } from '../../../tests/utils'

describe('form-row', async () => {
  beforeEach(loadFixture(__dirname, 'form-row'))
  testVM()

  it('default should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('form-row')
  })

  it('custom should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toHaveClass('form-row')
  })

  it('default should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.default.textContent).toContain('default')
  })

  it('custom should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.custom.textContent).toContain('custom')
  })

  it('default should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('div')
  })

  it('custom should have tag p', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toBeElement('p')
  })
})
