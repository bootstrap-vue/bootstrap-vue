import { loadFixture, testVM } from '../../../tests/utils'

describe('form-text', async () => {
  beforeEach(loadFixture(__dirname, 'form-text'))
  testVM()

  it('default should be tag small', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('small')
  })

  it('default should have id', async () => {
    const { app: { $refs } } = window
    expect($refs.default.getAttribute('id')).toBe('default')
  })

  it('default should have base class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('form-text')
  })

  it('default should have muted variant', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('text-muted')
  })

  it('default should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.default.textContent).toContain('default')
  })

  it('custom should be tag p', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toBeElement('p')
  })

  it('custom should have base class', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toHaveClass('form-text')
  })

  it('custom should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.custom.textContent).toContain('custom')
  })

  it('variant should have base class', async () => {
    const { app: { $refs } } = window
    expect($refs.variant).toHaveClass('form-text')
  })

  it('variant should have danger variant', async () => {
    const { app: { $refs } } = window
    expect($refs.variant).toHaveClass('text-danger')
  })

  it('variant should have danger variant', async () => {
    const { app: { $refs } } = window
    expect($refs.variant.textContent).toContain('variant')
  })

  it('inline should not have base class', async () => {
    const { app: { $refs } } = window
    expect($refs.inline).not.toHaveClass('form-text')
  })

  it('inline should have variant muted', async () => {
    const { app: { $refs } } = window
    expect($refs.inline).toHaveClass('text-muted')
  })

  it('inline should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.inline.textContent).toContain('inline')
  })
})
