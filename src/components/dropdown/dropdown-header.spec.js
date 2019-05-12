import { mount } from '@vue/test-utils'
import BDropdownHeader from './dropdown-header'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownHeader)
    expect(wrapper.is('li')).toBe(true)

    const header = wrapper.find('header')
    expect(header.is('header')).toBe(true)
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).not.toBeDefined()
    expect(header.text()).toEqual('')
  })

  it('renders custom header element when prop tag set', async () => {
    const wrapper = mount(BDropdownHeader, {
      context: {
        props: { tag: 'h2' }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const header = wrapper.find('h2')
    expect(header.is('h2')).toBe(true)
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).not.toBeDefined()
    expect(header.text()).toEqual('')
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownHeader, {
      context: {
        props: { id: 'foo' }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const header = wrapper.find('header')
    expect(header.is('header')).toBe(true)
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).toBeDefined()
    expect(header.attributes('id')).toEqual('foo')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownHeader, {
      slots: { default: 'foobar' }
    })
    expect(wrapper.is('li')).toBe(true)

    const header = wrapper.find('header')
    expect(header.is('header')).toBe(true)
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.text()).toEqual('foobar')
  })
})
