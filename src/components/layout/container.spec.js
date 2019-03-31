import Container from './container'
import { mount } from '@vue/test-utils'

describe('container', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(Container)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(Container, {
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
    const wrapper = mount(Container, {
      propsData: {
        fluid: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('container-fluid')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('has content from default slot', async () => {
    const wrapper = mount(Container, {
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
