import NavItem from './nav-item'
import Link from '../link/link'
import { mount } from '@vue/test-utils'

describe('nav-item', async () => {
  it('has expected default structure', async () => {
    const wrapper = mount(NavItem)
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('nav-item')
    expect(wrapper.classes().length).toBe(1)

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.is('a')).toBe(true)
    expect(link.is(Link)).toBe(true)
    expect(link.classes()).toContain('nav-link')
    expect(link.classes().length).toBe(1)
    expect(link.attributes('href')).toBeDefined()
    expect(link.attributes('href')).toBe('#')
    expect(link.attributes('role')).not.toBeDefined()
  })

  it('has role on link when link-role set', async () => {
    const wrapper = mount(NavItem, {
      context: {
        propsData: { role: 'tab'}
      }
    })
    expect(wrapper.attribute('role')).not.toBeDefined()
    const link = wrapper.find('a')
    expect(link.attributes('role')).toBeDefined()
    expect(link.attributes('role')).toBe('tab')
  })

  it('has class "disabled" on link when disabled set', async () => {
    const wrapper = mount(NavItem, {
      context: {
        propsData: { disabled: true}
      }
    })
    const link = wrapper.find('a')
    expect(link.classes()).toContain('disabled')
  })

  it('emits click event when clicked', async () => {
    const spy = jest.fn()
    const wrapper = mount(NavItem, {
      context: {
        on: { click: spy }
      }
    })
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const link = wrapper.find('a')
    link.trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('does not emit a click event when clicked and disabled', async () => {
    const spy = jest.fn()
    const wrapper = mount(NavItem, {
      context: {
        propsData: { disabled: true },
        on: { click: spy }
      }
    })
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const link = wrapper.find('a')
    link.trigger('click')
    expect(spy).not.toHaveBeenCalled()
  })
})
