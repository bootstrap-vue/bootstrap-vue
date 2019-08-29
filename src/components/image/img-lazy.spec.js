import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BImgLazy } from './img-lazy'

const src = 'https://picsum.photos/1024/400/?image=41'

describe('img-lazy', () => {
  beforeEach(() => {
    // IntersectionObserver not supported by JSDOM
    // So we mock up just the basics
    global.IntersectionObserver = class IntersectionObserver {
      constructor(handler, opts) {
        // We store a copy of handler so we can call it
        // during tests
        this.handler = handler
      }

      observe() {
        return null
      }

      unobserve() {
        return null
      }

      disconnect() {
        return null
      }
    }
  })

  afterEach(() => {
    try {
      delete global.IntersectionObserver
    } catch {}
  })

  it('has root element "img"', async () => {
    const wrapper = mount(BImgLazy, {
      attachToDocument: true,
      propsData: {
        src: src
      }
    })
    expect(wrapper.is('img')).toBe(true)

    wrapper.destroy()
  })

  it('is initially shown show prop is set', async () => {
    const wrapper = mount(BImgLazy, {
      attachToDocument: true,
      propsData: {
        src: src,
        show: true
      }
    })
    expect(wrapper.is('img')).toBe(true)

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toBe(src)

    wrapper.destroy()
  })

  it('shows when show prop is set', async () => {
    const wrapper = mount(BImgLazy, {
      attachToDocument: true,
      propsData: {
        src: src,
        show: false
      }
    })
    expect(wrapper.is('img')).toBe(true)

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')

    // Our directive instance with test "fake" observer
    let observer = wrapper.element.__bv__visibility_observer
    expect(observer).toBeDefined()

    wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('src')).toBe(src)

    // Our directive instance should be gone
    observer = wrapper.element.__bv__visibility_observer
    expect(observer).not.toBeDefined()

    wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')

    // Our directive instance should be back
    observer = wrapper.element.__bv__visibility_observer
    expect(observer).toBeDefined()

    wrapper.destroy()
  })
})
