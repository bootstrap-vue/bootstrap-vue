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
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.find('path').exists()).toBe(true)
  })

  it('b-icon without icon name renders nothing', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(false)
    expect(wrapper.text()).toBe('')
    expect(wrapper.html()).toBe('')
  })

  it('b-icon variant works', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue,
      propsData: {
        icon: 'alert-circle-fill',
        variant: 'danger'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alert-circle-fill')
    expect(wrapper.classes()).toContain('text-danger')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.find('path').exists()).toBe(true)
  })

  // TODO:
  //   Test for invalid icon name
  //   Test a few individual icon components
})
