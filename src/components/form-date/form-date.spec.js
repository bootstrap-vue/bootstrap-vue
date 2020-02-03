import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormDate } from './form-date'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('form-date', () => {
  it('has expected base structure', async () => {
    const wrapper = mount(BFormDate, {
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.destroy()
  })
})
