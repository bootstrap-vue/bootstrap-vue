import { mount } from '@vue/test-utils'
import { BListGroupItem } from './list-group-item'

describe('list-group > list-group-item', () => {
  it('default should have tag div', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.is('div')).toBe(true)
  })

  it('default should contain only single class of list-group-item', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('list-group-item')
  })

  it('default should not have class list-group-item-action', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.classes()).not.toContain('list-group-item-action')
  })

  it('default should not have class active', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.classes()).not.toContain('active')
  })

  it('default should not have class disabled', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('default should not have type attribute', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.attributes('type')).not.toBeDefined()
  })

  it('default should not have disabled attribute', async () => {
    const wrapper = mount(BListGroupItem)
    expect(wrapper.attributes('disabled')).not.toBeDefined()
  })

  it('should have disabled class when disabled=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { disabled: true }
      }
    })
    expect(wrapper.classes()).toContain('disabled')
  })

  it('should have active class when active=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { active: true }
      }
    })
    expect(wrapper.classes()).toContain('active')
  })

  it('should have variant class and base class when variant set', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { variant: 'danger' }
      }
    })
    expect(wrapper.classes()).toContain('list-group-item')
    expect(wrapper.classes()).toContain('list-group-item-danger')
  })

  it('should have tag a when href is set', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { href: '/foobar' }
      }
    })
    expect(wrapper.is('a')).toBe(true)
  })

  it('should have class list-group-item-action when href is set', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { href: '/foobar' }
      }
    })
    expect(wrapper.classes()).toContain('list-group-item-action')
  })

  it('should have class list-group-item-action when action=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { action: true }
      }
    })
    expect(wrapper.classes()).toContain('list-group-item-action')
  })

  it('should have class list-group-item-action when tag=a', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { tag: 'a' }
      }
    })
    expect(wrapper.classes()).toContain('list-group-item-action')
  })

  it('should have href attribute when href is set', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { href: '/foobar' }
      }
    })
    expect(wrapper.attributes('href')).toBe('/foobar')
  })

  it('should have tag button when tag=button', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { tag: 'button' }
      }
    })
    expect(wrapper.is('button')).toBe(true)
  })

  it('should have tag a when tag=a', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { tag: 'a' }
      }
    })
    expect(wrapper.is('a')).toBe(true)
  })

  it('should have tag button when button=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { button: true }
      }
    })
    expect(wrapper.is('button')).toBe(true)
  })

  it('should have tag button when button=true and tag=foo', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: {
          button: true,
          tag: 'foo'
        }
      }
    })
    expect(wrapper.is('button')).toBe(true)
  })

  it('should not have href when button=true and href set', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: {
          button: true,
          href: '/foobar'
        }
      }
    })
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('href')).not.toBeDefined()
  })

  it('should have class list-group-item-action when button=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { button: true }
      }
    })
    expect(wrapper.classes()).toContain('list-group-item-action')
  })

  it('should have type=button when button=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { button: true }
      }
    })
    expect(wrapper.attributes('type')).toEqual('button')
  })

  it('should have type=submit when button=true and attr type=submit', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { button: true },
        attrs: { type: 'submit' }
      }
    })
    expect(wrapper.attributes('type')).toEqual('submit')
  })

  it('should not have attribute disabled when button=true and disabled not set', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: { button: true }
      }
    })
    expect(wrapper.attributes('disabled')).not.toBeDefined()
  })

  it('should have attribute disabled when button=true and disabled=true', async () => {
    const wrapper = mount(BListGroupItem, {
      context: {
        props: {
          button: true,
          disabled: true
        }
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
