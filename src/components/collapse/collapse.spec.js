import { createWrapper, mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { h } from '../../vue'
import { BCollapse } from './collapse'

// Events collapse emits on $root
const EVENT_STATE = 'bv::collapse::state'
const EVENT_ACCORDION = 'bv::collapse::accordion'
// Events collapse listens to on $root
const EVENT_TOGGLE = 'bv::toggle::collapse'

const EVENT_STATE_SYNC = 'bv::collapse::sync::state'
const EVENT_STATE_REQUEST = 'bv::request::collapse::state'

describe('collapse', () => {
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // Mock `getBoundingClientRect()` so that the we can get a fake height for element
    // Needed for keyboard navigation testing
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    // Reset overrides
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('should have expected default structure', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).not.toContain('navbar-collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.isVisible()).toEqual(false)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('should have expected structure when prop `is-nav` is set', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test',
        isNav: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).toContain('navbar-collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.isVisible()).toEqual(false)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test'
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.isVisible()).toEqual(false)
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('should mount as visible when prop visible is true', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test',
        visible: true
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.isVisible()).toEqual(true)
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('should emit its state on mount (initially hidden)', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test'
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeUndefined()
    expect(wrapper.emitted('update:visible')).toBeDefined()
    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).toBeUndefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(false) // Visible state
    expect(wrapper.isVisible()).toEqual(false)

    wrapper.unmount()
  })

  it('should emit its state on mount (initially visible)', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test',
        visible: true
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeUndefined() // Does not emit show when initially visible
    expect(wrapper.emitted('update:visible')).toBeDefined()
    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).toBeUndefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(wrapper.isVisible()).toEqual(true)

    wrapper.unmount()
  })

  it('should respond to state sync requests', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test',
        visible: true
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.isVisible()).toEqual(true)
    expect(wrapper.emitted('show')).toBeUndefined() // Does not emit show when initially visible
    expect(wrapper.emitted('update:visible')).toBeDefined()
    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).toBeUndefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).toBeUndefined()

    rootWrapper.vm.$root.$emit(EVENT_STATE_REQUEST, 'test')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[0][1]).toBe(true) // Visible state

    wrapper.unmount()
  })

  it('setting visible to true after mount shows collapse', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test',
        visible: false
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeUndefined()
    expect(wrapper.emitted('update:visible')).toBeDefined()
    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(false) // Visible state
    expect(wrapper.isVisible()).toEqual(false)

    // Change visible prop
    await wrapper.setProps({ visible: true })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect(wrapper.emitted('update:visible').length).toBe(2)
    expect(wrapper.emitted('update:visible')[1][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(2)
    expect(rootWrapper.emitted(EVENT_STATE)[1][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[1][1]).toBe(true) // Visible state
    expect(wrapper.isVisible()).toEqual(true)

    wrapper.unmount()
  })

  it('should respond to according events', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        id: 'test',
        accordion: 'foo',
        visible: true
      },
      slots: {
        default: h('div', 'foobar')
      }
    })

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.isVisible()).toEqual(true)
    expect(wrapper.emitted('show')).toBeUndefined()
    expect(wrapper.emitted('update:visible')).toBeDefined()
    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_ACCORDION)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_ACCORDION)[0][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[0][1]).toBe('foo')

    // Does not respond to accordion events for different accordion ID
    wrapper.vm.$root.$emit(EVENT_ACCORDION, 'test', 'bar')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(2) // The event we just emitted
    expect(rootWrapper.emitted(EVENT_ACCORDION)[1][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[1][1]).toBe('bar')
    expect(wrapper.isVisible()).toEqual(true)

    // Should respond to accordion events
    wrapper.vm.$root.$emit(EVENT_ACCORDION, 'nottest', 'foo')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('update:visible').length).toBe(2)
    expect(wrapper.emitted('update:visible')[1][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(2)
    expect(rootWrapper.emitted(EVENT_STATE)[1][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[1][1]).toBe(false) // Visible state
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(3) // The event we just emitted
    expect(rootWrapper.emitted(EVENT_ACCORDION)[2][0]).toBe('nottest')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[2][1]).toBe('foo')
    expect(wrapper.isVisible()).toEqual(false)

    // Toggling this closed collapse emits accordion event
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('update:visible').length).toBe(3)
    expect(wrapper.emitted('update:visible')[2][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(3)
    expect(rootWrapper.emitted(EVENT_STATE)[2][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[2][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(4) // The event emitted by collapse
    expect(rootWrapper.emitted(EVENT_ACCORDION)[3][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[3][1]).toBe('foo')
    expect(wrapper.isVisible()).toEqual(true)

    // Toggling this open collapse to be closed
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.isVisible()).toEqual(false)

    // Should respond to accordion events targeting this ID when closed
    wrapper.vm.$root.$emit(EVENT_ACCORDION, 'test', 'foo')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.isVisible()).toEqual(true)

    wrapper.unmount()
  })

  it('should close when clicking on contained nav-link prop is-nav is set', async () => {
    const App = {
      render() {
        return h('div', [
          // JSDOM supports `getComputedStyle()` when using stylesheets (non responsive)
          // https://github.com/jsdom/jsdom/blob/master/Changelog.md#030
          h('style', { type: 'text/css' }, '.collapse:not(.show) { display: none; }'),
          h(
            BCollapse,
            {
              props: {
                id: 'test',
                isNav: true,
                visible: true
              }
            },
            [h('a', { class: 'nav-link', href: '#' }, 'nav link')]
          )
        ])
      }
    }
    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    expect(wrapper.vm).toBeDefined()
    const $collapse = wrapper.findComponent(BCollapse)
    expect($collapse.vm).toBeDefined()

    expect(wrapper.find('style').exists()).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($collapse.classes()).toContain('show')
    expect($collapse.isVisible()).toEqual(true)
    expect($collapse.find('.nav-link').exists()).toBe(true)

    // Click on link
    await wrapper.find('.nav-link').trigger('click')
    await waitRAF()
    await waitRAF()
    expect($collapse.classes()).not.toContain('show')
    expect($collapse.isVisible()).toEqual(false)

    wrapper.unmount()
  })

  it('should not close when clicking on nav-link prop is-nav is set & collapse is display block important', async () => {
    const App = {
      render() {
        return h('div', [
          // JSDOM supports `getComputedStyle()` when using stylesheets (non responsive)
          // Although it appears to be picky about CSS definition ordering
          // https://github.com/jsdom/jsdom/blob/master/Changelog.md#030
          h(
            'style',
            { type: 'text/css' },
            '.collapse:not(.show) { display: none; } .d-block { display: block !important; }'
          ),
          h(
            BCollapse,
            {
              class: 'd-block',
              props: {
                id: 'test',
                isNav: true,
                visible: true
              }
            },
            [h('a', { class: 'nav-link', href: '#' }, 'nav link')]
          )
        ])
      }
    }
    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    expect(wrapper.vm).toBeDefined()
    const $collapse = wrapper.findComponent(BCollapse)
    expect($collapse.vm).toBeDefined()

    expect(wrapper.find('style').exists()).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($collapse.classes()).toContain('show')
    expect($collapse.isVisible()).toEqual(true)
    expect($collapse.find('.nav-link').exists()).toBe(true)

    // Click on link
    await wrapper.find('.nav-link').trigger('click')
    await waitRAF()
    await waitRAF()
    expect($collapse.classes()).toContain('show')
    expect($collapse.isVisible()).toEqual(true)

    wrapper.unmount()
  })

  it('should not respond to root toggle event that does not match ID', async () => {
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        // 'id' is a required prop
        id: 'test'
      },
      slots: {
        default: '<div>foobar</div>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.isVisible()).toEqual(false)

    // Emit root event with different ID
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'not-test')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.isVisible()).toEqual(false)

    wrapper.unmount()
  })

  it('default slot scope works', async () => {
    let scope = null
    const wrapper = mount(BCollapse, {
      attachTo: createContainer(),
      props: {
        // 'id' is a required prop
        id: 'test',
        visible: true
      },
      slots: {
        default(props) {
          scope = props
          return h('div', 'foobar')
        }
      }
    })

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.isVisible()).toEqual(true)
    expect(wrapper.emitted('show')).toBeUndefined() // Does not emit show when initially visible
    expect(wrapper.emitted('update:visible')).toBeDefined()
    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).toBeUndefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).toBeUndefined()

    expect(scope).not.toBe(null)
    expect(scope.visible).toBe(true)
    expect(typeof scope.close).toBe('function')

    scope.close()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC).length).toBe(2)
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[1][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[1][1]).toBe(false) // Visible state

    expect(scope).not.toBe(null)
    expect(scope.visible).toBe(false)
    expect(typeof scope.close).toBe('function')

    wrapper.unmount()
  })
})
