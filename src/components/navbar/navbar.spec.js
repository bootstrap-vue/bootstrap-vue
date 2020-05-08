import { mount } from '@vue/test-utils'
import { BNavbar } from './navbar'

describe('navbar', () => {
  it('default has tag "nav"', async () => {
    const wrapper = mount(BNavbar)

    expect(wrapper.element.tagName).toBe('NAV')
    // No role added if default tag is used
    expect(wrapper.attributes('role')).not.toBeDefined()

    wrapper.destroy()
  })

  it('default has class "navbar", "navbar-expand", "navbar-light"', async () => {
    const wrapper = mount(BNavbar)

    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-expand')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('accepts custom tag', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { tag: 'div' }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('navigation')

    wrapper.destroy()
  })

  it('accepts breakpoint via toggleable prop', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { toggleable: 'lg' }
    })

    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-expand-lg')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('toggleable=true has expected classes', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { toggleable: true }
    })

    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('toggleable=xs has expected classes', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { toggleable: 'xs' }
    })

    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class "fixed-top" when fixed="top"', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { fixed: 'top' }
    })

    expect(wrapper.classes()).toContain('fixed-top')
    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-expand')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(4)

    wrapper.destroy()
  })

  it('has class "fixed-top" when fixed="top"', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { fixed: 'top' }
    })

    expect(wrapper.classes()).toContain('fixed-top')
    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-expand')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(4)

    wrapper.destroy()
  })

  it('has class "sticky-top" when sticky=true', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { sticky: true }
    })

    expect(wrapper.classes()).toContain('sticky-top')
    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-expand')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(4)

    wrapper.destroy()
  })

  it('accepts variant prop', async () => {
    const wrapper = mount(BNavbar, {
      propsData: { variant: 'primary' }
    })

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('navbar-expand')
    expect(wrapper.classes()).toContain('navbar-light')
    expect(wrapper.classes().length).toBe(4)

    wrapper.destroy()
  })
})
