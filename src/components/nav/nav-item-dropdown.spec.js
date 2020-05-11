import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BNavItemDropdown } from './nav-item-dropdown'

describe('nav-item-dropdown', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle'
      }
    })

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
    expect($toggle.attributes('href')).toEqual(`#${$toggle.attributes('id')}`)
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link')

    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.element.tagName).toBe('UL')
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toEqual($toggle.attributes('id'))
    expect($menu.classes()).toContain('dropdown-menu')

    wrapper.destroy()
  })

  it('should flag that we are in a nav', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.isNav).toBe(true)

    wrapper.destroy()
  })

  it('should have custom toggle class in nav-item-dropdown', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle',
        toggleClass: 'nav-link-custom'
      }
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.element.tagName).toBe('A')
    expect($toggle.attributes('href')).toEqual(`#${$toggle.attributes('id')}`)
    expect($toggle.classes()).toContain('nav-link')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link-custom')

    wrapper.destroy()
  })

  it('should be disabled when disabled prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle',
        disabled: true
      }
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.element.tagName).toBe('A')
    expect($toggle.attributes('role')).toEqual('button')
    expect($toggle.attributes('href')).toEqual(`#${$toggle.attributes('id')}`)
    expect($toggle.classes()).toContain('nav-link')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('disabled')
    expect($toggle.attributes('aria-disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('should prevent click when custom href is set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle',
        href: '/foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.element.tagName).toBe('A')
    expect($toggle.attributes('href')).toEqual('/foobar')
    expect($toggle.classes()).toContain('nav-link')
    expect($toggle.classes()).toContain('dropdown-toggle')

    await $toggle.trigger('click')
    expect(wrapper.emitted('toggle')).toBeDefined()
    expect(wrapper.emitted('toggle').length).toBe(1)
    expect(wrapper.emitted('toggle')[0]).toBeDefined()
    expect(wrapper.emitted('toggle')[0][0].defaultPrevented).toBe(true)

    wrapper.destroy()
  })
})
