import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BNavItemDropdown } from './nav-item-dropdown'

describe('nav-item-dropdown', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavItemDropdown)

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.element.hasAttribute('id')).toBe(true)
    expect(wrapper.classes()).toContain('nav-item')
    expect(wrapper.classes()).toContain('b-nav-dropdown')
    expect(wrapper.classes()).toContain('dropdown')

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.element.tagName).toBe('A')
    expect($toggle.element.hasAttribute('id')).toBe(true)
    expect($toggle.attributes('role')).toEqual('button')
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($toggle.attributes('href')).toEqual('#')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link')

    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.element.tagName).toBe('UL')
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toEqual($toggle.attributes('id'))
    expect($menu.classes()).toContain('dropdown-menu')

    wrapper.destroy()
  })

  it('should have a flag that we are in a nav', async () => {
    const wrapper = mount(BNavItemDropdown)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.isNav).toBe(true)

    wrapper.destroy()
  })

  it('should have custom toggle class when "toggle-class" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        toggleClass: 'nav-link-custom'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link-custom')

    wrapper.destroy()
  })

  it('should be disabled when "disabled" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.classes()).toContain('disabled')
    expect($toggle.attributes('aria-disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('should have href with ID when "id" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        id: 'foo'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.hasAttribute('id')).toBe(true)
    expect(wrapper.attributes('id').toEqual('foo')

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.attributes('href')).toEqual('#foo')

    wrapper.destroy()
  })

  it('should open/close on toggle click', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect(wrapper.vm.visible).toBe(false)
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    await $toggle.trigger('click')
    await waitRAF()
    expect(wrapper.vm.visible).toBe(true)
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    await $toggle.trigger('click')
    await waitRAF()
    expect(wrapper.vm.visible).toBe(false)
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    wrapper.destroy()
  })

  it('should prevent toggle click', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')

    await $toggle.trigger('click')
    expect(wrapper.emitted('toggle')).toBeDefined()
    expect(wrapper.emitted('toggle').length).toBe(1)
    expect(wrapper.emitted('toggle')[0]).toBeDefined()
    expect(wrapper.emitted('toggle')[0][0].defaultPrevented).toBe(true)

    wrapper.destroy()
  })
})
