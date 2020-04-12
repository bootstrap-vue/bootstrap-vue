import { mount } from '@vue/test-utils'
import { waitNT /*, waitRAF */ } from '../../../tests/utils'
import { BFormRating } from './form-rating'

describe('form-rating', () => {
  it('has expected default strcture', async () => {
    const wrapper = mount(BFormRating)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    expect(wrapper.is('output')).toBe(true)

    expect(wrapper.classes()).toContain('b-rating')
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('form-control')

    expect(wrapper.classes()).not.toContain('d-inline-flex')
    expect(wrapper.classes()).not.toContain('form-control-lg')
    expect(wrapper.classes()).not.toContain('form-control-sm')
    expect(wrapper.classes()).not.toContain('border-0')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('readonly')

    expect(wrapper.attributes('id')).not.toBe('')
    expect(wrapper.attributes('role')).toEqual('slider')
    expect(wrapper.attributes('aria-live')).toEqual('off')
    expect(wrapper.attributes('aria-valuemin')).toEqual('1')
    expect(wrapper.attributes('aria-valuemax')).toEqual('5')

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)
    expect($stars.is('.flex-grow-1')).toBe(true)

    wrapper.destroy()
  })

  it('has expected strcture when prop `stars` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        stars: '10'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(10)
    expect($stars.is('.flex-grow-1')).toBe(true)

    wrapper.destroy()
  })

  it('renders hidden input when prop `name` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        name: 'foo',
        value: 3.5
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $input = wrapper.find('input')
    expect($input.exists()).toBe(true)
    expect($input.attributes('type')).toEqual('hidden')
    expect($input.attributes('name')).toEqual('foo')
    expect($input.attributes('value')).toEqual('3.5')

    wrapper.destroy()
  })

  it('has expected strcture when prop `value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        value: '1'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    expect(wrapper.vm.localValue).toBe(1)

    wrapper.setProps({
      value: 4
    })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    expect(wrapper.vm.localValue).toBe(4)

    wrapper.setProps({
      value: 1
    })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    expect(wrapper.vm.localValue).toBe(1)

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)

    // Click 5th star
    $stars.at(4).trigger('click')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toBe(5)
    expect(wrapper.vm.localValue).toBe(5)

    // Click 2nd star
    $stars.at(1).trigger('click')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toBe(2)
    expect(wrapper.vm.localValue).toBe(2)

    wrapper.destroy()
  })

  it('has expected strcture when prop `show-clear` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        showClear: true,
        value: 3
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    const $clear = wrapper.find('.b-rating-star-clear')
    expect($clear.exists()).toBe(true)
    expect(wrapper.emitted('change')).not.toBeDefined()

    $clear.trigger('click')
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual(null)

    wrapper.destroy()
  })

  it('has expected strcture when prop `show-value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        showValue: true,
        value: '3.5',
        precision: 2
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

    wrapper.setProps({
      value: null
    })
    await waitNT(wrapper.vm)

    // TBD

    wrapper.setProps({
      value: '1.236'
    })
    await waitNT(wrapper.vm)

    // TBD

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BFormRating, {
      attachToDocument: true,
      propsData: {
        showValue: true,
        disabled: false,
        value: '3.5',
        precision: 2
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)

    expect(document.activeElement).toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).toBe(true)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.trigger('focus')
    await waitNT(wrapper.vm)

    expect(document.activeElement).toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).toBe(true)

    wrapper.trigger('blur')
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)

    expect(document.activeElement).toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).toBe(true)

    wrapper.setProps({
      disabled: true
    })
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toBe(wrapper.element)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.destroy()
  })
})
