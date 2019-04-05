import BCardTitle from './card-title'
import { mount } from '@vue/test-utils'

describe('card-title', () => {
  it('default has tag "h4"', async () => {
    const wrapper = mount(BCardTitle)
    expect(wrapper.is('h4')).toBe(true)
  })

  it('default has class "card-title"', async () => {
    const wrapper = mount(BCardTitle)
    expect(wrapper.classes()).toContain('card-title')
    expect(wrapper.classes().length).toBe(1)
  })

  it('renders custom tag', async () => {
    const wrapper = mount(BCardTitle, {
      context: {
        props: { titleTag: 'div' }
      }
    })
    expect(wrapper.is('div')).toBe(true)
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BCardTitle, {
      slots: {
        default: 'bar'
      }
    })
    expect(wrapper.text()).toContain('bar')
  })
})
