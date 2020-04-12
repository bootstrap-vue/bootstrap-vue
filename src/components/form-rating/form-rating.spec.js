import { mount } from '@vue/test-utils'
import { waitNT /*, waitRAF */ } from '../../../tests/utils'
import { BFormRating } from './form-rating'

describe('form-rating', () => {
  it('has expected default strcture', async () => {
    const wrapper = mount(BFormRating)

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

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

    // TBD

    wrapper.destroy()
  })

  it('has expected strcture when prop `value` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // TBD

    wrapper.setProps({
      value: 4
    })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // TBD

    wrapper.setProps({
      value: 1
    })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).not.toBeDefined()

    // TBD

    const $stars = wrapper.findAll('.b-rating-star')
    expect($stars.length).toBe(5)

    // Click 5th star
    $stars.at(4).trigger('click')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toBe(5)

    // Click 2nd star
    $stars.at(1).trigger('click')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toBe(2)

    wrapper.destroy()
  })

  it('has expected strcture when prop `name` set', async () => {
    const wrapper = mount(BFormRating, {
      propsData: {
        name: 'foo',
        value: '3.5'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)

    // TBD

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
})
