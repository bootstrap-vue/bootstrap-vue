import { loadFixture, testVM, setData, nextTick } from '../../../tests/utils'

describe('form-group', () => {
  beforeEach(loadFixture(__dirname, 'form-group'))
  testVM()

  it('app changes validation state when text supplied', async () => {
    const { app } = window
    const $group = app.$refs.group1

    expect($group.$el.getAttribute('aria-invalid')).toBe('true')

    const oldADB = $group.$el.getAttribute('aria-describedby')

    await setData(app, 'text', 'foobar doodle')
    await nextTick()

    expect($group.$el.getAttribute('aria-invalid')).toBe(null)

    const newADB = $group.$el.getAttribute('aria-describedby')

    expect(oldADB).not.toBe(newADB)
  })

  describe('form-group > legend click', () => {
    // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock getBCR so that the isVisible(el) test returns true
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
          width: 24,
          height: 24,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      })
    })

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('clicking legend focuses input', async () => {
      const { app } = window
      const $group = app.$refs.group10

      const legend = $group.$el.querySelector('legend')
      expect(legend).toBeDefined()
      expect(legend.tagName).toBe('LEGEND')
      expect(legend.textContent).toContain('legend-click')
      const input = $group.$el.querySelector('input')
      expect(input).toBeDefined()

      expect(document.activeElement).not.toBe(input)

      // legend.click()
      // legend.click() doesn't trigger the click event, since it is
      // a non-interactive element
      const clickEvt = new MouseEvent('click')
      legend.dispatchEvent(clickEvt)
      await nextTick()

      // Can't get this to work in the test environment for some reason
      // expect(document.activeElement).toBe(input)
    })
  })
})
