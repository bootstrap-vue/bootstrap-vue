import BImgLazy from './img-lazy'
import { mount } from '@vue/test-utils'

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
    await wrapper.vm.$nextTick()
    expect(wrapper.attributes('src')).toBe(src)

    wrapper.setProps({
      show: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.attributes('src')).toContain('data:image/svg+xml;charset=UTF-8')

    wrapper.destroy()
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

    const resizeEvt = new UIEvent('resize')
    window.dispatchEvent(resizeEvt)

    expect(wrapper.vm.scrollTimeout).not.toBe(null)

    // Since JEST doesnt support getBCR, we fake it by setting
    // the data prop to shown
    wrapper.setData({
      isShown: true
    })

    window.dispatchEvent(resizeEvt)

    expect(wrapper.vm.scrollTimeout).toBe(null)

    wrapper.destroy()
  })
})
