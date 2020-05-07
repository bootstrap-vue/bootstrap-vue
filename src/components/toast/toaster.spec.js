import { config as vtuConfig, mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { PortalTarget } from 'portal-vue'
import { BToaster } from './toaster'

// Disable the use of the TransitionStub component
// since it doesn't run transition hooks
vtuConfig.stubs['transition-group'] = false
vtuConfig.stubs.transition = false

describe('b-toaster', () => {
  it('has expected structure', async () => {
    const wrapper = mount(BToaster, {
      attachTo: createContainer(),
      propsData: {
        name: 'foo'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
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
    expect($slot.element.tagName).toBe('DIV')
    expect($slot.classes()).toContain('b-toaster-slot')
    expect($slot.classes()).toContain('vue-portal-target')
    expect($slot.classes().length).toBe(2)
    expect($slot.text()).toEqual('')

    wrapper.destroy()
  })

  it('accepts aria props', async () => {
    const wrapper = mount(BToaster, {
      attachTo: createContainer(),
      propsData: {
        name: 'bar',
        ariaLive: 'assertive',
        ariaAtomic: 'true',
        role: 'alert'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('id')).toBe('bar')
    expect(wrapper.attributes('aria-live')).toEqual('assertive')
    expect(wrapper.attributes('aria-atomic')).toEqual('true')
    expect(wrapper.attributes('role')).toEqual('alert')

    expect(wrapper.find('.b-toaster-slot').exists()).toBe(true)
    const $slot = wrapper.find('.b-toaster-slot')
    expect($slot.is(PortalTarget)).toBe(true)
    expect($slot.element.tagName).toBe('DIV')
    expect($slot.classes()).toContain('b-toaster-slot')
    expect($slot.classes()).toContain('vue-portal-target')
    expect($slot.classes().length).toBe(2)
    expect($slot.text()).toEqual('')

    wrapper.destroy()
  })
})
