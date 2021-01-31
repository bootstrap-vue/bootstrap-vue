import { mount } from '@vue/test-utils'
import { listenOnRootMixin } from './listen-on-root'

describe('mixins/listen-on-root', () => {
  it('works', async () => {
    const spyOn = jest.fn()
    const spyOnce = jest.fn()

    const TestComponent = {
      mixins: [listenOnRootMixin],
      created() {
        this.listenOnRoot('root-on', spyOn)
        this.listenOnRootOnce('root-once', spyOnce)
      },
      render(h) {
        return h('div', this.$slots.default)
      }
    }

    const App = {
      components: { TestComponent },
      props: {
        destroy: {
          type: Boolean,
          default: false
        }
      },
      render(h) {
        return h('div', [this.destroy ? h() : h(TestComponent, 'test-component')])
      }
    }

    const wrapper = mount(App, {
      propsData: {
        destroy: false
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toEqual('test-component')

    expect(spyOn).not.toHaveBeenCalled()
    expect(spyOnce).not.toHaveBeenCalled()

    const $root = wrapper.vm.$root

    $root.$emit('root-on')
    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOnce).not.toHaveBeenCalled()

    $root.$emit('root-once')
    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOnce).toHaveBeenCalledTimes(1)

    $root.$emit('root-on')
    expect(spyOn).toHaveBeenCalledTimes(2)
    expect(spyOnce).toHaveBeenCalledTimes(1)

    $root.$emit('root-once')
    expect(spyOn).toHaveBeenCalledTimes(2)
    expect(spyOnce).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ destroy: true })
    expect(spyOn).toHaveBeenCalledTimes(2)
    expect(spyOnce).toHaveBeenCalledTimes(1)

    $root.$emit('root-on')
    expect(spyOn).toHaveBeenCalledTimes(2)
    expect(spyOnce).toHaveBeenCalledTimes(1)

    $root.$emit('root-once')
    expect(spyOn).toHaveBeenCalledTimes(2)
    expect(spyOnce).toHaveBeenCalledTimes(1)

    wrapper.destroy()
  })
})
