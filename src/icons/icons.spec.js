import { mount, createLocalVue as CreateLocalVue } from 'vue-test-utils'
import { IconsPlugin } from './index'

describe('icons', () => {
  const localVue = new CreateLocalVue()

  beforeAll(() => {
    localVue.use(IconsPlugin)
  })

  describe('b-icon has expected structure', async () => {
    const wrapper = mount('BIcon', {
      localVue: localVue,
      propsData: {
        icon: 'alert-rounded-fill'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alert-rounded-fill')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('true')
    expect(wrapper.find('path').exists()).toBe(true)
  })

  // TODO:
  //   Test for variants
  //   Test a few individual icon components
})
