import { mount } from '@vue/test-utils'
import { BSkeletonImg } from './skeleton-img'

describe('skeleton-img', () => {
  it('component has correct default layout', async () => {
    const wrapper = mount(BSkeletonImg)

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-aspect')
    expect(wrapper.find('.b-aspect-sizer').element.style.paddingBottom).toBe('56.25%')
    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').exists()).toBe(true)
    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').classes()).toContain(
      'b-skeleton-animate-wave'
    )

    wrapper.destroy()
  })

  it('`aspect` prop applies correct padding', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        aspect: '4:3'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-aspect')
    expect(wrapper.find('.b-aspect-sizer').exists()).toBe(true)
    expect(wrapper.find('.b-aspect-sizer').element.style.paddingBottom).toBe('75%')

    wrapper.destroy()
  })

  it('`no-aspect` prop removes wrapping `b-aspect`', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        noAspect: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).not.toContain('b-aspect')
    expect(wrapper.classes()).toContain('b-skeleton-img')
    expect(wrapper.find('.b-aspect-sizer').exists()).toBe(false)
    expect(wrapper.find('.b-aspect-content').exists()).toBe(false)

    wrapper.destroy()
  })

  it('`width` prop applies correct style to element', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        noAspect: true,
        width: '200px'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.element.style.width).toBe('200px')

    wrapper.destroy()
  })

  it('`height` prop applies correct style to element', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        noAspect: true,
        height: '200px'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.element.style.height).toBe('200px')

    wrapper.destroy()
  })

  it('`variant` prop adds `bg-[variant]` class', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').classes()).toContain('bg-primary')

    wrapper.destroy()
  })

  it('has class `b-skeleton-animate-fade` when `animation="fade"` is set', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        animation: 'fade'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').classes()).toContain(
      'b-skeleton-animate-fade'
    )

    wrapper.destroy()
  })

  it('`card-img` applies the correct class', async () => {
    const wrapper = mount(BSkeletonImg, {
      propsData: {
        cardImg: 'top'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').classes()).toContain('card-img-top')

    wrapper.destroy()
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BSkeletonImg, {
      context: {
        class: ['foobar']
      }
    })

    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').exists()).toBe(true)
    expect(wrapper.find('.b-aspect-content > .b-skeleton-img').classes()).toContain('foobar')

    wrapper.destroy()
  })
})
