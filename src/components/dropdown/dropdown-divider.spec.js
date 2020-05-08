import { mount } from '@vue/test-utils'
import { BDropdownDivider } from './dropdown-divider'

describe('dropdown > dropdown-divider', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownDivider)

    expect(wrapper.element.tagName).toBe('LI')

    const divider = wrapper.find('hr')
    expect(divider.element.tagName).toBe('HR')
    expect(divider.classes()).toContain('dropdown-divider')
    expect(divider.classes().length).toBe(1)
    expect(divider.attributes('role')).toBeDefined()
    expect(divider.attributes('role')).toEqual('separator')
    expect(divider.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BDropdownDivider, {
      context: {
        props: { tag: 'span' }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const divider = wrapper.find('span')
    expect(divider.element.tagName).toBe('SPAN')
    expect(divider.classes()).toContain('dropdown-divider')
    expect(divider.classes().length).toBe(1)
    expect(divider.attributes('role')).toBeDefined()
    expect(divider.attributes('role')).toEqual('separator')
    expect(divider.text()).toEqual('')

    wrapper.destroy()
  })

  it('does not render default slot content', async () => {
    const wrapper = mount(BDropdownDivider, {
      slots: { default: 'foobar' }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const divider = wrapper.find('hr')
    expect(divider.element.tagName).toBe('HR')
    expect(divider.classes()).toContain('dropdown-divider')
    expect(divider.classes().length).toBe(1)
    expect(divider.attributes('role')).toBeDefined()
    expect(divider.attributes('role')).toEqual('separator')
    expect(divider.text()).toEqual('')

    wrapper.destroy()
  })
})
