import Select from './form-select'
import { mount } from '@vue/test-utils'

describe('form-select', () => {
  it('has select as root element', async () => {
    const wrapper = mount(Select)
    expect(wrapper.is('select')).toBe(true)

    wrapper.destroy()
  })

  it('has class custom-select', async () => {
    const wrapper = mount(Select)
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('does not have attr multiple by default', async () => {
    const wrapper = mount(Select)
    expect(wrapper.attributes('multiple')).not.toBeDefined()

    wrapper.destroy()
  })

  it('has attr multiple when multiple=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        multiple: true
      }
    })
    expect(wrapper.attributes('multiple')).toBeDefined()

    wrapper.destroy()
  })

  it('has attr size when select-size is set', async () => {
    const wrapper = mount(Select, {
      propsData: {
        selectSize: 4
      }
    })
    expect(wrapper.attributes('size')).toBeDefined()
    expect(wrapper.attributes('size')).toBe('4')
    expect(wrapper.attributes('multiple')).not.toBeDefined()

    wrapper.destroy()
  })

  it('has auto ID attr by default', async () => {
    const wrapper = mount(Select)
    await wrapper.vm.$nextTick() // auto ID assigned after mount
    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('has user supplied ID attr when id is set', async () => {
    const wrapper = mount(Select, {
      propsData: {
        id: 'foobar'
      }
    })
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.destroy()
  })

  it('does not have attr size by default', async () => {
    const wrapper = mount(Select)
    expect(wrapper.attributes('size')).not.toBeDefined()

    wrapper.destroy()
  })

  it('does have attr size when plain=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        plain: true
      }
    })
    expect(wrapper.attributes('size')).toBeDefined()
    expect(wrapper.attributes('size')).toBe('0')

    wrapper.destroy()
  })

  it('has class custom-select-sm when size=sm and plain=false', async () => {
    const wrapper = mount(Select, {
      propsData: {
        size: 'sm'
      }
    })
    expect(wrapper.classes()).toContain('custom-select-sm')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class custom-select-lg when size=lg and plain=false', async () => {
    const wrapper = mount(Select, {
      propsData: {
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('custom-select-lg')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class custom-select-foo when size=foo and plain=false', async () => {
    const wrapper = mount(Select, {
      propsData: {
        size: 'foo'
      }
    })
    expect(wrapper.classes()).toContain('custom-select-foo')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class is-invalid and attr aria-invalid="true" when state=false', async () => {
    const wrapper = mount(Select, {
      propsData: {
        state: false
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class is-invalid and attr aria-invalid="true" when state="invalid"', async () => {
    const wrapper = mount(Select, {
      propsData: {
        state: 'invalid'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class is-valid when state=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        state: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
    expect(wrapper.classes()).toContain('is-valid')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class is-valid when state="valid"', async () => {
    const wrapper = mount(Select, {
      propsData: {
        state: 'valid'
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
    expect(wrapper.classes()).toContain('is-valid')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has attr aria-invalid="true" when aria-invalid="true"', async () => {
    const wrapper = mount(Select, {
      propsData: {
        ariaInvalid: 'true'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('has attr aria-invalid="true" when aria-invalid=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        ariaInvalid: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('custom-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('has class form-control when plain=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.is('select')).toBe(true)

    wrapper.destroy()
  })

  it('has class form-control-lg when size=lg and plain=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        size: 'lg',
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-lg')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class form-control-sm when size=sm and plain=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        size: 'sm',
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-sm')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class form-control-foo when size=foo and plain=true', async () => {
    const wrapper = mount(Select, {
      propsData: {
        size: 'foo',
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('form-control-foo')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('focus() and blur() methods work', async () => {
    const wrapper = mount(Select, {
      attachToDocument: true
    })

    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    expect(document.activeElement).toBe(wrapper.element)

    wrapper.vm.blur()
    await wrapper.vm.$nextTick()

    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.destroy()
  })

  it('has option elements from simple options array', async () => {
    const wrapper = mount(Select, {
      propsData: {
        options: ['one', 'two', 'three']
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attribute('value')).toBe('one')
    expect($options.at(1).attribute('value')).toBe('two')
    expect($options.at(2).attribute('value')).toBe('three')
    expect($options.is('[disabled]')).toBe(false)

    wrapper.destroy()
  })

  it('has option elements from options array of objects', async () => {
    const wrapper = mount(Select, {
      propsData: {
        options: [
          { text: 'one', value: 1 },
          { text: 'two', value: 2, disabled: true },
          { text: 'three', value: 3 }
        ]
      }
    })
    const $options = wrapper.findAll('option')

    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attribute('value')).toBe('1')
    expect($options.at(1).attribute('value')).toBe('2')
    expect($options.at(2).attribute('value')).toBe('3')
    expect($options.at(0).is('[disabled]')).toBe(false)
    expect($options.at(1).is('[disabled]')).toBe(true)
    expect($options.at(2).is('[disabled]')).toBe(false)

    wrapper.destroy()
  })

  it('has option elements from default slot', async () => {
    const wrapper = mount(Select, {
      slots: {
        default: [
          '<option value="1">one</option>',
          '<option value="2">two</option>',
          '<option value="3">three</option>'
        ]
      }
    })
    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attribute('value')).toBe('1')
    expect($options.at(1).attribute('value')).toBe('2')
    expect($options.at(2).attribute('value')).toBe('3')
    expect($options.is('[disabled]')).toBe(false)

    wrapper.destroy()
  })
})
