import BDropdownItemButton from './dropdown-item-button'
import { mount } from '@vue/test-utils'

describe('dropdown-item-button', () => {
  it('renders with tag "button" and type="button" by default', async () => {
    const wrapper = mount(BDropdownItemButton)
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBe('button')

    wrapper.destroy()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItemButton)
    expect(wrapper.classes()).toContain('dropdown-item')
    expect(wrapper.classes()).not.toContain('active')

    wrapper.destroy()
  })

  it('has class "active" when active=true', async () => {
    const wrapper = mount(BDropdownItemButton, {
      propsData: { active: true }
    })
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('dropdown-item')

    wrapper.destroy()
  })

  it('has attribute "disabled" when disabled=true', async () => {
    const wrapper = mount(BDropdownItemButton, {
      propsData: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItemButton, {
      provide: {
        bvDropdown: {
          hide(arg) {
            called = true
            refocus = arg
          }
        }
      }
    })
    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(called).toBe(true)
    expect(refocus).toBe(true)

    wrapper.destroy()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItemButton, {
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
    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.destroy()
  })
})
