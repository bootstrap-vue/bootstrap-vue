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
    expect(wrapper.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.attributes('width')).toBe('1em')
    expect(wrapper.attributes('height')).toBe('1em')
    expect(wrapper.attributes('viewBox')).toBe('0 0 20 20')
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.find('path').exists()).toBe(true)
  })

  it('b-icon without icon name renders empty SVG element', async () => {
    // This test assumes Vue doesn't puke on unknown component names
    // As we currently do not check the validity of icon names
    const wrapper = mount(BIcon, {
      localVue: localVue
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('')
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.find('svg').isEmpty()).toBe(true)
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

  it('b-icon nudge prop works', async () => {
    // This test assumes Vue doesn't puke on unknown component names
    // As we currently do not check the validity of icon names
    const wrapper = mount(BIcon, {
      localVue: localVue,
      nudge: 4
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('')
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.find('svg').isEmpty()).toBe(true)
    expect(wrapper.element.style.verticalAlign).toEqual(`-0.5em`)

    wrapper.setProps({
      nudge: 0
    })
    expect(wrapper.element.style.verticalAlign).toEqual(``)
  })

  // TODO:
  //   Test for invalid icon name
  //   Test a few individual icon components
})
