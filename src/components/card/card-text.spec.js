import { mount } from '@vue/test-utils'
import { BCardText } from './card-text'

describe('card-text', () => {
  it('has root element "p"', async () => {
    const wrapper = mount(BCardText)

    expect(wrapper.element.tagName).toBe('P')

    wrapper.destroy()
  })

  it('has class card-text', async () => {
    const wrapper = mount(BCardText)

    expect(wrapper.classes()).toContain('card-text')

    wrapper.destroy()
  })

  it('has custom root element "div" when prop text-tag=div', async () => {
    const wrapper = mount(BCardText, {
      context: {
        props: {
          textTag: 'div'
        }
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card-text')

    wrapper.destroy()
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BCardText, {
      context: {
        class: ['foobar']
      }
    })

    expect(wrapper.classes()).toContain('card-text')
    expect(wrapper.classes()).toContain('foobar')

    wrapper.destroy()
  })
})
