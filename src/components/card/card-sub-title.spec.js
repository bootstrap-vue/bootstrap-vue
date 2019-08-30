import { mount } from '@vue/test-utils'
import { BCardSubTitle } from './card-sub-title'

describe('card-sub-title', () => {
  it('default has tag "h6"', async () => {
    const wrapper = mount(BCardSubTitle)
    expect(wrapper.is('h6')).toBe(true)
  })

  it('default has class "card-subtitle" and "text-muted"', async () => {
    const wrapper = mount(BCardSubTitle)
    expect(wrapper.classes()).toContain('card-subtitle')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
  })

  it('renders custom tag', async () => {
    const wrapper = mount(BCardSubTitle, {
      context: {
        props: { subTitleTag: 'div' }
      }
    })
    expect(wrapper.is('div')).toBe(true)
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
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BCardSubTitle, {
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.text()).toContain('foobar')
  })
})
