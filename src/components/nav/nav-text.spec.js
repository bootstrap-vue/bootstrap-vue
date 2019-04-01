import NavText from './nav-text'
import { mount } from '@vue/test-utils'

describe('nav > nav-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(NavText)

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
  })

  it('renders custom root element when prop tag is set', async () => {
    const wrapper = mount(NavText, {
      propsData: {
        tag: 'div'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.classes().length).toBe(1)
  })
})
