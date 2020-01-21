import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { BIconstack } from './iconstack'

describe('icons > b-iconstack', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BIconStack, {})

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.attributes('width')).toBe('1em')
    expect(wrapper.attributes('height')).toBe('1em')
    expect(wrapper.attributes('viewBox')).toBe('0 0 20 20')
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.attributes('style')).not.toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g > g').exists()).toBe(false)
  })

  it('has renders default slot', async () => {
    const wrapper = mount(BIconStack, {
      slots: {
        default: '<svg class="foo"></svg>'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.attributes('width')).toBe('1em')
    expect(wrapper.attributes('height')).toBe('1em')
    expect(wrapper.attributes('viewBox')).toBe('0 0 20 20')
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.attributes('style')).not.toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g > g').exists()).toBe(false)
    expect(wrapper.find('svg > g > svg').exists()).toBe(true)
    expect(wrapper.find('svg > g > svg.foo').exists()).toBe(true)
  })
})
