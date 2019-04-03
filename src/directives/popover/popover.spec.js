import popoverDirective from './popover'
import PopOver from '../../utils/popover.class'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

// Key which we use to store tooltip object on element
const BV_POPOVER = '__BV_PopOver__'

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
    // Mock getBCR so that the isVisible(el) test returns true
    // Needed for visibility checks of trigger element, etc.
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
    // Reset overrides
    document.createRange = originalCreateRange
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('should have PopOver class instance', async () => {
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bPopover: popoverDirective
      },
      data() {
        return {}
      },
      template: `<button v-b-popover="'content'" title="foobar">button</button>`
    })

    const wrapper = mount(App, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('button')).toBe(true)
    const $button = wrapper.find('button')

    // Should have instance of popover class on it
    expect($button.element[BV_POPOVER]).toBeDefined()
    expect($button.element[BV_POPOVER]).toBeInstanceOf(PopOver)

    wrapper.destroy()
  })

  it('should work', async () => {
    jest.useFakeTimers()
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bPopover: popoverDirective
      },
      data() {
        return {}
      },
      template: `<button v-b-popover.click.html="'content'" title="<b>foobar</b>">button</button>`
    })

    const wrapper = mount(App, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('button')).toBe(true)
    const $button = wrapper.find('button')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    jest.runOnlyPendingTimers()

    // Should have instance of popover class on it
    expect($button.element[BV_POPOVER]).toBeDefined()
    expect($button.element[BV_POPOVER]).toBeInstanceOf(PopOver)

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Trigger click
    $button.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).toBeDefined()
    const adb = $button.attributes('aria-describedby')

    const pop = document.querySelector(`#${adb}`)
    expect(pop).not.toBe(null)
    expect(pop.classList.contains('popover')).toBe(true)

    wrapper.destroy()

    expect(document.contains(pop)).toBe(false)
  })
})
