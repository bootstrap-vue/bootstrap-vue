import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BOverlay } from './overlay'

describe('overlay', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BOverlay)
    
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    
    wrapper.destroy()
  })
  
  it('has expected default structure when `no-wrap` is set', async () => {
    const wrapper = mount(BOverlay, {
      propsData: {
        noWrap: true
      }
    })
    
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    
    wrapper.destroy()
  })
})
