import Badge from './badge'
import { mount } from '@vue/test-utils'

describe('badge', () => {
  it('should have base classes', async () => {
    const wrapper = mount(Badge)
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
  })

  it('should have default slot content', async () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.text()).toBe('foobar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
  })

  it('should apply variant class', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        variant: 'danger'
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('badge-danger')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('should apply pill class', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        pill: true
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('badge-pill')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('should have active class when prop active set', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        active: true
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('should have disabled class when prop disabled set', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
  })

  it('renders custom root element', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        tag: 'small'
      }
    })
    expect(wrapper.is('small')).toBe(true)
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('renders link when href provided', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        href: '/foo/bar'
      }
    })
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })
})
