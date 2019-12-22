import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { IconsPlugin } from './index'
import { BIcon } from './icon'
import { makeIcon } from './helpers/make-icon'

describe('icons', () => {
  const localVue = new CreateLocalVue()

  const parentComponent = {
    name: 'ParentComponent',
    components: {
      // For testing user defined Icons
      BIconFakeIconTest: makeIcon('FakeIconTest', '<path class="fake-path" />')
    },
    render(h) {
      return h(this.$slots.default)
    }
  }

  beforeAll(() => {
    // We install all icon components so that BIcon will work
    localVue.use(IconsPlugin)
  })

  it('b-icon has expected structure', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue,
      parentComponent: parentComponent,
      propsData: {
        icon: 'alert-circle-fill'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alert-circle-fill')
    expect(wrapper.classes().length).toBe(3)
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

  it('b-icon with empty icon name renders BIconBlank', async () => {
    // This test assumes Vue doesn't puke on unknown component names
    // As we don't specify a parent instance (which has all the registered
    // components for the icons)
    const wrapper = mount(BIcon, {
      localVue: localVue,
      propsData: {
        icon: ''
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('')
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-blank')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').isEmpty()).toBe(true)
  })

  it('b-icon without icon name renders BIconBlank', async () => {
    // This test assumes Vue doesn't puke on unknown component names
    // As we currently do not check the validity of icon names
    const wrapper = mount(BIcon, {
      localVue: localVue,
      parentComponent: parentComponent,
      propsData: {
        icon: undefined
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('')
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.find('svg > g').isEmpty()).toBe(true)
  })

  it('b-icon with unknown icon name renders BIconBlank', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue,
      parentComponent: parentComponent,
      propsData: {
        icon: 'unknown-icon-name'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-blank')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').isEmpty()).toBe(true)
  })

  it('b-icon variant works', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue,
      parentComponent: parentComponent,
      propsData: {
        icon: 'alert-circle-fill',
        variant: 'danger'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alert-circle-fill')
    expect(wrapper.classes()).toContain('text-danger')
    expect(wrapper.classes().length).toBe(4)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.find('path').exists()).toBe(true)
  })

  it('b-icon with custom icon works', async () => {
    const wrapper = mount(BIcon, {
      localVue: localVue,
      // Parent component has a custom icon registered
      parentComponent: parentComponent,
      propsData: {
        icon: 'fake-icon-test'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-fake-icon-test')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g > path.fake-path').exists()).toBe(true)
  })
})
