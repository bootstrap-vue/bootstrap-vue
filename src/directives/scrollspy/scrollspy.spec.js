import scrollspyDirective from './scrollspy'
import ScrollSpy from './scrollspy.class'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

// Key we use to store our instance
const BV_SCROLLSPY = '__BV_ScrollSpy__'

describe('v-b-scrollspy directive', () => {
  it('should have ScrollSpy class instance', async () => {
    const localVue = new CreateLocalVue()

    const App = localVue.extend({
      directives: {
        bScrollspy: scrollspyDirective
      },
      data() {
        return {}
      },
      template: `
        <div>
          <div v-b-scrollspy:scroller>navs</div>
          <div id="scroller" style="overflow-y: scroll;">scroller</div>
        </div>
      `
    })

    const wrapper = mount(App, {
      localVue: localVue,
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    const $div = wrapper.find('div')

    // Should have instance of popover class on it
    expect($div.element[BV_SCROLLSPY]).toBeDefined()
    expect($div.element[BV_SCROLLSPY]).toBeInstanceOf(ScrollSpy)

    wrapper.destroy()
  })
})
