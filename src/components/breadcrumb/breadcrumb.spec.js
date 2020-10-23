import { mount } from '@vue/test-utils'
import { BBreadcrumb } from './breadcrumb'

describe('breadcrumb', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BBreadcrumb)

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('should render default slot when no items provided', async () => {
    const wrapper = mount(BBreadcrumb, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('should accept items', () => {
    const wrapper = mount(BBreadcrumb, {
      props: {
        items: [
          { text: 'Home', href: '/' },
          { text: 'Admin', to: '/admin', active: false },
          { html: '<b>Manage</b>', href: '/admin/manage' },
          // Test with non object
          'Library'
        ]
      }
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('li').length).toBe(4)
    expect(wrapper.findAll('li.breadcrumb-item').length).toBe(4)
    const $lis = wrapper.findAll('li')

    // HREF testing
    expect($lis[0].find('a').exists()).toBe(true)
    expect($lis[0].find('a').attributes('href')).toBe('/')
    expect($lis[0].text()).toBe('Home')

    expect($lis[1].find('a').exists()).toBe(true)
    expect($lis[1].find('a').attributes('href')).toBe('/admin')
    expect($lis[1].text()).toBe('Admin')

    expect($lis[2].find('a').exists()).toBe(true)
    expect($lis[2].find('a').attributes('href')).toBe('/admin/manage')
    expect($lis[2].text()).toBe('Manage')

    // Last item should have active state
    expect($lis[3].classes()).toContain('active')
    expect($lis[3].find('span').exists()).toBe(true)
    expect($lis[3].text()).toBe('Library')

    wrapper.unmount()
  })

  it('should apply active class to active item', async () => {
    const wrapper = mount(BBreadcrumb, {
      props: {
        items: [
          { text: 'Home', href: '/' },
          { text: 'Admin', to: '/admin', active: true },
          { html: '<b>Manage</b>', href: '/admin/manage' },
          { text: 'Library', href: '/admin/manage/library' }
        ]
      }
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('li').length).toBe(4)
    expect(wrapper.findAll('li.breadcrumb-item').length).toBe(4)
    const $lis = wrapper.findAll('li')

    // HREF testing
    expect($lis[0].find('a').exists()).toBe(true)
    expect($lis[0].find('a').attributes('href')).toBe('/')
    expect($lis[0].text()).toBe('Home')

    // This one should be a span/active
    expect($lis[1].find('span').exists()).toBe(true)
    expect($lis[1].classes()).toContain('active')
    expect($lis[1].text()).toBe('Admin')

    expect($lis[2].find('a').exists()).toBe(true)
    expect($lis[2].find('a').attributes('href')).toBe('/admin/manage')
    expect($lis[2].text()).toBe('Manage')

    // Last item should have active state
    expect($lis[3].classes()).not.toContain('active')
    expect($lis[3].find('a').exists()).toBe(true)
    expect($lis[3].find('a').attributes('href')).toBe('/admin/manage/library')
    expect($lis[3].text()).toBe('Library')

    wrapper.unmount()
  })
})
