import Textarea from './form-textarea'
import { mount } from '@vue/test-utils'

describe('form-textarea', async () => {
  it('root element is textarea', async () => {
    const input = mount(Textarea)
    expect(input.element.type).toBe('textarea')
  })

  it('does not have attribute disabled by default', async () => {
    const input = mount(Textarea)
    expect(input.attributes('disabled')).not.toBeDefined()
  })

  it('has attribute disabled when disabled=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        disabled: true
      }
    })
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('does not have attribute readonly by default', async () => {
    const input = mount(Textarea)
    expect(input.attributes('readonly')).not.toBeDefined()
  })

  it('has attribute readonly when readonly=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        readonly: true
      }
    })
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('inherits non-prop attributes', async () => {
    const input = mount(Textarea, {
      attrs: {
        foo: 'bar'
      }
    })
    expect(input.attributes('foo')).toBeDefined()
    expect(input.attributes('foo')).toBe('bar')
  })

  it('has class form-control by default', async () => {
    const input = mount(Textarea)
    expect(input.classes()).toContain('form-control')
  })

  it('does not have class form-control-plaintext by default', async () => {
    const input = mount(Textarea)
    expect(input.classes()).not.toContain('form-control-plaintext')
  })

  it('does not have size classes by default', async () => {
    const input = mount(Textarea)
    expect(input.classes()).not.toContain('form-control-sm')
    expect(input.classes()).not.toContain('form-control-lg')
  })

  it('has size class when size prop is set', async () => {
    const input = mount(Textarea, {
      propsData: {
        size: 'sm'
      }
    })
    expect(input.classes()).toContain('form-control-sm')
    input.setProps({ size: 'lg' })
    expect(input.classes()).toContain('form-control-lg')
    input.setProps({ size: 'foobar' })
    expect(input.classes()).toContain('form-control-foobar')
    input.setProps({ size: '' })
    expect(input.classes()).not.toContain('form-control-')
  })

  it('has class form-control-plaintext when plaintext=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        plaintext: true
      }
    })
    expect(input.classes()).toContain('form-control-plaintext')
  })

  it('does not have class form-control when plaintext=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        plaintext: true
      }
    })
    expect(input.classes()).not.toContain('form-control')
  })

  it('has attribute readonly when plaintext=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        plaintext: true
      }
    })
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('has user supplied id', async () => {
    const input = mount(Textarea, {
      propsData: {
        id: 'foobar'
      }
    })
    expect(input.attributes('id')).toBe('foobar')
  })

  it('does not have is-valid or is-invalid classes by default', async () => {
    const input = mount(Textarea)
    expect(input.classes()).not.toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')
  })

  it('has class is-valid when state=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: true
      }
    })
    expect(input.classes()).toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')
  })

  it('has class is-valid when state=valid', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: 'valid'
      }
    })
    expect(input.classes()).toContain('is-valid')
    expect(input.classes()).not.toContain('is-invalid')
  })

  it('has class is-invalid when state=false', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: false
      }
    })
    expect(input.classes()).toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('has class is-invalid when state=invalid', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: 'invalid'
      }
    })
    expect(input.classes()).toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('does not have aria-invalid attribute by default', async () => {
    const input = mount(Textarea)
    expect(input.contains('[aria-invalid]')).toBe(false)
  })

  it('does not have aria-invalid attribute when state=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: true
      }
    })
    expect(input.contains('[aria-invalid]')).toBe(false)
  })

  it('does not have aria-invalid attribute when state=valid', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: 'valid'
      }
    })
    expect(input.contains('[aria-invalid]')).toBe(false)
  })

  it('has aria-invalid attribute when state=false', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: false
      }
    })
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('has aria-invalid attribute when state=invalid', async () => {
    const input = mount(Textarea, {
      propsData: {
        state: 'invalid'
      }
    })
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('has aria-invalid attribute when aria-invalid=true', async () => {
    const input = mount(Textarea, {
      propsData: {
        ariaInvalid: true
      }
    })
    expect(input.attributes('aria-invalid')).toBe('true')
    input.setProps({ ariaInvalid: 'true' })
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('has aria-invalid attribute when aria-invalid="spelling"', async () => {
    const input = mount(Textarea, {
      propsData: {
        ariaInvalid: 'spelling'
      }
    })
    expect(input.attributes('aria-invalid')).toBe('spelling')
  })

  it('emits an input event with args value and event', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')

    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input')[0][0]).toEqual('test')
    expect(input.emitted('input')[0].length).toEqual(2)
    expect(input.emitted('input')[0][1].type).toEqual('input')
  })

  it('emits an change event args value and event', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')
    expect(input.emitted('change')).not.toBeDefined()

    input.trigger('change')
    expect(input.emitted('change')).toBeDefined()
    expect(input.emitted('change')[0][0]).toEqual('test')
    expect(input.emitted('change')[0].length).toEqual(2)
    expect(input.emitted('change')[0][1].type).toEqual('change')
  })

  it('does not emit an update event on mount when value not set', async () => {
    const input = mount(Textarea)
    expect(input.emitted('update')).not.toBeDefined()
  })

  it('does mot emit an update event on mount when value is set and no formatter', async () => {
    const input = mount(Textarea, {
      value: 'foobar'
    })
    expect(input.emitted('update')).not.toBeDefined()
  })

  it('emits an update event with one arg on input', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update')[0].length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
  })

  it('emits an update event with one arg on change', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    input.trigger('change')
    expect(input.emitted('update').length).toEqual(2)
    expect(input.emitted('update')[1][0]).toEqual('test')
  })

  it('emits a native focus event', async () => {
    const spy = jest.fn()
    const input = mount(Textarea, {
      listeners: {
        focus: spy
      }
    })
    input.trigger('focus')
    expect(input.emitted('focus')).not.toBeDefined()
    expect(spy).toHaveBeenCalled()
  })

  it('emits a native blur event', async () => {
    const spy = jest.fn()
    const input = mount(Textarea, {
      listeners: {
        blur: spy
      }
    })
    input.trigger('blur')
    expect(input.emitted('blur')).not.toBeDefined()
    expect(spy).toHaveBeenCalled()
  })

  // To be added: Formatter tests
})
