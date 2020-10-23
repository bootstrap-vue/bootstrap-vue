import { mount } from '@vue/test-utils'
import { BTableSimple } from './table-simple'

describe('table-simple', () => {
  it('has expected default classes', async () => {
    const wrapper = mount(BTableSimple)

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BTableSimple, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toContain('foobar')

    wrapper.unmount()
  })

  it('has class "table-striped" when striped=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        striped: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-striped')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "table-bordered" when bordered=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        bordered: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-bordered')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "table-borderless" when borderless=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        borderless: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-borderless')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "table-hover" when hover=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        hover: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-hover')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "table-sm" when small=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        small: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-sm')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "table-dark" when dark=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        dark: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-dark')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "border" when outlined=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        outlined: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "b-table-fixed" when fixed=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        fixed: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('b-table-fixed')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.unmount()
  })

  it('has class "table-responsive" when responsive=true', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        responsive: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('table-responsive')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.find('table').classes()).toContain('table')
    expect(wrapper.find('table').classes()).toContain('b-table')
    expect(wrapper.find('table').classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class "table-responsive-md" when responsive=md', async () => {
    const wrapper = mount(BTableSimple, {
      props: {
        responsive: 'md'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('table-responsive-md')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.find('table').classes()).toContain('table')
    expect(wrapper.find('table').classes()).toContain('b-table')
    expect(wrapper.find('table').classes().length).toBe(2)

    wrapper.unmount()
  })
})
