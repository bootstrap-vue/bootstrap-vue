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

  it('emits an input event with single arg of value', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    input.trigger('input')

    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input')[0].length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('test')
  })

  it('emits an change event with single arg of value', async () => {
    const input = mount(Textarea)

    input.element.value = 'test'
    // Need to trigger an input event before change can be emitted
    input.trigger('input')
    expect(input.emitted('change')).not.toBeDefined()

    input.trigger('change')
    expect(input.emitted('change')).toBeDefined()
    expect(input.emitted('change')[0].length).toEqual(1)
    expect(input.emitted('change')[0][0]).toEqual('test')
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

  it('does not emit an update, input or change event when value prop changed', async () => {
    const input = mount(Textarea, {
      value: ''
    })

    expect(input.emitted('update')).not.toBeDefined()
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    input.setProps({ value: 'test' })
    expect(input.emitted('update')).not.toBeDefined()
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

  it('emits a blur event when blurred', async () => {
    const input = mount(Textarea)
    input.trigger('blur')
    expect(input.emitted('blur')).toBeDefined()
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

  // The height style calculations do not work in JSDOM environment
  // But we do know auto height works in browser from manual testing

  it('has style height when max-rows greater than rows', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        rows: 2,
        maxRows: 5
      }
    })
    await input.vm.$nextTick()

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
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })
    input.element.value = 'TEST'
    input.trigger('input')

    // Update event fires first with formatted value
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    // Followed by an input event with formatted value
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('test')
    // And no change event
    expect(input.emitted('change')).not.toBeDefined()
  })

  it('Formats on change when not lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })
    input.element.value = 'TEST'
    input.trigger('change')

    // Update event fires first with formatted value
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('test')
    // Followed by a change event with formatted value
    expect(input.emitted('change')).toBeDefined()
    expect(input.emitted('change').length).toEqual(1)
    expect(input.emitted('change')[0][0]).toEqual('test')
    // And no input event
    expect(input.emitted('input')).not.toBeDefined()
  })

  it('Formats on blur when lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })

    input.element.value = 'TEST'
    input.trigger('input')

    // Update event fires first
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('TEST')
    // followed by an input
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('TEST')
    expect(input.vm.localValue).toEqual('TEST')

    input.trigger('change')
    // Update does not fire again
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('TEST')
    // Event change emitted
    expect(input.emitted('change')).toBeDefined()
    expect(input.emitted('change').length).toEqual(1)
    expect(input.emitted('change')[0][0]).toEqual('TEST')
    expect(input.vm.localValue).toEqual('TEST')

    input.trigger('blur')

    // Update fires before change with formatted value
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(2)
    expect(input.emitted('update')[1][0]).toEqual('test')
    // Followed by blur event with native event
    expect(input.emitted('blur')).toBeDefined()
    expect(input.emitted('blur')[0][0] instanceof Event).toBe(true)
    expect(input.emitted('blur')[0][0].type).toEqual('blur')

    // Expected number of events from above sequence
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('change').length).toEqual(1)
    expect(input.emitted('blur').length).toEqual(1)
    expect(input.emitted('update').length).toEqual(2)
  })

  it('Does not format value on mount when not lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: 'TEST',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('TEST')
  })

  it('Does not format value on mount when lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: 'TEST',
        formatter(value) {
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

  it('Does not format on prop "value" change when not lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('')
    input.setProps({ value: 'TEST' })
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('TEST')
  })

  it('Does not format on value prop change when lazy', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('')
    input.setProps({ value: 'TEST' })
    // Does not emit any events
    expect(input.emitted('update')).not.toBeDefined()
    expect(input.emitted('input')).not.toBeDefined()
    expect(input.emitted('change')).not.toBeDefined()
    expect(input.vm.localValue).toEqual('TEST')
  })

  it('activate and deactivate hooks work (keepalive)', async () => {
    const Keepalive = {
      template:
        '<div><keep-alive>' +
        '<b-form-textarea ref="textarea" v-if="show" v-model="value"></b-form-textarea>' +
        '<p v-else></p>' +
        '</keep-alive></div>',
      components: { bFormTextarea: Textarea },
      props: { show: true },
      data() {
        return { value: '' }
      }
    }

    const keepalive = mount(Keepalive, {
      attachToDocument: true,
      propsData: {
        show: true
      }
    })

    expect(keepalive).toBeDefined()

    const textarea = keepalive.find(Textarea)
    expect(textarea).toBeDefined()
    expect(textarea.isVueInstance()).toBe(true)

    // Check that the internal dontResize flag is now false
    await keepalive.vm.$nextTick()
    expect(textarea.vm.dontResize).toEqual(false)

    // v-if the component out of document
    keepalive.setProps({ show: false })
    // Check that the internal dontResize flag is now true
    await keepalive.vm.$nextTick()
    expect(textarea.vm.dontResize).toEqual(true)

    // v-if the component out of document
    keepalive.setProps({ show: true })
    // Check that the internal dontResize flag is now false
    await keepalive.vm.$nextTick()
    expect(textarea.vm.dontResize).toEqual(false)
  })

  it('trim modifier prop works', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        trim: true
      }
    })
    expect(input.vm.localValue).toEqual('')

    input.element.value = 'TEST'
    input.trigger('input')

    expect(input.vm.localValue).toEqual('TEST')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('TEST')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('TEST')

    input.element.value = 'TEST  '
    input.trigger('input')

    expect(input.vm.localValue).toEqual('TEST  ')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(2)
    expect(input.emitted('update')[1][0]).toEqual('TEST')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(2)
    expect(input.emitted('input')[1][0]).toEqual('TEST  ')

    input.element.value = '  TEST  '
    input.trigger('input')

    expect(input.vm.localValue).toEqual('  TEST  ')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(3)
    expect(input.emitted('update')[2][0]).toEqual('TEST')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(3)
    expect(input.emitted('input')[2][0]).toEqual('  TEST  ')

    input.trigger('input')

    expect(input.vm.localValue).toEqual('  TEST  ')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(3) // not emitted because no change in value
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(4)
    expect(input.emitted('input')[3][0]).toEqual('  TEST  ')

    input.trigger('change')

    expect(input.vm.localValue).toEqual('  TEST  ')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(3) // not emitted because no change in value
    expect(input.emitted('change')).toBeDefined()
    expect(input.emitted('change').length).toEqual(1)
    expect(input.emitted('change')[0][0]).toEqual('  TEST  ')
  })

  it('number modifier prop works', async () => {
    const input = mount(Textarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        number: true
      }
    })
    expect(input.vm.localValue).toEqual('')

    input.element.value = 'TEST'
    input.trigger('input')

    expect(input.vm.localValue).toEqual('TEST')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(1)
    expect(input.emitted('update')[0][0]).toEqual('TEST')
    expect(typeof input.emitted('update')[0][0]).toEqual('string')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(1)
    expect(input.emitted('input')[0][0]).toEqual('TEST')
    expect(typeof input.emitted('input')[0][0]).toEqual('string')

    input.element.value = '123.45'
    input.trigger('input')

    expect(input.vm.localValue).toEqual('123.45')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(2)
    expect(input.emitted('update')[1][0]).toEqual(123.45)
    expect(typeof input.emitted('update')[1][0]).toEqual('number')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(2)
    expect(input.emitted('input')[1][0]).toEqual('123.45')
    expect(typeof input.emitted('input')[1][0]).toEqual('string')

    input.element.value = '0123.450'
    input.trigger('input')

    expect(input.vm.localValue).toEqual('0123.450')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(3)
    expect(input.emitted('update')[2][0]).toEqual(123.45)
    expect(typeof input.emitted('update')[2][0]).toEqual('number')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(3)
    expect(input.emitted('input')[2][0]).toEqual('0123.450')
    expect(typeof input.emitted('input')[2][0]).toEqual('string')

    input.element.value = '0123 450'
    input.trigger('input')

    expect(input.vm.localValue).toEqual('0123 450')
    expect(input.emitted('update')).toBeDefined()
    expect(input.emitted('update').length).toEqual(4)
    expect(input.emitted('update')[3][0]).toEqual(123)
    expect(typeof input.emitted('update')[3][0]).toEqual('number')
    expect(input.emitted('input')).toBeDefined()
    expect(input.emitted('input').length).toEqual(4)
    expect(input.emitted('input')[3][0]).toEqual('0123 450')
    expect(typeof input.emitted('input')[3][0]).toEqual('string')
  })
})
