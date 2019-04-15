import { mount } from '@vue/test-utils'
import BSpinner from './spinner'

describe('spinner', () => {
  it('default has root element of span, and no children', async () => {
    const spinner = mount(BSpinner)
    expect(spinner).toBeDefined()
    expect(spinner.is('span')).toBe(true)
    expect(spinner.find('span.sr-only').exists()).toBe(false)
  })

  it('renders custom root element when tag prop is set', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: { tag: 'aside' }
      }
    })
    expect(spinner.is('aside')).toBe(true)
  })

  it('default has inner span when label is set', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          tag: 'div',
          label: 'Loading...'
        }
      }
    })
    expect(spinner).toBeDefined()
    expect(spinner.is('div')).toBe(true)
    expect(spinner.find('span').exists()).toBe(true)
    expect(spinner.text()).toBe('Loading...')
  })

  it('accepts custom label text via label slot', async () => {
    const spinner = mount(BSpinner, {
      slots: { label: 'foobar' },
      context: {}
    })
    expect(spinner.text()).toBe('foobar')
  })

  it('has inner span class "sr-only" when label is set', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          tag: 'div',
          label: 'Loading...'
        }
      }
    })
    const span = spinner.find('span')
    expect(span).toBeDefined()
    expect(span.classes().length).toBe(1)
    expect(span.classes()).toContain('sr-only')
  })

  it('default has class "spinner-border"', async () => {
    const spinner = mount(BSpinner)
    expect(spinner.classes().length).toBe(1)
    expect(spinner.classes()).toContain('spinner-border')
  })

  it('default has class "spinner-border-sm" when prop small=true', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: { small: true }
      }
    })
    expect(spinner.classes().length).toBe(2)
    expect(spinner.classes()).toContain('spinner-border')
    expect(spinner.classes()).toContain('spinner-border-sm')
  })

  it('default has classes "spinner-border" and "text-danger" when prop variant="danger"', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: { variant: 'danger' }
      }
    })
    expect(spinner.classes().length).toBe(2)
    expect(spinner.classes()).toContain('spinner-border')
    expect(spinner.classes()).toContain('text-danger')
  })

  it('default has class "text-danger" and "spinner-border-sm" when prop variant="danger" and small=true', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          variant: 'danger',
          small: true
        }
      }
    })
    expect(spinner.classes().length).toBe(3)
    expect(spinner.classes()).toContain('spinner-border')
    expect(spinner.classes()).toContain('spinner-border-sm')
    expect(spinner.classes()).toContain('text-danger')
  })

  it('does not have role "status" when no label provided', async () => {
    const spinner = mount(BSpinner)
    expect(spinner.attributes('role')).not.toBeDefined()
  })

  it('has role "status" when label provided', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: { label: 'Loading' }
      }
    })
    expect(spinner.attributes('role')).toBeDefined()
    expect(spinner.attributes('role')).toEqual('status')
  })

  it('does not add custom role when role prop is set and no label', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          role: 'foobar'
        }
      }
    })
    expect(spinner.attributes('role')).not.toBeDefined()
  })

  it('adds custom role when role prop is set and label provided', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          role: 'foobar',
          label: 'loading'
        }
      }
    })
    expect(spinner.attributes('role')).toBeDefined()
    expect(spinner.attributes('role')).toEqual('foobar')
  })

  it('has attribute "aria-hidden" when no label provided', async () => {
    const spinner = mount(BSpinner)
    expect(spinner.attributes('aria-hidden')).toBeDefined()
    expect(spinner.attributes('aria-hidden')).toEqual('true')
  })

  it('does not have attribute "aria-hidden" when label provided', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: { label: 'loading' }
      }
    })
    expect(spinner.attributes('aria-hidden')).not.toBeDefined()
  })

  it('does not have attribute "aria-hidden" when label slot provided', async () => {
    const spinner = mount(BSpinner, {
      slots: {
        label: 'loading'
      }
    })
    expect(spinner.attributes('aria-hidden')).not.toBeDefined()
  })

  it('places user supplied attributes on root element', async () => {
    const spinner = mount(BSpinner, {
      context: {
        attrs: { id: 'foobar' }
      }
    })
    expect(spinner.attributes('id')).toBeDefined()
    expect(spinner.attributes('id')).toEqual('foobar')
  })

  it('places user supplied class on root element', async () => {
    const spinner = mount(BSpinner, {
      context: {
        class: ['foo', 'bar']
      }
    })
    expect(spinner.classes()).toContain('spinner-border')
    expect(spinner.classes()).toContain('foo')
    expect(spinner.classes()).toContain('bar')
  })

  it('has class "spinner-grow" when prop type="grow"', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: { type: 'grow' }
      }
    })
    expect(spinner.classes().length).toBe(1)
    expect(spinner.classes()).toContain('spinner-grow')
  })

  it('has class "spinner-grow-sm" when props small=true and type="grow"', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          small: true,
          type: 'grow'
        }
      }
    })
    expect(spinner.classes().length).toBe(2)
    expect(spinner.classes()).toContain('spinner-grow')
    expect(spinner.classes()).toContain('spinner-grow-sm')
  })

  it('has classes "spinner-grow" and "text-danger" when props type="grow" and variant="danger"', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          type: 'grow',
          variant: 'danger'
        }
      }
    })
    expect(spinner.classes().length).toBe(2)
    expect(spinner.classes()).toContain('spinner-grow')
    expect(spinner.classes()).toContain('text-danger')
  })

  it('has classes "text-info", "spinner-grow" and "spinner-grow-sm" when props type="grow", variant="info" and small=true', async () => {
    const spinner = mount(BSpinner, {
      context: {
        props: {
          type: 'grow',
          variant: 'info',
          small: true
        }
      }
    })
    expect(spinner.classes().length).toBe(3)
    expect(spinner.classes()).toContain('spinner-grow')
    expect(spinner.classes()).toContain('spinner-grow-sm')
    expect(spinner.classes()).toContain('text-info')
  })
})
