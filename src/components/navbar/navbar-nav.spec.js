import { mount } from '@vue/test-utils'
import { BNavbarNav } from './navbar-nav'

describe('navbar-nav', () => {
  it('default has tag "ul"', async () => {
    const wrapper = mount(BNavbarNav)

    expect(wrapper.element.tagName).toBe('UL')

    wrapper.unmount()
  })

  it('default has class "navbar-nav"', async () => {
    const wrapper = mount(BNavbarNav)

    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('accepts custom tag', async () => {
    const wrapper = mount(BNavbarNav, {
      props: { tag: 'div' }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class "nav-fill" when fill=true', async () => {
    const wrapper = mount(BNavbarNav, {
      props: { fill: true }
    })

    expect(wrapper.classes()).toContain('nav-fill')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class "nav-justified" when justified=true', async () => {
    const wrapper = mount(BNavbarNav, {
      props: { justified: true }
    })

    expect(wrapper.classes()).toContain('nav-justified')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('applies alignment correctly', async () => {
    const wrapper = mount(BNavbarNav, {
      props: { align: 'center' }
    })

    expect(wrapper.classes()).toContain('justify-content-center')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class "small" when small=true', async () => {
    const wrapper = mount(BNavbarNav, {
      props: { small: true }
    })

    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class "small" when small=true', async () => {
    const wrapper = mount(BNavbarNav, {
      props: { small: true }
    })

    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })
})
