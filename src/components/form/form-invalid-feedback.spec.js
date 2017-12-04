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

  it('default should not have class d-block', async () => {
    const { app: { $refs } } = window
    expect($refs.default).not.toHaveClass('d-block')
  })

  it('default should have id', async () => {
    const { app: { $refs } } = window
    expect($refs.default.getAttribute('id')).toBe('default')
  })

  it('tag should have tag small', async () => {
    const { app: { $refs } } = window
    expect($refs.tag).toBeElement('small')
  })

  it('tag should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.tag).toHaveClass('invalid-feedback')
  })

  it('show should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.show).toBeElement('div')
  })

  it('show should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.show).toHaveClass('invalid-feedback')
  })

  it('show should contain class d-block', async () => {
    const { app: { $refs } } = window
    expect($refs.show).toHaveClass('d-block')
  })
})
