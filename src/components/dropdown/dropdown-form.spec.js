import BDropdownForm from './dropdown-form'
import { mount } from '@vue/test-utils'

describe('dropdown-form', () => {
  it('renders with tag "form"', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.is('form')).toBe(true)
  })

  it('has custom class "b-dropdown-form"', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.classes()).toContain('b-dropdown-form')
    expect(wrapper.classes()).not.toContain('was-validated')
  })

  it('has class "was-validated" when validated=true', async () => {
    const wrapper = mount(BDropdownForm, {
      context: {
        props: { validated: true }
      }
    })
    expect(wrapper.classes()).toContain('was-validated')
    expect(wrapper.classes()).toContain('b-dropdown-form')
  })

  it('does not have attribute novalidate by default', async () => {
    const wrapper = mount(BDropdownForm)
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
  })

  it('has attribute novalidate when novalidate=true', async () => {
    const wrapper = mount(BDropdownForm, {
      context: {
        props: { novalidate: true }
      }
    })
    expect(wrapper.attributes('novalidate')).toBeDefined()
  })
})
