import clickOutMixin from './clickout'
import { mount } from '@vue/test-utils'

describe('utils/click-out', () => {
  it ('works', async() => {
    let count = 0
    App = Vue.extend({
      mixins: [clickOutMixin],
      data() {
        // listenForClickOut comes from the mixin
      },
      methods: {
        clickOutHandler(evt) {
          count++
        }
      },
      render(h) {
        return h('div', {}, [h('button', {}, 'button')])
      }
    })

    const wrapper = mount(App, {
      attachToDocument: true
    })

    const clickEvt = new MouseEvent('click')

    expect(wrapper).toBeDefined()
    expect(count).toBe(0)
    expect(wrapper.vm.listenForClickOut).toBe(false)

    // When this.listenForClickOut is false
    expect(wraper.find('button').exists()).toBe(true)
    wrapper.find('button').trigger(click)
    expect(count).toBe(0)
    document.dispatchEvent(clickEvt)
    await wrapper.vm.$nextTick()
    expect(count).toBe(0)

    // When this.listenForClickOut is true
    wrapper.setData({
      listenForClickOut: true
    })
    expect(count).toBe(0)
    wrapper.find('button').trigger('click')
    expect(count).toBe(0)
    wrapper.trigger('click')
    expect(count).toBe(0)
    document.dispatchEvent(clickEvt)
    await wrapper.vm.$nextTick()
    expect(count).toBe(1)

    // When this.listenForClickOut returns to false
    wrapper.setData({
      listenForClickOut: false
    })
    document.dispatchEvent(clickEvt)
    await wrapper.vm.$nextTick()
    expect(count).toBe(1)
  })
})
