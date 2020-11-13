import { mount } from '@vue/test-utils'
import { BDropdownItemButton } from './dropdown-item-button'

describe('dropdown-item-button', () => {
  it('renders with tag "button" and type="button" by default', async () => {
    const wrapper = mount(BDropdownItemButton)
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button.element.tagName).toBe('BUTTON')
    expect(button.attributes('type')).toBe('button')

    wrapper.unmount()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItemButton)
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button.classes()).toContain('dropdown-item')
    expect(button.classes()).not.toContain('active')

    wrapper.unmount()
  })

  it('has class "active" when active=true', async () => {
    const wrapper = mount(BDropdownItemButton, {
      props: { active: true }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button.classes()).toContain('active')
    expect(button.classes()).toContain('dropdown-item')

    wrapper.unmount()
  })

  it('has attribute "disabled" when disabled=true', async () => {
    const wrapper = mount(BDropdownItemButton, {
      props: { disabled: true }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItemButton, {
      global: {
        provide: {
          bvDropdown: {
            hide(arg) {
              called = true
              refocus = arg
            }
          }
        }
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button).toBeDefined()
    await button.trigger('click')
    expect(called).toBe(true)
    expect(refocus).toBe(true)

    wrapper.unmount()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItemButton, {
      global: {
        provide: {
          bvDropdown: {
            hide(arg) {
              called = true
              refocus = arg
            }
          }
        }
      },
      props: {
        disabled: true
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button).toBeDefined()
    await button.trigger('click')
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.unmount()
  })

  it('has buttonClass when prop is passed a value', () => {
    const wrapper = mount(BDropdownItemButton, {
      props: {
        buttonClass: 'button-class'
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const button = wrapper.find('button')
    expect(button.classes()).toContain('button-class')
    expect(button.classes()).toContain('dropdown-item')

    wrapper.unmount()
  })
})
