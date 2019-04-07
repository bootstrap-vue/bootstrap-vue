import BDropdownItem from './dropdown-item'
import { mount } from '@vue/test-utils'

describe('dropdown-item', () => {
  it('renders with tag "a" and href="#" by default', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.classes()).toContain('dropdown-item')
    expect(wrapper.attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      provide: {
        bvDropdown: {
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

    wrapper.destroy()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      provide: {
        bvDropdown: {
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

    wrapper.destroy()
  })
})
