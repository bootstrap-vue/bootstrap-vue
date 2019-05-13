import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import BImgLazy from './img-lazy'

const src = 'https://picsum.photos/1024/400/?image=41'

describe('img-lazy', () => {
  it('has root element "img"', async () => {
    const wrapper = mount(BImgLazy, {
      propsData: {
        src: src
      }
    })
    expect(wrapper.is('img')).toBe(true)

    wrapper.destroy()
  })

  it('is initially shown show prop is set', async () => {
    const wrapper = mount(BImgLazy, {
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
      propsData: {
        src: src,
        show: false
      }
    })
    expect(wrapper.is('img')).toBe(true)

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')

    wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('src')).toBe(src)

    wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')

    wrapper.destroy()
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('scroll events', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('triggers check on resize event event', async () => {
      const src = 'https://picsum.photos/1024/400/?image=41'
      const wrapper = mount(BImgLazy, {
        attachToDocument: true,
        propsData: {
          src: src
        }
      })
      expect(wrapper.is('img')).toBe(true)

      expect(wrapper.attributes('src')).toBeDefined()
      expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')

      expect(wrapper.vm.scrollTimeout).toBe(null)

      // Fake getBCR
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
          width: 24,
          height: 24,
          top: 0,
          left: 0,
          bottom: 10,
          right: 10
        }
      })

      const resizeEvt = new UIEvent('resize')
      window.dispatchEvent(resizeEvt)

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.scrollTimeout).not.toBe(null)

      // Since JSDOM doesnt support getBCR, we fake it by setting
      // the data prop to shown
      // wrapper.setData({
      //   isShown: true
      // })

      expect(wrapper.attributes('src')).not.toContain('data:image/svg+xml;charset=UTF-8')

      window.dispatchEvent(resizeEvt)

      expect(wrapper.vm.scrollTimeout).toBe(null)

      wrapper.destroy()
    })
  })
})
