import { createWrapper, mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BSidebar } from './sidebar'

const EVENT_TOGGLE = 'bv::toggle::collapse'
const EVENT_STATE = 'bv::collapse::state'
const EVENT_STATE_SYNC = 'bv::collapse::sync::state'
const EVENT_STATE_REQUEST = 'bv::request::collapse::state'

describe('sidebar', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-1',
        visible: true
      }
    })

    expect(wrapper.vm).toBeDefined()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)

    const $backdrop = wrapper.find('.b-sidebar-backdrop')
    expect($backdrop.exists()).toBe(false)

    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.attributes('id')).toBeDefined()
    expect($sidebar.attributes('id')).toEqual('test-1')
    expect($sidebar.classes()).toContain('b-sidebar')
    expect($sidebar.classes()).not.toContain('b-sidebar-right')
    // `show` and `slide` class only added during transition
    expect($sidebar.classes()).not.toContain('show')
    expect($sidebar.classes()).not.toContain('slide')
    expect($sidebar.text()).toEqual('')
    // Check for no presence of `display: none' from `v-show` directive
    expect($sidebar.element).toBeVisible()

    expect($sidebar.find('.b-sidebar-header').exists()).toBe(true)
    expect($sidebar.find('.b-sidebar-body').exists()).toBe(true)
    expect($sidebar.find('.b-sidebar-footer').exists()).toBe(false)

    await wrapper.setProps({ visible: false })
    await waitRAF()
    await waitRAF()
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    // Check for no presence of `display: none' from `v-show` directive
    expect($sidebar.element).not.toBeVisible()

    await wrapper.setProps({ visible: true })
    await waitRAF()
    await waitRAF()
    expect(wrapper.element.tagName).toBe('DIV')
    // Check for no presence of `display: none' from `v-show` directive
    expect($sidebar.element).toBeVisible()

    wrapper.destroy()
  })

  it('shows backdrop when prop `backdrop` is `true`', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-backdrop',
        noCloseOnBackdrop: true,
        visible: true,
        backdrop: true
      }
    })

    expect(wrapper.vm).toBeDefined()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)

    const $backdrop = wrapper.find('.b-sidebar-backdrop')
    expect($backdrop.exists()).toBe(true)
    expect($backdrop.classes()).toContain('bg-dark')

    await $backdrop.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element).toBeVisible()
    expect($backdrop.element).toBeVisible()

    await wrapper.setProps({ noCloseOnBackdrop: false })
    await waitRAF()
    await waitRAF()
    expect($sidebar.element).toBeVisible()
    expect($backdrop.element).toBeVisible()

    await $backdrop.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element).not.toBeVisible()
    expect($backdrop.element).not.toBeVisible()

    wrapper.destroy()
  })

  it('applies "bg-*" class to backdrop based on `backdrop-variant` prop', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-backdrop',
        noCloseOnBackdrop: true,
        visible: true,
        backdrop: true,
        backdropVariant: 'transparent'
      }
    })

    expect(wrapper.vm).toBeDefined()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)

    const $backdrop = wrapper.find('.b-sidebar-backdrop')
    expect($backdrop.exists()).toBe(true)
    expect($backdrop.classes()).toContain('bg-transparent')

    await $backdrop.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element).toBeVisible()
    expect($backdrop.element).toBeVisible()

    await wrapper.setProps({ noCloseOnBackdrop: false })
    await waitRAF()
    await waitRAF()
    expect($sidebar.element).toBeVisible()
    expect($backdrop.element).toBeVisible()

    await $backdrop.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element).not.toBeVisible()
    expect($backdrop.element).not.toBeVisible()

    wrapper.destroy()
  })

  it('shows and hides in response to v-b-toggle events', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-toggle'
      }
    })

    expect(wrapper.vm).toBeDefined()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).not.toBeVisible()

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-toggle')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).toBeVisible()

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-toggle')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).not.toBeVisible()

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'foobar')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).not.toBeVisible()

    wrapper.destroy()
  })

  it('closes when ESC key is pressed', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-esc'
      }
    })

    expect(wrapper.vm).toBeDefined()

    const $sidebar = wrapper.find('.b-sidebar')
    expect($sidebar.exists()).toBe(true)
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).not.toBeVisible()

    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).toBeVisible()

    await wrapper.trigger('keydown.esc')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).not.toBeVisible()

    await wrapper.setProps({ noCloseOnEsc: true })
    wrapper.vm.$root.$emit(EVENT_TOGGLE, 'test-esc')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).toBeVisible()

    await wrapper.trigger('keydown.esc')
    await waitRAF()
    await waitRAF()
    expect($sidebar.element.tagName).toBe('DIV')
    expect($sidebar.element).toBeVisible()

    wrapper.destroy()
  })

  it('handles state sync requests', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-sync',
        visible: true
      }
    })

    expect(wrapper.vm).toBeDefined()

    const rootWrapper = createWrapper(wrapper.vm.$root)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitRAF()
    expect(rootWrapper.emitted(EVENT_STATE)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE)[0][0]).toBe('test-sync') // ID
    expect(rootWrapper.emitted(EVENT_STATE)[0][1]).toBe(true) // Visible state
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).not.toBeDefined()

    rootWrapper.vm.$root.$emit(EVENT_STATE_REQUEST, 'test-sync')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitRAF()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)).toBeDefined()
    expect(rootWrapper.emitted(EVENT_STATE_SYNC).length).toBe(1)
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[0][0]).toBe('test-sync') // ID
    expect(rootWrapper.emitted(EVENT_STATE_SYNC)[0][1]).toBe(true) // Visible state

    wrapper.destroy()
  })

  it('should have expected structure when `no-header` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-2',
        visible: true,
        noHeader: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(false)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should have expected structure when `no-header-close` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-3',
        visible: true,
        noHeaderClose: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-header .close').exists()).toBe(false)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should have expected structure when `lazy` is set', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-4',
        visible: false,
        lazy: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(false)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    await wrapper.setProps({ visible: true })
    await waitRAF()
    await waitRAF()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should have expected structure when `footer` slot provided', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-5',
        visible: true
      },
      slots: {
        footer: '<span>FOOTER</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').text()).toEqual('FOOTER')

    wrapper.destroy()
  })

  it('should have expected structure when `title` prop provided', async () => {
    const wrapper = mount(BSidebar, {
      attachTo: createContainer(),
      propsData: {
        id: 'test-title',
        visible: true,
        title: 'TITLE'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-header > strong').text()).toEqual('TITLE')
    expect(wrapper.find('.b-sidebar-body').exists()).toBe(true)
    expect(wrapper.find('.b-sidebar-footer').exists()).toBe(false)

    wrapper.destroy()
  })
})
