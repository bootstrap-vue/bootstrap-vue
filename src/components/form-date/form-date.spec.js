import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormDate } from './form-date'

// Note that JSDOM only supports `en-US` (`en`) locale for `Intl`

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

  it('reacts to changes in value', async () => {
    const wrapper = mount(BFormDate, {
      attachToDocument: true,
      propsData: {
        value: '',
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD
    wrapper.setProps({
      value: '2020-01-20'
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.destroy()
  })

  it('emits new value when date selected', async () => {
    const wrapper = mount(BFormDate, {
      attachToDocument: true,
      propsData: {
        value: '',
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    // Simulate picking a date on the calendar
    wrapper.setData({
      localYMD: '2020-01-20'
    })

    // TBD

    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BFormDate, {
      attachToDocument: true,
      propsData: {
        value: '',
        id: 'test-focus-blur'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-focus-blur')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)

    expect(document.activeElement).not.toBe($toggle.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($toggle.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).not.toBe($toggle.element)

    wrapper.destroy()
  })

  it('renders optional footer buttons', async () => {
    const wrapper = mount(BFormDate, {
      attachToDocument: true,
      propsData: {
        todayButton: true,
        resetButton: true,
        closeButton: true
      }
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
