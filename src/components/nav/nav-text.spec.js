import { mount } from '@vue/test-utils'
import { BNavText } from './nav-text'

describe('nav > nav-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavText)

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag is set', async () => {
    const wrapper = mount(BNavText, {
      propsData: {
        tag: 'div'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNavText, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })
})
