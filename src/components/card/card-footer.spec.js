import BCardFooter from './card-footer'
import { mount } from '@vue/test-utils'

describe('card-footer', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardFooter)
    expect(wrapper.is('div')).toBe(true)
  })

  it('has class card-header', async () => {
    const wrapper = mount(BCardFooter)
    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has custom root element when prop footerTag is set', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: {
          footerTag: 'footer'
        }
      }
    })
    expect(wrapper.is('footer')).toBe(true)
    expect(wrapper.classes()).toContain('card-footer')
  })

  it('has class bg-info when prop footerBgVariant=info', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: { footerBgVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class text-info when prop footerTextVariant=info', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: { footerTextVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class border-info when prop footerBorderVariant=info', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: { footerBorderVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('border-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has all variant classes when all variant props set', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: {
          footerTextVariant: 'info',
          footerBgVariant: 'danger',
          footerBorderVariant: 'dark'
        }
      }
    })
    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes()).toContain('bg-danger')
    expect(wrapper.classes()).toContain('border-dark')
    expect(wrapper.classes().length).toBe(4)
  })
})
