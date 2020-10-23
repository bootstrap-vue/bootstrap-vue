import { mount } from '@vue/test-utils'
import { BButtonGroup } from './button-group'

describe('button-group', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BButtonGroup)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('should render default slot', async () => {
    const wrapper = mount(BButtonGroup, {
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('should apply vertical class', async () => {
    const wrapper = mount(BButtonGroup, {
      props: {
        vertical: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('should apply size class', async () => {
    const wrapper = mount(BButtonGroup, {
      props: {
        size: 'sm'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-sm')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('should apply size class when vertical', async () => {
    const wrapper = mount(BButtonGroup, {
      props: {
        size: 'sm',
        vertical: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group-sm')
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has custom role when aria-role prop set', async () => {
    const wrapper = mount(BButtonGroup, {
      props: {
        ariaRole: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('foobar')

    wrapper.unmount()
  })
})
