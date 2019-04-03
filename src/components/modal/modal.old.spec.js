import { loadFixture, testVM, nextTick } from '../../../tests/utils'

describe('modal', () => {
  beforeEach(loadFixture(__dirname, 'modal'))
  testVM()

  it('Should show hide modal', async () => {
    const {
      app: { $refs }
    } = window
    const { modalButton2, modal2 } = $refs
    const body = document.body

    // show the modal
    modalButton2.click()
    await nextTick()
    expect(Array.isArray(body._marginChangedForModal)).toBe(true)

    // hide the modal
    modal2.hide()
    await nextTick()
    // manually run resetScrollbar because JSDOM doesn't support it
    // BUT it will under vue-test-utils with hte right tweaks
    modal2.resetScrollbar()
    expect(body._marginChangedForModal).toBe(null)
  })
})
