import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { h } from '../../vue'
import { BAlert } from './alert'

describe('alert', () => {
  it('is not shown default', async () => {
    const wrapper = mount(BAlert)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('div').exists()).toBe(false)

    wrapper.unmount()
  })

  it('is not shown when `show` is `"0"`', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: '0'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('div').exists()).toBe(false)

    wrapper.unmount()
  })

  it('is not shown when `show` is `0`', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: 0
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('div').exists()).toBe(false)

    wrapper.unmount()
  })

  it('has default class names and attributes when visible', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-info')
    expect($div.classes()).not.toContain('fade')
    expect($div.classes()).not.toContain('show')
    expect($div.attributes('role')).toBe('alert')
    expect($div.attributes('aria-live')).toBe('polite')
    expect($div.attributes('aria-atomic')).toBe('true')

    wrapper.unmount()
  })

  it('has default class names and attributes when `show` is `""`', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: ''
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-info')
    expect($div.classes()).not.toContain('fade')
    expect($div.classes()).not.toContain('show')
    expect($div.attributes('role')).toBe('alert')
    expect($div.attributes('aria-live')).toBe('polite')
    expect($div.attributes('aria-atomic')).toBe('true')

    wrapper.unmount()
  })

  it('applies variant when `variant` prop is set', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true,
        variant: 'success'
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-success')

    wrapper.unmount()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true
      },
      slots: {
        default: h('article', 'foobar')
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')

    const $article = $div.find('article')
    expect($article.exists()).toBe(true)
    expect($article.text()).toBe('foobar')

    wrapper.unmount()
  })

  it('appears when `show` prop is set', async () => {
    const wrapper = mount(BAlert)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('div').exists()).toBe(false)

    await wrapper.setProps({ show: true })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')

    wrapper.unmount()
  })

  it('should have "alert-dismissible" class when `dismissible` prop is set', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true,
        dismissible: true
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-dismissible')

    wrapper.unmount()
  })

  it('should have close button when `dismissible` prop is set', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true,
        dismissible: true
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-dismissible')

    const $button = $div.find('button')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('close')
    expect($button.attributes('aria-label')).toBe('Close')

    wrapper.unmount()
  })

  it('should have close button with custom "aria-label" when dismissible', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true,
        dismissible: true,
        dismissLabel: 'foobar'
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-dismissible')

    const $button = $div.find('button')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('close')
    expect($button.attributes('aria-label')).toBe('foobar')

    wrapper.unmount()
  })

  it('should hide when dismiss button is clicked', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: true,
        dismissible: true
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-dismissible')

    expect($div.find('button').exists()).toBe(true)
    expect(wrapper.emitted('dismissed')).toBeUndefined()
    expect(wrapper.emitted('update:show')).toBeUndefined()

    await $div.find('button').trigger('click')

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)
    expect(wrapper.emitted('update:show')).toBeDefined()
    expect(wrapper.emitted('update:show').length).toBe(1)
    expect(wrapper.emitted('update:show')[0][0]).toBe(false)

    wrapper.unmount()
  })

  it('shows with a fade transition when prop `fade` is set', async () => {
    const wrapper = mount(BAlert, {
      props: {
        show: false,
        fade: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('div').exists()).toBe(false)

    await wrapper.setProps({ show: true })
    await waitRAF()

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    // TODO: Find a way to test transition active classes
    // expect($div.classes()).toContain('fade')

    await waitRAF()
    await waitRAF()
    await waitRAF()

    await wrapper.setProps({ show: false })
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)
    // Dismissed won't be emitted unless dismissible=true or show is a number
    expect(wrapper.emitted('dismissed')).toBeUndefined()

    wrapper.unmount()
  })

  it('is hidden after countdown when `show` prop is set to number', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      props: {
        show: 3
      }
    })

    expect(wrapper.find('div').exists()).toBe(true)

    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismissed')).toBeUndefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(3) // 3 - 0

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(2) // 3 - 1

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(1) // 3 - 2

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(4)
    expect(wrapper.emitted('dismiss-count-down')[3][0]).toBe(0) // 3 - 3

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)

    wrapper.unmount()
  })

  it('is hidden after countdown when `show` prop is set to number as string', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      props: {
        show: '3'
      }
    })

    expect(wrapper.find('div').exists()).toBe(true)

    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismissed')).toBeUndefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(3) // 3 - 0

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(2) // 3 - 1

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(1) // 3 - 2

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(4)
    expect(wrapper.emitted('dismiss-count-down')[3][0]).toBe(0) // 3 - 3

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)

    wrapper.unmount()
  })

  it('is hidden properly when `show` value changes during countdown', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      props: {
        show: 2
      }
    })

    expect(wrapper.find('div').exists()).toBe(true)

    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismissed')).toBeUndefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(2) // 2 - 0

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(1) // 2 - 1

    // Reset countdown
    await wrapper.setProps({ show: 3 })

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(3) // 3 - 0

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(4)
    expect(wrapper.emitted('dismiss-count-down')[3][0]).toBe(2) // 3 - 1

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(5)
    expect(wrapper.emitted('dismiss-count-down')[4][0]).toBe(1) // 3 - 2

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(6)
    expect(wrapper.emitted('dismiss-count-down')[5][0]).toBe(0) // 3 - 3

    // Just to make sure there aren't any more timers pending
    jest.runAllTimers()
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(6)

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)

    wrapper.unmount()
  })

  it('is hidden properly when dismissed during countdown', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      props: {
        show: 2,
        dismissible: true
      }
    })

    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.classes()).toContain('alert')
    expect($div.classes()).toContain('alert-dismissible')

    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismissed')).toBeUndefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(2) // 2 - 0

    jest.runTimersToTime(1000)
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(1) // 2 - 1

    await wrapper.find('button').trigger('click')
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(0)

    // Should not emit any new countdown values
    jest.runAllTimers()
    await waitNT(wrapper.vm)

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)

    wrapper.unmount()
  })
})
