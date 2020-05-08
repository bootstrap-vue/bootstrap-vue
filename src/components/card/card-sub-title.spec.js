import { mount } from '@vue/test-utils'
import { BCardSubTitle } from './card-sub-title'

describe('card-sub-title', () => {
  it('default has tag "h6"', async () => {
    const wrapper = mount(BCardSubTitle)

    expect(wrapper.element.tagName).toBe('H6')

    wrapper.destroy()
  })

  it('default has class "card-subtitle" and "text-muted"', async () => {
    const wrapper = mount(BCardSubTitle)

    expect(wrapper.classes()).toContain('card-subtitle')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('renders custom tag', async () => {
    const wrapper = mount(BCardSubTitle, {
      context: {
        props: { subTitleTag: 'div' }
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.destroy()
  })

  it('accepts subTitleTextVariant value', async () => {
    const wrapper = mount(BCardSubTitle, {
      context: {
        props: { subTitleTextVariant: 'info' }
      }
    })

    expect(wrapper.classes()).toContain('card-subtitle')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BCardSubTitle, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.text()).toContain('foobar')

    wrapper.destroy()
  })
})
