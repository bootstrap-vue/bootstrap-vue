import { mount } from '@vue/test-utils'
import { BCardHeader } from './card-header'

describe('card-header', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardHeader)
    expect(wrapper.is('div')).toBe(true)
  })

  it('has class card-header', async () => {
    const wrapper = mount(BCardHeader)
    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has custom root element when prop headerTag is set', async () => {
    const wrapper = mount(BCardHeader, {
      context: {
        props: {
          headerTag: 'header'
        }
      }
    })
    expect(wrapper.is('header')).toBe(true)
    expect(wrapper.classes()).toContain('card-header')
  })

  it('has class bg-info when prop headerBgVariant=info', async () => {
    const wrapper = mount(BCardHeader, {
      context: {
        props: { headerBgVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class text-info when prop headerTextVariant=info', async () => {
    const wrapper = mount(BCardHeader, {
      context: {
        props: { headerTextVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has class border-info when prop headerBorderVariant=info', async () => {
    const wrapper = mount(BCardHeader, {
      context: {
        props: { headerBorderVariant: 'info' }
      }
    })
    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('border-info')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has all variant classes when all variant props set', async () => {
    const wrapper = mount(BCardHeader, {
      context: {
        props: {
          headerTextVariant: 'info',
          headerBgVariant: 'danger',
          headerBorderVariant: 'dark'
        }
      }
    })
    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes()).toContain('bg-danger')
    expect(wrapper.classes()).toContain('border-dark')
    expect(wrapper.classes().length).toBe(4)
  })
})
