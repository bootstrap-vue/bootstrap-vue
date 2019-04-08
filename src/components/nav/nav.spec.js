import BNav from './nav'
import { mount } from '@vue/test-utils'

describe('nav', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNav)

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        tag: 'ol'
      }
    })

    expect(wrapper.is('ol')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNav, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('foobar')
  })

  it('applies pill style', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        pills: true
      }
    })

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-pills')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')
  })

  it('applies tab style', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        tabs: true
      }
    })

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-tabs')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')
  })

  it('applies flex-column style when vertical', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        vertical: true
      }
    })

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')
  })

  it('applies justify style when justified', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        justified: true
      }
    })

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-justified')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')
  })

  it('applies fill style style when fill set', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        fill: true
      }
    })

    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-fill')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')
  })
})
