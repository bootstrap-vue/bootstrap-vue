import BCollapse from './collapse'
import { mount, createWrapper } from '@vue/test-utils'

// Helper method for awaiting an animation frame
const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

// Events collapse emits on $root
const EVENT_STATE = 'bv::collapse::state'
const EVENT_ACCORDION = 'bv::collapse::accordion'
// Events collapse listens to on $root
const EVENT_TOGGLE = 'bv::toggle::collapse'

describe('collapse', () => {
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // Mock getBCR so that the we can get a fake height for element
    // Needed for keyboard navigation testing
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    })
  })

  afterEach(() => {
    // Reset overrides
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('should have expected default structure', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    // const rootWrapper = createWrapper(wrapper.vm.$root)
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).not.toContain('navbar-collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('should have expected structure when prop is-nav is set', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        isNav: true
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    // const rootWrapper = createWrapper(wrapper.vm.$root)
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).toContain('navbar-collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test'
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('should mount as visible when prop visible is true', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        visible: true
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.element.style.display).toEqual('')
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('should emit its state on mount (initialy hidden)', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test'
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    const rootWrapper = createWrapper(wrapper.vm.$root)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.emitted('show')).not.toBeDefined()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).not.toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(false) // Visible state
    expect(wrapper.element.style.display).toEqual('none')

    wrapper.destroy()
  })

  it('should emit its state on mount (initially visible)', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        visible: true
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    const rootWrapper = createWrapper(wrapper.vm.$root)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.emitted('show')).not.toBeDefined() // Does not emit show when initially visible
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).not.toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(wrapper.element.style.display).toEqual('')

    wrapper.destroy()
  })

  it('setting visible to true after mount shows collapse', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        visible: false
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    const rootWrapper = createWrapper(wrapper.vm.$root)
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.emitted('show')).not.toBeDefined()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(false) // Visible state
    expect(wrapper.element.style.display).toEqual('none')

    // Change visible prop
    wrapper.setProps({
      visible: true
    })
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(2)
    expect(rootWrapper.emitted(EVENT_STATE)[1][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[1][1]).toBe(true) // Visible state
    expect(wrapper.element.style.display).toEqual('')

    wrapper.destroy()
  })

  it('should respond to according events', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        accordion: 'foo',
        visible: true
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    const rootWrapper = createWrapper(wrapper.vm.$root)
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.element.style.display).toEqual('')
    expect(wrapper.emitted('show')).not.toBeDefined()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(true)
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
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(2) // The event we just emitted
    expect(rootWrapper.emitted(EVENT_ACCORDION)[1][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[1][1]).toBe('bar')
    expect(wrapper.element.style.display).toEqual('')

    // Should respond to accordion events
    wrapper.vm.$root.$emit(EVENT_ACCORDION, 'nottest', 'foo')
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(2)
    expect(rootWrapper.emitted(EVENT_STATE)[1][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[1][1]).toBe(false) // Visible state
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(3) // The event we just emitted
    expect(rootWrapper.emitted(EVENT_ACCORDION)[2][0]).toBe('nottest')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[2][1]).toBe('foo')
    expect(wrapper.element.style.display).toEqual('none')

    // Toggling this closed collapse emits accordion event
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test')
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('input')[2][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(3)
    expect(rootWrapper.emitted(EVENT_STATE)[2][0]).toBe('test') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[2][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(4) // The event emitted by collapse
    expect(rootWrapper.emitted(EVENT_ACCORDION)[3][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[3][1]).toBe('foo')
    expect(wrapper.element.style.display).toEqual('')

    // Toggling this open collapse to be closed
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test')
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.element.style.display).toEqual('none')

    // Should respond to accordion events targeting this ID when closed
    wrapper.vm.$root.$emit(EVENT_ACCORDION, 'test', 'foo')
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.element.style.display).toEqual('')

    wrapper.destroy()
  })

  it('should close when clicking on contained nav-link prop is-nav is set', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        isNav: true,
        visible: true
      },
      slots: {
        default: '<div><a class="nav-link" href="#">nav link</a></div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    // const rootWrapper = createWrapper(wrapper.vm.$root)
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.element.style.display).toEqual('')
    expect(wrapper.find('.nav-link').exists()).toBe(true)

    // Click on link
    wrapper.find('.nav-link').trigger('click')
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')

    wrapper.destroy()
  })

  it('should not respond to root toggle event that does not match ID', async () => {
    const wrapper = mount(BCollapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test'
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    // const rootWrapper = createWrapper(wrapper.vm.$root)
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')

    // Emit root event with different ID
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'not-test')
    await wrapper.vm.$nextTick()
    await waitAF()
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')

    wrapper.destroy()
  })
})
