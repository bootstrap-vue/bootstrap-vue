import { mount } from '@vue/test-utils'
import { BDropdownForm } from './dropdown-form'

describe('dropdown-form', () => {
  it('renders with tag "form"', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.element.tagName).toBe('FORM')

    wrapper.unmount()
  })

  it('default has expected classes', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.classes()).toContain('b-dropdown-form')
    expect(form.classes()).not.toContain('was-validated')
    expect(form.classes()).not.toContain('disabled')

    wrapper.unmount()
  })

  it('should have custom form classes on form', async () => {
    const wrapper = mount(BDropdownForm, {
      props: {
        formClass: ['form-class-custom', 'form-class-custom-2']
      }
    })

    const form = wrapper.find('form')
    expect(form.classes()).toEqual(['b-dropdown-form', 'form-class-custom', 'form-class-custom-2'])

    wrapper.unmount()
  })

  it('has tabindex on form', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.element.tagName).toBe('FORM')
    expect(form.attributes('tabindex')).toBeDefined()
    expect(form.attributes('tabindex')).toEqual('-1')

    wrapper.unmount()
  })

  it('does not have tabindex on form when disabled', async () => {
    const wrapper = mount(BDropdownForm, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.element.tagName).toBe('FORM')
    expect(form.attributes('tabindex')).not.toBeDefined()
    expect(form.attributes('disabled')).toBeDefined()
    expect(form.classes()).toContain('disabled')

    wrapper.unmount()
  })

  it('has class "was-validated" when validated=true', async () => {
    const wrapper = mount(BDropdownForm, {
      props: { validated: true }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.classes()).toContain('was-validated')
    expect(form.classes()).toContain('b-dropdown-form')

    wrapper.unmount()
  })

  it('does not have attribute novalidate by default', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).not.toBeDefined()

    wrapper.unmount()
  })

  it('has attribute novalidate when novalidate=true', async () => {
    const wrapper = mount(BDropdownForm, {
      props: { novalidate: true }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).toBeDefined()

    wrapper.unmount()
  })
})
