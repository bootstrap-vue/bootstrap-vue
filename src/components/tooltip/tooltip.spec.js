import Tooltip from './tooltip'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

const localVue = new CreateLocalVue()

const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

// Our test application definition
const appDef = {
  props: ['trigger', 'show', 'disabed', 'title', 'titleAttr'],
  render(h) {
    return h('article', { attrs: { id: 'wrapper' } }, [
      h('button', { attrs: { id: 'foo', type: 'button', title: this.titleAttr || null } }, 'text'),
      h(
        Tooltip,
        {
          attrs: { id: 'bar' },
          props: {
            target: 'foo',
            trigger: this.trigger,
            show: this.show,
            disabled: this.disabled,
            title: this.title || null
          }
        },
        this.$slots.default
      )
    ])
  }
}

describe('tooltip', () => {
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

  it('has expected default structure', async () => {
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        trigger: 'click'
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()

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

    // b-tooltip wrapper
    const $tipholder = wrapper.find('div#bar')
    expect($tipholder.exists()).toBe(true)
    expect($tipholder.classes()).toContain('d-none')
    expect($tipholder.attributes('aria-hidden')).toBeDefined()
    expect($tipholder.attributes('aria-hidden')).toEqual('true')
    expect($tipholder.element.style.display).toEqual('none')

    // title placeholder (from default slot)
    expect($tipholder.findAll('div.d-none > div').length).toBe(1)
    expect($tipholder.find('div.d-none > div').text()).toBe('title')

    wrapper.destroy()
  })

  it('initially open has expected structure', async () => {
    const App = localVue.extend(appDef)
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue,
      propsData: {
        trigger: 'click',
        show: true
      },
      slots: {
        default: 'title'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()

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

    // b-tooltip wrapper
    const $tipholder = wrapper.find('div#bar')
    expect($tipholder.exists()).toBe(true)
    expect($tipholder.classes()).toContain('d-none')
    expect($tipholder.attributes('aria-hidden')).toBeDefined()
    expect($tipholder.attributes('aria-hidden')).toEqual('true')
    expect($tipholder.element.style.display).toEqual('none')

    // title placeholder (from default slot) will ahve been moved to tooltip element
    expect($tipholder.findAll('div.d-none > div').length).toBe(0)
    // title text will be moved into the tooltip
    expect($tipholder.text()).toBe('')

    // Find the tooltip element in the document
    const tip = document.querySelector(`#${adb}`)
    expect(tip).not.toBe(null)
    expect(tip).toBeInstanceOf(HTMLElement)
    expect(tip.tagName).toEqual('div')
    expect(tip.classList.contains('tooltip')).toBe(true)

    await wrapper.vm.$nextTick()
    expect(tip.innerText).toEqual('title')

    // Hide the tooltip
    wrapper.setProps({
      show: false
    })
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()

    expect($button.attributes('aria-describedby')).not.toBeDefined()
    // title placeholder (from default slot) will be back here
    expect($tipholder.findAll('div.d-none > div').length).toBe(1)
    // title text will be moved into the tooltip
    expect($tipholder.find('div.d-none > div').text()).toBe('title')

    // Tooltip element should not be in the document
    expect(document.body.contains(tip)).toBe(false)
    expect(document.querySelector(`#${adb}`)).toBe(null)

    wrapper.destroy()
  })
})
