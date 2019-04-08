import BDropdownDivider from './dropdown-divider'
import { mount } from '@vue/test-utils'

describe('dropdown > dropdown-divider', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownDivider)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-divider')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('separator')
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BDropdownDivider, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-divider')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('separator')
    expect(wrapper.text()).toEqual('')
  })

  it('does not render default slot content', async () => {
    const wrapper = mount(BDropdownDivider, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-divider')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('separator')
    expect(wrapper.text()).toEqual('')
  })
})
