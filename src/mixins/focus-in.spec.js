import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { waitNT } from '../../tests/utils'
import focusInMixin from './focus-in'

describe('utils/focus-in', () => {
  it('works', async () => {
    let count = 0
    const App = Vue.extend({
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
    })

    const wrapper = mount(App, {
      attachToDocument: true
    })

    const focusinEvt = new FocusEvent('focusin')

    expect(wrapper).toBeDefined()
    expect(count).toBe(0)
    expect(wrapper.vm.listenForFocusIn).toBe(true)

    // When this.listenForFocusIn is true
    expect(count).toBe(0)
    wrapper.find('button').trigger('focusin')
    expect(count).toBe(1)
    document.dispatchEvent(focusinEvt)
    await waitNT(wrapper.vm)
    expect(count).toBe(2)

    // When this.listenForFocusIn is false
    wrapper.setData({
      listenForFocusIn: false
    })
    expect(count).toBe(2)
    wrapper.find('button').trigger('focusin')
    expect(count).toBe(2)
    document.dispatchEvent(focusinEvt)
    await waitNT(wrapper.vm)
    expect(count).toBe(2)

    wrapper.destroy()
  })
})
