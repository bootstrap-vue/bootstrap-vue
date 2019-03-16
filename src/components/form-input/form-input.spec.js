import Input from './form-input'
import { mount } from '@vue/test-utils'
import Vue from 'vue'

describe('form-input', () => {
  it('has class form-control', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control')

    wrapper.destroy()
  })

  it('has class form-control-lg when size=lg and plane=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'lg'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-lg')

    wrapper.destroy()
  })

  it('has class form-control-sm when size=lg and plain=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'sm'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-sm')

    wrapper.destroy()
  })

  it('does not have class form-control-plaintext when plaintext not set', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('form-control-plaintext')
    expect(input.attributes('readonly')).not.toBeDefined()

    wrapper.destroy()
  })

  it('has class form-control-plaintext when plaintext=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plaintext: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-plaintext')

    wrapper.destroy()
  })

  it('has attribute read-only when plaintext=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plaintext: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-plaintext')
    expect(input.attributes('readonly')).toBeDefined()

    wrapper.destroy()
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

    wrapper.destroy()
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

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('has user supplied id', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('foobar')

    wrapper.destroy()
  })

  it('has safeId after mount when no id provided', async () => {
    const wrapper = mount(Input, {
      attachToDocument: true
    })
    const input = wrapper.find('input')
    await wrapper.vm.$nextTick()
    expect(input.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('has form attribute when form prop set', async () => {
    const wrapper = mount(Input, {
      propsData: {
        form: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('form')).toBe('foobar')

    wrapper.destroy()
  })

  it('does not have list attribute when list prop not set', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.attributes('list')).not.toBeDefined()

    wrapper.destroy()
  })

  it('has list attribute when list prop set', async () => {
    const wrapper = mount(Input, {
      propsData: {
        list: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('list')).toBe('foobar')

    wrapper.destroy()
  })

  it('does not have list attribute when list prop set and type=password', async () => {
    const wrapper = mount(Input, {
      propsData: {
        list: 'foobar',
        type: 'password'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('list')).not.toBeDefined()

    wrapper.destroy()
  })

  it('renders text input by default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')

    wrapper.destroy()
  })

  it('renders number input when type set to number', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'number'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('number')

    wrapper.destroy()
  })

  it('renders text input when type not supported', async () => {
    const { warnHandler } = Vue.config
    Vue.config.warnHandler = jest.fn()

    const wrapper = mount(Input, {
      propsData: {
        type: 'foobar'
      }
    })

    const input = wrapper.find('input')

    expect(input.attributes('type')).toBe('text')

    expect(Vue.config.warnHandler).toHaveBeenCalled()
    Vue.config.warnHandler = warnHandler

    wrapper.destroy()
  })

  it('does not have is-valid or is-invalid classes when state is default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')

    wrapper.destroy()
  })

  it('does not have is-valid or is-invalid classes when state=""', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: ''
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('has class is-valid when state="valid"', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: 'valid'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('has class is-invalid when state="invalid"', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: 'invalid'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')

    wrapper.destroy()
  })

  it('does not have aria-invalid attribute by default', async () => {
    const wrapper = mount(Input)
    expect(wrapper.contains('[aria-invalid]')).toBe(false)

    wrapper.destroy()
  })

  it('does not have aria-invalid attribute when state is true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: true
      }
    })
    expect(wrapper.contains('[aria-invalid]')).toBe(false)

    wrapper.destroy()
  })

  it('has aria-invalid attribute when state=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: false
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('has aria-invalid attribute when aria-invalid="true"', async () => {
    const wrapper = mount(Input, {
      propsData: {
        ariaInvalid: 'true'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('has aria-invalid attribute when aria-invalid=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        ariaInvalid: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('has aria-invalid attribute when aria-invalid="spelling"', async () => {
    const wrapper = mount(Input, {
      propsData: {
        ariaInvalid: 'spelling'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('spelling')

    wrapper.destroy()
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

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('emits an input event', async () => {
    const wrapper = mount(Input)

    const input = wrapper.find('input')
    input.element.value = 'test'
    input.trigger('input')

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted().input[0].length).toEqual(1)
    expect(wrapper.emitted().input[0][0]).toEqual('test')

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('emits a blur event with native event as only arg', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: 'TEST'
      }
    })
    const input = wrapper.find('input')
    input.trigger('blur')

    expect(wrapper.emitted('blur')).toBeDefined()
    expect(wrapper.emitted('blur')[0].length).toEqual(1)
    expect(wrapper.emitted('blur')[0][0] instanceof Event).toBe(true)
    expect(wrapper.emitted('blur')[0][0].type).toEqual('blur')

    wrapper.destroy()
  })

  it('applies formatter on input when not lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter(value) {
          return value.toLowerCase()
        }
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')

    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('test')

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('test')

    expect(input.vm.localValue).toEqual('test')

    wrapper.destroy()
  })

  it('does not apply formatter on input when lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')

    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('TEST')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('TEST')
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('TEST')

    wrapper.destroy()
  })

  it('applies formatter on blur when lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: '',
        formatter(value) {
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
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('TEST')

    input.trigger('blur')

    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(2)
    expect(wrapper.emitted('update')[1][0]).toEqual('test')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.emitted('blur')).toBeDefined()
    expect(wrapper.emitted('blur').length).toEqual(1)
    expect(input.vm.localValue).toEqual('test')

    wrapper.destroy()
  })

  it('does not apply formatter when value supplied on mount and not lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: 'TEST',
        formatter(value) {
          return String(value).toLowerCase()
        }
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')

    expect(input.vm.localValue).toEqual('TEST')
    expect(wrapper.emitted('update')).not.toBeDefined()
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.emitted('blur')).not.toBeDefined()

    wrapper.destroy()
  })

  it('does not apply formatter when value prop updated and not lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        }
      },
      attachToDocument: true
    })

    wrapper.setProps({ value: 'TEST' })
    const input = wrapper.find('input')

    expect(input.element.value).toEqual('TEST')
    expect(wrapper.emitted('update')).not.toBeDefined() // Note emitted as value hasnt changed
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.emitted('blur')).not.toBeDefined()

    wrapper.destroy()
  })

  it('does not apply formatter when value prop updated and lazy', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      },
      attachToDocument: true
    })
    wrapper.setProps({ value: 'TEST' })
    const input = wrapper.find('input')

    expect(input.element.value).toEqual('TEST')
    expect(wrapper.emitted('update')).not.toBeDefined() // not emitted when value doesnt change
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()
    expect(wrapper.emitted('blur')).not.toBeDefined()

    wrapper.destroy()
  })

  it('does not update value when non-lazy formatter returns false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        value: 'abc',
        formatter(value) {
          return false
        }
      },
      attachToDocument: true
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('update')).not.toBeDefined()
    // value in input should remain the same as entered
    expect(input.element.value).toEqual('TEST')
    expect(wrapper.vm.localValue).toBe('abc')

    wrapper.destroy()
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

    wrapper.destroy()
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

    wrapper.destroy()
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

    wrapper.destroy()
  })

  it('"number" modifier prop works', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'text',
        number: true
      }
    })

    const input = wrapper.find('input')
    input.element.value = '123.450'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(input.element.value).toBe('123.450')
    // Pre converted value as string
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0].length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('123.450')
    // v-model update event (should emit a numerical value)
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toBe(1)
    expect(wrapper.emitted('update')[0].length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toBeCloseTo(123.45)

    // Update the input to be different string-wise, but same numerically
    input.element.value = '123.4500'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(input.element.value).toBe('123.4500')
    // Should emit a new input event
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual('123.4500')
    // Should emit a new update event
    expect(wrapper.emitted('update').length).toBe(2)
    expect(wrapper.emitted('update')[0][0]).toBeCloseTo(123.45)

    // Updating the v-model to new numeric value
    wrapper.setProps({
      value: 45.6
    })
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('45.6')

    wrapper.destroy()
  })

  it('focus() and blur() methods work', async () => {
    const wrapper = mount(Input, {
      mountToDocument: true
    })
    const input = wrapper.find('input')

    expect(typeof wrapper.vm.focus).toBe('function')
    expect(typeof wrapper.vm.blur).toBe('function')

    expect(document.activeElement).not.toBe(input.element)
    wrapper.vm.focus()
    expect(document.activeElement).toBe(input.element)
    wrapper.vm.blur()
    expect(document.activeElement).not.toBe(input.element)

    wrapper.destroy()
  })
})
