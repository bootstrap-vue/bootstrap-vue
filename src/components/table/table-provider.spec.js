import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BTable } from './table'

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

    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)

    expect(doResolve).toBeDefined()
    doResolve(testItems.slice())

    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)

    expect(callback).toBeDefined()
    callback(testItems.slice())

    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

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

    await waitNT(wrapper.vm)

    // Always initially emits a refresh when provider used
    expect(wrapper.emitted('refreshed')).toBeDefined()
    expect(wrapper.emitted('refreshed').length).toBe(1)

    // Instance refresh method
    wrapper.vm.refresh()
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('refreshed').length).toBe(2)

    // Root event refreshing
    wrapper.vm.$root.$emit('bv::refresh::table', 'the-table')
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
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

    expect(wrapper.emitted('refreshed')).toBeUndefined()

    await waitNT(wrapper.vm)

    expect(wrapper.emitted('refreshed')).toBeUndefined()
    expect(wrapper.vm.localBusy).toBe(true)

    // No refreshing if localBusy is true
    wrapper.vm.refresh()
    wrapper.vm.refresh()
    // Trigger a context change that would trigger an internal _providerUpdate
    await wrapper.setProps({ sortBy: 'b' })
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('refreshed')).toBeUndefined()

    expect(callback).toBeDefined()
    callback(testItems.slice())
    await waitNT(wrapper.vm)

    // Refreshed event should happen only once, even though
    // triggered 3 times while busy
    expect(wrapper.emitted('refreshed')).toBeDefined()
    expect(wrapper.emitted('refreshed').length).toBe(1)

    // Just to be sure, we wait again and re-test
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('refreshed').length).toBe(1)
    await waitNT(wrapper.vm)
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

    await waitNT(wrapper.vm)

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

    await wrapper.setProps({ items: provider2 })
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

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

  it('calls provider only once when filter is pre-set object', async () => {
    let providerCallCount = 0
    const provider = () => {
      providerCallCount++
      return testItems.slice()
    }

    const wrapper = mount(BTable, {
      propsData: {
        filter: { a: '123' },
        fields: testFields.slice(),
        items: provider
      }
    })

    await waitNT(wrapper.vm)

    expect(providerCallCount).toBe(1)

    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

    expect(providerCallCount).toBe(1)

    wrapper.destroy()
  })

  it('provider is called when filter object child property is changed', async () => {
    let lastProviderContext = {}

    // We need a wrapper app to get around a "bug" in Vue test utils that
    // doesn't let us change a child property in an object and update
    // that prop with the same object reference
    // https://forum.vuejs.org/t/vue-test-utils-watchers-on-object-properties-not-triggered/50900/11?u=tmorehouse
    const App = {
      data() {
        return {
          filter: {
            a: '123'
          },
          fields: testFields.slice()
        }
      },
      methods: {
        provider(ctx) {
          lastProviderContext = ctx
          return testItems.slice()
        }
      },
      render(h) {
        return h(BTable, {
          props: {
            items: this.provider,
            fields: this.fields,
            filter: this.filter
          }
        })
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body
    })

    expect(wrapper.element.tagName).toBe('TABLE')

    const $table = wrapper.findComponent(BTable)
    expect($table.exists()).toBe(true)

    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

    expect(lastProviderContext.filter).toEqual({
      a: '123'
    })

    // Change the filter criteria child property, but not the object reference
    // `setData` recursively traverses the object and only changes the leaf values
    await wrapper.setData({ filter: { a: '456' } })
    expect(wrapper.vm.filter).toEqual({ a: '456' })

    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)
    await waitNT(wrapper.vm)

    expect(lastProviderContext.filter).toEqual({
      a: '456'
    })

    wrapper.destroy()
  })
})
