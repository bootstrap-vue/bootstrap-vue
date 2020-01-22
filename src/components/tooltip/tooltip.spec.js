import { mount, createLocalVue as CreateLocalVue, createWrapper } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BTooltip } from './tooltip'

const localVue = new CreateLocalVue()

// Our test application definition
const appDef = {
  props: [
    'triggers',
    'show',
    'noninteractive',
    'disabled',
    'noFade',
    'title',
    'titleAttr',
    'btnDisabled',
    'variant',
    'customClass',
    'delay'
  ],
  render(h) {
    const tipProps = {
      target: 'foo',
      triggers: this.triggers,
      show: this.show,
      noninteractive: this.noninteractive || false,
      disabled: this.disabled,
      noFade: this.noFade || false,
      title: this.title || null,
      variant: this.variant,
      customClass: this.customClass,
      delay: this.delay
    }
    return h('article', { attrs: { id: 'wrapper' } }, [
      h(
        'button',
        {
          attrs: {
            id: 'foo',
            type: 'button',
            disabled: this.btnDisabled || null,
            title: this.titleAttr || null
          }
        },
        'text'
      ),
      typeof this.$slots.default === `undefined` || !this.$slots.default
        ? h(BTooltip, { props: tipProps })
        : h(BTooltip, { props: tipProps }, this.$slots.default)
    ])
  }
}

