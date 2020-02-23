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

  it('spin buttons work', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        showSeconds: true,
        value: '00:00:00',
        // force to 12 hour mode
        hour12: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input')).not.toBeDefined()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(4)

    const $hours = $spinners.at(0)
    const $minutes = $spinners.at(1)
    const $seconds = $spinners.at(2)
    const $ampm = $spinners.at(3)

    $hours.trigger('keydown.up')
    $hours.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe('01:00:00')

    $minutes.trigger('keydown.up')
    $minutes.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toBe('01:01:00')

    $seconds.trigger('keydown.up')
    $seconds.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('input')[2][0]).toBe('01:01:01')

    $ampm.trigger('keydown.up')
    $ampm.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input').length).toBe(4)
    expect(wrapper.emitted('input')[3][0]).toBe('13:01:01')

    $ampm.trigger('keydown.up')
    $ampm.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input').length).toBe(5)
    expect(wrapper.emitted('input')[4][0]).toBe('01:01:01')

    wrapper.destroy()
  })

  it('blur and focus methods work', async () => {
    const wrapper = mount(BTime, {
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $hours = wrapper.find('[role="spinbutton"][aria-label="Hours"]')
    expect($hours.exists()).toBe(true)

    expect(document.activeElement).not.toBe($hours.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($hours.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).not.toBe($hours.element)

    wrapper.destroy()
  })

  it('arrow left/right moves focus', async () => {
    const wrapper = mount(BTime, {
      attachToDocument: true,
      propsData: {
        showSeconds: true,
        value: '00:00:00',
        // force to 12 hour mode
        hour12: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(4)

    const $hours = $spinners.at(0)
    const $minutes = $spinners.at(1)
    const $seconds = $spinners.at(2)
    const $ampm = $spinners.at(3)

    expect(document.activeElement).not.toBe($hours.element)
    expect(document.activeElement).not.toBe($minutes.element)
    expect(document.activeElement).not.toBe($seconds.element)
    expect(document.activeElement).not.toBe($ampm.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($hours.element)

    $hours.trigger('keydown.right')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($minutes.element)

    $minutes.trigger('keydown.right')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($seconds.element)

    $seconds.trigger('keydown.right')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($ampm.element)

    $ampm.trigger('keydown.right')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($hours.element)

    $hours.trigger('keydown.left')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($ampm.element)

    $ampm.trigger('keydown.left')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($seconds.element)

    wrapper.destroy()
  })
})
