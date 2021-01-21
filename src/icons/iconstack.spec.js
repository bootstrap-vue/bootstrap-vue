import { mount } from '@vue/test-utils'
import { BIconstack } from './iconstack'

describe('icons > b-iconstack', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BIconstack)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.attributes('width')).toBe('1em')
    expect(wrapper.attributes('height')).toBe('1em')
    expect(wrapper.attributes('viewBox')).toBe('0 0 16 16')
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.attributes('style')).toBeUndefined()
    expect(wrapper.element.style.fontSize).toEqual('')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeUndefined()
    expect(wrapper.find('svg > g > g').exists()).toBe(false)

    wrapper.destroy()
  })

  it('b-iconstack variant works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        variant: 'danger'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('text-danger')
    expect(wrapper.classes().length).toBe(4)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeUndefined()

    wrapper.destroy()
  })

  it('b-iconstack font-scale prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        fontScale: '1.25'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('style')).toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('125%')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeUndefined()

    wrapper.destroy()
  })

  it('b-icons rotate prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        rotate: '45'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) rotate(45) translate(-8 -8)'
    )

    wrapper.destroy()
  })

  it('b-iconstack scale prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        scale: '1.5'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(8 8) scale(1.5 1.5) translate(-8 -8)'
    )

    wrapper.destroy()
  })

  it('b-iconstack title prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        icon: 'circle-fill',
        title: 'Circle'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')

    const $title = wrapper.find('title')
    expect($title.exists()).toBe(true)
    expect($title.text()).toBe('Circle')

    wrapper.destroy()
  })

  it('b-iconstack <title> should not render when title is undefined', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        icon: 'circle-fill'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')

    const $title = wrapper.find('title')
    expect($title.exists()).toBe(false)

    wrapper.destroy()
  })
})
