import { mount } from '@vue/test-utils'
import BDropdownText from './dropdown-text'

describe('dropdown-text', () => {
  it('renders with tag "p" by default', async () => {
    const wrapper = mount(BDropdownText)
    expect(wrapper.is('li')).toBe(true)

    const text = wrapper.find('p')
    expect(text.is('p')).toBe(true)
  })

  it('has custom class "b-dropdown-text"', async () => {
    const wrapper = mount(BDropdownText)
    expect(wrapper.is('li')).toBe(true)

    const text = wrapper.find('p')
    expect(text.classes()).toContain('b-dropdown-text')
  })

  it('renders with tag "div" when tag=div', async () => {
    const wrapper = mount(BDropdownText, {
      context: {
        props: { tag: 'div' }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const text = wrapper.find('div')
    expect(text.is('div')).toBe(true)
    expect(text.classes()).toContain('b-dropdown-text')
  })
})
