import { loadFixture, testVM } from '../../../tests/utils'

describe('button-close', async () => {
  beforeEach(loadFixture(__dirname, 'button-close'))
  testVM()

  it('default should have class close', async () => {
    const { app: { $refs } } = window
    expect($refs.default).toHaveClass('close')
  })

  it('slot should have class close', async () => {
    const { app: { $refs } } = window
    expect($refs.slot).toHaveClass('close')
  })

  it('disabled should have class close', async () => {
    const { app: { $refs } } = window
    expect($refs.disabled).toHaveClass('close')
  })

  it('variant should have classes close and text-primary', async () => {
    const { app: { $refs } } = window
    expect($refs.variant).toHaveAllClasses(['close', 'text-primary'])
  })

  it('slot should have custom content', async () => {
    const { app: { $refs } } = window
    expect($refs.slot.innerHTML).toContain('close')
  })

  it('default should emit "click" event when clicked', async () => {
    const { app: { $refs } } = window
    const btn = $refs.default
    const spy = jest.fn()

    btn.addEventListener('click', spy)
    btn.click()

    expect(spy).toHaveBeenCalled()
  })

  it('default should emit "click" event with native event object', async () => {
    const { app: { $refs } } = window
    const btn = $refs.default
    let event = null

    btn.addEventListener('click', e => (event = e))
    btn.click()

    expect(event).toBeInstanceOf(MouseEvent)
  })

  it('disabled should be disabled and not emit click event with `disabled` prop true', async () => {
    const { app: { $refs } } = window
    const btn = $refs.disabled
    const spy = jest.fn()

    btn.addEventListener('click', spy)
    btn.click()

    expect(btn.disabled).toBe(true)
    expect(spy).not.toHaveBeenCalled()
  })

  it('calls click handlers bound by its parent', async () => {
    const { app } = window
    const $btn = app.$refs.handlers
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    app.spies.push(spy1, spy2)

    $btn.click()
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
  })

  it('does not call click handlers bound by its parent when disabled', async () => {
    const { app } = window
    const $btn = app.$refs.handlersDisabled
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    app.spies.push(spy1, spy2)

    $btn.click()
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
  })
})
