import { mount } from '@vue/test-utils'
import { BBreadcrumbLink } from './breadcrumb-link'

describe('breadcrumb-link', () => {
  it('has default classes and structure', async () => {
    const wrapper = mount(BBreadcrumbLink)

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('#')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('aria-current')).toBeUndefined()
    expect(wrapper.text()).toBe('')

    wrapper.destroy()
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has content from text prop', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      propsData: {
        text: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has content from html prop', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      propsData: {
        html: 'foobar'
      }
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has attribute aria-current when active', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.attributes('aria-current')).toBe('location')
    expect(wrapper.classes().length).toBe(0)

    wrapper.destroy()
  })

  it('has attribute aria-current with custom value when active', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      propsData: {
        active: true,
        ariaCurrent: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.attributes('aria-current')).toBe('foobar')
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)

    wrapper.destroy()
  })

  it('renders link when href is set', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      propsData: {
        href: '/foo/bar'
      }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.attributes('aria-current')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)

    wrapper.destroy()
  })

  it('does not render a link when href is set and active', async () => {
    const wrapper = mount(BBreadcrumbLink, {
      propsData: {
        active: true,
        href: '/foo/bar'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.attributes('aria-current')).toBeDefined()
    expect(wrapper.attributes('aria-current')).toBe('location')
    expect(wrapper.classes().length).toBe(0)

    wrapper.destroy()
  })
})
