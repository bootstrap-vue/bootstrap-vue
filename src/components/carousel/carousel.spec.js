import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BCarousel } from './carousel'
import { BCarouselSlide } from './carousel-slide'

jest.useFakeTimers()

const App = {
  props: [
    // BCarousel props
    'interval',
    'indicators',
    'controls',
    'fade',
    'noAnimation',
    'noWrap',
    'value',
    // Custom props
    'slideCount'
  ],
  render(h) {
    const props = { ...this.$props }
    const { slideCount = 4 } = props
    delete props.slideCount

    const $slides = [...Array(slideCount)].map((_, i) =>
      h(BCarouselSlide, { key: `slide-${i}` }, `Slide ${i + 1}`)
    )

    return h(BCarousel, { props }, $slides)
  }
}

describe('carousel', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BCarousel, {
      attachTo: document.body
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Outer wrapper
    // <div role="region" aria-busy="false" class="carousel slide" id="__BVID__52"></div>
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).toContain('slide')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('region')
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    // Will be 'false' when no slides (and only true when a slide is sliding)
    expect(wrapper.attributes('aria-busy')).toEqual('false')
    expect(wrapper.attributes('id')).toBeDefined()
    const id = wrapper.attributes('id')

    // Slide wrapper
    // <div role="list" class="carousel-inner" id="__BVID__52___BV_inner_"></div>
    expect(wrapper.findAll('.carousel > .carousel-inner').length).toBe(1)
    const $inner = wrapper.find('.carousel > .carousel-inner')
    expect($inner.classes()).toContain('carousel-inner')
    expect($inner.classes().length).toBe(1)
    expect($inner.attributes('role')).toBeDefined()
    expect($inner.attributes('role')).toEqual('list')
    expect($inner.attributes('id')).toBeDefined()
    expect($inner.attributes('id')).toEqual(`${id}___BV_inner_`)

    // Controls (none by default)
    // <a href="#" role="button" class="carousel-control-prev" aria-controls="__BVID__55___BV_inner_"></a>
    // <a href="#" role="button" class="carousel-control-next" aria-controls="__BVID__55___BV_inner_"></a>
    expect(wrapper.findAll('.carousel > .carousel-control-prev').length).toBe(0)
    expect(wrapper.findAll('.carousel > .carousel-control-next').length).toBe(0)
    expect(wrapper.findAll('a').length).toBe(0)

    // Indicators (hidden by default)
    // <ol
    //   aria-hidden="true"
    //   aria-label="Select a slide to display"
    //   class="carousel-indicators"
    //   id="__BVID__52___BV_indicators_"
    //   aria-owns="__BVID__52___BV_inner_"
    //   style="display: none;"></ol>
    expect(wrapper.findAll('.carousel > ol').length).toBe(1)
    const $indicators = wrapper.find('.carousel > ol')
    expect($indicators.classes()).toContain('carousel-indicators')
    expect($indicators.classes().length).toBe(1)
    expect($indicators.attributes('id')).toBeDefined()
    expect($indicators.attributes('id')).toEqual(`${id}___BV_indicators_`)
    expect($indicators.attributes('aria-owns')).toBeDefined()
    expect($indicators.attributes('aria-owns')).toEqual(`${id}___BV_inner_`)
    expect($indicators.attributes('aria-hidden')).toBeDefined()
    expect($indicators.attributes('aria-hidden')).toEqual('true')
    expect($indicators.attributes('aria-label')).toBeDefined()
    expect($indicators.attributes('aria-label')).toEqual('Select a slide to display')
    expect($indicators.element.style.display).toEqual('none')
    expect($indicators.findAll('li').length).toBe(0) // no slides

    wrapper.destroy()
  })

  it('has prev/next controls when prop controls is set', async () => {
    const wrapper = mount(BCarousel, {
      attachTo: document.body,
      propsData: {
        controls: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Outer wrapper
    // <div role="region" aria-busy="false" class="carousel slide" id="__BVID__52"></div>
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).toContain('slide')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('id')).toBeDefined()
    const id = wrapper.attributes('id')

    // Slide wrapper
    // <div role="list" class="carousel-inner" id="__BVID__52___BV_inner_"></div>
    expect(wrapper.findAll('.carousel > .carousel-inner').length).toBe(1)

    // Controls
    // <a href="#" role="button" class="carousel-control-prev" aria-controls="__BVID__55___BV_inner_"></a>
    // <a href="#" role="button" class="carousel-control-next" aria-controls="__BVID__55___BV_inner_"></a>
    expect(wrapper.findAll('.carousel > .carousel-control-prev').length).toBe(1)
    expect(wrapper.findAll('.carousel > .carousel-control-next').length).toBe(1)
    expect(wrapper.findAll('a').length).toBe(2)
    const $prev = wrapper.find('.carousel > .carousel-control-prev')
    const $next = wrapper.find('.carousel > .carousel-control-next')
    expect($prev.element.tagName).toBe('A')
    expect($next.element.tagName).toBe('A')
    expect($prev.attributes('href')).toEqual('#')
    expect($next.attributes('href')).toEqual('#')
    expect($prev.attributes('role')).toEqual('button')
    expect($next.attributes('role')).toEqual('button')
    expect($prev.attributes('aria-controls')).toEqual(`${id}___BV_inner_`)
    expect($next.attributes('aria-controls')).toEqual(`${id}___BV_inner_`)
    expect($prev.classes()).toContain('carousel-control-prev')
    expect($next.classes()).toContain('carousel-control-next')
    expect($prev.classes().length).toBe(1)
    expect($next.classes().length).toBe(1)

    // Indicators (hidden by default)
    // <ol
    //   aria-hidden="true"
    //   aria-label="Select a slide to display"
    //   class="carousel-indicators"
    //   id="__BVID__52___BV_indicators_"
    //   aria-owns="__BVID__52___BV_inner_"
    //   style="display: none;"></ol>
    expect(wrapper.findAll('.carousel > ol').length).toBe(1)
    const $indicators = wrapper.find('.carousel > ol')
    expect($indicators.classes()).toContain('carousel-indicators')
    expect($indicators.classes().length).toBe(1)
    expect($indicators.element.style.display).toEqual('none')

    wrapper.destroy()
  })

  it('has indicators showing when prop indicators is set', async () => {
    const wrapper = mount(BCarousel, {
      attachTo: document.body,
      propsData: {
        indicators: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Outer wrapper
    // <div role="region" aria-busy="false" class="carousel slide" id="__BVID__52"></div>
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).toContain('slide')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('id')).toBeDefined()

    // Slide wrapper
    // <div role="list" class="carousel-inner" id="__BVID__52___BV_inner_"></div>
    expect(wrapper.findAll('.carousel > .carousel-inner').length).toBe(1)

    // Controls (none by default)
    // <a href="#" role="button" class="carousel-control-prev" aria-controls="__BVID__55___BV_inner_"></a>
    // <a href="#" role="button" class="carousel-control-next" aria-controls="__BVID__55___BV_inner_"></a>
    expect(wrapper.findAll('.carousel > .carousel-control-prev').length).toBe(0)
    expect(wrapper.findAll('.carousel > .carousel-control-next').length).toBe(0)

    // Indicators
    // <ol
    //   aria-hidden="true"
    //   aria-label="Select a slide to display"
    //   class="carousel-indicators"
    //   id="__BVID__52___BV_indicators_"
    //   aria-owns="__BVID__52___BV_inner_"
    //   style="display: none;"></ol>
    expect(wrapper.findAll('.carousel > ol').length).toBe(1)
    const $indicators = wrapper.find('.carousel > ol')
    expect($indicators.classes()).toContain('carousel-indicators')
    expect($indicators.classes().length).toBe(1)
    expect($indicators.element.style.display).toEqual('')

    wrapper.destroy()
  })

  it('should have class "carousel-fade" when prop "fade" is "true"', async () => {
    const wrapper = mount(BCarousel, {
      attachTo: document.body,
      propsData: {
        fade: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).toContain('slide')
    expect(wrapper.classes()).toContain('carousel-fade')

    wrapper.destroy()
  })

  it('should not have class "fade" or "slide" when prop "no-animation" is "true"', async () => {
    const wrapper = mount(BCarousel, {
      attachTo: document.body,
      propsData: {
        noAnimation: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).not.toContain('slide')
    expect(wrapper.classes()).not.toContain('carousel-fade')

    wrapper.destroy()
  })

  it('should not have class "fade" or "slide" when prop "no-animation" and "fade" are "true"', async () => {
    const wrapper = mount(BCarousel, {
      attachTo: document.body,
      propsData: {
        fade: true,
        noAnimation: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).not.toContain('slide')
    expect(wrapper.classes()).not.toContain('carousel-fade')

    wrapper.destroy()
  })

  it('should not automatically scroll to next slide when "interval" is "0"', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    wrapper.destroy()
  })

  it('should scroll to next/prev slide when next/prev clicked', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        controls: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    const $next = $carousel.find('.carousel-control-next')
    const $prev = $carousel.find('.carousel-control-prev')

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    await $next.trigger('click')

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(1)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(1)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(1)

    await $prev.trigger('click')

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(0)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(0)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(0)

    wrapper.destroy()
  })

  it('should scroll to next/prev slide when next/prev space keypress', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        controls: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    const $next = $carousel.find('.carousel-control-next')
    const $prev = $carousel.find('.carousel-control-prev')

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    await $next.trigger('keydown.space')

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(1)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(1)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(1)

    await $prev.trigger('keydown.space')

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(0)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(0)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(0)

    wrapper.destroy()
  })

  it('should scroll to specified slide when indicator clicked', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        controls: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    await $indicators.at(3).trigger('click')

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(3)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(3)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(3)

    await $indicators.at(1).trigger('click')

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(1)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(1)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(1)

    wrapper.destroy()
  })

  it('should scroll to specified slide when indicator keypress space/enter', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        controls: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    await $indicators.at(3).trigger('keydown.space')

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(3)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(3)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(3)

    await $indicators.at(1).trigger('keydown.enter')

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(1)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(1)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(1)

    wrapper.destroy()
  })

  it('should scroll to next/prev slide when key next/prev pressed', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        controls: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    await $carousel.trigger('keydown.right')

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(1)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(1)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(1)

    await $carousel.trigger('keydown.left')

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(0)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(0)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(0)

    wrapper.destroy()
  })

  it('should emit paused and unpaused events when "interval" changed to 0', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('unpaused')).toBeUndefined()
    expect($carousel.emitted('paused')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    expect($carousel.vm.interval).toBe(0)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('unpaused')).toBeUndefined()
    expect($carousel.emitted('paused')).toBeUndefined()

    await wrapper.setProps({
      interval: 1000
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.vm.interval).toBe(1000)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('unpaused')).toBeDefined()
    expect($carousel.emitted('unpaused').length).toBe(1)
    expect($carousel.emitted('paused')).toBeUndefined()

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    await wrapper.setProps({
      interval: 0
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    expect($carousel.vm.interval).toBe(0)
    expect($carousel.emitted('unpaused').length).toBe(1)
    expect($carousel.emitted('paused')).toBeDefined()
    expect($carousel.emitted('paused').length).toBe(1)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    await wrapper.setProps({
      interval: 1000
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    jest.runOnlyPendingTimers()

    expect($carousel.vm.interval).toBe(1000)
    expect($carousel.emitted('unpaused').length).toBe(2)
    expect($carousel.emitted('paused').length).toBe(1)

    wrapper.destroy()
  })

  it('should scroll to specified slide when value (v-model) changed', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        value: 0
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    expect($carousel.vm.index).toBe(0)
    expect($carousel.vm.isSliding).toBe(false)

    await wrapper.setProps({
      value: 1
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(1)
    expect($carousel.vm.isSliding).toBe(true)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(1)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(1)
    expect($carousel.vm.isSliding).toBe(false)

    await wrapper.setProps({
      value: 3
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(3)
    expect($carousel.vm.isSliding).toBe(true)

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(3)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(3)
    expect($carousel.vm.isSliding).toBe(false)

    wrapper.destroy()
  })

  it('changing slides works when "no-animation" set', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        noAnimation: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    expect($carousel.vm.index).toBe(0)
    expect($carousel.vm.isSliding).toBe(false)

    // Transitions (or fallback timers) are not used when no-animation set
    await wrapper.setProps({
      value: 1
    })

    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(1)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(1)
    expect($carousel.vm.index).toBe(1)
    expect($carousel.vm.isSliding).toBe(false)

    await wrapper.setProps({
      value: 3
    })

    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(3)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(3)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(3)
    expect($carousel.vm.index).toBe(3)
    expect($carousel.vm.isSliding).toBe(false)

    wrapper.destroy()
  })

  it('setting new slide when sliding is active, schedules the new slide to happen after finished', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    expect($carousel.vm.index).toBe(0)
    expect($carousel.vm.isSliding).toBe(false)

    await wrapper.setProps({
      value: 1
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(1)
    expect($carousel.vm.index).toBe(1)
    expect($carousel.vm.isSliding).toBe(true)

    // Set new slide while sliding
    await wrapper.setProps({
      value: 3
    })

    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-end').length).toBe(1)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(1)
    // Should issue a new sliding start event
    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(3)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[0][0]).toEqual(1)
    expect($carousel.emitted('input')[1][0]).toEqual(3)
    expect($carousel.vm.index).toBe(3)
    expect($carousel.vm.isSliding).toBe(true)

    // Next transition should happen
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(3)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(3)
    expect($carousel.vm.isSliding).toBe(false)

    wrapper.destroy()
  })

  it('next/prev slide wraps to end/start when "no-wrap is "false"', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        noAnimation: true,
        noWrap: false,
        // Start at last slide
        value: 3
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    expect($carousel.vm.index).toBe(3)
    expect($carousel.vm.isSliding).toBe(false)

    // Transitions (or fallback timers) are not used when no-animation set
    // Call vm.next()
    $carousel.vm.next()
    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start')).toBeDefined()
    expect($carousel.emitted('sliding-end')).toBeDefined()
    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    // Should have index of 0
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(0)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(0)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(0)
    expect($carousel.vm.index).toBe(0)
    expect($carousel.vm.isSliding).toBe(false)

    // Call vm.prev()
    $carousel.vm.prev()
    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    // Should have index set to last slide
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(3)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(3)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(3)
    expect($carousel.vm.index).toBe(3)
    expect($carousel.vm.isSliding).toBe(false)

    wrapper.destroy()
  })

  it('next/prev slide does not wrap to end/start when "no-wrap" is "true"', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        interval: 0,
        // Transitions (or fallback timers) are not used when no-animation set
        noAnimation: true,
        noWrap: true,
        indicators: true,
        // Start at last slide
        value: 3
      }
    })

    expect(wrapper.vm).toBeDefined()
    const $carousel = wrapper.findComponent(BCarousel)
    expect($carousel).toBeDefined()
    expect($carousel.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const $indicators = $carousel.findAll('.carousel-indicators > li')
    expect($indicators.length).toBe(4)

    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    expect($carousel.emitted('input')).toBeUndefined()

    expect($carousel.vm.index).toBe(3)
    expect($carousel.vm.isSliding).toBe(false)

    // Call vm.next()
    $carousel.vm.next()
    await waitNT(wrapper.vm)

    // Should not slide to start
    expect($carousel.emitted('sliding-start')).toBeUndefined()
    expect($carousel.emitted('sliding-end')).toBeUndefined()
    // Should have index of 3 (no input event emitted since value set to 3)
    expect($carousel.emitted('input')).toBeUndefined()
    expect($carousel.vm.index).toBe(3)
    expect($carousel.vm.isSliding).toBe(false)

    // Call vm.prev()
    $carousel.vm.prev()
    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start').length).toBe(1)
    expect($carousel.emitted('sliding-end').length).toBe(1)
    // Should have index set to 2
    expect($carousel.emitted('sliding-start')[0][0]).toEqual(2)
    expect($carousel.emitted('sliding-end')[0][0]).toEqual(2)
    expect($carousel.emitted('input')).toBeDefined()
    expect($carousel.emitted('input').length).toBe(1)
    expect($carousel.emitted('input')[0][0]).toEqual(2)
    expect($carousel.vm.index).toBe(2)
    expect($carousel.vm.isSliding).toBe(false)

    // Call vm.prev()
    $carousel.vm.prev()
    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start').length).toBe(2)
    expect($carousel.emitted('sliding-end').length).toBe(2)
    // Should have index set to 1
    expect($carousel.emitted('sliding-start')[1][0]).toEqual(1)
    expect($carousel.emitted('sliding-end')[1][0]).toEqual(1)
    expect($carousel.emitted('input').length).toBe(2)
    expect($carousel.emitted('input')[1][0]).toEqual(1)
    expect($carousel.vm.index).toBe(1)
    expect($carousel.vm.isSliding).toBe(false)

    // Call vm.prev()
    $carousel.vm.prev()
    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start').length).toBe(3)
    expect($carousel.emitted('sliding-end').length).toBe(3)
    // Should have index set to 0
    expect($carousel.emitted('sliding-start')[2][0]).toEqual(0)
    expect($carousel.emitted('sliding-end')[2][0]).toEqual(0)
    expect($carousel.emitted('input').length).toBe(3)
    expect($carousel.emitted('input')[2][0]).toEqual(0)
    expect($carousel.vm.index).toBe(0)
    expect($carousel.vm.isSliding).toBe(false)

    // Call vm.prev() (should not wrap)
    $carousel.vm.prev()
    await waitNT(wrapper.vm)

    expect($carousel.emitted('sliding-start').length).toBe(3)
    expect($carousel.emitted('sliding-end').length).toBe(3)
    // Should have index still set to 0, and emit input to update v-model
    expect($carousel.emitted('input').length).toBe(4)
    expect($carousel.emitted('input')[3][0]).toEqual(0)
    expect($carousel.vm.index).toBe(0)
    expect($carousel.vm.isSliding).toBe(false)

    wrapper.destroy()
  })
})
