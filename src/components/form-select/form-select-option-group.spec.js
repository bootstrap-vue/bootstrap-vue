import { mount } from '@vue/test-utils'
import { h } from '../../vue'
import { BFormSelectOptionGroup } from './form-select-option-group'

describe('form-select-option-group', () => {
  afterAll(() => {
    console.warn.mockClear()
  })

  it('has expected default structure', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      props: {
        label: 'foo'
      }
    })

    expect(wrapper.element.tagName).toBe('OPTGROUP')
    expect(wrapper.attributes('label')).toEqual('foo')
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has option elements from simple options array', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      props: {
        label: 'foo',
        options: ['one', 'two', 'three']
      }
    })

    expect(wrapper.element.tagName).toBe('OPTGROUP')
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[0].attributes('value')).toBe('one')
    expect($options[1].attributes('value')).toBe('two')
    expect($options[2].attributes('value')).toBe('three')
    $options.forEach($option => {
      expect($option.attributes('disabled')).toBeUndefined()
    })

    wrapper.unmount()
  })

  it('has option elements from options array of objects', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      props: {
        label: 'foo',
        options: [
          { text: 'one', value: 1 },
          { text: 'two', value: 2, disabled: true },
          { text: 'three', value: 3 }
        ]
      }
    })

    expect(wrapper.element.tagName).toBe('OPTGROUP')
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[0].attributes('value')).toBe('1')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('3')
    expect($options[0].attributes('disabled')).toBeUndefined()
    expect($options[1].attributes('disabled')).toBeDefined()
    expect($options[2].attributes('disabled')).toBeUndefined()

    wrapper.unmount()
  })

  it('has option elements from options legacy object format', async () => {
    const spyWarn = jest.spyOn(console, 'warn').mockImplementationOnce(() => {})
    const wrapper = mount(BFormSelectOptionGroup, {
      props: {
        label: 'foo',
        options: { one: 1, two: { value: 2, text: 'Two' }, three: 'three' }
      }
    })

    expect(wrapper.element.tagName).toBe('OPTGROUP')
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('1')
    expect($options[1].text()).toBe('Two')
    expect($options[2].text()).toBe('three')
    expect($options[0].attributes('value')).toBe('one')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('three')

    expect(spyWarn).toHaveBeenLastCalledWith(
      '[BootstrapVue warn]: BFormSelectOptionGroup - Setting prop "options" to an object is deprecated. Use the array format instead.'
    )

    wrapper.unmount()
  })

  it('has option elements from default slot', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      props: {
        label: 'foo'
      },
      slots: {
        default: [
          h('option', { value: 1 }, 'one'),
          h('option', { value: 2 }, 'two'),
          h('option', { value: 3 }, 'three')
        ]
      }
    })

    expect(wrapper.element.tagName).toBe('OPTGROUP')
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[0].attributes('value')).toBe('1')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('3')

    wrapper.unmount()
  })
})
