import { mount } from '@vue/test-utils'
import { BNavItemDropdown } from './nav-item-dropdown'

describe('nav-item-dropdown', () => {
  it('should have custom toggle class in nav-item-dropdown', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle',
        toggleClass: 'nav-link-custom'
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    const $toggle = wrapper.find('.dropdown-toggle')

    expect($toggle.classes()).toContain('nav-link')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link-custom')

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

  it('should be disabled when disabled prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle',
        disabled: true
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.element.tagName).toBe('A')

    expect($toggle.attributes('aria-disabled')).toBeDefined()
    expect($toggle.attributes('href')).toEqual('#')
    expect($toggle.classes()).toContain('disabled')
    expect($toggle.classes()).toContain('nav-link')
    expect($toggle.classes()).toContain('dropdown-toggle')

    wrapper.destroy()
  })
})
