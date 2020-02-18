import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BTime } from './time'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('time', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BTime)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('has expected structure when `value` supplied', async () => {
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

  it('has expected structure when prop `hour12` is `true`', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        hour12: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('has expected structure when prop `hour12` is `false`', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        hour12: false
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('has expected structure when prop `show-seconds` is `true`', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        showSeconds: true,
        value: '01:02:03'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('blur and focus methods work', async () => {
    const wrapper = mount(BTime, {
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })
})
