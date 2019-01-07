import CarouselSlide from './carousel-slide'
import { mount } from '@vue/test-utils'

describe('carousel-slide', async () => {
  it('has root element "div"', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.is('div')).toBe(true)
  })

  it('has class carousel-item', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.classes()).toContain('carousel-item')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has role=listitem', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('listitem')
  })

  it('has child div.carousel-caption by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').is('div')).toBe(true)
  })

  it('does not have image by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('does not have caption tag h3 by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('does not have text tag p by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('has caption tag h3 when prop caption is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        caption: 'foobar'
      }
    })
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('foobar')
  })

  it('has text tag p when prop text is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        text: 'foobar'
      }
    })
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').text()).toBe('foobar')
  })

  it('has image when prop img-src is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/1024/480/?image=52')
  })

  it('has image when prop img-blank is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        imgBlank: true
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('src')).toContain('data:')
  })
})
