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
    // Default aspect ratio is 1:1
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

  it('should have expected structure when prop `tag` is set', async () => {
    const wrapper = mount(BAspect, {
      propsData: {
        tag: 'section'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('section')).toBe(true)
    expect(wrapper.classes()).toContain('b-aspect')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes().length).toBe(2)

    const $sizer = wrapper.find('.b-aspect-sizer')
    expect($sizer.exists()).toBe(true)
    expect($sizer.is('div')).toBe(true)
    expect($sizer.classes()).toContain('flex-grow-1')
    // Default aspect ratio is 1:1
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

  it('should have expected structure when aspect is set to "4:3"', async () => {
    const wrapper = mount(BAspect, {
      propsData: {
        aspect: '4:3'
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-aspect')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes().length).toBe(2)

    const $sizer = wrapper.find('.b-aspect-sizer')
    expect($sizer.exists()).toBe(true)
    expect($sizer.is('div')).toBe(true)
    expect($sizer.classes()).toContain('flex-grow-1')
    expect($sizer.attributes('style')).toContain('padding-bottom: 75%;')

    const $content = wrapper.find('.b-aspect-content')
    expect($content.exists()).toBe(true)
    expect($content.is('div')).toBe(true)
    expect($content.classes()).toContain('flex-grow-1')
    expect($content.classes()).toContain('w-100')
    expect($content.classes()).toContain('mw-100')
    expect($content.attributes('style')).toContain('margin-left: -100%;')

    wrapper.destroy()
  })
  it('should have expected structure when aspect is set to `16/9`', async () => {
    const wrapper = mount(BAspect, {
      propsData: {
        aspect: 16 / 9
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-aspect')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes().length).toBe(2)

    const $sizer = wrapper.find('.b-aspect-sizer')
    expect($sizer.exists()).toBe(true)
    expect($sizer.is('div')).toBe(true)
    expect($sizer.classes()).toContain('flex-grow-1')
    expect($sizer.attributes('style')).toContain('padding-bottom: 56.25%;')

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
