import {loadFixture, testVM, nextTick} from '../../../tests/utils'

describe('modal', async () => {
  beforeEach(loadFixture(__dirname, 'modal'))
  testVM()

  it('Should bind event handler', async () => {
    const { app } = window

    expect(app.$refs.modalButton).toHaveProperty('__BV_boundEventListeners__.click')
  })

  it('Should unbind event handler', async () => {
    const { app } = window

    app.enableModal = false
    await nextTick()
    expect(app.$refs.button).not.toHaveProperty('__BV_boundEventListeners__.click')
  })

  it('Should show hide modal', async () => {
    const { app: { $refs } } = window
    const { modalButton2, modal2 } = $refs

    // show the modal
    modalButton2.click()
    await nextTick()
    expect(Array.isArray(modal2._marginChangedForScroll)).toBe(true)

    // hide the modal
    modal2.hide()
    await nextTick()
    // manually run resetScrollbar because JSDOM doesn't support it
    modal2.resetScrollbar()
    expect(modal2._marginChangedForScroll).toBe(null)
  })
})
