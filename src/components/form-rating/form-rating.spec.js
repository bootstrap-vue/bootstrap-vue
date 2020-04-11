import { mount } from '@vue/test-utils'
import { waitNT /*, waitRAF */ } from '../../../tests/utils'
import { BFormRating } from './form-rating'

describe('form-rating', () => {
  it('has expected default strcture', async () => {
    const wrapper = mount(BFormRating)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    wrapper.destroy()
  })

  it('has expected strcture when prop `stars` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        stars: '10'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    wrapper.destroy()
  })

  it('has expected strcture when prop `value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        value: '3.5'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    wrapper.destroy()
  })

  it('has expected strcture when prop `show-value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        showValue: true,
        value: '3.5',
        precision: 2
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    wrapper.setProps({
      value: null
    })
    await waitNT(wrapper.vm)

    // TBD

    wrapper.setProps({
      value: '1.236'
    })
    await waitNT(wrapper.vm)

    // TBD

    wrapper.destroy()
  })
})
