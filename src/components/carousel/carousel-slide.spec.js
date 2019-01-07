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

  it('renders default slot inside carousel-caption', async () => {
    const wrapper = mount(CarouselSlide, {
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').text()).toContain('foobar')
  })

  it('has caption tag h3 when prop caption is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        caption: 'foobar'
      }
    })
    const content = wrapper.find('.carousel-caption')
    expect(content.find('h3').exists()).toBe(true)
    expect(content.find('h3').text()).toBe('foobar')
  })

  it('has text tag p when prop text is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        text: 'foobar'
      }
    })
    const content = wrapper.find('.carousel-caption')
    expect(content.find('p').exists()).toBe(true)
    expect(content.find('p').text()).toBe('foobar')
  })

  it('has custom content tag when prop contentTag is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        contentTag: 'span',
      }
    })
    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').is('span')).toBe(true)
  })

  it('has custom classes on .carousel-caption when prop contentClasses is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        contentClasses: 'foobar',
      }
    })
    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').classes().length).toBe(2)
    expect(wrapper.find('.carousel-caption').classes()).toContain('foobar')
  })

  it('has custom caption tag when prop captionTag is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        captionTag: 'em',
        text: 'foobar'
      }
    })
    const content = wrapper.find('.carousel-caption')
    expect(content.find('em').exists()).toBe(true)
    expect(content.find('em').text()).toBe('foobar')
  })

  it('has custom text tag when prop textTag is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        textTag: 'span',
        text: 'foobar'
      }
    })
    const content = wrapper.find('.carousel-caption')
    expect(content.find('span').exists()).toBe(true)
    expect(content.find('span').text()).toBe('foobar')
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

  it('has image with alt attribute when prop img-alt is set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52',
        imgAlt: 'foobar'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('alt')).toBeDefined()
    expect(wrapper.find('img').attributes('alt')).toBe('foobar')
  })

  it('has image with width and height attrs when props img-width and img-height are set', async () => {
    const wrapper = mount(CarouselSlide, {
      propsData: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52',
        imgWidth: '1024',
        imgHeight: '480'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('width')).toBeDefined()
    expect(wrapper.find('img').attributes('width')).toBe('1024')
    expect(wrapper.find('img').attributes('height')).toBeDefined()
    expect(wrapper.find('img').attributes('height')).toBe('480')
  })

  it('has image with width and height attrs inherited from carousel parent', async () => {
    const wrapper = mount(CarouselSlide, {
      provide: {
        // Mock carousel injection
        carousel() {
          return {
            imgWidth: '1024',
            imgHeight: '480'
          }
        }
      },
      propsData: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('width')).toBeDefined()
    expect(wrapper.find('img').attributes('width')).toBe('1024')
    expect(wrapper.find('img').attributes('height')).toBeDefined()
    expect(wrapper.find('img').attributes('height')).toBe('480')
  })
})
