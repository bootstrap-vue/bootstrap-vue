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

  it('should emit update:busy event when data localBusy is set to true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.emitted('update:busy')).not.toBeDefined()

    wrapper.setData({
      localBusy: true
    })

    expect(wrapper.emitted('update:busy')).toBeDefined()
    expect(wrapper.emitted('update:busy')[0][0]).toEqual(true)
  })

  it('should render table-busy slot when busy=true and slot provided', async () => {
    const wrapper = mount(Table, {
      propsData: {
        busy: false,
        items: testItems
      },
      slots: {
        // Note slot data needs to be wrapped in an element.
        // https://github.com/vue/vue-test-utils/issues:992
        // Will be fixed in v1.0.0-beta.26
        'table-busy': '<span>busy slot content</span>'
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

    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)
    expect(wrapper.find('tbody').text()).toContain('busy slot content')
    expect(wrapper.find('tbody').find('tr').classes()).toContain('b-table-busy-slot')

    wrapper.setProps({
      busy: false
    })

    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
  })

  it('table-busy slot works with async provider function', async () => {
    let callback = null
    let called = false
    const providerFn = (ctx, cb) => {
      // Simulate async function by letting us call calback manually
      callback = cb
      called = true
    }
    const wrapper = mount(Table, {
      propsData: {
        fields: Object.keys(testItems[0]),
        items: providerFn,
        busy: false
      },
      slots: {
        'table-busy': '<span>busy slot content</span>'
      }
    })

    expect(callback).toBe(null)
    expect(called).toBe(false)
    expect(typeof wrapper.props('items')).toBe('function')
    expect(wrapper.vm.localBusy).toBe(true)
    expect(wrapper.vm.computedBusy).toBe(true)

    // When items is a provider function, localBusy is immediately set to true
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)
    expect(wrapper.find('tbody').text()).toContain('busy slot content')
    expect(wrapper.emitted('update:busy')).toBeDefined()
    expect(wrapper.emitted('update:busy').length).toBe(1)
    expect(wrapper.emitted('update:busy')[0][0]).toEqual(true)

    // Provider function is called after nextTick on mount, so we wait and call the callback
    return wrapper.vm.$nextTick(() => {
      // callback should now be set
      expect(typeof callback).toBe('function')

      // Send the items array to b-table
      callback(testItems)

      // b-table should immediately clear busy state and populate items
      expect(wrapper.attributes('aria-busy')).toBeDefined()
      expect(wrapper.attributes('aria-busy')).toEqual('false')
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
      expect(wrapper.emitted('update:busy').length).toBe(2)
      expect(wrapper.emitted('update:busy')[1][0]).toEqual(false)
      expect(wrapper.emitted('refreshed')).toBeDefined()
      expect(wrapper.emitted('refreshed').length).toBe(1)
    })
  })
})
