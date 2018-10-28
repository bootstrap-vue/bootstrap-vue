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

  it('does not emit an update event on change when value not changed', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    input.trigger('change')
    expect(input.emitted('update').length).toEqual(1)
  })

  it('emits an update event with one arg on change when input text changed', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    input.element.value = 'TEST'
    input.trigger('change')
    expect(input.emitted('update').length).toEqual(2)
    expect(input.emitted('update')[1][0]).toEqual('TEST')
  })

  it('emits an update event when value prop changed', async () => {
    const input = mount(Textarea, {
      value: ''
    })

    expect(input.emitted('update')).not.toBeDefined()
    input.setProps({value: 'test'})
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
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

  it('has attribute rows set to 2 by default', async () => {
    const input = mount(Textarea)
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('2')
  })

  it('has attribute rows when rows set and max-rows not set', async () => {
    const input = mount(Textarea, {
      propsData: {
        rows: 10
      }
    })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('10')
    // should work with both text and number values
    input.setProps({ rows: '20' })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('20')
    // Should use minimum value of 2 when rows is set less than 2
    input.setProps({ rows: '1' })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('2')
    input.setProps({ rows: -10 })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('2')
  })

  it('has attribute rows set when rows and max-rows are equal', async () => {
    const input = mount(Textarea, {
      propsData: {
        rows: 5,
        maxRows: 5
      }
    })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('5')
    // should work with both text and number values
    input.setProps({ rows: '10', maxRows: '10' })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('10')
  })

  it('does not have rows set when rows and max-rows set', async () => {
    const input = mount(Textarea, {
      propsData: {
        rows: 2,
        maxRows: 5
      }
    })
    expect(input.attributes('rows')).not.toBeDefined()
  })

  it('has attribute rows set when max-rows less than rows', async () => {
    const input = mount(Textarea, {
      propsData: {
        rows: 10,
        maxRows: 5
      }
    })
    expect(input.attributes('rows')).toBeDefined()
    expect(input.attributes('rows')).toEqual('10')
  })

  it('does not have style resize by default', async () => {
    const input = mount(Textarea, {
      attachToDocument: true
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.resize).toEqual('')
  })

  it('does not have style resize when no-resize is set', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        noResize: true
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.resize).toEqual('none')
  })

  it('does not have style resize when max-rows not set', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 10
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.resize).toEqual('')
  })

  it('does not have style resize when max-rows less than rows', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 10,
        maxRows: 5
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.resize).toEqual('')
  })

  it('has style resize:none when max-rows greater than rows', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 2,
        maxRows: 5
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.resize).toBeDefined()
    expect(input.element.style.resize).toEqual('none')
  })

  it('does not have style height by default', async () => {
    const input = mount(Textarea, {
      attachToDocument: true
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.height).toBeDefined()
    expect(input.element.style.height).toEqual('')
  })

  it('does not have style height when rows and max-rows equal', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 2,
        maxRows: 2
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.height).toBeDefined()
    expect(input.element.style.height).toEqual('')
  })

  it('does not have style height when max-rows not set', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 5
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.height).toBeDefined()
    expect(input.element.style.height).toEqual('')
  })

  /*

  // The height style calculations appear to not work in test environment
  // But we do know they work in browser

  it('has style height when max-rows greater than rows', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 2,
        maxRows: 5
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.height).toBeDefined()
    expect(input.element.style.height).not.toEqual('')
  })

  it('auto height should work', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        rows: 2,
        maxRows: 10
      }
    })
    expect(input.element.style).toBeDefined()
    expect(input.element.style.height).toBeDefined()
    expect(input.element.style.height).not.toEqual('')
    const firstHeight = parseFloat(input.element.style.height)
    // Set content to five lines heigh
    input.element.value = 'one\n two\n three\n four\n five'
    input.trigger('input')
    expect(input.emitted('update')).toBeDefined()
    expect(input.element.style.height).not.toEqual('')
    const secondHeight = parseFloat(input.element.style.height)
    expect(secondHeight).toBeGreaterThan(firstHeight)
    // Set content to one lines heigh
    input.element.value = 'one'
    input.trigger('input')
    expect(input.emitted('update').length).toEqual(2)
    expect(input.element.style.height).not.toEqual('')
    const thirdHeight = parseFloat(input.element.style.height)
    expect(thirdHeight).toBeLessThan(secondHeight)
  })
  */

  it('Formats on input when not lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        formatter (value) {
          return value.toLowerCase()
        }
      }
    })
    input.element.value = 'TEST'
    input.trigger('input')

    // Input event fires first with user entered value
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('TEST')
    // Followed by an update with formatted value
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update')[0][0]).toEqual('test')
    // And no change event
    expect(input.emitted('change')).not.toBeDefined()
  })

  it('Formats on change when lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })

    input.element.value = 'TEST'
    input.trigger('input')

    // Input event fires first
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('TEST')
    // followed by an update
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('TEST')

    input.trigger('change')

    // Update fires before change with formatted value
    expect(input.emitted('update').length).toEqual(2)
    expect(input.emitted('update')[1][0]).toEqual('test')
    // Followed by change event with formatted value
    expect(input.emitted('change')).toBeDefined()
    expect(input.emitted('change')[0][0]).toEqual('test')
  })

  it('Formats value on mount when not lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: 'TEST',
        formatter (value) {
          return value.toLowerCase()
        }
      }
    })
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    // Emits update with formatted value
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    expect(input.vm.localValue).toEqual('test')
  })

  it('Does not format value on mount when lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: 'TEST',
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('TEST')
  })

  it('Formats on value prop change when not lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        formatter (value) {
          return value.toLowerCase()
        }
      }
    })
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.emitted('update')).not.toBeDefined()
    input.setProps({ value: 'TEST' })
    // Emits update with formatted value
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')

    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
  })

  it('Does not format on value prop change when lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    input.setProps({ value: 'TEST' })
    // Does not emit any events
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('TEST')
  })
})
