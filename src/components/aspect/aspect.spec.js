import { mount } from '@vue/test-utils'
import { BAspect } from './aspect'

describe('aspect', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BAspect)
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-aspect')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes().length).toBe(2)

    const $sizer = wrapper.find('.b-aspect-sizer')
    expect($sizer.exists()).toBe(true)
    expect($sizer.is('div')).toBe(true)
    expect($sizer.classes()).toContain('flex-grow-1')
    expect($sizer.attributes('style')).toContain('padding-bottom: 100%;')

    const $content = wrapper.find('.b-aspect-content')
    expect($content.exists()).toBe(true)
    expect($content.is('div')).toBe(true)
    expect($content.classes()).toContain('flex-grow-1')
    expect($content.classes()).toContain('w-100')
    expect($content.classes()).toContain('mw-100')
    expect($content.attributes('style')).toContain('margin-left: -100%;')

    wrapper.destroy()
  })
})
