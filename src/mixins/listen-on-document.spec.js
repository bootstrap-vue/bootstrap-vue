import { mount } from '@vue/test-utils'
import listenOnDocumentMixin from './listen-on-document'

describe('mixins/listen-on-document', () => {
  it('works', async () => {
    const spyClick1 = jest.fn()
    const spyClick2 = jest.fn()
    const spyFocusin = jest.fn()

    const TestComponent = localVue.extend({
      mixins: [listenOnDocumentMixin],
      created() {
        this.listenOnDocument('click', spyClick1)
        this.listenOnDocument('focusin', spyFocusin)
        this.listenOnDocument('click', spyClick2)
      },
      render(h) {
        return h('div', {}, this.$slots.default)
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
        return h('div', {}, [
          h('span', { }, ''),
          h('input', { type: text }),
          this.destroy ? h() : h(TestComponent, {}, 'test-component')
        ])
      }
    })

    const wrapper = mount(App, {
      attachToDocument: true,
      propsData: {
        destroy: false
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.text()).toEqual('test-component')

    expect(spyClick1).not.toHaveBeenCalled()
    expect(spyClick2).not.toHaveBeenCalled()
    expect(spyFocusin).not.toHaveBeenCalled()

    const $span = wrapper.find('span')
    expect($span.exists()).toBe(true)

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)

    $input.trigger('focusin')

    expect(spyClick1).not.toHaveBeenCalled()
    expect(spyClick2).not.toHaveBeenCalled()
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    $span.trigger('click')

    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(1)
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    wrapper.setProps({
      destroy: true
    })

    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(1)
    expect(spyFocusin).not.toHaveBeenCalled(1)

    $input.trigger('focusin')

    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(1)
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    $span.trigger('click')

    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(1)
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    wrapper.destroy()
  })
})
