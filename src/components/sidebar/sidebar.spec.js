import { mount, createWrapper } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BSidebar } from './sidebar'

const EVENT_TOGGLE = 'bv::toggle::collapse'
const EVENT_STATE = 'bv::collapse::state'
const EVENT_STATE_SYNC = 'bv::collapse::sync::state'
const EVENT_STATE_REQUEST = 'bv::request::collapse::state'

describe('sidebar', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-1',
        show: true
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test-1')
    expect(wrapper.classes()).toContain('b-sidebar')
    expect(wrapper.classes()).not.toContain('b-sidebar-right')
    // `show` and `slide` class only added during transition
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('slide')
    expect(wrapper.text()).toEqual('')
    // Check for no presense of `display: none' from v-show
    expect(wrapper.isVisible()).toBe(true)

    wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    // Check for no presense of `display: none' from v-show
    expect(wrapper.isVisible()).toBe(false)

    wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    // Check for no presense of `display: none' from v-show
    expect(wrapper.isVisible()).toBe(true)

    wrapper.destroy()
  })

  it('shows and hides in response to v-b-toggle events', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-toggle'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-toggle')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-toggle')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'foobar')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.destroy()
  })

  it('closes when ESC key is pressed', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-esc'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.trigger('keydown.esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.setProps({
      noCloseOnEsc: true
    })
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.trigger('keydown.esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.destroy()
  })

  it('handles state sync requests', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test-sync',
        show: true
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test-sync') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).not.toBeDefined()

    rootWrapper.vm.$root.$emit(EVENT_STATE_REQUEST, 'test-sync')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[0][0]).toBe('test-sync') // ID
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[0][1]).toBe(true) // Visible state

    wrapper.destroy()
  })

  it('should have expected structure when `no-header` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-2',
        show: true,
        noHeader: true
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)

    // TBD

    wrapper.destroy()
  })

  it('should have expected structure when `lazy` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-3',
        show: false,
        lazy: true
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)

    // TBD

    wrapper.destroy()
  })

  it('should have expected structure when `footer` slot provided', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-4',
        show: true
      },
      slots: {
        footer: '<span>FOOTER</span>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)

    // TBD

    wrapper.destroy()
  })
})
