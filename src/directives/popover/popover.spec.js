import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { VBPopover } from './popover'
import { BVPopover } from '../../components/popover/helpers/bv-popover'

// Key which we use to store tooltip object on element
const BV_POPOVER = '__BV_Popover__'

describe('v-b-popover directive', () => {
  const originalCreateRange = document.createRange
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // https://github.com/FezVrasta/popper.js/issues/478#issuecomment-407422016
    // Hack to make Popper not bork out during tests.
    // Note popper still does not do any positioning calculation in JSDOM though.
    // So we cannot test actual positioning... just detect when it is open.
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    })
    // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
    // Needed for visibility checks of trigger element, etc.
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 24,
      height: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    // Reset overrides
    document.createRange = originalCreateRange
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('should have BVPopover Vue instance', async () => {
    jest.useFakeTimers()

    const App = {
      directives: {
        bPopover: VBPopover
      },
      template: `<button v-b-popover="'content'" title="foobar">button</button>`
    }

    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('BUTTON')
    const $button = wrapper.find('button')

    // Should have instance of popover class on it
    expect($button.element[BV_POPOVER]).toBeDefined()
    expect($button.element[BV_POPOVER]).toBeInstanceOf(BVPopover)

    wrapper.destroy()
  })

  it('should work', async () => {
    jest.useFakeTimers()

    const App = {
      directives: {
        bPopover: VBPopover
      },
      template: `<button v-b-popover.click.html="'content'" title="<b>foobar</b>">button</button>`
    }

    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    const $button = wrapper.find('button')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Should have instance of popover class on it
    expect($button.element[BV_POPOVER]).toBeDefined()
    expect($button.element[BV_POPOVER]).toBeInstanceOf(BVPopover)

    expect($button.attributes('aria-describedby')).toBeUndefined()

    // Trigger click
    await $button.trigger('click')
    await waitRAF()
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).toBeDefined()
    const adb = $button.attributes('aria-describedby')

    const pop = document.getElementById(adb)
    expect(pop).not.toBe(null)
    expect(pop.classList.contains('popover')).toBe(true)
    expect(pop.classList.contains('b-popover')).toBe(true)

    wrapper.destroy()
  })
})
