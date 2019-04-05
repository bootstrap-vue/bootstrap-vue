import BDropdownHeader from './dropdown-header'
import { mount } from '@vue/test-utils'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownHeader)

    expect(wrapper.is('h6')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-header')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BDropdownHeader, {
      propsData: {
        tag: 'h2'
      }
    })

    expect(wrapper.is('h2')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-header')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownHeader, {
      propsData: {
        id: 'foo'
      }
    })

    expect(wrapper.is('h6')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-header')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownHeader, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('h6')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown-header')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })
})
