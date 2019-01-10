import DropdownItemBtn from './dropdown-item-button'
import { mount } from '@vue/test-utils'
import Vue from 'vue'

describe('dropdown-item-button', async () => {
  it('renders with tag "button" and type="button" by default', async () => {
    const wrapper = mount(DropdownItemBtn)
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(DropdownItemBtn)
    expect(wrapper.classes()).toContain('dropdown-item')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')
  })

  it('has class "disabled" when disabled=true', async () => {
    const wrapper = mount(DropdownItemBtn, {
      context: {
        props: { disabled: true }
      }
    })
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('dropdown-item')
    expect(wrapper.classes()).not.toContain('active')
  })

  it('has class "active" when active=true', async () => {
    const wrapper = mount(DropdownItemBtn, {
      context: {
        props: { active: true }
      }
    })
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('dropdown-item')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(DropdownItemBtn, {
      provide: {
        dropdown: {
          hide (arg) {
            called = true
            refocus = arg
          }
        }
      }
    })
    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')
    await Vue.nextTick()
    expect(called).toBe(true)
    expect(refocus).toBe(true)
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(DropdownItemBtn, {
      provide: {
        dropdown: {
          hide (arg) {
            called = true
            refocus = arg
          }
        }
      },
      context: {
        props: { disabled: true }
      }
    })
    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')
    await Vue.nextTick()
    expect(called).toBe(false)
    expect(refocus).toBe(null)
  })
})
