import { mount } from '@vue/test-utils'
import { BCol } from './col'

describe('layout > col', () => {
  it('should have default expected structure', async () => {
    const wrapper = mount(BCol)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.col > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders custom root element when tag prop set', async () => {
    const wrapper = mount(BCol, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.col > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('should apply breakpoint specific col-{bp}-{#} classes', async () => {
    const wrapper = mount(BCol, {
      propsData: {
        cols: 6,
        sm: 5,
        md: 4,
        lg: 3,
        xl: 2
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col-6')
    expect(wrapper.classes()).toContain('col-sm-5')
    expect(wrapper.classes()).toContain('col-md-4')
    expect(wrapper.classes()).toContain('col-lg-3')
    expect(wrapper.classes()).toContain('col-xl-2')
    expect(wrapper.classes().length).toBe(5)

    wrapper.destroy()
  })

  it('should not have class "col" when only single breakpoint prop specified', async () => {
    const wrapper = mount(BCol, {
      propsData: {
        sm: 5
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col-sm-5')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should apply ".offset-*" classes with "offset-{bp}-{#}" props', async () => {
    const wrapper = mount(BCol, {
      propsData: {
        offset: 6,
        offsetSm: 5,
        offsetMd: 4,
        offsetLg: 3,
        offsetXl: 2
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('offset-6')
    expect(wrapper.classes()).toContain('offset-sm-5')
    expect(wrapper.classes()).toContain('offset-md-4')
    expect(wrapper.classes()).toContain('offset-lg-3')
    expect(wrapper.classes()).toContain('offset-xl-2')
    expect(wrapper.classes().length).toBe(6)

    wrapper.destroy()
  })

  it('should apply ".order-*" classes with "order-{bp}-{#}" props', async () => {
    const wrapper = mount(BCol, {
      propsData: {
        order: 6,
        orderSm: 5,
        orderMd: 4,
        orderLg: 3,
        orderXl: 2
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('order-6')
    expect(wrapper.classes()).toContain('order-sm-5')
    expect(wrapper.classes()).toContain('order-md-4')
    expect(wrapper.classes()).toContain('order-lg-3')
    expect(wrapper.classes()).toContain('order-xl-2')
    expect(wrapper.classes().length).toBe(6)

    wrapper.destroy()
  })

  it("should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop", async () => {
    const wrapper = mount(BCol, {
      propsData: {
        col: true,
        sm: true,
        md: true,
        lg: true,
        xl: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('col-sm')
    expect(wrapper.classes()).toContain('col-md')
    expect(wrapper.classes()).toContain('col-lg')
    expect(wrapper.classes()).toContain('col-xl')
    expect(wrapper.classes().length).toBe(5)

    wrapper.destroy()
  })

  it("should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop set to empty string", async () => {
    const wrapper = mount(BCol, {
      propsData: {
        sm: '',
        md: '',
        lg: '',
        xl: ''
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col-sm')
    expect(wrapper.classes()).toContain('col-md')
    expect(wrapper.classes()).toContain('col-lg')
    expect(wrapper.classes()).toContain('col-xl')
    expect(wrapper.classes().length).toBe(4)

    wrapper.destroy()
  })

  it('should apply ".align-self-*" class with "align-self" prop', async () => {
    const wrapper = mount(BCol, {
      propsData: {
        alignSelf: 'center'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('align-self-center')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  // it('computeBkPtClass helper should compute boolean classes', async () => {
  //   expect(computeBkPtClass('col', 'sm', true)).toBe('col-sm')
  //   expect(computeBkPtClass('col', 'md', true)).toBe('col-md')
  //   expect(computeBkPtClass('col', 'lg', true)).toBe('col-lg')
  //   expect(computeBkPtClass('col', 'xl', true)).toBe('col-xl')
  // })
  //
  // it('computeBkPtClass helper should compute boolean classes when given empty string', async () => {
  //   expect(computeBkPtClass('col', 'sm', '')).toBe('col-sm')
  //   expect(computeBkPtClass('col', 'md', '')).toBe('col-md')
  //   expect(computeBkPtClass('col', 'lg', '')).toBe('col-lg')
  //   expect(computeBkPtClass('col', 'xl', '')).toBe('col-xl')
  // })
  //
  // it("computeBkPtClass helper should NOT compute boolean classes when value 'false' (return 'undefined')", async () => {
  //   expect(computeBkPtClass('col', 'sm', false)).toBe(undefined)
  //   expect(computeBkPtClass('col', 'md', false)).toBe(undefined)
  //   expect(computeBkPtClass('col', 'lg', false)).toBe(undefined)
  //   expect(computeBkPtClass('col', 'xl', false)).toBe(undefined)
  // })
})
