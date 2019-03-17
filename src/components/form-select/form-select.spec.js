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
})
