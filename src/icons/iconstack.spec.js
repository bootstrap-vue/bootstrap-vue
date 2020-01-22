import { mount } from '@vue/test-utils'
import { BIconstack } from './iconstack'

describe('icons > b-iconstack', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BIconstack, {})

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
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
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
    expect(wrapper.find('svg > g > g').exists()).toBe(false)
  })

  it('b-iconstack variant works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        variant: 'danger'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes()).toContain('text-danger')
    expect(wrapper.classes().length).toBe(4)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
  })

  it('b-iconstack font-scale prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        fontScale: '1.25'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('alt')).toBe('icon')
    expect(wrapper.attributes('focusable')).toBe('false')
    expect(wrapper.attributes('style')).toBeDefined()
    expect(wrapper.element.style.fontSize).toEqual('125%')
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).not.toBeDefined()
  })

  it('b-icons rotate prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        rotate: '45'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(10 10) rotate(45) translate(-10 -10)'
    )
  })

  it('b-iconstack scale prop works', async () => {
    const wrapper = mount(BIconstack, {
      propsData: {
        scale: '1.5'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is('svg')).toBe(true)
    expect(wrapper.classes()).toContain('b-icon')
    expect(wrapper.classes()).toContain('b-iconstack')
    expect(wrapper.classes()).toContain('bi')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.find('svg > g').exists()).toBe(true)
    expect(wrapper.find('svg > g').attributes('transform')).toBeDefined()
    expect(wrapper.find('svg > g').attributes('transform')).toEqual(
      'translate(10 10) scale(1.5 1.5) translate(-10 -10)'
    )
  })
})
