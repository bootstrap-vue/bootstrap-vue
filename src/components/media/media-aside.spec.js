import BMediaAside from './media-aside'
import { mount } from '@vue/test-utils'

describe('media-aside', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BMediaAside)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('align-self-top')
    expect(wrapper.text()).toEqual('')
  })

  it('has custom root element when prop tag set', async () => {
    const wrapper = mount(BMediaAside, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('align-self-top')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')
  })

  it('has alignment class when prop vertical-align set', async () => {
    const wrapper = mount(BMediaAside, {
      propsData: {
        verticalAlign: 'bottom'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('align-self-bottom')
    expect(wrapper.classes().length).toBe(2)
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BMediaAside, {
      slots: {
        default: '<b>foobar</b>'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('align-self-top')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.findAll('b').length).toBe(1)
    expect(wrapper.find('b').text()).toBe('foobar')
  })
})
