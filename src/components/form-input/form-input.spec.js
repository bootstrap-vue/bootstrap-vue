// import {loadFixture, testVM} from '../../../tests/utils'
import Input from './form-input'
import { mount } from 'vue-test-utils'

describe('form-input', async () => {
  it('emits an input event', async () => {
    const wrapper = mount(Input)

    const input = wrapper.find('input')
    input.element.value = 'test'
    input.trigger('input')

    expect(wrapper.emitted().input[0]).toEqual(['test'])
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

  it('apply transform function', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter (value) {
          return value.toLowerCase()
        }
      }
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')

    expect(wrapper.emitted().input[0]).toEqual(['test'])
  })

  it('lazy apply transform function', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter (value) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })
    const input = wrapper.find('input')
    input.element.value = 'TEST'
    input.trigger('input')
    expect(wrapper.emitted().input[0]).not.toEqual(['test'])

    input.trigger('change')
    expect(wrapper.emitted().change[0]).toEqual(['test'])
  })

  it('does not emit a native wheel event with no-wheel set when focused', async () => {
    const spy = jest.fn()
    const wrapper = mount(Input, {
      listeners: {
        wheel: spy
      }
    })
    const input = wrapper.find('input#nowheel')
    input.trigger('focus')
    input.trigger('wheel', { deltaY: 10 })

    expect(wrapper.emitted()).toMatchObject({})
    expect(spy).not.toHaveBeenCalled()
  })

  it('does emit a native wheel event with no-wheel not set when focused', async () => {
    const spy = jest.fn()
    const wrapper = mount(Input, {
      propsData: {
        noWheel: false
      },
      listeners: {
        wheel: spy
      }
    })
    const input = wrapper.find('input#nowheel')
    input.trigger('focus')
    input.trigger('wheel', { deltaY: 10 })

    expect(wrapper.emitted()).toMatchObject({})
    expect(spy).toHaveBeenCalled()
  })
})
