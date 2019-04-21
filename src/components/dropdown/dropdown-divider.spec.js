import { mount } from '@vue/test-utils'
import BDropdownDivider from './dropdown-divider'

describe('dropdown > dropdown-divider', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownDivider)
    expect(wrapper.is('li')).toBe(true)

    const divider = wrapper.find('hr')
    expect(divider.is('hr')).toBe(true)
    expect(divider.classes()).toContain('dropdown-divider')
    expect(divider.classes().length).toBe(1)
    expect(divider.attributes('role')).toBeDefined()
    expect(divider.attributes('role')).toEqual('separator')
    expect(divider.text()).toEqual('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BDropdownDivider, {
      context: {
        props: { tag: 'span' }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const divider = wrapper.find('span')
    expect(divider.is('span')).toBe(true)
    expect(divider.classes()).toContain('dropdown-divider')
    expect(divider.classes().length).toBe(1)
    expect(divider.attributes('role')).toBeDefined()
    expect(divider.attributes('role')).toEqual('separator')
    expect(divider.text()).toEqual('')
  })

  it('does not render default slot content', async () => {
    const wrapper = mount(BDropdownDivider, {
      slots: { default: 'foobar' }
    })
    expect(wrapper.is('li')).toBe(true)

    const divider = wrapper.find('hr')
    expect(divider.is('hr')).toBe(true)
    expect(divider.classes()).toContain('dropdown-divider')
    expect(divider.classes().length).toBe(1)
    expect(divider.attributes('role')).toBeDefined()
    expect(divider.attributes('role')).toEqual('separator')
    expect(divider.text()).toEqual('')
  })
})
