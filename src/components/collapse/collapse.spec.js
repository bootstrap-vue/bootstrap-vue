import Collapse from './collapse'
import { mount, createWrapper } from '@vue/test-utils'

// Helper method for awaiting an animation frame
const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

// Events collapse emits on $root
const EVENT_STATE = 'bv::collapse::state'
const EVENT_ACCORDION = 'bv::collapse::accordion'
// Events collapse listens to on $root
// const EVENT_TOGGLE = 'bv::toggle::collapse'

describe('collapse', () => {
  const origGetBCR = Element.prototype.getBoundingClientRect
  const origScrollHeight = Element.prototype.scrollHeight

  beforeEach(() => {
    // Mock getBCR so that the we can get a fake ehight for element
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
    // Mock Element.scrollHeight
    Element.prototype.scrollHeight = 100
  })

  afterEach(() => {
    // Reset overrides
    Element.prototype.getBoundingClientRect = origGetBCR
    Element.prototype.scrollHeight = origScrollHeight
  })

  it('should have expected default structure', async () => {
    const wrapper = mount(Collapse, {
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
    const wrapper = mount(Collapse, {
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
    const wrapper = mount(Collapse, {
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
    const wrapper = mount(Collapse, {
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
    const wrapper = mount(Collapse, {
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
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(false) // visible state
    expect(wrapper.element.style.display).toEqual('none')

    wrapper.destroy()
  })

  it('should emit its state on mount (initialy visible)', async () => {
    const wrapper = mount(Collapse, {
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
    expect(wrapper.emitted('show')).not.toBeDefined() // does not emit show when initially visible
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).not.toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // visible state
    expect(wrapper.element.style.display).toEqual('')

    wrapper.destroy()
  })

  it('setting visible to true after mount shows collapse', async () => {
    const wrapper = mount(Collapse, {
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
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(false) // visible state
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
    expect(rootWrapper.emitted(EVENT_STATE)[1][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[1][1]).toBe(true) // visible state
    expect(wrapper.element.style.display).toEqual('')

    wrapper.destroy()
  })

  it('should respond to accodrion events', async () => {
    const wrapper = mount(Collapse, {
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
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // visible state
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
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(2) // the event we just emitted
    expect(rootWrapper.emitted(EVENT_ACCORDION)[1][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[1][1]).toBe('bar')
    expect(wrapper.element.style.display).toEqual('')

    // Should respond to accordion events
    wrapper.vm.$root.$emit(EVENT_ACCORDION, 'nottest', 'foo')
    await wrapper.vm.$nextTick()
    await waitAF()

    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toBe(false)
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(2)
    expect(rootWrapper.emitted(EVENT_STATE)[1][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[1][1]).toBe(false) // visible state
    expect(rootWrapper.emitted(EVENT_ACCORDION).length).toBe(3) // the event we just emitted
    expect(rootWrapper.emitted(EVENT_ACCORDION)[2][0]).toBe('test')
    expect(rootWrapper.emitted(EVENT_ACCORDION)[2][1]).toBe('foo')
    expect(wrapper.element.style.display).toEqual('none')

    wrapper.destroy()
  })
})
