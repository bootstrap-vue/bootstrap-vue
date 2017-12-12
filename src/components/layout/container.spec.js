import { loadFixture, testVM } from '../../../tests/utils'

describe('container', async () => {
  beforeEach(loadFixture(__dirname, 'container'))
  testVM()

  it('default should contain default class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('container')
  })

  it('default should not contain fluid class', async () => {
    const { app: { $refs } } = window
    expect($refs.default).not.toHaveClass('container-fluid')
  })

  it('custom should contain default class', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toHaveClass('container')
  })

  it('custom should not contain fluid class', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).not.toHaveClass('container-fluid')
  })

  it('fluid should not contain default class', async () => {
    const { app: { $refs } } = window
    expect($refs.fluid).not.toHaveClass('container')
  })

  it('fluid should contain fluid class', async () => {
    const { app: { $refs } } = window
    expect($refs.fluid).toHaveClass('container-fluid')
  })

  it('default should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.default.textContent).toContain('default')
  })

  it('custom should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.custom.textContent).toContain('custom')
  })

  it('fluid should have content', async () => {
    const { app: { $refs } } = window
    expect($refs.fluid.textContent).toContain('fluid')
  })

  it('default should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toBeElement('div')
  })

  it('custom should have tag p', async () => {
    const { app: { $refs } } = window
    expect($refs.custom).toBeElement('p')
  })

  it('fluid should have tag div', async () => {
    const { app: { $refs } } = window
    expect($refs.fluid).toBeElement('div')
  })
})
