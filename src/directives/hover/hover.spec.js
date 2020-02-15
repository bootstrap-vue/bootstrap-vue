import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { VBHover } from './hover'

describe('v-b-hover directive', () => {
  it('works', async () => {
    const localVue = new CreateLocalVue()
    let hovered = false
    const App = localVue.extend({
      directives: {
        BHover: VBHover
      },
      methods: {
        handleHover(isHovered) {
          hovered = isHovered
        }
      },
      template: `<div v-b-hover="handleHover"><span>FOOBAR</span></div>`
    })
    const wrapper = mount(App)

    expect(wrapper.isVueInstance()).toBe(true)
    expect(hovered).toBe(false)

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)

    expect(hovered).tobe(true)

    wrapper.trigger('mouseleave')
    await waitNT(wrapper.vm)

    expect(hovered).tobe(false)

    wrapper.destroy()
  })
})
