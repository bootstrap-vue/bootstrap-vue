import Alert from './alert'
import { mount } from '@vue/test-utils'

describe('alert', () => {
  it('hidden alert renders comment node', async () => {
    const wrapper = mount(Alert, {})
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('visible alert has default class names and attributes', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true
      }
    })
    expect(wrapper.is('div')).toBe(true)

    await wrapper.vm.$nextTick()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')

    wrapper.destroy()
  })

  it('visible alert has variant when prop variant is set', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        variant: 'success'
      }
    })
    expect(wrapper.is('div')).toBe(true)

    await wrapper.vm.$nextTick()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-success')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')

    wrapper.destroy()
  })

  it('hidden alert shows when show prop set', async () => {
    const wrapper = mount(Alert)

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.setProps({
      show: true
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toBeDefined()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')

    wrapper.destroy()
  })

  it('dismiss should have class alert-dismissible', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissable: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert-dismissible')
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')

    wrapper.destroy()
  })

  it('dismissible alert should have close button', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissable: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').classes()).toContain('close')
    expect(wrapper.find('button').attributes('aria-label')).toBe('Close')

    wrapper.destroy()
  })

  it('dismiss button click should close alert', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissable: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert-dismissible')
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.find('button').exists()).toBe(true)

    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('dismiss countdown emits dismiss-count-down event', async () => {
    jest.useFakeTimers()
    const wrapper = mount(Alert, {
      propsData: {
        show: 3
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.html()).toBeDefined()

    expect(wrapper.emitted('dismiss-count-down')).not.toBeDefined()
    jest.runTimersToTime(1001)
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(2) // 3 - 1
    jest.runTimersToTime(2001)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(1) // 3 - 2
    jest.runTimersToTime(3001)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(0) // 3 - 3

    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })
})
