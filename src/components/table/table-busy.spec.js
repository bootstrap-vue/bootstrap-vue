import BTable from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]

describe('table > busy state', () => {
  it('default should have attribute aria-busy=false', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')

    wrapper.destroy()
  })

  it('default should have item rows rendered', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.destroy()
  })

  it('should have attribute aria-busy=true when prop busy=true', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        busy: true,
        items: testItems
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')

    wrapper.destroy()
  })

  it('should have attribute aria-busy=true when data localBusy=true', async () => {
    const wrapper = mount(BTable, {
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

    wrapper.destroy()
  })

  it('should emit update:busy event when data localBusy is toggled', async () => {
    const wrapper = mount(BTable, {
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

    wrapper.destroy()
  })

  it('should render table-busy slot when prop busy=true and slot provided', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        busy: false,
        items: testItems
      },
      slots: {
        // Note: Slot data needs to be wrapped in an element
        // https://github.com/vue/vue-test-utils/issues:992
        // Will be fixed in v1.0.0-beta.26
        'table-busy': '<span>busy slot content</span>'
      }
    })
    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.setProps({
      busy: true
    })

    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('true')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)
    expect(wrapper.find('tbody').text()).toContain('busy slot content')
    expect(
      wrapper
        .find('tbody')
        .find('tr')
        .classes()
    ).toContain('b-table-busy-slot')

    wrapper.setProps({
      busy: false
    })

    expect(wrapper.attributes('aria-busy')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toEqual('false')
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.destroy()
  })
})
