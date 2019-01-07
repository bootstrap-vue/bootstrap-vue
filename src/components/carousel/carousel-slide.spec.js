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
    expect(wrapper.find('.carousel-caption')).toBeDefined()
    expect(wrapper.find('.carousel-caption').is('div')).toBe(true)
  })

  it('does not have image by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('img')).not.toBeDefined()
  })

  it('does not have caption tag h3 by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('h3')).not.toBeDefined()
  })

  it('does not have text tag p by default', async () => {
    const wrapper = mount(CarouselSlide)
    expect(wrapper.find('p')).not.toBeDefined()
  })

  it('has caption tag h3 when prop caption is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        caption: 'foobar'
      }
    })
    expect(wrapper.find('h3')).toBeDefined()
    expect(wrapper.find('h3').text()).toBe('foobar')
  })

  it('has text tag p when prop text is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        text: 'foobar'
      }
    })
    expect(wrapper.find('p')).toBeDefined()
    expect(wrapper.find('p').text()).toBe('foobar')
  })
})
