import Input from './form-checkbox'
import { mount } from '@vue/test-utils'

describe('form-checkbox', async () => {
  /* Custom checkbox structure, class and attributes tests */

  it('default has wrapper class custom-control and custom-checkbox', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.classes().length).toEqual(2)
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-checkbox')
  })

  it('default has input type checkbox', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBeDefined()
    expect(input.attributes('type')).toEqual('checkbox')
  })

  it('default has input class custom-control-input', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('custom-control-input')
  })

  it('default has label class custom-control-label', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('label')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('custom-control-label')
  })

  it('default has default slot content in label', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const label = wrapper.find('label')
    expect(label.text()).toEqual('foobar')
  })

  it('default has no disabled attribute on input', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).not.toBeDefined()
  })

  it('default has disabled attribute on input when prop disabled set', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false,
        disabled: true
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('default has no required attribute on input', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).not.toBeDefined()
  })

  it('default does not have required attribute on input when prop required set and name prop not provided', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false,
        required: true
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).not.toBeDefined()
  })

  it('default has no name attribute on input', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).not.toBeDefined()
  })

  it('default has name attribute on input when name prop set', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false,
        name: 'test'
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).toBeDefined()
    expect(input.attributes('name')).toEqual('test')
  })

  it('default has required attribute on input when prop required set and prop name set', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false,
        required: true,
        name: 'test'
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeDefined()
  })

  it('default has no form attribute on input', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('form')).not.toBeDefined()
  })

  it('default has form attribute on input when form prop set', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false,
        form: 'test'
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('form')).toBeDefined()
    expect(input.attributes('form')).toEqual('test')
  })

  it('default has default slot content in label', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const label = wrapper.find('label')
    expect(label.text()).toEqual('foobar')
  })

  it('derfault has class custom-control-inline when prop inline=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false,
        inline: true
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.classes().length).toEqual(3)
    expect(wrapper.classes()).toContain('custom-checkbox')
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-control-inline')
  })

  /* plain styling */
  it('plain has wrapper class form-check', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.classes().length).toEqual(1)
    expect(wrapper.classes()).toContain('form-check')
  })

  it('plain has input type checkbox', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBeDefined()
    expect(input.attributes('type')).toEqual('checkbox')
  })

  it('plain has input class form-check-input', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('form-check-input')
  })

  it('plain has label class form-check-label', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const input = wrapper.find('label')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('form-check-label')
  })

  it('plain has default slot content in label', async () => {
    const wrapper = mount(Input, {
      propsData: {
        plain: true,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    const label = wrapper.find('label')
    expect(label.text()).toEqual('foobar')
  })

  /* functionality testing */

  it('derfault has internal localChecked=false when prop checked=false', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual(false)
  })

  it('derfault has internal localChecked=true when prop checked=true', async () => {
    const wrapper = mount(Input, {
      propsData: {
        checked: true
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual(true)
  })

  it('derfault has internal localChecked set to uncheckedValue', async () => {
    const wrapper = mount(Input, {
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar'
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual('foo')
  })

  it('derfault has internal localChecked set to value when checked=value', async () => {
    const wrapper = mount(Input, {
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar',
        checked: 'bar'
      },
      slots: {
        default: 'foobar'
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual('bar')
  })
})
