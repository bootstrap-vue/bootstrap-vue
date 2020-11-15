import { mount } from '@vue/test-utils'
import { BMediaAside } from './media-aside'

describe('media-aside', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BMediaAside)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('media-aside')
    expect(wrapper.classes()).toContain('align-self-start')
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has custom root element when prop `tag` set', async () => {
    const wrapper = mount(BMediaAside, {
      props: {
        tag: 'span'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('media-aside')
    expect(wrapper.classes()).toContain('align-self-start')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has correct class when prop `right` set', async () => {
    const wrapper = mount(BMediaAside, {
      props: {
        right: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('media-aside')
    expect(wrapper.classes()).toContain('media-aside-right')
    expect(wrapper.classes()).toContain('align-self-start')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has alignment class when prop `vertical-align` set', async () => {
    const wrapper = mount(BMediaAside, {
      props: {
        verticalAlign: 'bottom'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('media-aside')
    expect(wrapper.classes()).toContain('align-self-end')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BMediaAside, {
      slots: {
        default: '<b>foobar</b>'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('media-aside')
    expect(wrapper.classes()).toContain('align-self-start')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('b').length).toBe(1)
    expect(wrapper.find('b').text()).toBe('foobar')

    wrapper.unmount()
  })
})
