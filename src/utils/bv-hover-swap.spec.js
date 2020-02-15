import { mount } from '@vue/test-utils'
import { waitNT } from '../../tests/utils'
import { BVHoverSwap } from './bv-hover-swap'

describe('utils/bv-hover-swap', () => {
  it('works', async () => {
    const wrapper = mount(BVHoverSwap, {
      slots: {
        default: '<span>FOO</span>',
        hovered: '<span>BAR</span>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
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
      props: {
        parent: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        foo() {
          return this.$createElement('span', {}, 'FOO')
        },
        bar() {
          return this.$createElement('span', {}, 'BAR')
        }
      },
      render(h) {
        const $content = h(BVHoverSwap, {
          props: { parent: this.parent },
          scopedSlots: { default: this.foo, hovered: this.bar }
        })
        return h('div', {}, [$content])
      }
    }
    const wrapper = mount(app, {
      propsData: {
        parent: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
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

    expect(wrapper.text()).toBe('FOO')

    wrapper.setProps({
      parent: false
    })
    await waitNT(wrapper.vm)

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(wrapper.text()).toBe('FOO')

    wrapper.find('div > div').trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(wrapper.text()).toBe('BAR')

    wrapper.destroy()
  })
})
