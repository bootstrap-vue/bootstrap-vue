import { mount } from '@vue/test-utils'
import { BFormSelectOptionGroup } from './form-select-option-group'

describe('form-select-option-group', () => {
  afterAll(() => {
    console.warn.mockClear()
  })

  it('has expected default structure', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      propsData: {
        label: 'foo'
      }
    })

    expect(wrapper.is('optgroup')).toBe(true)
    expect(wrapper.attributes('label')).toBeDefined()
    expect(wrapper.attributes('label')).toEqual('foo')
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('has option elements from simple options array', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      propsData: {
        label: 'foo',
        options: ['one', 'two', 'three']
      }
    })

    expect(wrapper.is('optgroup')).toBe(true)
    expect(wrapper.attributes('label')).toBeDefined()
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('one')
    expect($options.at(1).attributes('value')).toBe('two')
    expect($options.at(2).attributes('value')).toBe('three')
    expect($options.is('[disabled]')).toBe(false)

    wrapper.destroy()
  })

  it('has option elements from options array of objects', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      propsData: {
        label: 'foo',
        options: [
          { text: 'one', value: 1 },
          { text: 'two', value: 2, disabled: true },
          { text: 'three', value: 3 }
        ]
      }
    })

    expect(wrapper.is('optgroup')).toBe(true)
    expect(wrapper.attributes('label')).toBeDefined()
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('1')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('3')
    expect($options.at(0).is('[disabled]')).toBe(false)
    expect($options.at(1).is('[disabled]')).toBe(true)
    expect($options.at(2).is('[disabled]')).toBe(false)

    wrapper.destroy()
  })

  it('has option elements from options legacy object format', async () => {
    const spyWarn = jest.spyOn(console, 'warn').mockImplementationOnce(() => {})
    const wrapper = mount(BFormSelectOptionGroup, {
      propsData: {
        label: 'foo',
        options: { one: 1, two: { value: 2, text: 'Two' }, three: 'three' }
      }
    })

    expect(wrapper.is('optgroup')).toBe(true)
    expect(wrapper.attributes('label')).toBeDefined()
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('1')
    expect($options.at(1).text()).toBe('Two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('one')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('three')

    expect(spyWarn).toHaveBeenLastCalledWith(
      '[BootstrapVue warn]: BFormSelectOptionGroup - Setting prop "options" to an object is deprecated. Use the array format instead.'
    )

    wrapper.destroy()
  })

  it('has option elements from default slot', async () => {
    const wrapper = mount(BFormSelectOptionGroup, {
      propsData: {
        label: 'foo'
      },
      slots: {
        default: [
          '<option value="1">one</option>',
          '<option value="2">two</option>',
          '<option value="3">three</option>'
        ]
      }
    })

    expect(wrapper.is('optgroup')).toBe(true)
    expect(wrapper.attributes('label')).toBeDefined()
    expect(wrapper.attributes('label')).toEqual('foo')

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')
    expect($options.at(2).text()).toBe('three')
    expect($options.at(0).attributes('value')).toBe('1')
    expect($options.at(1).attributes('value')).toBe('2')
    expect($options.at(2).attributes('value')).toBe('3')

    wrapper.destroy()
  })
})
