import BAlert from './alert'
import { mount } from '@vue/test-utils'

describe('alert', () => {
  it('hidden alert renders comment node', async () => {
    const wrapper = mount(BAlert)
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('hidden alert (show = "0") renders comment node', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: '0'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('hidden alert (show = 0) renders comment node', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: 0
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('visible alert has default class names and attributes', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true
      }
    })
    expect(wrapper.is('div')).toBe(true)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('show')

    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')

    wrapper.destroy()
  })

  it('visible alert (show = "") has default class names and attributes', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: ''
      }
    })
    expect(wrapper.is('div')).toBe(true)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('show')

    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')

    wrapper.destroy()
  })

  it('visible alert has variant when prop variant is set', async () => {
    const wrapper = mount(BAlert, {
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
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')

    wrapper.destroy()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true
      },
      slots: {
        default: '<article>foobar</article>'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)

    await wrapper.vm.$nextTick()

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('article').text()).toBe('foobar')

    wrapper.destroy()
  })

  it('hidden alert shows when show prop set', async () => {
    const wrapper = mount(BAlert)

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

  it('dismissible alert should have class alert-dismissible', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true,
        dismissible: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')
    expect(wrapper.classes()).toContain('alert-dismissible')

    wrapper.destroy()
  })

  it('dismissible alert should have close button', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true,
        dismissible: true
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

  it('dismissible alert should have close button with custom aria-label', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true,
        dismissible: true,
        dismissLabel: 'foobar'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').classes()).toContain('close')
    expect(wrapper.find('button').attributes('aria-label')).toBe('foobar')

    wrapper.destroy()
  })

  it('dismiss button click should close alert', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true,
        dismissible: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert-dismissible')
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.emitted('dismissed')).not.toBeDefined()
    expect(wrapper.emitted('input')).not.toBeDefined()

    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(false)

    wrapper.destroy()
  })

  it('should have class fade when prop fade=true', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: true,
        fade: true
      },
      stubs: {
        // The builtin stub doesn't execute the transition hooks
        // so we let it use the real transition component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')
    expect(wrapper.classes()).toContain('fade')
    expect(wrapper.classes()).toContain('show')

    wrapper.destroy()
  })

  it('fade transition works', async () => {
    const wrapper = mount(BAlert, {
      propsData: {
        show: false,
        fade: true
      },
      stubs: {
        // The builtin stub doesn't execute the transition hooks
        // so we let it use the real transition component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.setProps({
      show: true
    })

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-info')
    expect(wrapper.classes()).toContain('fade')
    expect(wrapper.classes()).toContain('show')

    wrapper.setProps({
      show: false
    })

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    // Dismissed won't be emitted unless dismissible=true or show is a number
    expect(wrapper.emitted('dismissed')).not.toBeDefined()

    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('dismiss countdown emits dismiss-count-down event', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      propsData: {
        show: 3
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.html()).toBeDefined()

    expect(wrapper.emitted('dismissed')).not.toBeDefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(3) // 3 - 0

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(2) // 3 - 1

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(1) // 3 - 2

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(4)
    expect(wrapper.emitted('dismiss-count-down')[3][0]).toBe(0) // 3 - 3

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('dismiss countdown emits dismiss-count-down event when show is number as string', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      propsData: {
        show: '3'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.html()).toBeDefined()

    expect(wrapper.emitted('dismissed')).not.toBeDefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(3) // 3 - 0

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(2) // 3 - 1

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(1) // 3 - 2

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(4)
    expect(wrapper.emitted('dismiss-count-down')[3][0]).toBe(0) // 3 - 3

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('dismiss countdown handles when show value is changed', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      propsData: {
        show: 2
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.html()).toBeDefined()

    expect(wrapper.emitted('dismissed')).not.toBeDefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(2) // 2 - 0

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(1) // 2 - 1

    // Reset countdown
    wrapper.setProps({
      show: 3
    })
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(3) // 3 - 0

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(4)
    expect(wrapper.emitted('dismiss-count-down')[3][0]).toBe(2) // 3 - 1

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(5)
    expect(wrapper.emitted('dismiss-count-down')[4][0]).toBe(1) // 3 - 2

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(6)
    expect(wrapper.emitted('dismiss-count-down')[5][0]).toBe(0) // 3 - 3

    // Just to make sure there aren't any more timers pending
    jest.runAllTimers()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(6)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })

  it('dismiss countdown handles when alert dismissed early', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BAlert, {
      propsData: {
        show: 2,
        dismissible: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.html()).toBeDefined()

    expect(wrapper.emitted('dismissed')).not.toBeDefined()
    expect(wrapper.emitted('dismiss-count-down')).toBeDefined()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(1)
    expect(wrapper.emitted('dismiss-count-down')[0][0]).toBe(2) // 2 - 0

    jest.runTimersToTime(1000)
    expect(wrapper.emitted('dismiss-count-down').length).toBe(2)
    expect(wrapper.emitted('dismiss-count-down')[1][0]).toBe(1) // 2 - 1

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)
    expect(wrapper.emitted('dismiss-count-down')[2][0]).toBe(0)

    // Should not emit any new countdown values
    jest.runAllTimers()
    expect(wrapper.emitted('dismiss-count-down').length).toBe(3)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.emitted('dismissed')).toBeDefined()
    expect(wrapper.emitted('dismissed').length).toBe(1)
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.html()).not.toBeDefined()

    wrapper.destroy()
  })
})
