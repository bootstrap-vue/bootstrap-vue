import NavItemDropdown from './nav-item-dropdown'
import { mount } from '@vue/test-utils'

describe('nav-item-dropdown', () => {
  it('should have custom toggle class in nav-item-dropdown', async () => {
    const wrapper = mount(NavItemDropdown, {
      propsData: {
        text: 'toggle',
        extraToggleClasses: 'nav-link-custom'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    const $toggle = wrapper.find('.dropdown-toggle')

    expect($toggle.classes()).toContain('nav-link')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link-custom')

    wrapper.destroy()
  })
})
