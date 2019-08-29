import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BDropdownItemButton } from './dropdown-item-button'

describe('dropdown-item-button', () => {
  it('renders with tag "button" and type="button" by default', async () => {
    const wrapper = mount(BDropdownItemButton)
    expect(wrapper.is('li')).toBe(true)

    const button = wrapper.find('button')
    expect(button.is('button')).toBe(true)
    expect(button.attributes('type')).toBe('button')

    wrapper.destroy()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItemButton)
    expect(wrapper.is('li')).toBe(true)

    const button = wrapper.find('button')
    expect(button.classes()).toContain('dropdown-item')
    expect(button.classes()).not.toContain('active')

    wrapper.destroy()
  })

  it('has class "active" when active=true', async () => {
    const wrapper = mount(BDropdownItemButton, {
      propsData: { active: true }
    })
    expect(wrapper.is('li')).toBe(true)

    const button = wrapper.find('button')
    expect(button.classes()).toContain('active')
    expect(button.classes()).toContain('dropdown-item')

    wrapper.destroy()
  })

  it('has attribute "disabled" when disabled=true', async () => {
    const wrapper = mount(BDropdownItemButton, {
      propsData: { disabled: true }
    })
    expect(wrapper.is('li')).toBe(true)

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()

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
    expect(wrapper.is('li')).toBe(true)

    const button = wrapper.find('button')
    expect(button).toBeDefined()
    button.trigger('click')
    await waitNT(wrapper.vm)
    expect(called).toBe(true)
    expect(refocus).toBe(true)

    wrapper.destroy()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItemButton, {
      propsData: {
        disabled: true
      },
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

    const button = wrapper.find('button')
    expect(button).toBeDefined()
    button.trigger('click')
    await waitNT(wrapper.vm)
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.destroy()
  })
})
