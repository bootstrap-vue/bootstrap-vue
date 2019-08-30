import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BImgLazy } from './img-lazy'

const src = 'https://picsum.photos/1024/400/?image=41'

describe('img-lazy', () => {
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

  it('shows when IntersectionObserver not supported', async () => {
    const wrapper = mount(BImgLazy, {
      attachToDocument: true,
      propsData: {
        src: src,
        show: false
      }
    })

    expect(wrapper.is('img')).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.isShown).toBe(true)

    // It appears that vue-test-utils does not run unbind when the directive is
    // removed from the element. Only when the component is destroyed... unlike Vue
    // Our directive instance should not exist
    // let observer = wrapper.element.__bv__visibility_observer
    // expect(observer).not.toBeDefined()

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain(src)

    wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.attributes('src')).toBe(src)
    expect(wrapper.vm.isShown).toBe(true)

    // Our directive instance should not exist
    // observer = wrapper.element.__bv__visibility_observer
    // expect(observer).not.toBeDefined()

    wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.attributes('src')).toContain(src)

    // Our directive instance should not exist
    // observer = wrapper.element.__bv__visibility_observer
    // expect(observer).not.toBeDefined()

    wrapper.destroy()
  })
})
