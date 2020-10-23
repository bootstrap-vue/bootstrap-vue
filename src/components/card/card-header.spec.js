import { mount } from '@vue/test-utils'
import { BCardHeader } from './card-header'

describe('card-header', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardHeader)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  it('has class card-header', async () => {
    const wrapper = mount(BCardHeader)

    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has custom root element when prop headerTag is set', async () => {
    const wrapper = mount(BCardHeader, {
      props: { headerTag: 'header' }
    })

    expect(wrapper.element.tagName).toBe('HEADER')
    expect(wrapper.classes()).toContain('card-header')

    wrapper.unmount()
  })

  it('has class bg-info when prop headerBgVariant=info', async () => {
    const wrapper = mount(BCardHeader, {
      props: { headerBgVariant: 'info' }
    })

    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class text-info when prop headerTextVariant=info', async () => {
    const wrapper = mount(BCardHeader, {
      props: { headerTextVariant: 'info' }
    })

    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class border-info when prop headerBorderVariant=info', async () => {
    const wrapper = mount(BCardHeader, {
      props: { headerBorderVariant: 'info' }
    })

    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('border-info')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has all variant classes when all variant props set', async () => {
    const wrapper = mount(BCardHeader, {
      props: {
        headerTextVariant: 'info',
        headerBgVariant: 'danger',
        headerBorderVariant: 'dark'
      }
    })

    expect(wrapper.classes()).toContain('card-header')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes()).toContain('bg-danger')
    expect(wrapper.classes()).toContain('border-dark')
    expect(wrapper.classes().length).toBe(4)

    wrapper.unmount()
  })
})
