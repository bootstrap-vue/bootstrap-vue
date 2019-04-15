import { mount } from '@vue/test-utils'
import BDropdownForm from './dropdown-form'

describe('dropdown-form', () => {
  it('renders with tag "form"', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
  })

  it('has custom class "b-dropdown-form"', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.classes()).toContain('b-dropdown-form')
    expect(form.classes()).not.toContain('was-validated')
  })

  it('has class "was-validated" when validated=true', async () => {
    const wrapper = mount(BDropdownForm, {
      context: {
        props: { validated: true }
      }
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
      context: {
        props: { novalidate: true }
      }
    })
    expect(wrapper.is('li')).toBe(true)

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).toBeDefined()
  })
})
