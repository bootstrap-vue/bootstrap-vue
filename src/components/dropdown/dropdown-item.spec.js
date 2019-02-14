import DropdownItem from './dropdown-item'
import { mount } from '@vue/test-utils'

describe('dropdown-item', async () => {
  it('renders with tag "a" and href="#" by default', async () => {
    const wrapper = mount(DropdownItem)
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toBe('#')
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(DropdownItem)
    expect(wrapper.classes()).toContain('dropdown-item')
    expect(wrapper.attributes('href')).toBe('#')
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(DropdownItem, {
      provide: {
        dropdown: {
          hide(arg) {
            called = true
            refocus = arg
          }
        }
      }
    })
    const link = wrapper.find('a')
    expect(link).toBeDefined()
    link.trigger('click')
    await wrapper.vm.$nextTick()
    expect(called).toBe(true)
    expect(refocus).toBe(true)
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(DropdownItem, {
      provide: {
        dropdown: {
          hide(arg) {
            called = true
            refocus = arg
          }
        }
      },
      propsData: { disabled: true }
    })
    const link = wrapper.find('a')
    expect(link).toBeDefined()
    link.trigger('click')
    await wrapper.vm.$nextTick()
    expect(called).toBe(false)
    expect(refocus).toBe(null)
  })
})
