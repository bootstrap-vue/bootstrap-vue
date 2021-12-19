import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BTime } from './time'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('time', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BTime)

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.element.hasAttribute('lang')).toBe(true)
    expect(wrapper.element.hasAttribute('aria-labelledby')).toBe(true)
    expect(wrapper.classes()).toContain('b-time')
    expect(wrapper.classes()).toContain('d-inline-flex')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes()).toContain('text-center')

    const $output = wrapper.find('.b-time > header > output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('status')
    expect($output.attributes('aria-live')).toEqual('polite')
    expect($output.attributes('aria-atomic')).toEqual('true')
    expect($output.attributes('id')).toEqual(wrapper.attributes('aria-labelledby'))

    const $spinWrap = wrapper.find('.b-time > div[role="group"]')
    expect($spinWrap.exists()).toBe(true)
    expect($spinWrap.classes()).toContain('d-flex')
    expect($spinWrap.classes()).toContain('align-items-center')
    expect($spinWrap.classes()).toContain('justify-content-center')
    expect($spinWrap.classes()).toContain('mx-auto')

    wrapper.destroy()
  })

  it('has expected structure when `value` supplied', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        locale: 'en',
        hour12: false,
        showSeconds: true,
        value: '13:14:15'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(3)
    expect($spinners.at(0).text()).toEqual('13')
    expect($spinners.at(1).text()).toEqual('14')
    expect($spinners.at(2).text()).toEqual('15')

    await wrapper.setProps({ value: '01:02:03' })
    await waitRAF()
    expect($spinners.at(0).text()).toEqual('01')
    expect($spinners.at(1).text()).toEqual('02')
    expect($spinners.at(2).text()).toEqual('03')

    wrapper.destroy()
  })

  it('has expected structure when prop `hour12` is `true`', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        locale: 'en',
        hour12: true,
        value: '01:02:00'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(3)
    expect($spinners.at(0).text()).toEqual('01')
    expect($spinners.at(1).text()).toEqual('02')
    expect($spinners.at(2).text()).toEqual('AM')

    await wrapper.setProps({ value: '13:14:00' })
    await waitRAF()
    expect($spinners.at(0).text()).toEqual('01')
    expect($spinners.at(1).text()).toEqual('14')
    expect($spinners.at(2).text()).toEqual('PM')

    wrapper.destroy()
  })

  it('has expected structure when prop `hour12` is `false`', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        locale: 'en',
        hour12: false,
        value: '01:02:00'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(2)
    expect($spinners.at(0).text()).toEqual('01')
    expect($spinners.at(1).text()).toEqual('02')

    await wrapper.setProps({ value: '13:14:00' })
    await waitRAF()
    expect($spinners.at(0).text()).toEqual('13')
    expect($spinners.at(1).text()).toEqual('14')

    wrapper.destroy()
  })

  it('has expected structure when prop `show-seconds` is `true`', async () => {
    const wrapper = mount(BTime, {
      propsData: {
        locale: 'en',
        hour12: false,
        showSeconds: true,
        value: '01:02:03'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(3)

    expect($spinners.at(0).text()).toEqual('01')
    expect($spinners.at(1).text()).toEqual('02')
    expect($spinners.at(2).text()).toEqual('03')

    wrapper.destroy()
  })

  it('has correct header tag when "header-tag" prop is set', async () => {
    const wrapper = mount(BTime, {
      attachTo: document.body,
      propsData: {
        headerTag: 'div'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $header = wrapper.find('.b-time-header')
    expect($header.exists()).toBe(true)
    expect($header.element.tagName).toBe('DIV')

    wrapper.destroy()
  })

  it('has correct footer tag when "footer-tag" prop is set', async () => {
    const wrapper = mount(BTime, {
      attachTo: document.body,
      propsData: {
        footerTag: 'div'
      },
      slots: {
        default: 'text'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $footer = wrapper.find('.b-time-footer')
    expect($footer.exists()).toBe(true)
    expect($footer.element.tagName).toBe('DIV')

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

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input')).toBeUndefined()

    const $spinners = wrapper.findAll('[role="spinbutton"]')
    expect($spinners.length).toBe(4)

    const $hours = $spinners.at(0)
    const $minutes = $spinners.at(1)
    const $seconds = $spinners.at(2)
    const $ampm = $spinners.at(3)

    await $hours.trigger('keydown.up')
    await $hours.trigger('keyup.up')
    await waitRAF()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe('01:00:00')

    await $minutes.trigger('keydown.up')
    await $minutes.trigger('keyup.up')
    await waitRAF()
    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toBe('01:01:00')

    await $seconds.trigger('keydown.up')
    await $seconds.trigger('keyup.up')
    await waitRAF()
    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('input')[2][0]).toBe('01:01:01')

    await $ampm.trigger('keydown.up')
    await $ampm.trigger('keyup.up')
    await waitRAF()
    expect(wrapper.emitted('input').length).toBe(4)
    expect(wrapper.emitted('input')[3][0]).toBe('13:01:01')

    await $ampm.trigger('keydown.up')
    await $ampm.trigger('keyup.up')
    await waitRAF()
    expect(wrapper.emitted('input').length).toBe(5)
    expect(wrapper.emitted('input')[4][0]).toBe('01:01:01')

    wrapper.destroy()
  })

  it('blur and focus methods work', async () => {
    const wrapper = mount(BTime, {
      attachTo: document.body
    })

    expect(wrapper.vm).toBeDefined()
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
      attachTo: document.body,
      propsData: {
        showSeconds: true,
        value: '00:00:00',
        // force to 12 hour mode
        hour12: true
      }
    })

    expect(wrapper.vm).toBeDefined()
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

    await $hours.trigger('keydown.right')
    expect(document.activeElement).toBe($minutes.element)

    await $minutes.trigger('keydown.right')
    expect(document.activeElement).toBe($seconds.element)

    await $seconds.trigger('keydown.right')
    expect(document.activeElement).toBe($ampm.element)

    await $ampm.trigger('keydown.right')
    expect(document.activeElement).toBe($hours.element)

    await $hours.trigger('keydown.left')
    expect(document.activeElement).toBe($ampm.element)

    await $ampm.trigger('keydown.left')
    expect(document.activeElement).toBe($seconds.element)

    wrapper.destroy()
  })
})
