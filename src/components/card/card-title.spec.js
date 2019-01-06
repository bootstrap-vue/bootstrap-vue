import CardTitle from './card-title'
import { mount } from '@vue/test-utils'

describe('card-title', async () => {
  it('default has tag "h4"', async () => {
    const wrapper = mount(CardTitle)
    expect(wrapper.is('h4')).toBe(true)
  })

  it('default has class "card-title"', async () => {
    const wrapper = mount(CardTitle)
    expect(wrapper.classes()).toContain('card-title')
    expect(wrapper.classes().length).toBe(1)
  })

  it('renders custom tag', async () => {
    const wrapper = mount(CardTitle, {
      context: {
        props: { tag: 'div' }
      }
    })
    expect(wrapper.is('div')).toBe(true)
  })

  it('has content when title prop set', async () => {
    const wrapper = mount(CardTitle, {
      context: {
        props: { title: 'foobar' }
      }
    })
    expect(wrapper.classes()).toContain('card-title')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toContain('foobar')
  })

  it('has content from default slot', async () => {
    const wrapper = mount(CardTitle, {
      context: {
        props: { tag: 'div' }
      },
      slots: {
        default: 'bar'
      }
    })
    expect(wrapper.classes()).toContain('card-title')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toContain('bar')
  })
})
