import ImgLazy from './img-lazy'
import { mount } from '@vue/test-utils'

describe('img-lazy', () => {
  it('has root element "img"', async () => {
    const wrapper = mount(ImgLazy)
    expect(wrapper.is('img')).toBe(true)

    wrapper.destroy()
  })

  it('shows when show prop is set', () => {
    const src = 'https://picsum.photos/1024/400/?image=41'
    const wrapper = mount(ImgLazy, {
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
})
