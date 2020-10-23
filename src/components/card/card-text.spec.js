import { mount } from '@vue/test-utils'
import { BCardText } from './card-text'

describe('card-text', () => {
  it('has root element "p"', async () => {
    const wrapper = mount(BCardText)

    expect(wrapper.element.tagName).toBe('P')

    wrapper.unmount()
  })

  it('has class card-text', async () => {
    const wrapper = mount(BCardText)

    expect(wrapper.classes()).toContain('card-text')

    wrapper.unmount()
  })

  it('has custom root element "div" when prop text-tag=div', async () => {
    const wrapper = mount(BCardText, {
      props: { textTag: 'div' }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card-text')

    wrapper.unmount()
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BCardText, {
      attrs: {
        class: 'foobar'
      }
    })

    expect(wrapper.classes()).toContain('card-text')
    expect(wrapper.classes()).toContain('foobar')

    wrapper.unmount()
  })
})
