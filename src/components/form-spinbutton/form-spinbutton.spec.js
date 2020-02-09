import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormSpinbutton } from './form-spinbutton'

describe('form-spinbutton', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormSpinbutton)
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('b-form-spinbutton')

    // TBD

    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.destroy()
  })

  it('renders hidden input when name set', async () => {
    const wrapper = mount(BFormSpinbutton, {
      propsData: {
        name: 'foobar',
        value: null
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('b-form-spinbutton')

    const $hidden = wrapper.find('input[type="hidden"]')
    expect($hidden.exists()).toBe(true)
    expect($hidden.attributes('name')).toBe('foobar')
    expect($hidden.attributes('value')).toBe('')

    wrapper.setProps({
      value: 50
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($hidden.attributes('name')).toBe('foobar')
    expect($hidden.attributes('value')).toBe('50')

    wrapper.destroy()
  })
})