// Note: `wrapper.destroy()` MUST be called at the end of each test in order for
// the next test to function properly!
describe('b-tooltip', () => {
  const originalCreateRange = document.createRange
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // https://github.com/FezVrasta/popper.js/issues/478#issuecomment-407422016
    // Hack to make Popper not bork out during tests
    // Note popper still does not do any positioning calculation in JSDOM though
    // So we cannot test actual positioning, just detect when it is open
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    })
    // Mock getBCR so that the isVisible(el) test returns true
    // Needed for visibility checks of trigger element, etc
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

  it('has expected default structure', async () => {
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).not.toBeDefined()
    expect($button.attributes('data-original-title')).not.toBeDefined()
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.element.nodeType).toEqual(Node.COMMENT_NODE)

    wrapper.destroy()
  })

  it('initially open has expected structure', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).not.toBeDefined()
    expect($button.attributes('data-original-title')).not.toBeDefined()
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.element.nodeType).toEqual(Node.COMMENT_NODE)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)
    expect(tip.classList.contains('interactive')).toBe(false)

    // Hide the tooltip
    wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(adb)).toBe(null)

    // Show the tooltip
    wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).toBeDefined()

    // Note tip always has the same ID
    const tip2 = document.getElementById(adb)
    expect(tip2).not.toBe(null)
    expect(tip2).toBeInstanceOf(HTMLElement)
    expect(tip2.tagName).toEqual('DIV')
    expect(tip2.classList.contains('tooltip')).toBe(true)
    expect(tip2.classList.contains('b-tooltip')).toBe(true)

    wrapper.destroy()
  })

  it('title prop is reactive', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true,
        title: 'hello'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).not.toBeDefined()
    expect($button.attributes('data-original-title')).not.toBeDefined()
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.element.nodeType).toEqual(Node.COMMENT_NODE)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    const $tip = createWrapper(tip)
    expect($tip.is('div')).toBe(true)
    expect($tip.classes()).toContain('tooltip')
    expect($tip.classes()).toContain('b-tooltip')
    // Should contain our title prop value
    expect($tip.text()).toContain('hello')

    // Change the title prop
    wrapper.setProps({
      title: 'world'
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should still be in the document
    expect(document.body.contains(tip)).toBe(true)
    expect($tip.classes()).toContain('tooltip')
    expect($tip.classes()).toContain('b-tooltip')
    // Should contain the new updated content
    expect($tip.text()).toContain('world')

    wrapper.destroy()
  })

  it('activating trigger element (click) opens tooltip', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: false
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Activate tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)

    wrapper.destroy()
  })

  it('activating trigger element (focus) opens tooltip', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'focus',
        show: false,
        delay: 0
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Activate tooltip by trigger
    $button.trigger('focusin')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)

    // Deactivate tooltip by trigger
    $button.trigger('focusout', { relatedTarget: document.body })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should not be in the document
    expect($button.attributes('aria-describedby')).not.toBeDefined()
    expect(document.body.contains(tip)).toBe(false)
    expect(document.getElementById(adb)).toBe(null)

    wrapper.destroy()
  })

  it('activating trigger element (hover) opens tooltip', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'hover',
        show: false,
        // Add no fade for coverage
        noFade: true
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Activate tooltip by trigger
    $button.trigger('mouseenter')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)

    // Deactivate tooltip by trigger
    $button.trigger('mouseleave', { relatedTarget: document.body })
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should not be in the document
    expect($button.attributes('aria-describedby')).not.toBeDefined()
    expect(document.body.contains(tip)).toBe(false)
    expect(document.getElementById(adb)).toBe(null)

    wrapper.destroy()
  })

  it('disabled tooltip does not open on trigger', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: false,
        disabled: true
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // b-tooltip wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Try to activate tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip should not have opened
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Now enable the tooltip
    wrapper.setProps({
      disabled: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Try to activate tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).toBeDefined()
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Now disable the tooltip
    wrapper.setProps({
      disabled: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Try to close tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // expect($button.attributes('aria-describedby')).not.toBeDefined()

    wrapper.destroy()
  })

  it('closes/opens on instance events', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true,
        disabled: false,
        titleAttr: 'ignored'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    const adb = $button.attributes('aria-describedby')

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)

    // Hide the tooltip by emitting event on instance
    const bTooltip = wrapper.find(BTooltip)
    expect(bTooltip.exists()).toBe(true)
    bTooltip.vm.$emit('close')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.getElementById(adb)).toBe(null)

    // Show the tooltip by emitting event on instance
    bTooltip.vm.$emit('open')

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should be in the document
    expect($button.attributes('aria-describedby')).toBeDefined()
    expect(document.getElementById(adb)).not.toBe(null)

    wrapper.destroy()
  })

  it('closes on $root close specific ID event', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true,
        disabled: false,
        titleAttr: 'ignored'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('title')).toEqual('')
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('data-original-title')).toEqual('ignored')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)

    // Hide the tooltip by emitting root event with correct ID (forceHide)
    wrapper.vm.$root.$emit('bv::hide::tooltip', 'foo')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.getElementById(adb)).toBe(null)

    wrapper.destroy()
  })

  it('does not close on $root close specific other ID event', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true,
        disabled: false,
        titleAttr: 'ignored'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('title')).toEqual('')
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('data-original-title')).toEqual('ignored')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // b-tooltip wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Tooltip should ignore when ID is not its own
    wrapper.vm.$root.$emit('bv::hide::tooltip', 'wrong-id')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).toBeDefined()

    // Tooltip element should still be in the document
    expect(document.body.contains(tip)).toBe(true)
    expect(document.getElementById(adb)).not.toBe(null)

    wrapper.destroy()
  })

  it('closes on $root close all event', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true,
        disabled: false,
        titleAttr: 'ignored'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('title')).toEqual('')
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('data-original-title')).toEqual('ignored')
    expect($button.attributes('aria-describedby')).toBeDefined()

    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)

    // Hide the tooltip by emitting root event with no ID (forceHide)
    wrapper.vm.$root.$emit('bv::hide::tooltip')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.getElementById(adb)).toBe(null)

    wrapper.destroy()
  })

  it('closes when trigger element is no longer visible', async () => {
    jest.useFakeTimers()
    // Prevent warns from appearing in the test logs
    jest.spyOn(console, 'warn').mockImplementation(() => {})

    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'click',
        show: true,
        disabled: false
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()

    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // b-tooltip wrapper
    const $tipHolder = wrapper.find(BTooltip)
    expect($tipHolder.exists()).toBe(true)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Hide the tooltip by removing the trigger button from DOM
    $button.element.parentNode.removeChild($button.element)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    // The visibility check runs on an interval of 100ms
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.getElementById(`adb`)).toBe(null)

    // Try and show element via root event (using ID of trigger button)
    // Note that this generates a console warning
    wrapper.vm.$root.$emit('bv::show::tooltip', 'foo')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should not be in the document
    expect(document.getElementById(adb)).toBe(null)

    // Try and show element via root event (using show all)
    wrapper.vm.$root.$emit('bv::show::tooltip')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Tooltip element should not be in the document
    expect(document.getElementById(adb)).toBe(null)

    wrapper.destroy()
  })

  it('applies noninteractive class based on noninteractive prop', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        show: true
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)

    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')
    expect(adb).toBeDefined()
    expect(adb).not.toBe('')
    expect(adb).not.toBe(null)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)
    expect(tip.classList.contains('noninteractive')).toBe(false)

    // Enable 'noninteractive'. Should be reactive
    wrapper.setProps({
      noninteractive: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)
    expect(tip.classList.contains('noninteractive')).toBe(true)

    wrapper.destroy()
  })

  it('applies variant class', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        show: true,
        variant: 'danger'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)

    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')
    expect(adb).not.toBe(null)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip-danger')).toBe(true)

    // Change variant type. Should be reactive
    wrapper.setProps({
      variant: 'success'
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip-success')).toBe(true)
    expect(tip.classList.contains('b-tooltip-danger')).toBe(false)

    wrapper.destroy()
  })

  it('applies custom class', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        show: true,
        customClass: 'foobar-class'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)

    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')
    expect(adb).toBeDefined()
    expect(adb).not.toBe('')
    expect(adb).not.toBe(null)

    // Find the tooltip element in the document
    const tip = document.getElementById(adb)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('b-tooltip')).toBe(true)
    expect(tip.classList.contains('foobar-class')).toBe(true)

    // Change custom class. Should be reactive
    wrapper.setProps({
      customClass: 'barbaz-class'
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(tip.classList.contains('tooltip')).toBe(true)
    expect(tip.classList.contains('barbaz-class')).toBe(true)
    expect(tip.classList.contains('foobar-class')).toBe(false)

    wrapper.destroy()
  })
})
