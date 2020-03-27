import { mount /* , createWrapper, createLocalVue as CreateLocalVue */ } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BSidebar } from './sidebar'

// Events sidebar listens to on $root
const EVENT_TOGGLE = 'bv::toggle::collapse'

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
