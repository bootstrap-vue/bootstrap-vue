import { loadFixture, testVM, nextTick } from '../../../tests/utils'
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
    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(true)
    expect(rootWrapper.emitted(EVENT_ACCORDION)).not.toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test') // id
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // visible state

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

    wrapper.destroy()
  })
})

describe('collapse (legacy)', () => {
  beforeEach(loadFixture(__dirname, 'collapse'))
  testVM()

  it('Accordion example should have appropriate CSS "display"', async () => {
    const {
      app: { $refs }
    } = window

    expect($refs.accordion_1.$el.style.display).toBe('')
    expect($refs.accordion_2.$el.style.display).toBe('none')
    expect($refs.accordion_3.$el.style.display).toBe('none')
  })

  it('accordion example should change visibility on click', async () => {
    const {
      app: { $refs }
    } = window
    const btn1 = $refs.accordion_1_btn
    const col1 = $refs.accordion_1
    const btn2 = $refs.accordion_2_btn
    const col2 = $refs.accordion_2
    const btn3 = $refs.accordion_3_btn
    const col3 = $refs.accordion_3

    expect(btn1.getAttribute('aria-expanded')).toBe('true')
    expect(btn2.getAttribute('aria-expanded')).toBe('false')
    expect(btn3.getAttribute('aria-expanded')).toBe('false')

    expect(col1.show).toBe(true)
    expect(col2.show).toBe(false)
    expect(col3.show).toBe(false)

    btn2.click()
    await nextTick()

    expect(btn1.getAttribute('aria-expanded')).toBe('false')
    expect(btn2.getAttribute('aria-expanded')).toBe('true')
    expect(btn3.getAttribute('aria-expanded')).toBe('false')

    expect(col1.show).toBe(false)
    expect(col2.show).toBe(true)
    expect(col3.show).toBe(false)

    btn2.click()
    await nextTick()

    expect(btn1.getAttribute('aria-expanded')).toBe('false')
    expect(btn2.getAttribute('aria-expanded')).toBe('false')
    expect(btn3.getAttribute('aria-expanded')).toBe('false')

    expect(col1.show).toBe(false)
    expect(col2.show).toBe(false)
    expect(col3.show).toBe(false)
  })
})
