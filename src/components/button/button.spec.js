import Button from './button'
import { mount } from '@vue/test-utils'

describe('button', () => {
  it('has default structure and classes', async () => {
    const wrapper = mount(Button)

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('role')).not.toBeDefined()
    expect(wrapper.attributes('disabled')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    expect(wrapper.attributes('autocomplete')).not.toBeDefined()
    expect(wrapper.attributes('tabindex')).not.toBeDefined()
  })

  it('renders a link when href provided', async () => {
    const wrapper = mount(Button, {
      propsData: {
        href: '/foo/bar'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).not.toBeDefined()
    expect(wrapper.attributes('disabled')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    expect(wrapper.attributes('autocomplete')).not.toBeDefined()
    expect(wrapper.attributes('tabindex')).not.toBeDefined()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('foobar')
  })

  it('applies variant class', async () => {
    const wrapper = mount(Button, {
      propsData: {
        variant: 'danger'
      }
    })

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-danger')
    expect(wrapper.classes().length).toBe(2)
  })

  it('applies block class', async () => {
    const wrapper = mount(Button, {
      propsData: {
        block: true
      }
    })

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('btn-block')
    expect(wrapper.classes().length).toBe(3)
  })

  it('renders custom root element', async () => {
    const wrapper = mount(Button, {
      propsData: {
        tag: 'div'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('type')).not.toBeDefined()
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.attributes('disabled')).not.toBeDefined()
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    expect(wrapper.attributes('autocomplete')).not.toBeDefined()
  })

  it('button has attribute disabled when disabled set', async () => {
    const wrapper = mount(Button, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
  })

  it('link has attribute aria-disabled when disabled set', async () => {
    const wrapper = mount(Button, {
      propsData: {
        href: '/foo/bar',
        disabled: true
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('disabled')
    // Both b-button and b-link add hte class 'disabled'
    // vue-functional-data-merge or Vue doesn't appear to de-dup classes
    // expect(wrapper.classes().length).toBe(3)
    // actually returns 4, as disabled is there twice
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('should emit click event when clicked', async () => {
    let called = 0
    let evt = null
    const wrapper = mount(Button, {
      listeners: {
        click: e => {
          evt = e
          called++
        }
      }
    })

    expect(wrapper.is('button')).toBe(true)
    expect(called).toBe(0)
    expect(evt).toEqual(null)
    wrapper.find('button').trigger('click')
    expect(called).toBe(1)
    expect(evt).toBeInstanceOf(MouseEvent)
  })

  it('should not emit click event when clicked and disabled', async () => {
    let called = 0
    const wrapper = mount(Button, {
      propsData: {
        disabled: true
      },
      listeners: {
        click: e => {
          called++
        }
      }
    })

    expect(wrapper.is('button')).toBe(true)
    expect(called).toBe(0)
    wrapper.find('button').trigger('click')
    expect(called).toBe(0)
  })

  it('should not have `.active` class and `aria-pressed` when pressed is null', async () => {
    const wrapper = mount(Button, {
      propsData: {
        pressed: null
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    wrapper.find('button').trigger('click')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    expect(wrapper.attributes('autocomplete')).not.toBeDefined()
  })

  it('should not have `.active` class and have `aria-pressed="false"` when pressed is false', async () => {
    const wrapper = mount(Button, {
      propsData: {
        pressed: false
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeDefined()
    expect(wrapper.attributes('aria-pressed')).toBe('false')
    expect(wrapper.attributes('autocomplete')).toBeDefined()
    expect(wrapper.attributes('autocomplete')).toBe('off')
  })

  it('should have `.active` class and have `aria-pressed="true"` when pressed is true', async () => {
    const wrapper = mount(Button, {
      propsData: {
        pressed: true
      }
    })

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeDefined()
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    expect(wrapper.attributes('autocomplete')).toBeDefined()
    expect(wrapper.attributes('autocomplete')).toBe('off')
  })

  it('pressed should have `.focus` class when focused', async () => {
    const wrapper = mount(Button, {
      propsData: {
        pressed: false
      }
    })

    expect(wrapper.classes()).not.toContain('focus')
    wrapper.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')
    wrapper.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')
  })

  it('should update the parent sync value on click and when pressed is not null', async () => {
    let called = 0
    const values = []
    const wrapper = mount(Button, {
      propsData: {
        pressed: false
      },
      listeners: {
        'update:pressed': val => {
          values.push(val)
          called++
        }
      }
    })

    expect(called).toBe(0)

    wrapper.find('button').trigger('click')

    expect(called).toBe(1)
    expect(values[0]).toBe(true)

    wrapper.find('button').trigger('click')

    expect(called).toBe(2)
    expect(values[1]).toBe(false)
  })
})
