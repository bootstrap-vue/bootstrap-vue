import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { IconsPlugin, BIcon } from './index'

describe('icons', () => {
  const localVue = new CreateLocalVue()

  beforeAll(() => {
    // We install all icon components so that BIcon will work
    localVue.use(IconsPlugin)
  })

  it('b-icon has expected structure', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue,
      propsData: {
        icon: 'alert-circle-fill'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alert-circle-fill')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('true')
    expect(wrapper.find('path').exists()).toBe(true)
  })

  // TODO:
  //   Test for variants
  //   Test for invalid icon name
  //   Test a few individual icon components
})
