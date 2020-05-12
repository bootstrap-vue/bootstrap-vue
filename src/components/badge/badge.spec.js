import { mount } from '@vue/test-utils'
import { BBadge } from './badge'

describe('badge', () => {
  it('should have base classes', async () => {
    const wrapper = mount(BBadge)

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should have default slot content', async () => {
    const wrapper = mount(BBadge, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.text()).toBe('foobar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should apply variant class', async () => {
    const wrapper = mount(BBadge, {
      propsData: {
        variant: 'danger'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge-danger')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.destroy()
  })

  it('should apply pill class', async () => {
    const wrapper = mount(BBadge, {
      propsData: {
        pill: true
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge-pill')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.destroy()
  })

  it('should have active class when prop active set', async () => {
    const wrapper = mount(BBadge, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.destroy()
  })

  it('should have disabled class when prop disabled set', async () => {
    const wrapper = mount(BBadge, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')

    wrapper.destroy()
  })

  it('renders custom root element', async () => {
    const wrapper = mount(BBadge, {
      propsData: {
        tag: 'small'
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.destroy()
  })

  it('renders link when href provided', async () => {
    const wrapper = mount(BBadge, {
      propsData: {
        href: '/foo/bar'
      }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.destroy()
  })
})
