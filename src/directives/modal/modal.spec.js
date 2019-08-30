import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { VBModal } from './modal'

const EVENT_SHOW = 'bv::show::modal'

describe('v-b-modal directive', () => {
  it('works on buttons', async () => {
    const localVue = new CreateLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
      directives: {
        bModal: VBModal
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<button v-b-modal.test>button</button>'
    })
    const wrapper = mount(App, {
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('button')).toBe(true)
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $button.element)

    wrapper.destroy()
  })

  it('works on non-buttons', async () => {
    const localVue = new CreateLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
      directives: {
        bModal: VBModal
      },
      data() {
        return {
          text: 'span'
        }
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<span tabindex="0" v-b-modal.test>{{ text }}</span>'
    })
    const wrapper = mount(App, {
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('span')).toBe(true)
    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').text()).toBe('span')

    const $span = wrapper.find('span')
    $span.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $span.element)
    expect(wrapper.find('span').attributes('role')).toBe('button')

    // Test updating component. should maintain role attribute
    wrapper.setData({
      text: 'foobar'
    })
    expect(wrapper.find('span').text()).toBe('foobar')
    expect(wrapper.find('span').attributes('role')).toBe('button')

    wrapper.destroy()
  })
})
