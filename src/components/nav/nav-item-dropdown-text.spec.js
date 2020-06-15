import { mount } from '@vue/test-utils'
import { BNavItemDropdownText } from './nav-item-dropdown-text'

describe('nav-item-dropdown-text', () => {
  it('has root element "a"', async () => {
    const wrapper = mount(BNavItemDropdownText)

    expect(wrapper.element.tagName).toBe('A')

    wrapper.destroy()
  })

  it('has class nav-link', async () => {
    const wrapper = mount(BNavItemDropdownText)

    expect(wrapper.classes()).toContain('nav-link')

    wrapper.destroy()
  })

  it('has custom root element "li" when prop text-tag=div', async () => {
    const wrapper = mount(BNavItemDropdownText, {
      context: {
        props: {
          textTag: 'li'
        }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('nav-link')

    wrapper.destroy()
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BNavItemDropdownText, {
      context: {
        class: ['foobar']
      }
    })

    expect(wrapper.classes()).toContain('nav-link')
    expect(wrapper.classes()).toContain('foobar')

    wrapper.destroy()
  })
})
