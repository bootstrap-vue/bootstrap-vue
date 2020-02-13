import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import listenOnWindowMixin from './listen-on-window'

describe('mixins/listen-on-window', () => {
  const localVue = new CreateLocalVue()

  it('works', async () => {
    const spyResize1 = jest.fn()
    const spyResize2 = jest.fn()
    const spyScroll = jest.fn()

    const TestComponent = localVue.extend({
      mixins: [listenOnWindowMixin],
      props: {
        offResizeOne: {
          type: Boolean,
          default: false
        }
      },
      mounted() {
        this.listenOnWindow('resize', spyResize1)
        this.listenOnWindow('scroll', spyScroll)
        this.listenOnWindow('resize', spyResize2)
      },
      watch: {
        offResizeOne(newVal) {
          if (newVal) {
            this.listenOffWindow('resize', spyResize1)
          }
        }
      },
      render(h) {
        return h('div', this.$slots.default)
      }
    })

    const App = localVue.extend({
      components: { TestComponent },
      props: {
        offResizeOne: {
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
          offResizeOne: this.offResizeOne
        }
        return h('div', [this.destroy ? h() : h(TestComponent, { props }, 'test-component')])
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

    expect(spyResize1).not.toHaveBeenCalled()
    expect(spyResize2).not.toHaveBeenCalled()
    expect(spyScroll).not.toHaveBeenCalled()

    window.dispatchEvent(new Event('scroll'))

    expect(spyResize1).not.toHaveBeenCalled()
    expect(spyResize2).not.toHaveBeenCalled()
    expect(spyScroll).toHaveBeenCalledTimes(1)

    window.dispatchEvent(new Event('resize'))

    expect(spyResize1).toHaveBeenCalledTimes(1)
    expect(spyResize2).toHaveBeenCalledTimes(1)
    expect(spyScroll).toHaveBeenCalledTimes(1)

    wrapper.setProps({
      offResizeOne: true
    })

    window.dispatchEvent(new Event('resize'))

    expect(spyResize1).toHaveBeenCalledTimes(1)
    expect(spyResize2).toHaveBeenCalledTimes(2)
    expect(spyScroll).toHaveBeenCalledTimes(1)

    window.dispatchEvent(new Event('scroll'))

    expect(spyResize1).toHaveBeenCalledTimes(1)
    expect(spyResize2).toHaveBeenCalledTimes(2)
    expect(spyScroll).toHaveBeenCalledTimes(2)

    wrapper.setProps({
      destroy: true
    })

    expect(spyResize1).toHaveBeenCalledTimes(1)
    expect(spyResize2).toHaveBeenCalledTimes(2)
    expect(spyScroll).toHaveBeenCalledTimes(2)

    window.dispatchEvent(new Event('scroll'))

    expect(spyResize1).toHaveBeenCalledTimes(1)
    expect(spyResize2).toHaveBeenCalledTimes(2)
    expect(spyScroll).toHaveBeenCalledTimes(2)

    window.dispatchEvent(new Event('resize'))

    expect(spyResize1).toHaveBeenCalledTimes(1)
    expect(spyResize2).toHaveBeenCalledTimes(2)
    expect(spyScroll).toHaveBeenCalledTimes(2)

    wrapper.destroy()
  })
})
