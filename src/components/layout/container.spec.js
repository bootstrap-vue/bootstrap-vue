import { mount } from '@vue/test-utils'
import { BContainer } from './container'

describe('layout > container', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BContainer)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BContainer, {
      propsData: {
        tag: 'section'
      }
    })

    expect(wrapper.is('section')).toBe(true)
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('should have container-fluid class when prop fluid set', async () => {
    const wrapper = mount(BContainer, {
      propsData: {
        fluid: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('container-fluid')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('should have container-md class when prop fluid="md"', async () => {
    const wrapper = mount(BContainer, {
      propsData: {
        fluid: 'md'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('container-md')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BContainer, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })
})
