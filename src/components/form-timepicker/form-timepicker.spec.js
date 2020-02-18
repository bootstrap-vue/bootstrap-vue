import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTimepciker } from './form-timepiker'

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
})
