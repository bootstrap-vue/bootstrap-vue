import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import listenOnRootMixin from './listen-on-root'

describe('mixins/listen-on-root', () => {
  const localVue = new CreateLocalVue()
  it('works', async () => {
    const spyOn = jest.fn()
    const spyOnce = jest.fn()

    const TestComponent = localVue.extend({
      mixins: [listenOnRootMixin],
      created() {
        this.listenOnRoot('root-on', spyOn)
        this.listenOnRootOnce('root-once', spyOnce)
      },
      render(h) {
        return h('div', this.$slots.default)
      }
    })

    const App = localVue.extend({
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
    })

    const wrapper = mount(App, {
      localVue: localVue,
      propsData: {
        destroy: false
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.text()).toEqual('test-component')

    expect(spyOn).not.toHaveBeenCalled()
    expect(spyOnce).not.toHaveBeenCalled()

    const $root = wrapper.vm.$root

    $root.$emit('root-on')

    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOnce).not.toHaveBeenCalled()

    wrapper.setProps({
      destroy: true
    })

    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOnce).not.toHaveBeenCalled()

    $root.$emit('root-on')

    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOnce).not.toHaveBeenCalled()

    $root.$emit('root-once')

    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOnce).not.toHaveBeenCalled()

    wrapper.destroy()
  })
})
