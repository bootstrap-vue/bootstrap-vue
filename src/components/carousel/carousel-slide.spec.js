import { mount } from '@vue/test-utils'
import { BCarouselSlide } from './carousel-slide'

describe('carousel-slide', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BCarouselSlide)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('carousel-item')
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('listitem')

    wrapper.unmount()
  })

  it('does not have child "carousel-caption" by default', async () => {
    const wrapper = mount(BCarouselSlide)

    expect(wrapper.find('.carousel-caption').exists()).toBe(false)

    wrapper.unmount()
  })

  it('does not have "img" by default', async () => {
    const wrapper = mount(BCarouselSlide)
    expect(wrapper.find('img').exists()).toBe(false)

    wrapper.unmount()
  })

  it('does not have caption tag "h3" by default', async () => {
    const wrapper = mount(BCarouselSlide)
    expect(wrapper.find('h3').exists()).toBe(false)

    wrapper.unmount()
  })

  it('does not have text tag "p" by default', async () => {
    const wrapper = mount(BCarouselSlide)

    expect(wrapper.find('p').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders default slot inside "carousel-caption"', async () => {
    const wrapper = mount(BCarouselSlide, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').text()).toContain('foobar')

    wrapper.unmount()
  })

  it('has caption tag "h3" when prop "caption" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        caption: 'foobar'
      }
    })

    const content = wrapper.find('.carousel-caption')
    expect(content.find('h3').exists()).toBe(true)
    expect(content.find('h3').text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has text tag "p" when prop "text" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        text: 'foobar'
      }
    })

    const content = wrapper.find('.carousel-caption')
    expect(content.find('p').exists()).toBe(true)
    expect(content.find('p').text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has custom content tag when prop "content-tag" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        contentTag: 'span'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').element.tagName).toBe('SPAN')

    wrapper.unmount()
  })

  it('has display classes on "carousel-caption" when prop "content-visible-up" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        contentVisibleUp: 'lg'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.find('.carousel-caption').exists()).toBe(true)
    expect(wrapper.find('.carousel-caption').classes()).toContain('d-none')
    expect(wrapper.find('.carousel-caption').classes()).toContain('d-lg-block')
    expect(wrapper.find('.carousel-caption').classes().length).toBe(3)

    wrapper.unmount()
  })

  it('does not have style "background" when prop "background" not set', async () => {
    const wrapper = mount(BCarouselSlide)

    expect(wrapper.attributes('style')).toBeUndefined()

    wrapper.unmount()
  })

  it('has style "background" when prop "background" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        background: 'rgb(1, 2, 3)'
      }
    })

    expect(wrapper.attributes('style')).toBeDefined()
    expect(wrapper.attributes('style')).toContain('background:')
    expect(wrapper.attributes('style')).toContain('rgb(')

    wrapper.unmount()
  })

  it('has style background inherited from carousel parent', async () => {
    const wrapper = mount(BCarouselSlide, {
      provide: {
        bvCarousel: {
          background: 'rgb(1, 2, 3)'
        }
      }
    })

    expect(wrapper.attributes('style')).toBeDefined()
    expect(wrapper.attributes('style')).toContain('background:')
    expect(wrapper.attributes('style')).toContain('rgb(')

    wrapper.unmount()
  })

  it('has custom caption tag when prop "caption-tag" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        captionTag: 'h1',
        caption: 'foobar'
      }
    })

    const content = wrapper.find('.carousel-caption')
    expect(content.find('h1').exists()).toBe(true)
    expect(content.find('h1').text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has custom text tag when prop "text-tag is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        textTag: 'span',
        text: 'foobar'
      }
    })

    const content = wrapper.find('.carousel-caption')
    expect(content.find('span').exists()).toBe(true)
    expect(content.find('span').text()).toBe('foobar')

    wrapper.unmount()
  })

  it('has image when prop "img-src" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52'
      }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/1024/480/?image=52')

    wrapper.unmount()
  })

  it('has image when prop "img-blank" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        imgBlank: true
      }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('src')).toContain('data:')

    wrapper.unmount()
  })

  it('has image with "alt" attr when prop "img-alt" is set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52',
        imgAlt: 'foobar'
      }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('alt')).toBeDefined()
    expect(wrapper.find('img').attributes('alt')).toBe('foobar')

    wrapper.unmount()
  })

  it('has image with "width" and "height" attrs when props "img-width" and "img-height" are set', async () => {
    const wrapper = mount(BCarouselSlide, {
      props: {
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

    wrapper.unmount()
  })

  it('has image with "width" and "height" attrs inherited from carousel parent', async () => {
    const wrapper = mount(BCarouselSlide, {
      provide: {
        // Mock carousel injection
        bvCarousel: {
          imgWidth: '1024',
          imgHeight: '480'
        }
      },
      props: {
        imgSrc: 'https://picsum.photos/1024/480/?image=52'
      }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBeDefined()
    expect(wrapper.find('img').attributes('width')).toBeDefined()
    expect(wrapper.find('img').attributes('width')).toBe('1024')
    expect(wrapper.find('img').attributes('height')).toBeDefined()
    expect(wrapper.find('img').attributes('height')).toBe('480')

    wrapper.unmount()
  })
})
