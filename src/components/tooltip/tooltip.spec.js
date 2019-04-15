import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import BTooltip from './tooltip'

const localVue = new CreateLocalVue()

// Our test application definition
const appDef = {
  props: ['triggers', 'show', 'disabled', 'noFade', 'title', 'titleAttr', 'btnDisabled'],
  render(h) {
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
      h(
        BTooltip,
        {
          attrs: { id: 'bar' },
          props: {
            target: 'foo',
            triggers: this.triggers,
            show: this.show,
            disabled: this.disabled,
            noFade: this.noFade || false,
            title: this.title || null
          }
        },
        this.$slots.default || ''
      )
    ])
  }
}

// Note: `wrapper.destroy()` MUST be called at the end of each test in order for
// the next test to function properly!
describe('tooltip', () => {
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
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('title')).toEqual('')
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('data-original-title')).toEqual('')
    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.classes()).toContain('d-none')
    expect($tipHolder.attributes('aria-hidden')).toBeDefined()
    expect($tipHolder.attributes('aria-hidden')).toEqual('true')
    expect($tipHolder.element.style.display).toEqual('none')

    // Title placeholder (from default slot)
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    expect($tipHolder.find('div.d-none > div').text()).toBe('title')

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
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('title')).toEqual('')
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('data-original-title')).toEqual('')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // <b-tooltip> wrapper
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.classes()).toContain('d-none')
    expect($tipHolder.attributes('aria-hidden')).toBeDefined()
    expect($tipHolder.attributes('aria-hidden')).toEqual('true')
    expect($tipHolder.element.style.display).toEqual('none')

    // Title placeholder (from default slot) will have been
    // moved to tooltip element
    expect($tipHolder.findAll('div.d-none > div').length).toBe(0)
    // Title text will be moved into the tooltip
    expect($tipHolder.text()).toBe('')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Hide the tooltip
    wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).not.toBeDefined()
    // Title placeholder (from default slot) will be back here
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    // Title text will be moved into the tooltip
    expect($tipHolder.find('div.d-none > div').text()).toBe('title')

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)

    // Title placeholder will be here until opened
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    expect($tipHolder.text()).toBe('title')

    // Activate tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    wrapper.destroy()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)
  })

  it('activating trigger element (focus) opens tooltip', async () => {
    jest.useFakeTimers()
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        triggers: 'focus',
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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)

    // Title placeholder will be here until opened
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    expect($tipHolder.text()).toBe('title')

    // Activate tooltip by trigger
    $button.trigger('focusin')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Deactivate tooltip by trigger
    $button.trigger('focusout')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    // Tooltip element should not be in the document
    expect($button.attributes('aria-describedby')).not.toBeDefined()
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)

    // Title placeholder will be here until opened
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    expect($tipHolder.text()).toBe('title')

    // Activate tooltip by trigger
    $button.trigger('mouseenter')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Deactivate tooltip by trigger
    $button.trigger('mouseleave')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    // Tooltip element should not be in the document
    expect($button.attributes('aria-describedby')).not.toBeDefined()
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)

    // title placeholder will be here until opened
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    expect($tipHolder.text()).toBe('title')

    // Try to activate tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    // Tooltip should not have opened
    expect($button.attributes('aria-describedby')).not.toBeDefined()
    expect($tipHolder.findAll('div.d-none > div').length).toBe(1)
    expect($tipHolder.text()).toBe('title')

    // Now enabled the tooltip
    wrapper.setProps({
      disabled: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    // Try to activate tooltip by trigger
    $button.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).toBeDefined()
    // expect($tipHolder.findAll('div.d-none > div').length).toBe(0)
    const adb = $button.attributes('aria-describedby')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.classes()).toContain('d-none')
    expect($tipHolder.attributes('aria-hidden')).toBeDefined()
    expect($tipHolder.attributes('aria-hidden')).toEqual('true')
    expect($tipHolder.element.style.display).toEqual('none')

    // Title placeholder...
    expect($tipHolder.text()).toBe('')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Hide the tooltip by emitting root event with correct ID (forceHide)
    wrapper.vm.$root.$emit('bv::hide::tooltip', 'foo')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.classes()).toContain('d-none')
    expect($tipHolder.attributes('aria-hidden')).toBeDefined()
    expect($tipHolder.attributes('aria-hidden')).toEqual('true')
    expect($tipHolder.element.style.display).toEqual('none')

    // title placeholder...
    expect($tipHolder.text()).toBe('')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Tooltip should ignore when ID is not it's own
    wrapper.vm.$root.$emit('bv::hide::tooltip', 'wrong-id')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(true)
    expect(document.querySelector(`#${adb}`)).not.toBe(null)

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
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.classes()).toContain('d-none')
    expect($tipHolder.attributes('aria-hidden')).toBeDefined()
    expect($tipHolder.attributes('aria-hidden')).toEqual('true')
    expect($tipHolder.element.style.display).toEqual('none')

    // Title placeholder...
    expect($tipHolder.text()).toBe('')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('DIV')
    expect(tip.classList.contains('tooltip')).toBe(true)

    // Hide the tooltip by emitting root event with no ID (forceHide)
    wrapper.vm.$root.$emit('bv::hide::tooltip')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

    wrapper.destroy()
  })

  it('closes when trigger element is no longer visible', async () => {
    jest.useFakeTimers()
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

    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('wrapper')

    // The trigger button
    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual('foo')
    expect($button.attributes('title')).toBeDefined()
    expect($button.attributes('data-original-title')).toBeDefined()
    expect($button.attributes('aria-describedby')).toBeDefined()
    // ID of the tooltip that will be in the body
    const adb = $button.attributes('aria-describedby')

    // b-tooltip wrapper
    const $tipHolder = wrapper.find('div#bar')
    expect($tipHolder.exists()).toBe(true)
    expect($tipHolder.classes()).toContain('d-none')
    expect($tipHolder.attributes('aria-hidden')).toBeDefined()
    expect($tipHolder.attributes('aria-hidden')).toEqual('true')
    expect($tipHolder.element.style.display).toEqual('none')

    // Title placeholder...
    expect($tipHolder.text()).toBe('')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
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
    // The visibility check runs on an interval of 100ms
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    expect($button.attributes('aria-describedby')).not.toBeDefined()

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

    // Try and show element via root event (using ID of trigger button)
    wrapper.vm.$root.$emit('bv::show::tooltip', 'foo')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    // Tooltip element should not be in the document
    expect(document.querySelector(`#${adb}`)).toBe(null)

    // Try and show element via root event (using show all)
    wrapper.vm.$root.$emit('bv::show::tooltip')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    // Tooltip element should not be in the document
    expect(document.querySelector(`#${adb}`)).toBe(null)

    wrapper.destroy()
  })
})
