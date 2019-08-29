import { mount } from '@vue/test-utils'
import { BCardText } from './card-text'

describe('card-text', () => {
  it('has root element "p"', async () => {
    const wrapper = mount(BCardText)
    expect(wrapper.is('p')).toBe(true)
  })

  it('has class card-text', async () => {
    const wrapper = mount(BCardText)
    expect(wrapper.classes()).toContain('card-text')
  })

  it('has custom root element "div" when prop text-tag=div', async () => {
    const wrapper = mount(BCardText, {
      context: {
        props: {
          textTag: 'div'
        }
      }
    })
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('card-text')
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BCardText, {
      context: {
        class: ['foobar']
      }
    })
    expect(wrapper.classes()).toContain('card-text')
    expect(wrapper.classes()).toContain('foobar')
  })
})
