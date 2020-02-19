import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTimepicker } from './form-timepicker'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('form-timepicker', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormTimepicker)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('has expected structure when value is set', async () => {
    const wrapper = mount(BFormTimepicker, {
      propsData: {
        showSeconds: true,
        value: '01:02:03'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.setProps({
      value: '13:14:15'
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })
})
