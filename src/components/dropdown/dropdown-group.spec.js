import { mount } from '@vue/test-utils'
import { BDropdownGroup } from './dropdown-group'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownGroup)
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes().length).toBe(0)

    const header = wrapper.find('header')
    expect(header.exists()).toBe(false)

    const ul = wrapper.find('ul')
    expect(ul).toBeDefined()
    expect(ul.is('ul')).toBe(true)
    expect(ul.classes()).toContain('list-unstyled')
    expect(ul.classes().length).toBe(1)
    expect(ul.attributes('id')).not.toBeDefined()

    expect(wrapper.text()).toEqual('')
  })

  it('renders header element when prop header set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: { header: 'foobar' }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const header = wrapper.find('header')
    expect(header.is('header')).toBe(true)
    expect(header.classes()).toContain('dropdown-header')
    expect(header.classes().length).toBe(1)
    expect(header.attributes('id')).not.toBeDefined()
    expect(header.text()).toEqual('foobar')
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
    expect(wrapper.is('li')).toBe(true)

    const header = wrapper.find('.dropdown-header')
    expect(header.is('h6')).toBe(true)
    expect(header.classes().length).toBe(1)
    expect(header.text()).toEqual('foobar')
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: { id: 'foo' }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const ul = wrapper.find('ul')
    expect(ul.attributes('id')).toBeDefined()
    expect(ul.attributes('id')).toEqual('foo')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownGroup, {
      slots: { default: '<li>foobar</li>' }
    })
    expect(wrapper.is('li')).toBe(true)

    const ul = wrapper.find('ul')
    expect(ul.is('ul')).toBe(true)
    expect(ul.text()).toEqual('foobar')
  })
})
