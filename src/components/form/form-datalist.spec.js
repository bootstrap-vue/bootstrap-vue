import { mount } from '@vue/test-utils'
import { BFormDatalist } from './form-datalist'

describe('form-datalist', () => {
  it('has root element datalist', async () => {
    const wrapper = mount(BFormDatalist, {
      props: {
        id: 'test-list'
      }
    })
    expect(wrapper.element.tagName).toBe('DATALIST')

    wrapper.unmount()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BFormDatalist, {
      props: {
        id: 'test-list'
      }
    })
    expect(wrapper.attributes('id')).toBe('test-list')

    wrapper.unmount()
  })

  it('has no option elements by default', async () => {
    const wrapper = mount(BFormDatalist, {
      props: {
        id: 'test-list'
      }
    })
    expect(wrapper.findAll('option').length).toBe(0)

    wrapper.unmount()
  })

  it('has options when options set', async () => {
    const wrapper = mount(BFormDatalist, {
      props: {
        id: 'test-list',
        options: ['one', 'two']
      }
    })
    const $options = wrapper.findAll('option')

    expect($options.length).toBe(2)

    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')

    expect($options[0].attributes('value')).toBe('one')
    expect($options[1].attributes('value')).toBe('two')

    wrapper.unmount()
  })
})
