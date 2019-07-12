import Vue from 'vue'
import { mount } from '@vue/test-utils'
import BTable from './table'

const testItems = [
  { a: 1, b: 2, c: 3 },
  { a: 5, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 },
  { a: 10, b: 11, c: 12 },
  { a: 13, b: 14, c: 15 }
]

const testFields = Object.keys(testItems[0]).sort()

describe('table > provider functions', () => {
  it('synchronous items provider works', async () => {
    const provider = () => {
      return testItems.slice()
    }
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: provider
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('update:busy')).toBeDefined()
    expect(wrapper.emitted('input')).toBeDefined()

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

  it('promise items provider works', async () => {
    let doResolve
    const promise = new Promise(resolve => {
      doResolve = resolve
    })
    const provider = () => {
      return promise
    }
    const wrapper = mount(BTable, {
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
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    // Should have single empty row
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    await Vue.nextTick()

    expect(doResolve).toBeDefined()
    doResolve(testItems.slice())

    await Vue.nextTick()

    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.destroy()
  })

  it('callback items provider works', async () => {
    let callback
    const provider = (ctx, cb) => {
      callback = cb
      return null
    }
    const wrapper = mount(BTable, {
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
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    // Should have single empty row
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    await Vue.nextTick()

    expect(callback).toBeDefined()
    callback(testItems.slice())

    await Vue.nextTick()

    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.destroy()
  })

  it('callback items provider expects 2 arguments', async () => {
    const provider = () => {
      return Promise.resolve(null)
    }
    const wrapper = mount(BTable, {
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
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    // Should have single empty row
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    await Vue.nextTick()

    // Expect busy to be updated to false
    expect(wrapper.vm.localBusy).toBe(false)
    const last = wrapper.emitted('update:busy').length - 1
    expect(wrapper.emitted('update:busy')[last][0]).toBe(false)

    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    wrapper.destroy()
  })

  it('provider refreshing works', async () => {
    const provider = () => {
      return testItems.slice()
    }
    const wrapper = mount(BTable, {
      propsData: {
        id: 'the-table',
        fields: testFields,
        items: provider
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    // Always initially emits a refresh when provider used
    expect(wrapper.emitted('refreshed')).toBeDefined()
    expect(wrapper.emitted('refreshed').length).toBe(1)

    // Instance refresh method
    wrapper.vm.refresh()
    await Vue.nextTick()
    expect(wrapper.emitted('refreshed').length).toBe(2)

    // Root event refreshing
    wrapper.vm.$root.$emit('bv::refresh::table', 'the-table')
    await Vue.nextTick()
    expect(wrapper.emitted('refreshed').length).toBe(3)

    wrapper.destroy()
  })

  it('refresh debouncing works', async () => {
    let callback
    const provider = (ctx, cb) => {
      callback = cb
      return null
    }
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields.map(f => ({ key: f, sortable: true })),
        items: provider,
        sortBy: null,
        sortDesc: true
      }
    })
    expect(wrapper).toBeDefined()

    expect(wrapper.emitted('refreshed')).not.toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('refreshed')).not.toBeDefined()
    expect(wrapper.vm.localBusy).toBe(true)

    // No refreshing if localBusy is true
    wrapper.vm.refresh()
    wrapper.vm.refresh()
    // Trigger a context change that would trigger an internal _providerUpdate
    wrapper.setProps({ sortBy: 'b' })

    await Vue.nextTick()
    expect(wrapper.emitted('refreshed')).not.toBeDefined()

    expect(callback).toBeDefined()
    callback(testItems.slice())
    await Vue.nextTick()

    // Refreshed event should happen only once, even though
    // triggered 3 times while busy
    expect(wrapper.emitted('refreshed')).toBeDefined()
    expect(wrapper.emitted('refreshed').length).toBe(1)

    // Just to be sure, we wait again and re-test
    await Vue.nextTick()
    expect(wrapper.emitted('refreshed').length).toBe(1)
    await Vue.nextTick()
    expect(wrapper.emitted('refreshed').length).toBe(1)

    wrapper.destroy()
  })

  it('reacts to items provider function change', async () => {
    const provider1 = () => {
      return testItems.slice()
    }

    const provider2 = () => {
      return testItems.slice(testItems.length - 1)
    }

    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: provider1
      }
    })
    expect(wrapper).toBeDefined()

    await Vue.nextTick()

    expect(wrapper.emitted('update:busy')).toBeDefined()
    expect(wrapper.emitted('input')).toBeDefined()

    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)

    wrapper.setProps({
      items: provider2
    })

    await Vue.nextTick()

    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)

    expect(wrapper.find('tbody').findAll('tr').length).toBe(1)

    wrapper.destroy()
  })
})
