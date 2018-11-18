import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [
  { a: 1, b: 2, c: 3 },
  { a: 5, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 }
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

  it('should have attribute aria-busy=true when data localBusy=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')

    wrapper.setData({
      localBusy: true
    })

    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
  })

  it('should render table-busy slot when busy=true and slot provided', async () => {
    const wrapper = mount(Table, {
      propsData: {
        busy: false,
        items: testItems
      },
      slots: {
        'table-busy': 'busy slot content'
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.setProps({
      busy: true
    })

    // Await until next tick to check rendered DOM
    return Vue.nextTick().then(function() {
      expect(wrapper.attributes('aria-busy')).toBeDefined()
      expect(wrapper.attributes('aria-busy')).toEqual('true')
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(1)
      expect(wrapper.find('tbody').text()).toContain('busy slot content')
      expect(wrapper.find('tbody').find('tr').classes()).toContain('b-table-busy-slot')
    })
  })
})
