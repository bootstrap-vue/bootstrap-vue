import { mount } from '@vue/test-utils'
import { BFormSelectOption } from './form-select-option'

describe('form-select-option', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormSelectOption, {
      propsData: {
        value: 'foo'
      }
    })

    expect(wrapper.is('option')).toBe(true)
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')
    expect(wrapper.text()).toEqual('')
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

    expect(wrapper.is('option')).toBe(true)
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')
    expect(wrapper.text()).toEqual('foobar')
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

    expect(wrapper.is('option')).toBe(true)
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')

    const $bold = wrapper.find('b')
    expect($bold.text()).toEqual('Bold')
  })

  it('has disabled attribute applied when disabled=true', async () => {
    const wrapper = mount(BFormSelectOption, {
      propsData: {
        value: 'foo',
        disabled: true
      }
    })

    expect(wrapper.is('option')).toBe(true)
    expect(wrapper.attributes('value')).toBeDefined()
    expect(wrapper.attributes('value')).toEqual('foo')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('disabled')).toEqual('disabled')
    expect(wrapper.text()).toEqual('')
  })
})
