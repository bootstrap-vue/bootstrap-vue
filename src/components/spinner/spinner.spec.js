import { mount } from '@vue/test-utils'
import { BSpinner } from './spinner'

describe('spinner', () => {
  it('default has root element of span, and no children', async () => {
    const wrapper = mount(BSpinner)

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.find('span.sr-only').exists()).toBe(false)

    wrapper.destroy()
  })

  it('renders custom root element when tag prop is set', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: { tag: 'aside' }
      }
    })

    expect(wrapper.element.tagName).toBe('ASIDE')

    wrapper.destroy()
  })

  it('default has inner span when label is set', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          tag: 'div',
          label: 'Loading...'
        }
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('Loading...')

    wrapper.destroy()
  })

  it('accepts custom label text via label slot', async () => {
    const wrapper = mount(BSpinner, {
      slots: { label: 'foobar' },
      context: {}
    })

    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('has inner span class "sr-only" when label is set', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          tag: 'div',
          label: 'Loading...'
        }
      }
    })

    const span = wrapper.find('span')
    expect(span).toBeDefined()
    expect(span.classes().length).toBe(1)
    expect(span.classes()).toContain('sr-only')

    wrapper.destroy()
  })

  it('default has class "spinner-border"', async () => {
    const wrapper = mount(BSpinner)

    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('spinner-border')

    wrapper.destroy()
  })

  it('default has class "spinner-border-sm" when prop small=true', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: { small: true }
      }
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('spinner-border')
    expect(wrapper.classes()).toContain('spinner-border-sm')

    wrapper.destroy()
  })

  it('default has classes "spinner-border" and "text-danger" when prop variant="danger"', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: { variant: 'danger' }
      }
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('spinner-border')
    expect(wrapper.classes()).toContain('text-danger')

    wrapper.destroy()
  })

  it('default has class "text-danger" and "spinner-border-sm" when prop variant="danger" and small=true', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          variant: 'danger',
          small: true
        }
      }
    })

    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('spinner-border')
    expect(wrapper.classes()).toContain('spinner-border-sm')
    expect(wrapper.classes()).toContain('text-danger')

    wrapper.destroy()
  })

  it('does not have role "status" when no label provided', async () => {
    const wrapper = mount(BSpinner)

    expect(wrapper.attributes('role')).not.toBeDefined()

    wrapper.destroy()
  })

  it('has role "status" when label provided', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: { label: 'Loading' }
      }
    })

    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('status')

    wrapper.destroy()
  })

  it('does not add custom role when role prop is set and no label', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          role: 'foobar'
        }
      }
    })

    expect(wrapper.attributes('role')).not.toBeDefined()

    wrapper.destroy()
  })

  it('adds custom role when role prop is set and label provided', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          role: 'foobar',
          label: 'loading'
        }
      }
    })

    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('foobar')

    wrapper.destroy()
  })

  it('has attribute "aria-hidden" when no label provided', async () => {
    const wrapper = mount(BSpinner)

    expect(wrapper.attributes('aria-hidden')).toBeDefined()
    expect(wrapper.attributes('aria-hidden')).toEqual('true')

    wrapper.destroy()
  })

  it('does not have attribute "aria-hidden" when label provided', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: { label: 'loading' }
      }
    })

    expect(wrapper.attributes('aria-hidden')).not.toBeDefined()

    wrapper.destroy()
  })

  it('does not have attribute "aria-hidden" when label slot provided', async () => {
    const wrapper = mount(BSpinner, {
      slots: {
        label: 'loading'
      }
    })

    expect(wrapper.attributes('aria-hidden')).not.toBeDefined()

    wrapper.destroy()
  })

  it('places user supplied attributes on root element', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        attrs: { id: 'foobar' }
      }
    })

    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foobar')

    wrapper.destroy()
  })

  it('places user supplied class on root element', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        class: ['foo', 'bar']
      }
    })

    expect(wrapper.classes()).toContain('spinner-border')
    expect(wrapper.classes()).toContain('foo')
    expect(wrapper.classes()).toContain('bar')

    wrapper.destroy()
  })

  it('has class "spinner-grow" when prop type="grow"', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: { type: 'grow' }
      }
    })

    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('spinner-grow')

    wrapper.destroy()
  })

  it('has class "spinner-grow-sm" when props small=true and type="grow"', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          small: true,
          type: 'grow'
        }
      }
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('spinner-grow')
    expect(wrapper.classes()).toContain('spinner-grow-sm')

    wrapper.destroy()
  })

  it('has classes "spinner-grow" and "text-danger" when props type="grow" and variant="danger"', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          type: 'grow',
          variant: 'danger'
        }
      }
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('spinner-grow')
    expect(wrapper.classes()).toContain('text-danger')

    wrapper.destroy()
  })

  it('has classes "text-info", "spinner-grow" and "spinner-grow-sm" when props type="grow", variant="info" and small=true', async () => {
    const wrapper = mount(BSpinner, {
      context: {
        props: {
          type: 'grow',
          variant: 'info',
          small: true
        }
      }
    })

    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('spinner-grow')
    expect(wrapper.classes()).toContain('spinner-grow-sm')
    expect(wrapper.classes()).toContain('text-info')

    wrapper.destroy()
  })
})
