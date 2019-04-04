import tooltipDirective from './tooltip'
import ToolTip from '../../utils/tooltip.class'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

// Key which we use to store tooltip object on element
const BV_TOOLTIP = '__BV_ToolTip__'

describe('v-b-tooltip directive', () => {
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

  it('should have ToolTip class instance', async () => {
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bTooltip: tooltipDirective
      },
      data() {
        return {}
      },
      template: '<button v-b-tooltip title="foobar">button</button>'
    })

    const wrapper = mount(App, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('button')).toBe(true)
    const $button = wrapper.find('button')

    // Should have instance of popover class on it
    expect($button.element[BV_TOOLTIP]).toBeDefined()
    expect($button.element[BV_TOOLTIP]).toBeInstanceOf(ToolTip)

    wrapper.destroy()
  })

  it('should work', async () => {
    jest.useFakeTimers()
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bTooltip: tooltipDirective
      },
      data() {
        return {}
      },
      template: '<button v-b-tooltip.click.html title="<b>foobar</b>">button</button>'
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
    expect($button.element[BV_TOOLTIP]).toBeDefined()
    expect($button.element[BV_TOOLTIP]).toBeInstanceOf(ToolTip)

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

    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip.classList.contains('tooltip')).toBe(true)

    wrapper.destroy()
  })
})
