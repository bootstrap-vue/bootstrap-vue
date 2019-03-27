import popoverDirective from './popover'
import PopOver from '../../utils/popover.class'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

// Key which we use to store tooltip object on element
const BV_POPOVER = '__BV_PopOver__'

describe('v-b-popover directive', () => {
  it('should have PopOver class instance', async () => {
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bPopover: popoverDirective
      },
      data() {
        return {}
      },
      template: `<button v-b-popover="'content'" title="foobar">button</button>`
    })

    const wrapper = mount(App, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('button')).toBe(true)
    const $button = wrapper.find('button')

    // Should have instance of popover class on it
    expect($button.element[BV_POPOVER]).toBeDefined()
    expect($button.element[BV_POPOVER]).toBeInstanceOf(PopOver)

    wrapper.destroy()
  })
})
