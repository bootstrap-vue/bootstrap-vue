import Spinner from './spinner'
import { mount } from '@vue/test-utils'

describe('spinner', async () => {
  it('default has structure <div><span></span></div>', async () => {
    const spinner = mount(Spinner)
    expect(spinner).toBeDefained()
    expect(spinner.is('div')).toBe(true)
    expect(spinner.find('span').exists()).toBe(true)
  })

  it('default has class "spinner-border"', async () => {
    const spinner = mount(Spinner)
    expect(spinner.classes().length).toBe(1)
    expect(spinner.classes()).toContain('spinner-border')
  })

  it('has inner span class "sr-only"', async () => {
    const spinner = mount(Spinner)
    const span = spinner.find('span')
    expect(span).toBeDefined()
    expect(span.classes().length).toBe(1)
    expect(span.classes()).toContain('sr-only')
  })

  it('default has default inner text of "Loading..."', async () => {
    const spinner = mount(Spinner)
    expect(spinner.text()).toBe('Loading...')
  })

  it('accepts custom label text', async () => {
    const spinner = mount(Spinner, {
      context: {
        props: { label: 'foobar' }
      }
    })
    expect(spinner.text()).toBe('foobar')
  })

  it('accepts custom label text via label slot', async () => {
    const spinner = mount(Spinner, {
      slots: { label: 'foobar' },
      context: {}
    })
    expect(spinner.text()).toBe('foobar')
  })

  it('default has class "spinner-border-sm" when prop small=true', async () => {
    const spinner = mount(Spinner, {
      context: {
        props: { small: true }
      }
    })
    expect(spinner.classes().length).toBe(2)
    expect(spinner.classes()).toContain('spinner-border')
    expect(spinner.classes()).toContain('spinner-border-sm')
  })

  it('default has classes :spinner-border" and "text-danger" when prop variant="danger"', async () => {
    const spinner = mount(Spinner, {
      context: {
        props: { variant: 'danger' }
      }
    })
    expect(spinner.classes().length).toBe(2)
    expect(spinner.classes()).toContain('spinner-border')
    expect(spinner.classes()).toContain('text-danger')
  })

  it('default has class "text-danger" and "spinner-border-sm" when prop variant="danger" and small=true', async () => {
    const spinner = mount(Spinner, {
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

  it('default has role "status"', async () => {
    const spinner = mount(Spinner)
    expect(spinner.attributes('role')).toBeDefined()
    expect(spinner.attributes('role')).toEqual('status')
  })

  it('accepts custom role when role prop is set', async () => {
    const spinner = mount(Spinner, {
      context: {
        props: { role: 'foobar' }
      }
    })
    expect(spinner.attributes('role')).toBeDefined()
    expect(spinner.attributes('role')).toEqual('foobar')
  })

  it('renders custom root element tag prop is set', async () => {
    const spinner = mount(Spinner, {
      context: {
        props: { tag: 'aside' }
      }
    })
    expect(spinner.is('aside')).toBe(true)
  })

  it('places user supplied attributes on root element', async () => {
    const spinner = mount(Spinner, {
      context: {
        attrs: { id: 'foobar' }
      }
    })
    expect(spinner.attributes('id')).toBeDefined()
    expect(spinner.attributes('id')).toEqual('foobar')
  })

  it('places user supplied class on root element', async () => {
    const spinner = mount(Spinner, {
      context: {
        class: ['foo', 'bar']
      }
    })
    expect(spinner.classes()).toContain('spinner-broder')
    expect(spinner.classes()).toContain('foo')
    expect(spinner.classes()).toContain('bar')
  })

  it('has class "spinner-grow" when prop type="grow"', async () => {
    const spinner = mount(Spinner, {
      context: {
        props: { type: 'grow' }
      }
    })
    expect(spinner.classes().length).toBe(1)
    expect(spinner.classes()).toContain('spinner-grow')
  })

  it('has class "spinner-grow-sm" when props small=true and type="grow"', async () => {
    const spinner = mount(Spinner, {
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
    const spinner = mount(Spinner, {
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
    const spinner = mount(Spinner, {
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
