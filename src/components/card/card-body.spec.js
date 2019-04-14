import { mount } from '@vue/test-utils'
import BCardBody from './card-body'

describe('card-body', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardBody)
    expect(wrapper.is('div')).toBe(true)
  })

  it('has class card-body', async () => {
    const wrapper = mount(BCardBody)
    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has custom root element when prop bodyTag is set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          bodyTag: 'article'
        }
      }
    })
    expect(wrapper.is('article')).toBe(true)
    expect(wrapper.classes()).toContain('card-body')
  })

  it('has class bg-info when prop bodyBgVariant=info', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: { bodyBgVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class text-info when prop bodyTextVariant=info', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: { bodyTextVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class border-info when prop bodyBorderVariant=info', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: { bodyBorderVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('border-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has all variant classes when all variant props set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          bodyTextVariant: 'info',
          bodyBgVariant: 'danger',
          bodyBorderVariant: 'dark'
        }
      }
    })
    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes()).toContain('bg-danger')
    expect(wrapper.classes()).toContain('border-dark')
    expect(wrapper.classes().length).toBe(4)
  })

  it('has class "card-img-overlay" when overlay="true"', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          overlay: true
        }
      }
    })
    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('card-img-overlay')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has card-title when title prop is set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          title: 'title'
        }
      }
    })
    expect(wrapper.find('div.card-title')).toBeDefined()
  })

  it('has card-sub-title when sub-title prop is set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          subTitle: 'sub title'
        }
      }
    })
    expect(wrapper.find('div.card-subtitle')).toBeDefined()
  })
})
