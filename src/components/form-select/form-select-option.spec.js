import { mount } from '@vue/test-utils'
import { BFormSelectOption } from './form-select-option'

describe('form-select-option', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormSelectOption, {
      propsData: {
        value: 'foo'
      }
    })

    expect(wrapper.element.tagName).toBe('OPTION')
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BFormSelectOption, {
      propsData: {
        value: 'foo'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('OPTION')
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('renders HTML as default slot content', async () => {
    const wrapper = mount(BFormSelectOption, {
      propsData: {
        value: 'foo'
      },
      slots: {
        default: '<b>Bold</b>'
      }
    })

    expect(wrapper.element.tagName).toBe('OPTION')
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')

    const $bold = wrapper.find('b')
    expect($bold.text()).toEqual('Bold')

    wrapper.destroy()
  })

  it('has disabled attribute applied when disabled=true', async () => {
    const wrapper = mount(BFormSelectOption, {
      propsData: {
        value: 'foo',
        disabled: true
      }
    })

    expect(wrapper.element.tagName).toBe('OPTION')
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('disabled')).toEqual('disabled')
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })
})
