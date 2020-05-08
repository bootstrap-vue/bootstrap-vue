import { mount } from '@vue/test-utils'
import { BCardTitle } from './card-title'

describe('card-title', () => {
  it('default has tag "h4"', async () => {
    const wrapper = mount(BCardTitle)

    expect(wrapper.element.tagName).toBe('H4')

    wrapper.destroy()
  })

  it('default has class "card-title"', async () => {
    const wrapper = mount(BCardTitle)

    expect(wrapper.classes()).toContain('card-title')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('renders custom tag', async () => {
    const wrapper = mount(BCardTitle, {
      context: {
        props: { titleTag: 'div' }
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.destroy()
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BCardTitle, {
      slots: {
        default: 'bar'
      }
    })

    expect(wrapper.text()).toContain('bar')

    wrapper.destroy()
  })
})
