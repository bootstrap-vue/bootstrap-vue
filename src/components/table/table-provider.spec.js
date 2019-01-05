import Vue from 'vue'
import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [
  { a: 1, b: 2, c: 3 },
  { a: 5, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 },
  { a: 10, b: 11, c: 12 },
  { a: 13, b: 14, c: 15 }
]

const testFields = Object.keys(testItems[0]).sort()

describe('b-table provider functions', async () => {
  it('syncronous items provider works', async () => {
    function provider (ctx) {
      return testItems.slice()
    }
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: provider
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('update:busy')).toBeDefined()

    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
  })

  it('promise items provider works', async () => {
    let doResolve
    const promise = new Promise((resolve, reject) => { doResolve = resolve })
    function provider (ctx) {
      return promise
    }
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: provider,
        showEmpty: true
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('update:busy')).toBeDefined()

    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    // Should have single empty row
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    await Vue.nextTick()

    expect(doResolve).toBeDefined()
    doResolve(testItems.slice())

    await Vue.nextTick()

    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
  })

  it('callback items provider works', async () => {
    let callback
    function provider (ctx, cb) {
      callback = cb
      return null
    }
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: provider,
        showEmpty: true
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('update:busy')).toBeDefined()

    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    // Should have single empty row
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    await Vue.nextTick()

    expect(callback).toBeDefined()
    callback(testItems.slice())

    await Vue.nextTick()

    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
  })

  it('callback items provider expects 2 arguments', async () => {
    function provider (ctx) {
      return null
    }
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: provider,
        showEmpty: true
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('update:busy')).toBeDefined()

    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    // Should have single empty row
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    await Vue.nextTick()

    // Expect busy to be updated to false
    const last = wrapper.emitted('update:busy').length - 1
    expect(wrapper.emitted('update:busy')[last][0]).toBe(false)

    expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)
  })
})
