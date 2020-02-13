import { mount } from '@vue/test-utils'
import { waitNT } from '../../tests/utils'
import { BVHoverSwap } from './bv-hover-swap'

describe('utils/bv-hoverswap', () => {
  it('works', async () => {
    const wrapper = mount(BVHoverSwap, {
      slots: {
        default: '<span>FOO</span>',
        hovered: '<span>BAR</span>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.text()).toBe('FOO')

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.text()).toBe('BAR')

    wrapper.trigger('mouseleave')
    await waitNT(wrapper.vm)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.text()).toBe('FOO')

    wrapper.destroy()
  })

  it('works when `parent` is true ', async () => {
    const app = {
      render(h) {
        const $content = h(BVHoverSwap, {
          props: { parent: true },
          slots: { default: '<span>FOO</span>', hovered: '<span>BAR</span>' }
        })
        return h('div', {}, [$content])
      }
    }
    const wrapper = mount(app)

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.find('div > div').is(BVHoverSwap)).toBe(true)
    expect(wrapper.text()).toBe('FOO')

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.text()).toBe('BAR')

    wrapper.trigger('mouseleave')
    await waitNT(wrapper.vm)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.text()).toBe('FOO')

    wrapper.destroy()
  })
})
