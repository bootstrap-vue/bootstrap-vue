import { mount } from '@vue/test-utils'
import { listenOnDocumentMixin } from './listen-on-document'

describe('mixins/listen-on-document', () => {
  it('works', async () => {
    const spyClick1 = jest.fn()
    const spyClick2 = jest.fn()
    const spyFocusin = jest.fn()

    const TestComponent = {
      mixins: [listenOnDocumentMixin],
      props: {
        offClickOne: {
          type: Boolean,
          default: false
        }
      },
      mounted() {
        this.listenOnDocument('click', spyClick1)
        this.listenOnDocument('focusin', spyFocusin)
        this.listenOnDocument('click', spyClick2)
      },
      watch: {
        offClickOne(newValue) {
          if (newValue) {
            this.listenOffDocument('click', spyClick1)
          }
        }
      },
      render(h) {
        return h('div', this.$slots.default)
      }
    }

    const App = {
      components: { TestComponent },
      props: {
        offClickOne: {
          type: Boolean,
          default: false
        },
        destroy: {
          type: Boolean,
          default: false
        }
      },
      render(h) {
        const props = {
          offClickOne: this.offClickOne
        }
        return h('div', [
          h('span', ''),
          h('input', { type: 'text' }),
          this.destroy ? h() : h(TestComponent, { props }, 'test-component')
        ])
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body,
      propsData: {
        destroy: false
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toEqual('test-component')

    expect(spyClick1).not.toHaveBeenCalled()
    expect(spyClick2).not.toHaveBeenCalled()
    expect(spyFocusin).not.toHaveBeenCalled()

    const $span = wrapper.find('span')
    expect($span.exists()).toBe(true)

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)

    await $input.trigger('focusin')
    expect(spyClick1).not.toHaveBeenCalled()
    expect(spyClick2).not.toHaveBeenCalled()
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    await $span.trigger('click')
    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(1)
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ offClickOne: true })
    await $span.trigger('click')
    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(2)
    expect(spyFocusin).toHaveBeenCalledTimes(1)

    await $input.trigger('focusin')
    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(2)
    expect(spyFocusin).toHaveBeenCalledTimes(2)

    await wrapper.setProps({ destroy: true })
    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(2)
    expect(spyFocusin).toHaveBeenCalledTimes(2)

    await $input.trigger('focusin')
    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(2)
    expect(spyFocusin).toHaveBeenCalledTimes(2)

    await $span.trigger('click')
    expect(spyClick1).toHaveBeenCalledTimes(1)
    expect(spyClick2).toHaveBeenCalledTimes(2)
    expect(spyFocusin).toHaveBeenCalledTimes(2)

    wrapper.destroy()
  })
})
