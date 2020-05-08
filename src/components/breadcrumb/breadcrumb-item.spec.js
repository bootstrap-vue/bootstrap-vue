import { mount } from '@vue/test-utils'
import { BBreadcrumbItem } from './breadcrumb-item'

describe('breadcrumb-item', () => {
  it('has default classes and structure', async () => {
    const wrapper = mount(BBreadcrumbItem)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('has class active when prop active is set', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has link as child', async () => {
    const wrapper = mount(BBreadcrumbItem)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('has link as child and href', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      propsData: {
        href: '/foo/bar'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('/foo/bar')

    wrapper.destroy()
  })

  it('has child span and class active when prop active is set', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.find('span').exists()).toBe(true)

    wrapper.destroy()
  })

  it('has child text content from prop text', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      propsData: {
        active: true,
        text: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has child text content from prop html', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      propsData: {
        active: true,
        html: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has child text content from default slot', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      propsData: {
        active: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })
})
