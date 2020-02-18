import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BTime } from './time'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('time', () => {
  it('Has expected default structure', async () => {
    const wrapper = mount(BTime)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('Has expected default structure when value supplied', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        value: '13:14:15'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.setProps({
      value: '01:02:03'
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })
})
