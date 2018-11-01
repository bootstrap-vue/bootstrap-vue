import Input from './form-input'
import { mount } from '@vue/test-utils'

describe('form-input', async () => {
  it('has class form-control', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control')
  })

  it('has class form-control-lg when size=lg and plane=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'lg'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-lg')
  })

  it('has class form-control-sm when size=lg and plain=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'sm'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-sm')
  })

  it('does not have class form-control-plaintext when plaintext not set', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('form-control-plaintext')
  })

  it('has class form-control-plaintext when plaintext=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plaintext: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-plaintext')
  })

  it('has class custom-range instead of form-control when type=range', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'range'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('custom-range')
    expect(input.classes()).not.toContain('form-control')
  })

  it('does not have class form-control-plaintext when type=range and plaintext=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'range',
        plaintext: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('custom-range')
    expect(input.classes()).not.toContain('form-control')
    expect(input.classes()).not.toContain('form-control-plaintext')
  })

  it('does not have class form-control-plaintext when type=color and plaintext=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'color',
        plaintext: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('custom-range')
    expect(input.classes()).not.toContain('form-control-plaintext')
    expect(input.classes()).toContain('form-control')
  })

  it('has user supplied id', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('foobar')
  })

  it('renders text input by default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
  })

  it('renders number input when type set to number', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'number'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('number')
  })

  it('renders text input when type not supported', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
  })

  it('does not have is-valid or is-invalid classes when state is default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')
  })

  it('has class is-valid when state=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')
  })

  it('has class is-invalid when state=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: false
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('does not have aria-invalid attribute by default', async () => {
    const wrapper = mount(Input)
    expect(wrapper.contains('[aria-invalid]')).toBe(false)
  })

  it('does not have aria-invalid attribute when state is true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: true
      }
    })
    expect(wrapper.contains('[aria-invalid]')).toBe(false)
  })

  it('has aria-invalid attribute when state=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: false
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('has aria-invalid attribute when aria-invalid="true"', async () => {
    const wrapper = mount(Input, {
      propsData: {
        ariaInvalid: 'true'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('has aria-invalid attribute when aria-invalid=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        ariaInvalid: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('has aria-invalid attribute when aria-invalid="spelling"', async () => {
    const wrapper = mount(Input, {
      propsData: {
        ariaInvalid: 'spelling'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('spelling')
  })

  it('is disabled when disabled=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        disabled: true
      }
    })
    const input = wrapper.find('input')
    expect(!!input.attributes('disabled')).toBe(true)
    expect(input.element.disabled).toBe(true)
  })

  it('is not disabled when disabled=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        disabled: false
      }
    })
    const input = wrapper.find('input')
    expect(!!input.attributes('disabled')).toBe(false)
    expect(input.element.disabled).toBe(false)
  })

  it('emits an input event', async () => {
    const wrapper = mount(Input)

    const input = wrapper.find('input')
    input.element.value = 'test'
    input.trigger('input')

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted().input[0][0]).toEqual('test')
    expect(wrapper.emitted().input[0].length).toEqual(2)
  })

  it('emits a native focus event', async () => {
    const spy = jest.fn()
    const wrapper = mount(Input, {
      listeners: {
        focus: spy
      }
    })
    const input = wrapper.find('input')
    input.trigger('focus')

    expect(wrapper.emitted()).toMatchObject({})
    expect(spy).toHaveBeenCalled()
  })

  it('emits a native blur event', async () => {
    const spy = jest.fn()
    const wrapper = mount(Input, {
      listeners: {
        blur: spy
      }
    })
    const input = wrapper.find('input')
    input.trigger('blur')

    expect(wrapper.emitted()).toMatchObject({})
    expect(spy).toHaveBeenCalled()
  })

  it('applies formatter on input when not lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter (value) {
          return value.toLowerCase()
        }
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')

    expect(wrapper.emitted('update:value')).toBeDefined()
    let last = wrapper.emitted('update:value').length - 1
    expect(wrapper.emitted('update:value')[last][0]).toEqual('test')

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toEqual('test')
  })

  it('does not apply formatter on input when lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')

    expect(wrapper.emitted('update:value')).toBeDefined()
    let last = wrapper.emitted('update:value').length - 1
    expect(wrapper.emitted('update:value')[last][0]).toEqual('TEST')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toEqual('TEST')
    expect(wrapper.emitted('change')).not.toBeDefined()
  })

  it('applies formatter on change when lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: '',
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')

    // input event needed to set initial value
    input.element.value = 'TEST'
    input.trigger('input')
    expect(input.vm.localValue).toEqual('TEST')
    expect(wrapper.emitted('update:value')).toBeDefined()

    input.trigger('change')
    expect(input.vm.localValue).toEqual('test')
    expect(wrapper.emitted('update:value')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change')[0][0]).toEqual('test')
  })

  it('applies formatter when value supplied on mount and not lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: 'TEST',
        formatter (value) {
          return String(value).toLowerCase()
        }
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')

    expect(input.vm.localValue).toEqual('test')
    expect(wrapper.emitted('update:value')).toBeDefined()
    const last = wrapper.emitted('update:value').length - 1
    expect(wrapper.emitted('update:value')[last][0]).toEqual('test')
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
  })

  it('applies formatter when value prop updated and not lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: '',
        formatter (value) {
          return value.toLowerCase()
        }
      },
      attachToDocument: true
    })

    wrapper.setProps({ value: 'TEST' })
    const input = wrapper.find('input')

    expect(input.element.value).toEqual('test')
    expect(wrapper.emitted('update:value')).toBeDefined()
    let last = wrapper.emitted('update:value').length - 1
    expect(wrapper.emitted('update:value')[last][0]).toEqual('test')
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
  })

  it('does not apply formatter when value prop updated and lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: '',
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      },
      attachToDocument: true
    })

    wrapper.setProps({ value: 'TEST' })

    expect(wrapper.emitted('update:value')).toBeDefined()
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.vm.localValue).toBe('TEST')
  })

  it('focused number input with no-wheel set to true works', async () => {
    const spy = jest.fn()
    const wrapper = mount(Input, {
      propsData: {
        noWheel: true,
        type: 'number',
        value: '123'
      },
      listeners: {
        blur: spy
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')

    expect(input.element.type).toBe('number')
    expect(wrapper.props().noWheel).toBe(true)

    input.element.focus()
    input.trigger('wheel', { deltaY: 33.33, deltaX: 0, deltaZ: 0, deltaMode: 0 })

    // no-wheel=true will fire a blur event on the input when wheel fired
    expect(spy).toHaveBeenCalled()
  })

  it('focused number input with no-wheel set to false works', async () => {
    const spy = jest.fn(() => {})
    const wrapper = mount(Input, {
      propsData: {
        noWheel: false,
        type: 'number',
        value: '123'
      },
      listeners: {
        blur: spy
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')

    expect(input.element.type).toBe('number')
    expect(wrapper.props().noWheel).toBe(false)

    input.element.focus()
    input.trigger('wheel', { deltaY: 33.33, deltaX: 0, deltaZ: 0, deltaMode: 0 })

    // no-wheel=false will not fire a blur event on the input when wheel fired
    expect(spy).not.toHaveBeenCalled()
  })

  it('changing no-wheel after mount works', async () => {
    const spy = jest.fn(() => {})
    const wrapper = mount(Input, {
      propsData: {
        noWheel: false,
        type: 'number',
        value: '123'
      },
      listeners: {
        blur: spy
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')

    expect(input.element.type).toBe('number')
    expect(wrapper.props().noWheel).toBe(false)

    input.element.focus()
    input.trigger('wheel', { deltaY: 33.33, deltaX: 0, deltaZ: 0, deltaMode: 0 })

    // no-wheel=false will not fire a blur event on the input when wheel fired
    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ noWheel: true })

    expect(wrapper.props().noWheel).toBe(true)

    input.element.focus()
    input.trigger('wheel', { deltaY: 33.33, deltaX: 0, deltaZ: 0, deltaMode: 0 })

    // no-wheel=true will fire a blur event on the input when wheel fired
    expect(spy).toHaveBeenCalled()
  })
})
