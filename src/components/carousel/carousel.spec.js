import Carousel from './carousel'
// import Slide from './carousel-slide'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

const localVue = new CreateLocalVue()

const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

describe('carousel', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(Carousel, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()

    // Outer wrapper
    // <div role="region" aria-busy="false" class="carousel slide" id="__BVID__52"></div>
    expect(wrapper.is('div')).toBe(true)
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

    // slide wrapper
    // <div role="list" class="carousel-inner" id="__BVID__52___BV_inner_"></div>
    expect(wrapper.findAll('.carousel > .carousel-inner').length).toBe(1)
    const $inner = wrapper.find('.carousel > .carousel-inner')
    expect($inner.classes()).toContain('carousel-inner')
    expect($inner.classes().length).toBe(1)
    expect($inner.attributes('role')).toBeDefined()
    expect($inner.attributes('role')).toEqual('list')
    expect($inner.attributes('id')).toBeDefined()
    expect($inner.attributes('id')).toEqual(`${id}___BV_inner_`)

    // controls (none by default)
    // <a href="#" role="button" class="carousel-control-prev" aria-controls="__BVID__55___BV_inner_"></a>
    // <a href="#" role="button" class="carousel-control-next" aria-controls="__BVID__55___BV_inner_"></a>
    expect(wrapper.findAll('.carousel > .carousel-control-prev').length).toBe(0)
    expect(wrapper.findAll('.carousel > .carousel-control-next').length).toBe(0)
    expect(wrapper.findAll('a').length).toBe(0)

    // indicators (hidden by default)
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
    const wrapper = mount(Carousel, {
      localVue: localVue,
      attachToDocument: true,
      propsData: {
        controls: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()

    // Outer wrapper
    // <div role="region" aria-busy="false" class="carousel slide" id="__BVID__52"></div>
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).toContain('slide')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('id')).toBeDefined()
    const id = wrapper.attributes('id')

    // slide wrapper
    // <div role="list" class="carousel-inner" id="__BVID__52___BV_inner_"></div>
    expect(wrapper.findAll('.carousel > .carousel-inner').length).toBe(1)

    // controls
    // <a href="#" role="button" class="carousel-control-prev" aria-controls="__BVID__55___BV_inner_"></a>
    // <a href="#" role="button" class="carousel-control-next" aria-controls="__BVID__55___BV_inner_"></a>
    expect(wrapper.findAll('.carousel > .carousel-control-prev').length).toBe(1)
    expect(wrapper.findAll('.carousel > .carousel-control-next').length).toBe(1)
    expect(wrapper.findAll('a').length).toBe(2)
    const $prev = wrapper.find('.carousel > .carousel-control-prev')
    const $next = wrapper.find('.carousel > .carousel-control-next')
    expect($prev.is('a')).toBe(true)
    expect($next.is('a')).toBe(true)
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

    // indicators (hidden by default)
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
    const wrapper = mount(Carousel, {
      localVue: localVue,
      attachToDocument: true,
      propsData: {
        indicators: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()

    // Outer wrapper
    // <div role="region" aria-busy="false" class="carousel slide" id="__BVID__52"></div>
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('carousel')
    expect(wrapper.classes()).toContain('slide')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('id')).toBeDefined()

    // slide wrapper
    // <div role="list" class="carousel-inner" id="__BVID__52___BV_inner_"></div>
    expect(wrapper.findAll('.carousel > .carousel-inner').length).toBe(1)

    // controls (none by default)
    // <a href="#" role="button" class="carousel-control-prev" aria-controls="__BVID__55___BV_inner_"></a>
    // <a href="#" role="button" class="carousel-control-next" aria-controls="__BVID__55___BV_inner_"></a>
    expect(wrapper.findAll('.carousel > .carousel-control-prev').length).toBe(0)
    expect(wrapper.findAll('.carousel > .carousel-control-next').length).toBe(0)

    // indicators
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
})
