import { mount } from '@vue/test-utils'
import { BDropdownHeader } from './dropdown-header'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownHeader)

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).toBeUndefined()
    expect(header.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders custom header element when prop tag set', async () => {
    const wrapper = mount(BDropdownHeader, {
      context: {
        props: { tag: 'h2' }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('h2')
    expect(header.element.tagName).toBe('H2')
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).toBeUndefined()
    expect(header.text()).toEqual('')

    wrapper.destroy()
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownHeader, {
      context: {
        props: { id: 'foo' }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).toBeDefined()
    expect(header.attributes('id')).toEqual('foo')

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownHeader, {
      slots: { default: 'foobar' }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.text()).toEqual('foobar')

    wrapper.destroy()
  })
})
