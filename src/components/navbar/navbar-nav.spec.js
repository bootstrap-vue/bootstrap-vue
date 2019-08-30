import { mount } from '@vue/test-utils'
import { BNavbarNav } from './navbar-nav'

describe('navbar-nav', () => {
  it('default has tag "ul"', async () => {
    const wrapper = mount(BNavbarNav)
    expect(wrapper.is('ul')).toBe(true)
  })

  it('default has class "navbar-nav"', async () => {
    const wrapper = mount(BNavbarNav)
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(1)
  })

  it('accepts custom tag', async () => {
    const wrapper = mount(BNavbarNav, {
      context: {
        props: { tag: 'div' }
      }
    })
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class "nav-fill" when fill=true', async () => {
    const wrapper = mount(BNavbarNav, {
      context: {
        props: { fill: true }
      }
    })
    expect(wrapper.classes()).toContain('nav-fill')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class "nav-justified" when justified=true', async () => {
    const wrapper = mount(BNavbarNav, {
      context: {
        props: { justified: true }
      }
    })
    expect(wrapper.classes()).toContain('nav-justified')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)
  })

  it('applies alignment correctly', async () => {
    const wrapper = mount(BNavbarNav, {
      context: {
        props: { align: 'center' }
      }
    })
    expect(wrapper.classes()).toContain('justify-content-center')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class "small" when small=true', async () => {
    const wrapper = mount(BNavbarNav, {
      context: {
        props: { small: true }
      }
    })
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class "small" when small=true', async () => {
    const wrapper = mount(BNavbarNav, {
      context: {
        props: { small: true }
      }
    })
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).toContain('navbar-nav')
    expect(wrapper.classes().length).toBe(2)
  })
})
