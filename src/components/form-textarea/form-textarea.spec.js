import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BFormTextarea } from './form-textarea'

describe('form-textarea', () => {
  it('root element is textarea', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.element.type).toBe('textarea')

    wrapper.destroy()
  })

  it('does not have attribute disabled by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.attributes('disabled')).toBeUndefined()

    wrapper.destroy()
  })

  it('has attribute disabled when disabled=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('does not have attribute readonly by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.attributes('readonly')).toBeUndefined()

    wrapper.destroy()
  })

  it('has attribute readonly when readonly=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        readonly: true
      }
    })
    expect(wrapper.attributes('readonly')).toBeDefined()

    wrapper.destroy()
  })

  it('inherits non-prop attributes', async () => {
    const wrapper = mount(BFormTextarea, {
      attrs: {
        foo: 'bar'
      }
    })
    expect(wrapper.attributes('foo')).toBeDefined()
    expect(wrapper.attributes('foo')).toBe('bar')

    wrapper.destroy()
  })

  it('has class form-control by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.classes()).toContain('form-control')

    wrapper.destroy()
  })

  it('does not have class form-control-plaintext by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.classes()).not.toContain('form-control-plaintext')

    wrapper.destroy()
  })

  it('does not have size classes by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.classes()).not.toContain('form-control-sm')
    expect(wrapper.classes()).not.toContain('form-control-lg')

    wrapper.destroy()
  })

  it('has size class when size prop is set', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        size: 'sm'
      }
    })
    expect(wrapper.classes()).toContain('form-control-sm')
    await wrapper.setProps({ size: 'lg' })
    expect(wrapper.classes()).toContain('form-control-lg')
    await wrapper.setProps({ size: 'foobar' })
    expect(wrapper.classes()).toContain('form-control-foobar')
    await wrapper.setProps({ size: '' })
    expect(wrapper.classes()).not.toContain('form-control-')

    wrapper.destroy()
  })

  it('has class form-control-plaintext when plaintext=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        plaintext: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-plaintext')

    wrapper.destroy()
  })

  it('does not have class form-control when plaintext=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        plaintext: true
      }
    })
    expect(wrapper.classes()).not.toContain('form-control')

    wrapper.destroy()
  })

  it('has attribute readonly when plaintext=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        plaintext: true
      }
    })
    expect(wrapper.attributes('readonly')).toBeDefined()

    wrapper.destroy()
  })

  it('has user supplied id', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        id: 'foobar'
      }
    })
    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.destroy()
  })

  it('does not have is-valid or is-invalid classes by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.classes()).not.toContain('is-valid')
    expect(wrapper.classes()).not.toContain('is-invalid')

    wrapper.destroy()
  })

  it('has class is-valid when state=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        state: true
      }
    })
    expect(wrapper.classes()).toContain('is-valid')
    expect(wrapper.classes()).not.toContain('is-invalid')

    wrapper.destroy()
  })

  it('has class is-invalid when state=false', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        state: false
      }
    })
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.classes()).not.toContain('is-valid')

    wrapper.destroy()
  })

  it('does not have aria-invalid attribute by default', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()

    wrapper.destroy()
  })

  it('does not have aria-invalid attribute when state=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        state: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()

    wrapper.destroy()
  })

  it('has aria-invalid attribute when state=false', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        state: false
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('has aria-invalid attribute when aria-invalid=true', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        ariaInvalid: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    await wrapper.setProps({ ariaInvalid: 'true' })
    expect(wrapper.attributes('aria-invalid')).toBe('true')

    wrapper.destroy()
  })

  it('has aria-invalid attribute when aria-invalid="spelling"', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        ariaInvalid: 'spelling'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('spelling')

    wrapper.destroy()
  })

  it('does not emit an update event on mount when value not set', async () => {
    const wrapper = mount(BFormTextarea)
    expect(wrapper.emitted('update')).toBeUndefined()

    wrapper.destroy()
  })

  it('does mot emit an update event on mount when value is set and no formatter', async () => {
    const wrapper = mount(BFormTextarea, {
      value: 'foobar'
    })
    expect(wrapper.emitted('update')).toBeUndefined()

    wrapper.destroy()
  })

  it('emits an input event with single arg of value', async () => {
    const wrapper = mount(BFormTextarea)

    wrapper.element.value = 'test'
    await wrapper.trigger('input')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input')[0].length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('test')

    wrapper.destroy()
  })

  it('emits an change event with single arg of value', async () => {
    const wrapper = mount(BFormTextarea)

    wrapper.element.value = 'test'
    await wrapper.trigger('change')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change')[0].length).toEqual(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('test')

    wrapper.destroy()
  })

  it('emits an update event with one arg on input', async () => {
    const wrapper = mount(BFormTextarea)

    wrapper.element.value = 'test'
    await wrapper.trigger('input')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update')[0].length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('test')

    wrapper.destroy()
  })

  it('does not emit an update event on change when value not changed', async () => {
    const wrapper = mount(BFormTextarea)

    wrapper.element.value = 'test'
    await wrapper.trigger('input')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('test')

    await wrapper.trigger('change')
    expect(wrapper.emitted('update').length).toEqual(1)

    wrapper.destroy()
  })

  it('emits an update event with one arg on change when input text changed', async () => {
    const wrapper = mount(BFormTextarea)

    wrapper.element.value = 'test'
    await wrapper.trigger('input')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('test')

    wrapper.element.value = 'TEST'
    await wrapper.trigger('change')
    expect(wrapper.emitted('update').length).toEqual(2)
    expect(wrapper.emitted('update')[1][0]).toEqual('TEST')

    wrapper.destroy()
  })

  it('does not emit an update, input or change event when value prop changed', async () => {
    const wrapper = mount(BFormTextarea, {
      value: ''
    })

    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    await wrapper.setProps({ value: 'test' })
    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    wrapper.destroy()
  })

  it('emits a native focus event', async () => {
    const spy = jest.fn()
    const wrapper = mount(BFormTextarea, {
      listeners: {
        focus: spy
      }
    })

    await wrapper.trigger('focus')
    expect(wrapper.emitted('focus')).toBeUndefined()
    expect(spy).toHaveBeenCalled()

    wrapper.destroy()
  })

  it('emits a blur event when blurred', async () => {
    const wrapper = mount(BFormTextarea)

    await wrapper.trigger('blur')
    expect(wrapper.emitted('blur')).toBeDefined()

    wrapper.destroy()
  })

  it('has attribute rows set to 2 by default', async () => {
    const wrapper = mount(BFormTextarea)

    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('2')

    wrapper.destroy()
  })

  it('has attribute rows when rows set and max-rows not set', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        rows: 10
      }
    })

    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('10')

    // Should work with both text and number values
    await wrapper.setProps({ rows: '20' })
    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('20')

    // Should use minimum value of 2 when rows is set less than 2
    await wrapper.setProps({ rows: '1' })
    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('2')

    await wrapper.setProps({ rows: -10 })
    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('2')

    wrapper.destroy()
  })

  it('has attribute rows set when rows and max-rows are equal', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        rows: 5,
        maxRows: 5
      }
    })

    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('5')

    // Should work with both text and number values
    await wrapper.setProps({ rows: '10', maxRows: '10' })
    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('10')

    wrapper.destroy()
  })

  it('does not have rows set when rows and max-rows set', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        rows: 2,
        maxRows: 5
      }
    })

    expect(wrapper.attributes('rows')).toBeUndefined()

    wrapper.destroy()
  })

  it('has attribute rows set when max-rows less than rows', async () => {
    const wrapper = mount(BFormTextarea, {
      propsData: {
        rows: 10,
        maxRows: 5
      }
    })

    expect(wrapper.attributes('rows')).toBeDefined()
    expect(wrapper.attributes('rows')).toEqual('10')

    wrapper.destroy()
  })

  it('does not have style resize by default', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer()
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.resize).toEqual('')

    wrapper.destroy()
  })

  it('does not have style resize when no-resize is set', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        noResize: true
      }
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.resize).toEqual('none')

    wrapper.destroy()
  })

  it('does not have style resize when max-rows not set', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        rows: 10
      }
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.resize).toEqual('')

    wrapper.destroy()
  })

  it('does not have style resize when max-rows less than rows', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        rows: 10,
        maxRows: 5
      }
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.resize).toEqual('')

    wrapper.destroy()
  })

  it('has style resize:none when max-rows greater than rows', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        rows: 2,
        maxRows: 5
      }
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.resize).toBeDefined()
    expect(wrapper.element.style.resize).toEqual('none')

    wrapper.destroy()
  })

  it('does not have style height by default', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer()
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.height).toBeDefined()
    expect(wrapper.element.style.height).toEqual('')

    wrapper.destroy()
  })

  it('does not have style height when rows and max-rows equal', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        rows: 2,
        maxRows: 2
      }
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.height).toBeDefined()
    expect(wrapper.element.style.height).toEqual('')

    wrapper.destroy()
  })

  it('does not have style height when max-rows not set', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        rows: 5
      }
    })

    expect(wrapper.element.style).toBeDefined()
    expect(wrapper.element.style.height).toBeDefined()
    expect(wrapper.element.style.height).toEqual('')

    wrapper.destroy()
  })

  // The height style calculations do not work in JSDOM environment
  // But we do know auto height works in browser from manual testing
  //
  // it('has style height when max-rows greater than rows', async () => {
  //   const input = mount(BFormTextarea, {
  //     attachTo: createContainer(),
  //     propsData: {
  //       rows: 2,
  //       maxRows: 5
  //     }
  //   })
  //   await input.vm.$nextTick()
  //
  //   expect(input.element.style).toBeDefined()
  //   expect(input.element.style.height).toBeDefined()
  //   expect(input.element.style.height).not.toEqual('')
  //
  //   input.destroy()
  // })
  //
  // it('auto height should work', async () => {
  //   const input = mount(BFormTextarea, {
  //     attachTo: createContainer(),
  //     propsData: {
  //       value: '',
  //       rows: 2,
  //       maxRows: 10
  //     }
  //   })
  //   expect(input.element.style).toBeDefined()
  //   expect(input.element.style.height).toBeDefined()
  //   expect(input.element.style.height).not.toEqual('')
  //   const firstHeight = parseFloat(input.element.style.height)
  //   // Set content to five lines heigh
  //   input.element.value = 'one\n two\n three\n four\n five'
  //   await input.trigger('input')
  //   expect(input.emitted('update')).toBeDefined()
  //   expect(input.element.style.height).not.toEqual('')
  //   const secondHeight = parseFloat(input.element.style.height)
  //   expect(secondHeight).toBeGreaterThan(firstHeight)
  //   // Set content to one lines heigh
  //   input.element.value = 'one'
  //   await input.trigger('input')
  //   expect(input.emitted('update').length).toEqual(2)
  //   expect(input.element.style.height).not.toEqual('')
  //   const thirdHeight = parseFloat(input.element.style.height)
  //   expect(thirdHeight).toBeLessThan(secondHeight)
  //
  //   input.destroy()
  // })

  it('Formats on input when not lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })

    wrapper.element.value = 'TEST'
    await wrapper.trigger('input')

    // Update event fires first with formatted value
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('test')
    // Followed by an input event with formatted value
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('test')
    // And no change event
    expect(wrapper.emitted('change')).toBeUndefined()

    wrapper.destroy()
  })

  it('Formats on change when not lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })

    wrapper.element.value = 'TEST'
    await wrapper.trigger('change')

    // Update event fires first with formatted value
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('test')
    // Followed by a change event with formatted value
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('test')
    // And no input event
    expect(wrapper.emitted('input')).toBeUndefined()

    wrapper.destroy()
  })

  it('Formats on blur when lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })

    wrapper.element.value = 'TEST'
    await wrapper.trigger('input')

    // Update event fires first
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('TEST')
    // Followed by an input
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('TEST')
    expect(wrapper.vm.localValue).toEqual('TEST')

    await wrapper.trigger('change')

    // Update does not fire again
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('TEST')
    // Event change emitted
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('TEST')
    expect(wrapper.vm.localValue).toEqual('TEST')

    await wrapper.trigger('blur')

    // Update fires before change with formatted value
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(2)
    expect(wrapper.emitted('update')[1][0]).toEqual('test')
    // Followed by blur event with native event
    expect(wrapper.emitted('blur')).toBeDefined()
    expect(wrapper.emitted('blur')[0][0] instanceof Event).toBe(true)
    expect(wrapper.emitted('blur')[0][0].type).toEqual('blur')

    // Expected number of events from above sequence
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.emitted('blur').length).toEqual(1)
    expect(wrapper.emitted('update').length).toEqual(2)

    wrapper.destroy()
  })

  it('Does not format value on mount when not lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: 'TEST',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })

    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.vm.localValue).toEqual('TEST')

    wrapper.destroy()
  })

  it('Does not format value on mount when lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: 'TEST',
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })

    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.vm.localValue).toEqual('TEST')

    wrapper.destroy()
  })

  it('Does not format on prop "value" change when not lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        }
      }
    })

    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.vm.localValue).toEqual('')

    await wrapper.setProps({ value: 'TEST' })
    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.vm.localValue).toEqual('TEST')

    wrapper.destroy()
  })

  it('does not format on value prop change when lazy', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: '',
        formatter(value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })

    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.vm.localValue).toEqual('')

    // Does not emit any events
    await wrapper.setProps({ value: 'TEST' })
    expect(wrapper.emitted('update')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.vm.localValue).toEqual('TEST')

    wrapper.destroy()
  })

  it('trim modifier prop works', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: '',
        trim: true
      }
    })

    expect(wrapper.vm.localValue).toEqual('')

    wrapper.element.value = 'TEST'
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('TEST')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('TEST')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('TEST')

    wrapper.element.value = 'TEST  '
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('TEST  ')
    // `v-model` value stays the same and update event shouldn't be emitted again
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual('TEST  ')

    wrapper.element.value = '  TEST  '
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('  TEST  ')
    // `v-model` value stays the same and update event shouldn't be emitted again
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(3)
    expect(wrapper.emitted('input')[2][0]).toEqual('  TEST  ')

    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('  TEST  ')
    // `v-model` value stays the same and update event shouldn't be emitted again
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(4)
    expect(wrapper.emitted('input')[3][0]).toEqual('  TEST  ')

    await wrapper.trigger('change')

    expect(wrapper.vm.localValue).toEqual('  TEST  ')
    // `v-model` value stays the same and update event shouldn't be emitted again
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('  TEST  ')

    wrapper.destroy()
  })

  it('number modifier prop works', async () => {
    const wrapper = mount(BFormTextarea, {
      attachTo: createContainer(),
      propsData: {
        value: '',
        number: true
      }
    })

    expect(wrapper.vm.localValue).toEqual('')

    wrapper.element.value = 'TEST'
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('TEST')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(1)
    expect(wrapper.emitted('update')[0][0]).toEqual('TEST')
    expect(typeof wrapper.emitted('update')[0][0]).toEqual('string')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0][0]).toEqual('TEST')
    expect(typeof wrapper.emitted('input')[0][0]).toEqual('string')

    wrapper.element.value = '123.45'
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('123.45')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(2)
    expect(wrapper.emitted('update')[1][0]).toEqual(123.45)
    expect(typeof wrapper.emitted('update')[1][0]).toEqual('number')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(2)
    expect(wrapper.emitted('input')[1][0]).toEqual('123.45')
    expect(typeof wrapper.emitted('input')[1][0]).toEqual('string')

    wrapper.element.value = '0123.450'
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('0123.450')
    // `v-model` value stays the same and update event shouldn't be emitted again
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(2)
    expect(wrapper.emitted('update')[1][0]).toEqual(123.45)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(3)
    expect(wrapper.emitted('input')[2][0]).toEqual('0123.450')
    expect(typeof wrapper.emitted('input')[2][0]).toEqual('string')

    wrapper.element.value = '0123 450'
    await wrapper.trigger('input')

    expect(wrapper.vm.localValue).toEqual('0123 450')
    expect(wrapper.emitted('update')).toBeDefined()
    expect(wrapper.emitted('update').length).toEqual(3)
    expect(wrapper.emitted('update')[2][0]).toEqual(123)
    expect(typeof wrapper.emitted('update')[2][0]).toEqual('number')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toEqual(4)
    expect(wrapper.emitted('input')[3][0]).toEqual('0123 450')
    expect(typeof wrapper.emitted('input')[3][0]).toEqual('string')

    wrapper.destroy()
  })

  // These tests are wrapped in a new describe to limit
  // the scope of the `getBoundingClientRect` mock
  describe('prop `autofocus`', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: 24,
        height: 24,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }))
    })

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('works when true', async () => {
      const wrapper = mount(BFormTextarea, {
        attachTo: createContainer(),
        propsData: {
          autofocus: true
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const input = wrapper.find('textarea')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).toBe(input.element)

      wrapper.destroy()
    })

    it('does not autofocus when false', async () => {
      const wrapper = mount(BFormTextarea, {
        attachTo: createContainer(),
        propsData: {
          autofocus: false
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const input = wrapper.find('textarea')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).not.toBe(input.element)

      wrapper.destroy()
    })
  })
})
