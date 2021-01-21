import { createLocalVue, mount } from '@vue/test-utils'
import { createContainer, waitNT } from '../../tests/utils'
import { clickOutMixin } from './click-out'

describe('utils/click-out', () => {
  it('works', async () => {
    let count = 0
    const localVue = createLocalVue()
    const App = localVue.extend({
      mixins: [clickOutMixin],
      // `listenForClickOut` comes from the mixin data
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
      attachTo: createContainer(),
      localVue
    })

    const clickEvt = new MouseEvent('click')

    expect(wrapper).toBeDefined()
    expect(count).toBe(0)
    expect(wrapper.vm.listenForClickOut).toBe(true)

    // When `this.listenForClickOut` is `true`
    expect(count).toBe(0)
    await wrapper.find('button').trigger('click')
    expect(count).toBe(0)
    await wrapper.trigger('click')
    expect(count).toBe(0)
    document.dispatchEvent(clickEvt)
    await waitNT(wrapper.vm)
    expect(count).toBe(1)

    // When `this.listenForClickOut` is `false`
    await wrapper.setData({ listenForClickOut: false })
    document.dispatchEvent(clickEvt)
    await waitNT(wrapper.vm)
    expect(count).toBe(1)

    wrapper.destroy()
  })
})
