import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormSpinbutton } from './form-spinbutton'

describe('form-spinbutton', () => {
  it('has class form-control', async () => {
    const wrapper = mount(BFormSpinbutton)
    expect(wrapper.isVueComponent()).tobe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('b-from-spinbutton')

    wrapper.destroy()
  })
})
