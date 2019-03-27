import tooltipDirective from './tooltip'
import ToolTip from '../../utils/tooltip.class'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

// Key which we use to store tooltip object on element
const BV_TOOLTIP = '__BV_ToolTip__'

describe('v-b-tooltip directive', () => {
  it('should have ToolTip class instance', async () => {
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bTooltip: tooltipDirective
      },
      data() {
        return {}
      },
      template: '<button v-b-tooltip title="foobar">button</button>'
    })

    const wrapper = mount(App, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('button')).toBe(true)
    const $button = wrapper.find('button')

    // Should have instance of popover class on it
    expect($button.element[BV_TOOLTIP]).toBeDefined()
    expect($button.element[BV_TOOLTIP]).toBeInstanceOf(ToolTip)

    wrapper.destroy()
  })
})
