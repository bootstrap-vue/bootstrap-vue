import CardGroup from './card-group'
import { mount } from '@vue/test-utils'

describe('card-group', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(CardGroup)
    expect(wrapper.is('div')).toBe(true)
  })

  it('has class card-group', async () => {
    const wrapper = mount(CardGroup)
    expect(wrapper.classes()).toContain('card-group')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has custom root element when prop tag is set', async () => {
    const wrapper = mount(CardGroup, {
      context: {
        props: {
          tag: 'article'
        }
      }
    })
    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.classes()).toContain('card-group')
  })

  it('has class card-deck when prop deck=true', async () => {
    const wrapper = mount(CardGroup, {
      context: {
        props: { deck: true }
      }
    })
    expect(wrapper.classes()).toContain('card-deck')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class card-columns when prop columns=true', async () => {
    const wrapper = mount(CardGroup, {
      context: {
        props: { columns: true }
      }
    })
    expect(wrapper.classes()).toContain('card-columns')
    expect(wrapper.classes().length).toBe(1)
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(CardGroup, {
      context: {
        class: ['foobar']
      }
    })
    expect(wrapper.classes()).toContain('card-group')
    expect(wrapper.classes()).toContain('foobar')
  })
})
