import { mount } from '@vue/test-utils'
import { BDropdownText } from './dropdown-text'

describe('dropdown-text', () => {
  it('renders with tag "p" by default', async () => {
    const wrapper = mount(BDropdownText)

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('p')
    expect(text.element.tagName).toBe('P')

    wrapper.unmount()
  })

  it('has custom class "b-dropdown-text"', async () => {
    const wrapper = mount(BDropdownText)

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('p')
    expect(text.classes()).toContain('b-dropdown-text')

    wrapper.unmount()
  })

  it('renders with tag "div" when tag=div', async () => {
    const wrapper = mount(BDropdownText, {
      props: { tag: 'div' }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('div')
    expect(text.element.tagName).toBe('DIV')
    expect(text.classes()).toContain('b-dropdown-text')

    wrapper.unmount()
  })

  it('adds classes from `text-class` prop to child', async () => {
    const wrapper = mount(BDropdownText, {
      props: { textClass: 'some-custom-class' }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const text = wrapper.find('p')
    expect(text.element.tagName).toBe('P')
    expect(text.classes()).toContain('b-dropdown-text')
    expect(text.classes()).toContain('some-custom-class')

    wrapper.unmount()
  })
})
