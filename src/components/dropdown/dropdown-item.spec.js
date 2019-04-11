import BDropdownItem from './dropdown-item'
import { mount } from '@vue/test-utils'

describe('dropdown-item', () => {
  it('renders with tag "a" and href="#" by default', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item.is('a')).toBe(true)
    expect(item.attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item.classes()).toContain('dropdown-item')
    expect(item.attributes('href')).toBe('#')

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
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item).toBeDefined()
    item.trigger('click')
    await wrapper.vm.$nextTick()
    expect(called).toBe(true)
    expect(refocus).toBe(true)

    wrapper.destroy()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      propsData: { disabled: true },
      provide: {
        bvDropdown: {
          hide(arg) {
            called = true
            refocus = arg
          }
        }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item).toBeDefined()
    item.trigger('click')
    await wrapper.vm.$nextTick()
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.destroy()
  })
})
