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
        visible: true
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)

    const $backdrop = wrapper.find('.b-sidebar-backdrop')
    expect($backdrop.exists()).toBe(false)

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.attributes('id')).toBeDefined()
    expect($sidebar.attributes('id')).toEqual('test-1')
    expect($sidebar.classes()).toContain('b-sidebar')
    expect($sidebar.classes()).not.toContain('b-sidebar-right')
    // `show` and `slide` class only added during transition
    expect($sidebar.classes()).not.toContain('show')
    expect($sidebar.classes()).not.toContain('slide')
    expect($sidebar.text()).toEqual('')
    // Check for no presence of `display: none' from `v-show` directive
    expect($sidebar.isVisible()).toBe(true)

    expect($sidebar.find('.b-sidebar-header').exists()).toBe(true)
    expect($sidebar.find('.b-sidebar-body').exists()).toBe(true)
    expect($sidebar.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.setProps({
      visible: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)

    // Check for no presence of `display: none' from `v-show` directive
    expect($sidebar.isVisible()).toBe(false)

    wrapper.setProps({
      visible: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    // Check for no presence of `display: none' from `v-show` directive
    expect($sidebar.isVisible()).toBe(true)

    wrapper.destroy()
  })

  it('shows backdrop when prop `backdrop` is true', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-backdrop',
        noCloseOnBackdrop: true,
        visible: true,
        backdrop: true
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)
    const $backdrop = wrapper.find('.b-sidebar-backdrop')
    expect($backdrop.exists()).toBe(true)

    $backdrop.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.isVisible()).toBe(true)
    expect($backdrop.isVisible()).toBe(true)

    wrapper.setProps({
      noCloseOnBackdrop: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.isVisible()).toBe(true)
    expect($backdrop.isVisible()).toBe(true)

    $backdrop.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.isVisible()).toBe(false)
    expect($backdrop.isVisible()).toBe(false)

    wrapper.destroy()
  })

  it('shows and hides in response to v-b-toggle events', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-toggle'
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(false)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-toggle')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(true)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-toggle')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(false)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'foobar')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(false)

    wrapper.destroy()
  })

  it('closes when ESC key is pressed', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-esc'
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(false)

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(true)

    wrapper.trigger('keydown.esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(false)

    wrapper.setProps({
      noCloseOnEsc: true
    })
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(true)

    wrapper.trigger('keydown.esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($sidebar.is('div')).toBe(true)
    expect($sidebar.isVisible()).toBe(true)

    wrapper.destroy()
  })

  it('handles state sync requests', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-sync',
        visible: true
      },
      stubs: {
        // Disable use of default test `transitionStub` component
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
        visible: true,
        noHeader: true
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(false)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should have expected structure when `no-header-close` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-3',
        visible: true,
        noHeaderClose: true
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-header .close').exists()).toBe(false)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should have expected structure when `lazy` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-4',
        visible: false,
        lazy: true
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(false)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.setProps({
      visible: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should have expected structure when `footer` slot provided', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-5',
        visible: true
      },
      slots: {
        footer: '<span>FOOTER</span>'
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').text()).toEqual('FOOTER')

    wrapper.destroy()
  })

  it('should have expected structure when `title` prop provided', async () => {
    const wrapper = mount(BSidebar, {
      attachToDocument: true,
      propsData: {
        id: 'test-title',
        visible: true,
        title: 'TITLE'
      },
      stubs: {
        // Disable use of default test `transitionStub` component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-header > strong').text()).toEqual('TITLE')
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })
})
