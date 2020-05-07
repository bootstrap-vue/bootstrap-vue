import { mount } from '@vue/test-utils'
import { BDropdownText } from './dropdown-text'

describe('dropdown-text', () => {
  it('renders with tag "p" by default', async () => {
    const wrapper = mount(BDropdownText)

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('p')
    expect(text.element.tagName).toBe('P')

    wrapper.destroy()
  })

  it('has custom class "b-dropdown-text"', async () => {
    const wrapper = mount(BDropdownText)

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('p')
    expect(text.classes()).toContain('b-dropdown-text')

    wrapper.destroy()
  })

  it('renders with tag "div" when tag=div', async () => {
    const wrapper = mount(BDropdownText, {
      context: {
        props: { tag: 'div' }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('div')
    expect(text.element.tagName).toBe('DIV')
    expect(text.classes()).toContain('b-dropdown-text')

    wrapper.destroy()
  })
})
