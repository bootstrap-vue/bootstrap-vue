import { mount } from '@vue/test-utils'
import { BNavText } from './nav-text'

describe('nav > nav-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavText)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNavText, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })
})
