import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { PortalTarget } from 'portal-vue'
import { BToaster } from './toaster'

describe('b-toaster', () => {
  it('has expected structure', async () => {
    const wrapper = mount(BToaster, {
      attachToDocument: true,
      stubs: {
        'transition-group': false,
        transition: false
      },
      propsData: {
        name: 'foo'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBe('foo')
    expect(wrapper.attributes('aria-live')).not.toBeDefined()
    expect(wrapper.attributes('aria-atomic')).not.toBeDefined()
    expect(wrapper.attributes('role')).not.toBeDefined()
    expect(wrapper.classes()).toContain('b-toaster')
    expect(wrapper.classes()).toContain('foo')
    expect(wrapper.classes().length).toBe(2)

    expect(wrapper.find('.b-toaster-slot').exists()).toBe(true)
    const $slot = wrapper.find('.b-toaster-slot')
    expect($slot.is(PortalTarget)).toBe(true)
    expect($slot.is('div')).toBe(true)
    expect($slot.classes()).toContain('b-toaster-slot')
    expect($slot.classes()).toContain('vue-portal-target')
    expect($slot.classes().length).toBe(2)
    expect($slot.text()).toEqual('')

    wrapper.destroy()
  })

  it('accepts aria props', async () => {
    const wrapper = mount(BToaster, {
      attachToDocument: true,
      stubs: {
        'transition-group': false,
        transition: false
      },
      propsData: {
        name: 'bar',
        ariaLive: 'assertive',
        ariaAtomic: 'true',
        role: 'alert'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBe('bar')
    expect(wrapper.attributes('aria-live')).toEqual('assertive')
    expect(wrapper.attributes('aria-atomic')).toEqual('true')
    expect(wrapper.attributes('role')).toEqual('alert')

    expect(wrapper.find('.b-toaster-slot').exists()).toBe(true)
    const $slot = wrapper.find('.b-toaster-slot')
    expect($slot.is(PortalTarget)).toBe(true)
    expect($slot.is('div')).toBe(true)
    expect($slot.classes()).toContain('b-toaster-slot')
    expect($slot.classes()).toContain('vue-portal-target')
    expect($slot.classes().length).toBe(2)
    expect($slot.text()).toEqual('')

    wrapper.destroy()
  })
})
