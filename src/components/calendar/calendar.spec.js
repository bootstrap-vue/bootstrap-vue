import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BCalendar } from './calendar'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('calendar', () => {
  it('has expected base structure', async () => {
    const wrapper = mount(BCalendar, {
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

  it('has expected struture when value is set', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('reacts to changes in value', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-01-01' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.setProps({
      value: '2020-01-15'
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.destroy()
  })

  it('date navigation buttons work', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('focus method works', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.is('div')).toBe(true)

    expect(document.activeElement).not.toBe($grid.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    // expect(document.activeElement).toBe($grid.element)

    wrapper.destroy()
  })

  it('keyboard navigation works', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })
})
