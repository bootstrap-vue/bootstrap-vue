import { loadFixture, testVM } from '../../../tests/utils'

describe('form-row', async () => {
  beforeEach(loadFixture(__dirname, 'row'))
  testVM()

  it('default should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('row')
  })

  it('custom should contain base class', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toHaveClass('row')
  })

  it('noGutters should contain classes', async () => {
    const { app: { $refs } } = window
    expect($refs.noGutters).toHaveClass('row')
    expect($refs.noGutters).toHaveClass('no-gutters')
  })

  it('alignV should contain classes', async () => {
    const { app: { $refs } } = window
    expect($refs.alignV).toHaveClass('row')
    expect($refs.alignV).toHaveClass('align-items-center')
  })

  it('alignH should contain classes', async () => {
    const { app: { $refs } } = window
    expect($refs.alignH).toHaveClass('row')
    expect($refs.alignH).toHaveClass('justify-content-center')
  })

  it('alignContent should contain classes', async () => {
    const { app: { $refs } } = window
    expect($refs.alignContent).toHaveClass('row')
    expect($refs.alignContent).toHaveClass('align-content-center')
  })

  it('default should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.default.textContent).toContain('default')
  })

  it('custom should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.custom.textContent).toContain('custom')
  })

  it('noGutters should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.noGutters.textContent).toContain('no gutters')
  })

  it('default should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('div')
  })

  it('custom should have tag p', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toBeElement('p')
  })

  it('noGutters should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.noGutters).toBeElement('div')
  })
})
