import { mount } from '@vue/test-utils'
import { BDropdownGroup } from './dropdown-group'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownGroup)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes().length).toBe(0)

    const header = wrapper.find('header')
    expect(header.exists()).toBe(false)

    const ul = wrapper.find('ul')
    expect(ul).toBeDefined()
    expect(ul.element.tagName).toBe('UL')
    expect(ul.classes()).toContain('list-unstyled')
    expect(ul.classes().length).toBe(1)
    expect(ul.attributes('id')).toBeUndefined()

    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders header element when prop header set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: { header: 'foobar' }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).toBeUndefined()
    expect(header.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('renders custom header element when prop header-tag set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: {
          header: 'foobar',
          headerTag: 'h6'
        }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('.dropdown-header')
    expect(header.element.tagName).toBe('H6')
    expect(header.classes().length).toBe(1)
    expect(header.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: { id: 'foo' }
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const ul = wrapper.find('ul')
    expect(ul.attributes('id')).toBeDefined()
    expect(ul.attributes('id')).toEqual('foo')

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownGroup, {
      slots: { default: '<li>foobar</li>' }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const ul = wrapper.find('ul')
    expect(ul.element.tagName).toBe('UL')
    expect(ul.text()).toEqual('foobar')

    wrapper.destroy()
  })
})
