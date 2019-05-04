import { mount } from '@vue/test-utils'
import BToaster from './toaster'

describe('b-toaster', () => {
  it ('has expected structure', async () => {
    const wrapper = mount(BToaster, {
      attachToDocument: true,
      propsData: {
        name: 'foobar'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-toast')
    expect(wrapper.classes()).toContain('foobar')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('id')).toBe('foobar')
    expect(wrapper.find('.b-toaster-slot').exists()).toBe(true)
    const $slot = wrapper.find('.b-toaster-slot')
    expect($slot.is('div')).toBe(true)
    expect($slot.classes()).toContain('b-toaster-slot')
    expect($slot.classes()).toContain('vue-portal-target')
    expect($slot.classes().length).toBe(2)
    expect($slot.attributes('aria-live')).toEqual('polite')
    expect($slot.attributes('aria-atomic')).toEqual('true')
    expect($slot.attributes('role')).not.toBeDefined()
    expect($slot.text()).toEqual('')

    wrapper.destroy()
  })

  it ('accepts aria props', async () => {
    const wrapper = mount(BToaster, {
      attachToDocument: true,
      propsData: {
        name: 'foobar',
        ariaLive: 'assertive',
        ariaAtomic: 'false',
        role: 'alert'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('.b-toaster-slot').exists()).toBe(true)
    const $slot = wrapper.find('.b-toaster-slot')
    expect($slot.is('div')).toBe(true)
    expect($slot.classes()).toContain('b-toaster-slot')
    expect($slot.classes()).toContain('vue-portal-target')
    expect($slot.classes().length).toBe(2)
    expect($slot.attributes('aria-live')).toEqual('assertive')
    expect($slot.attributes('aria-atomic')).toEqual('false')
    expect($slot.attributes('role')).toEqual('alert')
    expect($slot.text()).toEqual('')

    wrapper.destroy()
  })
})
