import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { waitNT } from '../../tests/utils'
import clickOutMixin from './click-out'

describe('utils/click-out', () => {
  it('works', async () => {
    let count = 0
    const App = Vue.extend({
      mixins: [clickOutMixin],
      // listenForClickOut comes from the mixin data
      created() {
        this.listenForClickOut = true
      },
      methods: {
        clickOutHandler() {
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

    const clickEvt = new MouseEvent('click')

    expect(wrapper).toBeDefined()
    expect(count).toBe(0)
    expect(wrapper.vm.listenForClickOut).toBe(true)

    // When this.listenForClickOut is true
    expect(count).toBe(0)
    wrapper.find('button').trigger('click')
    expect(count).toBe(0)
    wrapper.trigger('click')
    expect(count).toBe(0)
    document.dispatchEvent(clickEvt)
    await waitNT(wrapper.vm)
    expect(count).toBe(1)

    // When this.listenForClickOut is false
    wrapper.setData({
      listenForClickOut: false
    })
    document.dispatchEvent(clickEvt)
    await waitNT(wrapper.vm)
    expect(count).toBe(1)

    wrapper.destroy()
  })
})
