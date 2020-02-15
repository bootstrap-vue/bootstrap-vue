import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { VBHover } from './hover'

describe('v-b-hover directive', () => {
  it('works', async () => {
    const localVue = new CreateLocalVue()
    let hovered1 = false
    let hovered2 = false
    const App = localVue.extend({
      data() {
        return {
          text: 'FOO',
          changeHandler: false
        }
      },
      directives: {
        BHover: VBHover
      },
      methods: {
        handleHover1(isHovered) {
          hovered1 = isHovered
        },
        handleHover2(isHovered) {
          hovered2 = isHovered
        }
      },
      template: `<div v-b-hover="changeHandler ? handleHover2 : handleHover1"><span>{{ text }}</span></div>`
    })
    const wrapper = mount(App)

    expect(wrapper.isVueInstance()).toBe(true)
    expect(hovered1).toBe(false)

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(hovered1).toBe(true)

    wrapper.trigger('mouseleave')
    await waitNT(wrapper.vm)

    expect(hovered1).toBe(false)

    wrapper.setData({ text: 'BAR' })

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(hovered1).toBe(true)

    wrapper.setData({ changeHandler: true })

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(hovered2).toBe(true)

    wrapper.destroy()
  })
})
