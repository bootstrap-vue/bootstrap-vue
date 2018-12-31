import CardText from './card-text'
import { mount } from '@vue/test-utils'

describe('card-text', async () => {
  it('has root element "p"', async () => {
    const wrapper = mount(CardText)
    expect(wraper.is('p')).toBe(true)
  })

  it('has class card-text', async () => {
    const wrapper = mount(CardText)
    expect(wraper.classes()).toContain('card-text')
  })

  it('has custom root element "div" when prop text-tag=div', async () => {
    const wrapper = mount(CardText, {
      context: {
        props: {
          textTag: 'div'
        }
      }
    })
    expect(wraper.is('div')).toBe(true)
    expect(wraper.classes()).toContain('card-text')
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(CardText, {
      context: {
        class: ['foobar']
      }
    })
    expect(wraper.classes()).toContain('card-text')
    expect(wraper.classes()).toContain('foobar')
  })
})
