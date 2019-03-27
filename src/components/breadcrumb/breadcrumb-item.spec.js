import BreadcrumbLink from './breadcrumb-item'
import { mount } from '@vue/test-utils'

describe('breadcrumb-item', () => {
  it('has default classes and structure', async () => {
    const wrapper = mount(BreadcrumbItem)
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it('has class active when prop active is set', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true
      }
    })
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it('has link as child', async () => {
    const wrapper = mount(BreadcrumbItem)
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attriutes('href')).toBe('#')
  })

  it('has link as child and href', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        link: '/foo/bar'
      }
    })
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attriutes('href')).toBe('/foo/bar')
  })

  it('has child span with class active when prop active is set', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true
      }
    })
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').classes()).toContain('active')
  })

  it('has child text content from prop text', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
        text: 'foobar'
      }
    })
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')
  })

  it('has child text content from prop html', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
        html: 'foobar'
      }
    })
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')
  })

  it('has child text content from default slot', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')
  })
})
