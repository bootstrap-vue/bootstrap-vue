import Datalist from './form-datalist'
import { mount } from '@vue/test-utils'

describe('form-datalist', () => {
  it('has root element datalist', async () => {
    const wrapper = mount(Datalist, {
      propsData: {
        id: 'testlist'
      }
    })
    expect(wrapper.is('datalist')).toBe(true)

    wrapper.destroy()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(Datalist, {
      propsData: {
        id: 'testlist'
      }
    })
    expect(wrapper.attributes('id')).toBe('testlist')

    wrapper.destroy()
  })

  it('has no oprion elements by default', async () => {
    const wrapper = mount(Datalist, {
      propsData: {
        id: 'testlist'
      }
    })
    expect(wrapper.findAll('option').length).toBe(0)

    wrapper.destroy()
  })

  it('has options when options set', async () => {
    const wrapper = mount(Datalist, {
      propsData: {
        id: 'testlist',
        options: ['one', 'two']
      }
    })
    const $options = wrapper.findAll('option')

    expect($options.length).toBe(2)

    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')

    expect($options.at(0).attributes('value')).toBe('one')
    expect($options.at(1).attributes('value')).toBe('two')

    wrapper.destroy()
  })
})
