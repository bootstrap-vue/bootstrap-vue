import { mount } from '@vue/test-utils'
import { waitNT } from '../../tests/utils'
import { focusInMixin } from './focus-in'

describe('mixins/focus-in', () => {
  it('works', async () => {
    let count = 0
    const App = {
      mixins: [focusInMixin],
      // listenForFocusIn comes from the mixin
      created() {
        this.listenForFocusIn = true
      },
      methods: {
        focusInHandler() {
          count++
        }
      },
      render(h) {
        return h('div', [h('button', 'button')])
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body
    })

    const focusinEvent = new FocusEvent('focusin')

    expect(wrapper).toBeDefined()
    expect(count).toBe(0)
    expect(wrapper.vm.listenForFocusIn).toBe(true)

    // When this.listenForFocusIn is true
    expect(count).toBe(0)
    await wrapper.find('button').trigger('focusin')
    expect(count).toBe(1)
    document.dispatchEvent(focusinEvent)
    await waitNT(wrapper.vm)
    expect(count).toBe(2)

    // When this.listenForFocusIn is false
    await wrapper.setData({ listenForFocusIn: false })
    expect(count).toBe(2)
    await wrapper.find('button').trigger('focusin')
    expect(count).toBe(2)
    document.dispatchEvent(focusinEvent)
    await waitNT(wrapper.vm)
    expect(count).toBe(2)

    wrapper.destroy()
  })
})
