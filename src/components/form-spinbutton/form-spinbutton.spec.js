import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormSpinbutton } from './form-spinbutton'

describe('form-spinbutton', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormSpinbutton)
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-spinbutton')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).not.toContain('d-inline-flex')
    expect(wrapper.classes()).not.toContain('flex-column')
    expect(wrapper.classes()).toContain('align-items-stretch')
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('tabindex')).toEqual('-1')

    // Should have 3 child elements (btn, output, btn)
    expect(wrapper.findAll('.b-form-spinbutton > *').length).toBe(3)

    const $decrement = wrapper.find('[aria-label="Decrement"]')
    expect($decrement.exists()).toBe(true)
    expect($decrement.is('button')).toBe(true)
    expect($decrement.attributes('tabindex')).toEqual('-1')
    expect($decrement.attributes('aria-keyshortcuts')).toEqual('ArrowDown')

    const $increment = wrapper.find('[aria-label="Increment"]')
    expect($increment.exists()).toBe(true)
    expect($increment.is('button')).toBe(true)
    expect($increment.attributes('tabindex')).toEqual('-1')
    expect($increment.attributes('aria-keyshortcuts')).toEqual('ArrowUp')

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // These two attribute should not exist on the element
    expect($output.element.hasAttribute('aria-valuenow')).toBe(false)
    expect($output.element.hasAttribute('aria-valuetext')).toBe(false)
    expect($output.text()).toEqual('')

    wrapper.setProps({
      placeholder: 'foobar'
    })
    await waitNT(wrapper.vm)
    expect($output.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('has expected structure when value set', async () => {
    const wrapper = mount(BFormSpinbutton, {
      propsData: {
        min: 0,
        max: 10,
        value: 5
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-spinbutton')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).not.toContain('d-inline-flex')
    expect(wrapper.classes()).not.toContain('flex-column')
    expect(wrapper.classes()).toContain('align-items-stretch')
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('tabindex')).toEqual('-1')

    // Should have 3 child elements (btn, output, btn)
    expect(wrapper.findAll('.b-form-spinbutton > *').length).toBe(3)

    const $decrement = wrapper.find('[aria-label="Decrement"]')
    expect($decrement.exists()).toBe(true)
    expect($decrement.is('button')).toBe(true)
    expect($decrement.attributes('tabindex')).toEqual('-1')
    expect($decrement.attributes('aria-keyshortcuts')).toEqual('ArrowDown')

    const $increment = wrapper.find('[aria-label="Increment"]')
    expect($increment.exists()).toBe(true)
    expect($increment.is('button')).toBe(true)
    expect($increment.attributes('tabindex')).toEqual('-1')
    expect($increment.attributes('aria-keyshortcuts')).toEqual('ArrowUp')

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('0')
    expect($output.attributes('aria-valuemax')).toEqual('10')
    expect($output.attributes('aria-valuenow')).toEqual('5')
    expect($output.attributes('aria-valuetext')).toEqual('5')

    wrapper.setProps({
      value: 8
    })
    await waitNT(wrapper.vm)

    expect($output.attributes('aria-valuemin')).toEqual('0')
    expect($output.attributes('aria-valuemax')).toEqual('10')
    expect($output.attributes('aria-valuenow')).toEqual('8')
    expect($output.attributes('aria-valuetext')).toEqual('8')

    wrapper.destroy()
  })

  it('has expected structure when prop inline set', async () => {
    const wrapper = mount(BFormSpinbutton, {
      propsData: {
        inline: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-spinbutton')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('d-inline-flex')
    expect(wrapper.classes()).not.toContain('d-flex')
    expect(wrapper.classes()).not.toContain('flex-column')
    expect(wrapper.classes()).toContain('align-items-stretch')
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('tabindex')).toEqual('-1')

    // Should have 3 child elements (btn, output, btn)
    expect(wrapper.findAll('.b-form-spinbutton > *').length).toBe(3)

    const $decrement = wrapper.find('[aria-label="Decrement"]')
    expect($decrement.exists()).toBe(true)
    expect($decrement.is('button')).toBe(true)
    expect($decrement.attributes('tabindex')).toEqual('-1')
    expect($decrement.attributes('aria-keyshortcuts')).toEqual('ArrowDown')

    const $increment = wrapper.find('[aria-label="Increment"]')
    expect($increment.exists()).toBe(true)
    expect($increment.is('button')).toBe(true)
    expect($increment.attributes('tabindex')).toEqual('-1')
    expect($increment.attributes('aria-keyshortcuts')).toEqual('ArrowUp')

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // These two attribute should not exist on the element
    expect($output.element.hasAttribute('aria-valuenow')).toBe(false)
    expect($output.element.hasAttribute('aria-valuetext')).toBe(false)

    wrapper.destroy()
  })

  it('has expected structure when prop vertical set', async () => {
    const wrapper = mount(BFormSpinbutton, {
      propsData: {
        vertical: true
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-spinbutton')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('d-inline-flex')
    expect(wrapper.classes()).not.toContain('d-flex')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes()).not.toContain('align-items-stretch')
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('tabindex')).toEqual('-1')

    // Should have 3 child elements (btn, output, btn)
    expect(wrapper.findAll('.b-form-spinbutton > *').length).toBe(3)

    const $decrement = wrapper.find('[aria-label="Decrement"]')
    expect($decrement.exists()).toBe(true)
    expect($decrement.is('button')).toBe(true)
    expect($decrement.attributes('tabindex')).toEqual('-1')
    expect($decrement.attributes('aria-keyshortcuts')).toEqual('ArrowDown')

    const $increment = wrapper.find('[aria-label="Increment"]')
    expect($increment.exists()).toBe(true)
    expect($increment.is('button')).toBe(true)
    expect($increment.attributes('tabindex')).toEqual('-1')
    expect($increment.attributes('aria-keyshortcuts')).toEqual('ArrowUp')

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // These two attribute should not exist on the element
    expect($output.element.hasAttribute('aria-valuenow')).toBe(false)
    expect($output.element.hasAttribute('aria-valuetext')).toBe(false)

    wrapper.destroy()
  })

  it('renders hidden input when name set', async () => {
    const wrapper = mount(BFormSpinbutton, {
      propsData: {
        name: 'foobar',
        value: null
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('b-form-spinbutton')

    const $hidden = wrapper.find('input[type="hidden"]')
    expect($hidden.exists()).toBe(true)
    expect($hidden.attributes('name')).toBe('foobar')
    expect($hidden.attributes('value')).toBe('')

    wrapper.setProps({
      value: 50
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($hidden.attributes('name')).toBe('foobar')
    expect($hidden.attributes('value')).toBe('50')

    wrapper.destroy()
  })

  it('basic +/- buttons click', async () => {
    const wrapper = mount(BFormSpinbutton, {
      attachToDocument: true
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // These two attribute should not exist on the element
    expect($output.element.hasAttribute('aria-valuenow')).toBe(false)
    expect($output.element.hasAttribute('aria-valuetext')).toBe(false)

    const $increment = wrapper.find('[aria-label="Increment"]')
    expect($increment.exists()).toBe(true)
    const $decrement = wrapper.find('[aria-label="Decrement"]')
    expect($decrement.exists()).toBe(true)

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    $increment.trigger('mousedown')
    $increment.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('2')
    expect($output.attributes('aria-valuetext')).toEqual('2')

    $increment.trigger('mousedown')
    $increment.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('3')
    expect($output.attributes('aria-valuetext')).toEqual('3')

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('2')
    expect($output.attributes('aria-valuetext')).toEqual('2')

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // `wrap` is off so it should not change to `1`
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.setProps({
      wrap: true
    })

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // wrap is on so it should change to 100
    expect($output.attributes('aria-valuenow')).toEqual('100')
    expect($output.attributes('aria-valuetext')).toEqual('100')

    $increment.trigger('mousedown')
    $increment.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // wrap is on so it should change to 1
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.setProps({
      disabled: true
    })
    await waitNT(wrapper.vm)

    $increment.trigger('mousedown')
    $increment.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Disabled so should not change
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Disabled so should not change
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.setProps({
      disabled: false,
      readonly: true
    })
    await waitNT(wrapper.vm)

    $increment.trigger('mousedown')
    $increment.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Readonly so should not change
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    $decrement.trigger('mousedown')
    $decrement.trigger('mouseup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Readonly so should not change
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.setProps({
      disabled: false,
      readonly: false
    })
    await waitNT(wrapper.vm)

    // Touch events should work as well
    $increment.trigger('touchstart')
    $increment.trigger('touchend')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('2')
    expect($output.attributes('aria-valuetext')).toEqual('2')

    $decrement.trigger('touchstart')
    $decrement.trigger('touchend')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.destroy()
  })

  it('basic keyboard control works', async () => {
    const wrapper = mount(BFormSpinbutton, {
      attachToDocument: true
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // These two attribute should not exist on the element
    expect($output.element.hasAttribute('aria-valuenow')).toBe(false)
    expect($output.element.hasAttribute('aria-valuetext')).toBe(false)

    wrapper.trigger('keydown.up')
    wrapper.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.trigger('keydown.up')
    wrapper.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('2')
    expect($output.attributes('aria-valuetext')).toEqual('2')

    wrapper.trigger('keydown.end')
    wrapper.trigger('keyup.end')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('100')
    expect($output.attributes('aria-valuetext')).toEqual('100')

    wrapper.trigger('keydown.up')
    wrapper.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // `wrap` is off so it should not change to `1`
    expect($output.attributes('aria-valuenow')).toEqual('100')
    expect($output.attributes('aria-valuetext')).toEqual('100')

    wrapper.trigger('keydown.down')
    wrapper.trigger('keyup.down')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('99')
    expect($output.attributes('aria-valuetext')).toEqual('99')

    wrapper.trigger('keydown.down')
    wrapper.trigger('keyup.down')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('98')
    expect($output.attributes('aria-valuetext')).toEqual('98')

    wrapper.trigger('keydown.home')
    wrapper.trigger('keyup.home')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.trigger('keydown.down')
    wrapper.trigger('keyup.down')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // `wrap` is off so it should not change to `1`
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    wrapper.trigger('keydown.pageup')
    wrapper.trigger('keyup.pageup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Default jump is `4`
    expect($output.attributes('aria-valuenow')).toEqual('5')
    expect($output.attributes('aria-valuetext')).toEqual('5')

    wrapper.trigger('keydown.pageup')
    wrapper.trigger('keyup.pageup')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Default jump is `4`
    expect($output.attributes('aria-valuenow')).toEqual('9')
    expect($output.attributes('aria-valuetext')).toEqual('9')

    wrapper.trigger('keydown.pagedown')
    wrapper.trigger('keyup.pagedown')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // Default jump is `4`
    expect($output.attributes('aria-valuenow')).toEqual('5')
    expect($output.attributes('aria-valuetext')).toEqual('5')

    wrapper.destroy()
  })

  it('auto repeat works', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BFormSpinbutton, {
      attachToDocument: true,
      propsData: {
        min: 1,
        max: 100,
        step: 1,
        value: 1
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    expect($output.attributes('aria-valuenow')).toEqual('1')
    expect($output.attributes('aria-valuetext')).toEqual('1')

    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()

    wrapper.trigger('keydown.up')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('2')
    expect($output.attributes('aria-valuetext')).toEqual('2')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Advance past delay time
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    // Now we have to wait for interval to happen
    expect($output.attributes('aria-valuenow')).toEqual('2')
    expect($output.attributes('aria-valuetext')).toEqual('2')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Advance past interval time
    // Repeat #1
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('3')
    expect($output.attributes('aria-valuetext')).toEqual('3')
    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #2
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('4')
    expect($output.attributes('aria-valuetext')).toEqual('4')
    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #3
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('5')
    expect($output.attributes('aria-valuetext')).toEqual('5')
    expect(wrapper.emitted('input').length).toBe(4)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #4
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('6')
    expect($output.attributes('aria-valuetext')).toEqual('6')
    expect(wrapper.emitted('input').length).toBe(5)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #5
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('7')
    expect($output.attributes('aria-valuetext')).toEqual('7')
    expect(wrapper.emitted('input').length).toBe(6)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #6
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('8')
    expect($output.attributes('aria-valuetext')).toEqual('8')
    expect(wrapper.emitted('input').length).toBe(7)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #7
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('9')
    expect($output.attributes('aria-valuetext')).toEqual('9')
    expect(wrapper.emitted('input').length).toBe(8)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #8
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('10')
    expect($output.attributes('aria-valuetext')).toEqual('10')
    expect(wrapper.emitted('input').length).toBe(9)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #9
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('11')
    expect($output.attributes('aria-valuetext')).toEqual('11')
    expect(wrapper.emitted('input').length).toBe(10)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #10
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('12')
    expect($output.attributes('aria-valuetext')).toEqual('12')
    expect(wrapper.emitted('input').length).toBe(11)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #11 - Multiplier kicks in
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    // Note even though step is `4`, it jumps to `17` (not `16`) as it rounds to the
    // nearest multiple of step (relative to the min value, which is `1` in this test)
    // If min was set to `0`, then this would have been `16`
    expect($output.attributes('aria-valuenow')).toEqual('17')
    expect($output.attributes('aria-valuetext')).toEqual('17')
    expect(wrapper.emitted('input').length).toBe(12)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Repeat #12
    jest.runOnlyPendingTimers()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('21')
    expect($output.attributes('aria-valuetext')).toEqual('21')
    expect(wrapper.emitted('input').length).toBe(13)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // Un-press key
    wrapper.trigger('keyup.up')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($output.attributes('aria-valuenow')).toEqual('21')
    expect($output.attributes('aria-valuetext')).toEqual('21')
    expect(wrapper.emitted('input').length).toBe(13)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)

    wrapper.destroy()
  })

  it('focus and blur handling works', async () => {
    const wrapper = mount(BFormSpinbutton, {
      attachToDocument: true
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-spinbutton')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('align-items-stretch')
    expect(wrapper.classes()).not.toContain('d-inline-flex')
    expect(wrapper.classes()).not.toContain('flex-column')
    expect(wrapper.classes()).not.toContain('focus')
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.attributes('tabindex')).toEqual('-1')

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)
    expect($output.attributes('role')).toEqual('spinbutton')
    expect($output.attributes('tabindex')).toEqual('0')
    expect($output.attributes('aria-live')).toEqual('off')
    expect($output.attributes('aria-valuemin')).toEqual('1')
    expect($output.attributes('aria-valuemax')).toEqual('100')
    // These two attribute should not exist on the element
    expect($output.element.hasAttribute('aria-valuenow')).toBe(false)
    expect($output.element.hasAttribute('aria-valuetext')).toBe(false)

    expect(document.activeElement).not.toBe($output.element)

    $output.element.focus()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).toContain('focus')
    expect(document.activeElement).toBe($output.element)

    $output.element.blur()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('focus')
    expect(document.activeElement).not.toBe($output.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).toContain('focus')
    expect(document.activeElement).toBe($output.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('focus')
    expect(document.activeElement).not.toBe($output.element)

    wrapper.setProps({
      disabled: true
    })
    await waitNT(wrapper.vm)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('focus')
    expect(document.activeElement).not.toBe($output.element)

    try {
      $output.element.focus()
    } catch {}
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('focus')
    expect(document.activeElement).not.toBe($output.element)

    $output.trigger('focus')
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('focus')
    expect(document.activeElement).not.toBe($output.element)

    wrapper.destroy()
  })
})
