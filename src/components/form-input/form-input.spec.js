import Input from './form-input'
import { mount } from '@vue/test-utils'

describe('form-input', async () => {
  it('has class form-control', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control')
  })

  it('does not have class form-control when plain=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('form-control')
  })

  it('has class form-control-lg when size=lg and plane=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'lg'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-lg')
  })

  it('has class form-control-sm when size=lg and plain=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'sm'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('form-control-sm')
  })

  it('does not have class form-control or form-control-lg when plain=true and size=lg', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true,
        size: 'lg'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('form-control')
  })

  it('has user supplied id', async () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('foobar')
  })

  it('renders text input by default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
  })

  it('renders number input when type set to number', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'number'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('number')
  })

  it('renders text input when type not supported', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
  })

  it('does not have input-valid or input-invalid classes when state is default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('input-valid')
    expect(input.classes()).not.toContain('input-invalid')
  })

  it('has class input-valid when state=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('input-valid')
    expect(input.classes()).not.toContain('input-invalid')
  })

  it('has class input-invalid when state=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: false
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('input-invalid')
    expect(input.classes()).not.toContain('input-valid')
  })

  it('does not have aria-invalid attribute when state is true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: true
      }
    })
    const input = wrapper.find('input')
    expect(wrapper.contains('[aria-invalid]')).toBe(false)
  })

  it('does not have aria-invalid attribute when state is default', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(wrapper.contains('[aria-invalid]')).toBe(false)
  })

  it('has aria-invalid attribute when state=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        state: false
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

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

  it('focused number inout with no-wheel set to true works', async () => {
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

    // no-wheel=true will fire a blur event on the input
    expect(spy).toHaveBeenCalled()
  })

  it('focused number inout with no-wheel set to false works', async () => {
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

    // no-wheel=false will not fire a blur event on the input
    expect(spy).not.toHaveBeenCalled()
  })
})
