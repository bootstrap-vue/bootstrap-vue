import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BFormRating } from './form-rating'

describe('form-rating', () => {
  it('has expected default structure', async () => {
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
    // Since value is `null` all stars will be empty
    expect($stars.is('.b-rating-star-empty')).toBe(true)

    // `show-value` is `false` by default
    const $value = wrapper.find('.b-rating-value')
    expect($value.exists()).toBe(false)

    // `name` is `null` by default
    const $input = wrapper.find('input')
    expect($input.exists()).toBe(false)

    // `show-clear` is `false` by default
    const $clear = wrapper.find('.b-rating-star-clear')
    expect($clear.exists()).toBe(false)

    wrapper.destroy()
  })

  it('has icons with variant class when `variant` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)
    expect($stars.is('.flex-grow-1')).toBe(true)
    expect($stars.is('.b-rating-star-empty')).toBe(true)

    const $icons = wrapper.findAll('.b-icon')
    expect($icons.length).toBe(5)
    expect($icons.is('.bi-star')).toBe(true)
    expect($icons.is('.text-primary')).toBe(true)
    expect($icons.is('.text-warning')).toBe(false)

    wrapper.destroy()
  })

  it('has expected structure when prop `stars` set', async () => {
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
    expect($stars.is('.b-rating-star-empty')).toBe(true)

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

  it('has expected structure when prop `value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        value: '1'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    expect(wrapper.vm.localValue).toBe(1)
    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)
    expect($stars.at(0).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(1).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(2).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(3).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(4).is('.b-rating-star-empty')).toBe(true)

    wrapper.setProps({
      value: 3.5
    })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    expect(wrapper.vm.localValue).toBe(3.5)
    expect($stars.at(0).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(1).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(2).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(3).is('.b-rating-star-half')).toBe(true)
    expect($stars.at(4).is('.b-rating-star-empty')).toBe(true)

    wrapper.setProps({
      value: 1
    })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    expect(wrapper.vm.localValue).toBe(1)
    expect($stars.at(0).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(1).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(2).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(3).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(4).is('.b-rating-star-empty')).toBe(true)

    // Click 5th star
    $stars.at(4).trigger('click')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toBe(5)
    expect(wrapper.vm.localValue).toBe(5)
    expect($stars.at(0).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(1).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(2).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(3).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(4).is('.b-rating-star-full')).toBe(true)

    // Click 2nd star
    $stars.at(1).trigger('click')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toBe(2)
    expect(wrapper.vm.localValue).toBe(2)
    expect($stars.at(0).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(1).is('.b-rating-star-full')).toBe(true)
    expect($stars.at(2).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(3).is('.b-rating-star-empty')).toBe(true)
    expect($stars.at(4).is('.b-rating-star-empty')).toBe(true)

    wrapper.destroy()
  })

  it('has expected structure when prop `show-clear` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        showClear: true,
        value: 3
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $stars = wrapper.findAll('.b-rating-star')
    // The clear button is a "star"
    expect($stars.length).toBe(6)
    expect($stars.at(0).is('.b-rating-star-clear')).toBe(true)
    expect($stars.at(1).is('.b-rating-star-clear')).not.toBe(true)

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

  it('has expected structure when prop `show-value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        locale: 'en',
        showValue: true,
        value: '3.5',
        precision: 2
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)

    const $value = wrapper.find('.b-rating-value')
    expect($value.exists()).toBe(true)
    expect($value.text()).toEqual('3.50')

    wrapper.setProps({
      value: null
    })
    await waitNT(wrapper.vm)

    expect($value.text()).toEqual('')

    wrapper.setProps({
      value: '1.236'
    })
    await waitNT(wrapper.vm)

    expect($value.text()).toEqual('1.24')

    wrapper.destroy()
  })

  it('has expected structure when prop `show-value` and `show-value-max` are set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        locale: 'en',
        showValue: true,
        showValueMax: true,
        value: '3.5',
        precision: 2
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)

    const $value = wrapper.find('.b-rating-value')
    expect($value.exists()).toBe(true)
    expect($value.text()).toEqual('3.50/5')

    wrapper.setProps({
      value: null
    })
    await waitNT(wrapper.vm)

    expect($value.text()).toEqual('-/5')

    wrapper.setProps({
      value: '1.236'
    })
    await waitNT(wrapper.vm)

    expect($value.text()).toEqual('1.24/5')

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BFormRating, {
      attachToDocument: true,
      propsData: {
        locale: 'en',
        showValue: true,
        disabled: false,
        value: '3.5',
        precision: 2
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $output = wrapper.find('output')
    expect($output.exists()).toBe(true)

    expect(document.activeElement).not.toEqual($output.element)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)

    expect(document.activeElement).toEqual($output.element)
    expect(wrapper.vm.hasFocus).toBe(true)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toEqual($output.element)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    $output.trigger('focus')
    await waitNT(wrapper.vm)

    expect(wrapper.vm.hasFocus).toBe(true)

    $output.trigger('blur')
    await waitNT(wrapper.vm)

    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)

    expect(wrapper.vm.hasFocus).toBe(true)

    wrapper.setProps({
      disabled: true
    })
    await waitNT(wrapper.vm)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    expect(wrapper.vm.hasFocus).not.toBe(true)

    wrapper.destroy()
  })

  it('keyboard navigation works', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        locale: 'en',
        showValue: true,
        value: null
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    const $value = wrapper.find('.b-rating-value')
    expect($value.exists()).toBe(true)
    expect($value.text()).toEqual('')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('2')

    wrapper.trigger('keydown.up')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('3')

    wrapper.trigger('keydown.up')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('4')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('5')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('5')

    wrapper.trigger('keydown.left')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('4')

    wrapper.trigger('keydown.left')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('3')

    wrapper.trigger('keydown.down')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('2')

    wrapper.trigger('keydown.down')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.trigger('keydown.left')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.setProps({
      readonly: true
    })
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.setProps({
      readonly: false,
      disabled: true
    })
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.setProps({
      readonly: false,
      disabled: false,
      showClear: true
    })
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.trigger('keydown.left')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('')

    wrapper.trigger('keydown.right')
    await waitNT(wrapper.vm)
    expect($value.text()).toEqual('1')

    wrapper.destroy()
  })
})
