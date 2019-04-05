import BNavItem from './nav-item'
import BLink from '../link/link'
import { mount } from '@vue/test-utils'

describe('nav-item', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavItem)
    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('nav-item')
    expect(wrapper.classes().length).toBe(1)

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.is('a')).toBe(true)
    expect(link.is(BLink)).toBe(true)
    expect(link.classes()).toContain('nav-link')
    expect(link.classes().length).toBe(1)
    expect(link.attributes('href')).toBeDefined()
    expect(link.attributes('href')).toBe('#')
    expect(link.attributes('role')).not.toBeDefined()
  })

  it('has attrs on link when link-attrs set', async () => {
    const wrapper = mount(BNavItem, {
      context: {
        props: {
          linkAttrs: { role: 'tab' }
        }
      }
    })
    expect(wrapper.attributes('role')).not.toBeDefined()
    const link = wrapper.find(BLink)
    expect(link).toBeDefined()
    expect(link.attributes('role')).toBeDefined()
    expect(link.attributes('role')).toBe('tab')
  })

  it('has custom classes on link when link-classes set', async () => {
    const wrapper = mount(BNavItem, {
      context: {
        props: {
          linkClasses: ['foo', { bar: true }]
        }
      }
    })
    const link = wrapper.find(BLink)
    expect(link).toBeDefined()
    expect(link.classes()).toContain('foo')
    expect(link.classes()).toContain('bar')
    expect(link.classes()).toContain('nav-link')
  })

  it('has class "disabled" on link when disabled set', async () => {
    const wrapper = mount(BNavItem, {
      context: {
        props: { disabled: true }
      }
    })
    const link = wrapper.find(BLink)
    expect(link).toBeDefined()
    expect(link.classes()).toContain('disabled')
  })

  it('emits click event when clicked', async () => {
    const spy = jest.fn()
    const wrapper = mount(BNavItem, {
      context: {
        on: { click: spy }
      }
    })
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const link = wrapper.find(BLink)
    expect(link).toBeDefined()
    link.trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('does not emit a click event when clicked and disabled', async () => {
    const spy = jest.fn()
    const wrapper = mount(BNavItem, {
      context: {
        props: { disabled: true },
        on: { click: spy }
      }
    })
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const link = wrapper.find(BLink)
    expect(link).toBeDefined()
    link.trigger('click')
    expect(spy).not.toHaveBeenCalled()
  })
})
