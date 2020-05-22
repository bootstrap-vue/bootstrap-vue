import { mount } from '@vue/test-utils'
import { VBHover } from './hover'

describe('v-b-hover directive', () => {
  it('works', async () => {
    let hovered1 = false
    let hovered2 = false
    const App = {
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
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(hovered1).toBe(false)

    await wrapper.trigger('mouseenter')
    expect(hovered1).toBe(true)

    await wrapper.trigger('mouseleave')
    expect(hovered1).toBe(false)

    await wrapper.setData({ text: 'BAR' })
    await wrapper.trigger('mouseenter')
    expect(hovered1).toBe(true)

    await wrapper.setData({ changeHandler: true })
    await wrapper.trigger('mouseenter')
    expect(hovered2).toBe(true)

    wrapper.destroy()
  })
})
