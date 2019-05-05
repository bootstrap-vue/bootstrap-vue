import { mount } from '@vue/test-utils'
import BDropdownForm from './dropdown-form'

describe('dropdown-form', () => {
  it('renders with tag "form"', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
  })

  it('default has expected classes', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.classes()).toContain('b-dropdown-form')
    expect(form.classes()).not.toContain('was-validated')
    expect(form.classes()).not.toContain('disabled')
  })

  it('has tabindex on form', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
    expect(form.attributes('tabindex')).toBeDefined()
    expect(form.attributes('tabindex')).toEqual('-1')
  })

  it('does not have tabindex on form when disabled', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
    expect(form.attributes('tabindex')).not.toBeDefined()
    expect(form.attributes('disabled')).toBeDefined()
    expect(form.classes()).toContain('disabled')
  })

  it('has class "was-validated" when validated=true', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: { validated: true }
    })
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.classes()).toContain('was-validated')
    expect(form.classes()).toContain('b-dropdown-form')
  })

  it('does not have attribute novalidate by default', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).not.toBeDefined()
  })

  it('has attribute novalidate when novalidate=true', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: { novalidate: true }
    })
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).toBeDefined()
  })
})
