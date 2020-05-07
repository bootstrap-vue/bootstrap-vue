import { mount } from '@vue/test-utils'
import { BInputGroupText } from './input-group-text'

describe('input-group > input-group-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BInputGroupText)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')

    wrapper.destroy()
  })

  it('has custom root element when prop tag set', async () => {
    const wrapper = mount(BInputGroupText, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('')

    wrapper.destroy()
  })

  it('renders content of default slot', async () => {
    const wrapper = mount(BInputGroupText, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })
})
