import { mount } from '@vue/test-utils'
import { BContainer } from './container'

describe('layout > container', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BContainer)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BContainer, {
      props: {
        tag: 'section'
      }
    })

    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('should have container-fluid class when prop fluid set', async () => {
    const wrapper = mount(BContainer, {
      props: {
        fluid: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container-fluid')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('should have container-md class when prop fluid="md"', async () => {
    const wrapper = mount(BContainer, {
      props: {
        fluid: 'md'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container-md')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BContainer, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })
})
