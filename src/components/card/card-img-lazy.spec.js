import { mount } from '@vue/test-utils'
import { BCardImgLazy } from './card-img-lazy'

describe('card-img-lazy', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25'
      }
    })

    expect(wrapper.element.tagName).toBe('IMG')
    expect(wrapper.classes()).toContain('card-img')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('src')).toBe('https://picsum.photos/600/300/?image=25')
    expect(wrapper.attributes('alt')).toBeUndefined()
    expect(wrapper.attributes('width')).toBe('1')
    expect(wrapper.attributes('height')).toBe('1')

    wrapper.unmount()
  })

  it('has class "card-img-top" when prop `top` is `true`', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        top: true
      }
    })

    expect(wrapper.classes()).toContain('card-img-top')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class "card-img-bottom" when prop `bottom` is `true`', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        bottom: true
      }
    })

    expect(wrapper.classes()).toContain('card-img-bottom')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class "card-img-top" when props `top` and `bottom` is `true`', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        top: true,
        bottom: true
      }
    })

    expect(wrapper.classes()).toContain('card-img-top')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class "card-img-left" when prop `left` is `true`', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        left: true
      }
    })

    expect(wrapper.classes()).toContain('card-img-left')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class "card-img-right" when prop `right` is `true`', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        right: true
      }
    })

    expect(wrapper.classes()).toContain('card-img-right')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has `alt` attribute when `alt` prop set', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        alt: 'image'
      }
    })

    expect(wrapper.classes()).toContain('card-img')
    expect(wrapper.attributes('alt')).toBe('image')

    wrapper.unmount()
  })

  it('has `alt` attribute when `alt` prop is empty', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        alt: ''
      }
    })

    expect(wrapper.classes()).toContain('card-img')
    expect(wrapper.attributes('alt')).toBeDefined()
    expect(wrapper.attributes('alt')).toBe('')

    wrapper.unmount()
  })

  it('has `width` attribute when `width` prop set', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        width: '600'
      }
    })

    expect(wrapper.classes()).toContain('card-img')
    expect(wrapper.attributes('width')).toBe('600')

    wrapper.unmount()
  })

  it('has `height` attribute when `height` prop set', async () => {
    const wrapper = mount(BCardImgLazy, {
      props: {
        src: 'https://picsum.photos/600/300/?image=25',
        height: '300'
      }
    })

    expect(wrapper.classes()).toContain('card-img')
    expect(wrapper.attributes('height')).toBe('300')

    wrapper.unmount()
  })
})
