import { mount } from '@vue/test-utils'
import { BNavText } from './nav-text'

describe('nav > nav-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavText)

    expect(wrapper.is('li')).toBe(true)
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

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })
})
