import { mount } from '@vue/test-utils'
import { BLink } from '../link/link'
import { BNavItem } from './nav-item'

describe('nav-item', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavItem)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('nav-item')
    expect(wrapper.classes().length).toBe(1)

    const $link = wrapper.findComponent(BLink)
    expect($link.exists()).toBe(true)
    expect($link.element.tagName).toBe('A')
    expect($link.classes()).toContain('nav-link')
    expect($link.classes().length).toBe(1)
    expect($link.attributes('href')).toBeDefined()
    expect($link.attributes('href')).toBe('#')
    expect($link.attributes('role')).not.toBeDefined()

    wrapper.unmount()
  })

  it('has attrs on link when link-attrs set', async () => {
    const wrapper = mount(BNavItem, {
      props: {
        linkAttrs: { role: 'tab' }
      }
    })

    expect(wrapper.attributes('role')).not.toBeDefined()

    const $link = wrapper.findComponent(BLink)
    expect($link.exists()).toBe(true)
    expect($link.element.tagName).toBe('A')
    expect($link.attributes('role')).toBeDefined()
    expect($link.attributes('role')).toBe('tab')

    wrapper.unmount()
  })

  it('has custom classes on link when link-classes set', async () => {
    const wrapper = mount(BNavItem, {
      props: {
        linkClasses: ['foo', { bar: true }]
      }
    })

    const $link = wrapper.findComponent(BLink)
    expect($link.exists()).toBe(true)
    expect($link.element.tagName).toBe('A')
    expect($link.classes()).toContain('foo')
    expect($link.classes()).toContain('bar')
    expect($link.classes()).toContain('nav-link')

    wrapper.unmount()
  })

  it('has class "disabled" on link when disabled set', async () => {
    const wrapper = mount(BNavItem, {
      props: { disabled: true }
    })

    const $link = wrapper.findComponent(BLink)
    expect($link.exists()).toBe(true)
    expect($link.element.tagName).toBe('A')
    expect($link.classes()).toContain('disabled')

    wrapper.unmount()
  })

  it('emits click event when clicked', async () => {
    const spy = jest.fn()
    const wrapper = mount(BNavItem, {
      attrs: { onClick: spy }
    })

    expect(spy).not.toHaveBeenCalled()
    await wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const $link = wrapper.findComponent(BLink)
    expect($link.exists()).toBe(true)
    expect($link.element.tagName).toBe('A')
    await $link.trigger('click')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('does not emit a click event when clicked and disabled', async () => {
    const spy = jest.fn()
    const wrapper = mount(BNavItem, {
      props: { disabled: true },
      attrs: { onClick: spy }
    })

    expect(spy).not.toHaveBeenCalled()
    await wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const $link = wrapper.findComponent(BLink)
    expect($link.exists()).toBe(true)
    expect($link.element.tagName).toBe('A')
    await $link.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})
