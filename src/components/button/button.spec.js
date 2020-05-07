import { mount } from '@vue/test-utils'
import { BButton } from './button'

describe('button', () => {
  it('has default structure and classes', async () => {
    const wrapper = mount(BButton)

    expect(wrapper.element.tagName).toBe('BUTTON')
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

    wrapper.destroy()
  })

  it('renders a link when href provided', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        href: '/foo/bar'
      }
    })

    expect(wrapper.element.tagName).toBe('A')
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

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BButton, {
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('applies variant class', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        variant: 'danger'
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-danger')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('applies block class', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        block: true
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('btn-block')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('applies rounded-pill class when pill prop set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pill: true
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('rounded-pill')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('applies rounded-0 class when squared prop set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        squared: true
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('rounded-0')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('renders custom root element', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        tag: 'div'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
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

    wrapper.destroy()
  })

  it('button has attribute disabled when disabled set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()

    wrapper.destroy()
  })

  it('link has attribute aria-disabled when disabled set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        href: '/foo/bar',
        disabled: true
      }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('disabled')
    // Both <b-button> and <b-link> add the class 'disabled'
    // `vue-functional-data-merge` or Vue doesn't appear to de-dup classes
    // expect(wrapper.classes().length).toBe(3)
    // Actually returns 4, as disabled is there twice
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    // Shouldn't have a role with href not `#`
    expect(wrapper.attributes('role')).not.toEqual('button')

    wrapper.destroy()
  })

  it('link with href="#" should have role="button"', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        href: '#'
      }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('role')).toEqual('button')

    wrapper.destroy()
  })

  it('should emit click event when clicked', async () => {
    let called = 0
    let evt = null
    const wrapper = mount(BButton, {
      listeners: {
        click: e => {
          evt = e
          called++
        }
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(called).toBe(0)
    expect(evt).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(called).toBe(1)
    expect(evt).toBeInstanceOf(MouseEvent)

    wrapper.destroy()
  })

  it('link with href="#" should treat keydown.space as click', async () => {
    let called = 0
    let evt = null
    const wrapper = mount(BButton, {
      propsData: {
        href: '#'
      },
      listeners: {
        click: e => {
          evt = e
          called++
        }
      }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('role')).toEqual('button')

    expect(called).toBe(0)
    expect(evt).toEqual(null)

    // We add keydown.space to make links act like buttons
    await wrapper.find('.btn').trigger('keydown.space')
    expect(called).toBe(1)
    expect(evt).toBeInstanceOf(Event)

    // Links treat keydown.enter natively as a click

    wrapper.destroy()
  })

  it('should not emit click event when clicked and disabled', async () => {
    let called = 0
    const wrapper = mount(BButton, {
      propsData: {
        disabled: true
      },
      listeners: {
        click: () => {
          called++
        }
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(called).toBe(0)
    await wrapper.find('button').trigger('click')
    expect(called).toBe(0)

    wrapper.destroy()
  })

  it('should not have `.active` class and `aria-pressed` when pressed is null', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: null
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    await wrapper.find('button').trigger('click')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).not.toBeDefined()
    expect(wrapper.attributes('autocomplete')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should not have `.active` class and have `aria-pressed="false"` when pressed is false', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: false
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeDefined()
    expect(wrapper.attributes('aria-pressed')).toBe('false')
    expect(wrapper.attributes('autocomplete')).toBeDefined()
    expect(wrapper.attributes('autocomplete')).toBe('off')

    wrapper.destroy()
  })

  it('should have `.active` class and have `aria-pressed="true"` when pressed is true', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: true
      }
    })

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeDefined()
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    expect(wrapper.attributes('autocomplete')).toBeDefined()
    expect(wrapper.attributes('autocomplete')).toBe('off')

    wrapper.destroy()
  })

  it('pressed should have `.focus` class when focused', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: false
      }
    })

    expect(wrapper.classes()).not.toContain('focus')
    await wrapper.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')
    await wrapper.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')

    wrapper.destroy()
  })

  it('should update the parent sync value on click and when pressed is not null', async () => {
    let called = 0
    const values = []
    const wrapper = mount(BButton, {
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

    await wrapper.find('button').trigger('click')

    expect(called).toBe(1)
    expect(values[0]).toBe(true)

    wrapper.destroy()
  })
})
