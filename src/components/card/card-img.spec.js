import BCardImg from './card-img'
import { mount } from '@vue/test-utils'

describe('card-image', () => {
  it('default has tag "img"', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25'
        }
      }
    })
    expect(wrapper.is('img')).toBe(true)
  })

  it('default has src attribute', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25'
        }
      }
    })
    expect(wrapper.attributes('src')).toBe('https://picsum.photos/600/300/?image=25')
  })

  it('default does not have attributes alt, width, or height', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25'
        }
      }
    })
    expect(wrapper.attributes('alt')).not.toBeDefined()
    expect(wrapper.attributes('width')).not.toBeDefined()
    expect(wrapper.attributes('height')).not.toBeDefined()
  })

  it('default has class "card-img"', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25'
        }
      }
    })
    expect(wrapper.classes()).toContain('card-img')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class "card-img-top" when prop top=true', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          top: true
        }
      }
    })
    expect(wrapper.classes()).toContain('card-img-top')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class "card-img-bottom" when prop bottom=true', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          bottom: true
        }
      }
    })
    expect(wrapper.classes()).toContain('card-img-bottom')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class "card-img-top" when props top=true and bottom=true', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          top: true,
          bottom: true
        }
      }
    })
    expect(wrapper.classes()).toContain('card-img-top')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class "card-img-left" when prop left=true', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          left: true
        }
      }
    })
    expect(wrapper.classes()).toContain('card-img-left')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class "card-img-right" when prop right=true', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          right: true
        }
      }
    })
    expect(wrapper.classes()).toContain('card-img-right')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has attribute alt when prop alt set', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          alt: 'image'
        }
      }
    })
    expect(wrapper.attributes('alt')).toBeDefined()
    expect(wrapper.attributes('alt')).toBe('image')
  })

  it('has attribute width when prop width set', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          width: '600'
        }
      }
    })
    expect(wrapper.attributes('width')).toBeDefined()
    expect(wrapper.attributes('width')).toBe('600')
  })

  it('has attribute heigth when prop height set', async () => {
    const wrapper = mount(BCardImg, {
      context: {
        props: {
          src: 'https://picsum.photos/600/300/?image=25',
          height: '300'
        }
      }
    })
    expect(wrapper.attributes('height')).toBeDefined()
    expect(wrapper.attributes('height')).toBe('300')
  })
})
