import BInputGroupText from './input-group-text'
import { mount } from '@vue/test-utils'

describe('input-group > input-group-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BInputGroupText)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')
  })

  it('has custom root element when prop tag set', async () => {
    const wrapper = mount(BInputGroupText, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')
  })

  it('renders content of default slot', async () => {
    const wrapper = mount(BInputGroupText, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('foobar')
  })
})
