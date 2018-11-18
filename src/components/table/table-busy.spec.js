import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [
  {a: 1, b: 2, c: 3 },
  {a: 1, b: 2, c: 3 },
  {a: 1, b: 2, c: 3 }
]

describe('b-table busy state', async () => {
  it('default should have attribute aria-busy=false', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')
  })

  it('default should have rows rendered', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
  })

  it('should have attribute aria-busy=true when busy=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        busy: true,
        items: testItems
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
  })

  it('should render table-busy slot when busy=true and slot provided', async () => {
    const wrapper = mount(Table, {
      propsData: {
        busy: true
        items: testItems
      },
      slots: {
        'table-busy': 'busy slot content'
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)
    expect(wrapper.find('tbody').text()).toContain('busy slot content')
  })

  it('should not render table-busy slot when busy=false and slot provided', async () => {
    const wrapper = mount(Table, {
      propsData: {
        busy: false
        items: testItems
      },
      slots: {
        'table-busy': 'busy slot content'
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
    expect(wrapper.find('tbody').text()).not.toContain('busy slot content')
  })

  it('should set class b-table-busy-slot on tbody>tr when busy=true and slot provided', async () => {
    const wrapper = mount(Table, {
      propsData: {
        busy: true
        items: testItems
      },
      slots: {
        'table-busy': 'busy slot content'
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').find('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').find('tr').classes()).toContain('b-table-busy-slot')
  })
})
