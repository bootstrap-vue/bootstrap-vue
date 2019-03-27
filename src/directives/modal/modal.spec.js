import modalDirective from './modal'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

const EVENT_SHOW = 'bv::show::modal'

describe('v-b-modal directive', () => {
  it('works on buttons', async () => {
    const localVue = new CreateLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
      directives: {
        bModal: modalDirective
      },
      data() {
        return {}
      },
      mounted() {
        this.$root.on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.off(EVENT_SHOW, spy)
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
})
