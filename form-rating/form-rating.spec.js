import { mount } from '@vue/test-utils'
import { waitNT, /* waitRAF */ } from '../../../tests/utils'
import { BFormRating } from './form-rating'

describe('form-rating', () => {
  it('has expected default strcture', async () => {
    const wrapper = mount(BFormRating)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    wrapper.destroy()
  })
})
