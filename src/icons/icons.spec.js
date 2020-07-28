import { createLocalVue, mount } from '@vue/test-utils'
import { IconsPlugin } from './index'
import { BIcon } from './icon'
import { makeIcon } from './helpers/make-icon'

const localVue = createLocalVue()
localVue.use(IconsPlugin)

describe('icons', () => {
  it('b-icon has expected structure', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('alarm fill')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.attributes('width')).toBe('1em')
    expect(wrapper.attributes('height')).toBe('1em')
    expect(wrapper.attributes('viewBox')).toBe('0 0 16 16')
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.attributes('style')).not.toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon has expected structure when `stacked` prop is true', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        stacked: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).not.toBe('img')
    expect(wrapper.attributes('aria-label')).not.toBe('icon')
    expect(wrapper.attributes('focusable')).not.toBe('false')
    expect(wrapper.attributes('focusable')).not.toBe('true')
    expect(wrapper.attributes('xmlns')).not.toBe('http://www.w3.org/2000/svg')
    expect(wrapper.attributes('width')).not.toBe('1em')
    expect(wrapper.attributes('height')).not.toBe('1em')
    expect(wrapper.attributes('viewBox')).toBe('0 0 16 16')
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.attributes('style')).not.toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g > path').exists()).toBe(false)
    expect(wrapper.find('svg > g > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon with empty icon name renders BIconBlank', async () => {
    // This test assumes Vue doesn't puke on unknown component names
    // As we don't specify a parent instance (which has all the registered
    // components for the icons)
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: ''
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('')
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-blank')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').element).toBeEmptyDOMElement()

    wrapper.destroy()
  })

  it('b-icon without icon name renders BIconBlank', async () => {
    // This test assumes Vue doesn't puke on unknown component names
    // As we currently do not check the validity of icon names
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: undefined
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('')
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g').element).toBeEmptyDOMElement()

    wrapper.destroy()
  })

  it('b-icon with unknown icon name renders BIconBlank', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'unknown-icon-name'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-blank')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g').element).toBeEmptyDOMElement()

    wrapper.destroy()
  })

  it('b-icon variant works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        variant: 'danger'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes()).toContain('text-danger')
    expect(wrapper.classes().length).toBe(4)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('alarm fill')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon font-scale prop works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        fontScale: '1.25'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('alarm fill')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('style')).toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('125%')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon with custom icon works', async () => {
    const ParentComponent = {
      name: 'ParentComponent',
      components: {
        // For testing user defined Icons
        BIconFakeIconTest: makeIcon('FakeIconTest', '<path class="fake-path" />')
      },
      render(h) {
        return h(this.$slots.default)
      }
    }

    const wrapper = mount(BIcon, {
      localVue,
      // Parent component has a custom icon registered
      parentComponent: ParentComponent,
      propsData: {
        icon: 'fake-icon-test'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-fake-icon-test')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g > path.fake-path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon rotate prop works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        rotate: '45'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) rotate(45) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon scale prop works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        scale: '1.5'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(1.5 1.5) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon flip-h prop works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        flipH: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(-1 1) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon flip-v prop works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        flipV: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(1 -1) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon flip-h prop works with flip-v prop', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        flipH: true,
        flipV: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(-1 -1) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon scale prop works with flip-h prop', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        scale: '1.5',
        flipH: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(-1.5 1.5) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon scale prop works with flip-v prop', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        scale: '1.5',
        flipV: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(1.5 -1.5) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon scale prop works with flip-h and flip-v prop', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        scale: '1.5',
        flipH: true,
        flipV: true
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(-1.5 -1.5) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon shift-h and shift-v props work', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        shiftH: 8,
        shiftV: 16
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual('translate(8 -16)')
    expect(wrapper.find('svg > g > g').exists()).toBe(true)
    expect(wrapper.find('svg > g > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon shift-h and shift-v props work with rotate prop', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'alarm-fill',
        rotate: 45,
        shiftH: 8,
        shiftV: 16
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-alarm-fill')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual('translate(8 -16)')
    expect(wrapper.find('svg > g > g').exists()).toBe(true)
    expect(wrapper.find('svg > g > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g > g').attributes('transform')).toEqual(
      'translate(8 8) rotate(45) translate(-8 -8)'
    )
    expect(wrapper.find('svg > g > g > path').exists()).toBe(true)

    wrapper.destroy()
  })

  it('b-icon animation prop works', async () => {
    const wrapper = mount(BIcon, {
      localVue,
      propsData: {
        icon: 'circle-fill',
        animation: 'spin'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('bi-circle-fill')
    expect(wrapper.classes()).toContain('b-icon-animation-spin')

    wrapper.destroy()
  })
})
