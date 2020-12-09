import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { stringifyRecordValues } from './helpers/stringify-record-values'
import { BTable } from './table'

const testItems = [{ a: 3, b: 'b', c: 'x' }, { a: 1, b: 'c', c: 'y' }, { a: 2, b: 'a', c: 'z' }]
const testFields = ['a', 'b', 'c']

describe('table > filtering', () => {
  it('should not be filtered by default', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(testItems)
    const $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    const columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')

    wrapper.destroy()
  })

  it('should be filtered when filter is a string', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: 'z'
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(1)

    const $tds = $rows.at(0).findAll('td')

    expect($tds.at(0).text()).toBe('2')
    expect($tds.at(1).text()).toBe('a')
    expect($tds.at(2).text()).toBe('z')

    wrapper.destroy()
  })

  it('should emit filtered event when filter string is changed', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: ''
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    expect(wrapper.emitted('filtered')).toBeUndefined()

    await wrapper.setProps({
      filter: 'z'
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    expect(wrapper.emitted('filtered')).toBeDefined()
    expect(wrapper.emitted('filtered').length).toBe(1)
    // Copy of items matching filter
    expect(wrapper.emitted('filtered')[0][0]).toEqual([testItems[2]])
    // Number of rows matching filter
    expect(wrapper.emitted('filtered')[0][1]).toEqual(1)

    await wrapper.setProps({
      filter: ''
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)

    expect(wrapper.emitted('filtered').length).toBe(2)
    // Copy of items matching filter
    expect(wrapper.emitted('filtered')[1][0]).toEqual(testItems)
    // Number of rows matching filter
    expect(wrapper.emitted('filtered')[1][1]).toEqual(3)

    await wrapper.setProps({
      filter: '3'
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    expect(wrapper.emitted('filtered').length).toBe(3)
    // Copy of items matching filter
    expect(wrapper.emitted('filtered')[2][0]).toEqual([testItems[0]])
    // Number of rows matching filter
    expect(wrapper.emitted('filtered')[2][1]).toEqual(1)

    await wrapper.setProps({
      // Setting to null will also clear the filter
      filter: null
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)

    expect(wrapper.emitted('filtered').length).toBe(4)
    // Copy of items matching filter
    expect(wrapper.emitted('filtered')[3][0]).toEqual(testItems)
    // Number of rows matching filter
    expect(wrapper.emitted('filtered')[3][1]).toEqual(3)

    wrapper.destroy()
  })

  it('should work with filter function', async () => {
    const filterFn = (item, regexp) => {
      // We are passing a regexp for this test
      return regexp.test(stringifyRecordValues(item))
    }
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: '',
        filterFunction: filterFn
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    expect(wrapper.emitted('filtered')).toBeUndefined()

    await wrapper.setProps({
      filter: /z/
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    expect(wrapper.emitted('filtered')).toBeDefined()
    expect(wrapper.emitted('filtered').length).toBe(1)
    // Copy of items matching filter
    expect(wrapper.emitted('filtered')[0][0]).toEqual([testItems[2]])
    // Number of rows matching filter
    expect(wrapper.emitted('filtered')[0][1]).toEqual(1)

    await wrapper.setProps({
      filter: []
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)

    expect(wrapper.emitted('filtered').length).toBe(2)
    // Copy of items matching filter
    expect(wrapper.emitted('filtered')[1][0]).toEqual(testItems)
    // Number of rows matching filter
    expect(wrapper.emitted('filtered')[1][1]).toEqual(3)

    wrapper.destroy()
  })

  it('should be filtered with no rows when no matches', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: 'ZZZZZZZZ'
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(0)

    wrapper.destroy()
  })

  it('`filter-ignored-fields` prop works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: '',
        filterIgnoredFields: []
      }
    })

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(3)

    // Search for a value in "a" column
    await wrapper.setProps({ filter: '3' })
    await waitNT(wrapper.vm)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    // Ignore "a" column from filtering
    await wrapper.setProps({ filterIgnoredFields: ['a'] })
    await waitNT(wrapper.vm)
    expect(wrapper.findAll('tbody > tr').length).toBe(0)

    wrapper.destroy()
  })

  it('`filter-included-fields` prop works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        // Add a extra item with a duplicated value in another field
        items: [...testItems, { a: 4, b: 'y', c: 'a' }],
        filter: '',
        filterIncludedFields: []
      }
    })

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(4)

    // Search for "a"
    await wrapper.setProps({ filter: 'a' })
    await waitNT(wrapper.vm)
    expect(wrapper.findAll('tbody > tr').length).toBe(2)

    // Only include "a" and "b" fields
    await wrapper.setProps({ filterIncludedFields: ['a', 'b'] })
    await waitNT(wrapper.vm)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    wrapper.destroy()
  })

  it('should filter for formatted values for keys which are not present in row', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        items: [{ a: 'A', b: 'B' }],
        fields: [
          { key: 'a' },
          {
            key: 'b',
            formatter: () => 'Foo',
            filterByFormatted: true
          },
          {
            key: 'c',
            formatter: () => 'Bar',
            filterByFormatted: true
          }
        ],
        filter: 'Bar'
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    wrapper.destroy()
  })

  it('should show empty filtered message when no matches and show-empty=true', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: '',
        showEmpty: true
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.findAll('tbody > tr').length).toBe(testItems.length)

    await wrapper.setProps({
      filter: 'ZZZZZZ'
    })
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.find('tbody > tr').text()).toBe(wrapper.vm.emptyFilteredText)
    expect(wrapper.find('tbody > tr').classes()).toContain('b-table-empty-row')
    expect(wrapper.find('tbody > tr').attributes('role')).toBe('row')
    expect(wrapper.find('tbody > tr > td').attributes('role')).toBe('cell')
    expect(wrapper.find('tbody > tr > td > div').attributes('role')).toBe('alert')
    expect(wrapper.find('tbody > tr > td > div').attributes('aria-live')).toBe('polite')

    wrapper.destroy()
  })

  describe('debouncing (deprecated)', () => {
    // Wrapped in a describe to limit console.warn override
    // to prevent deprecated prop warnings
    const originalWarn = console.warn
    afterEach(() => (console.warn = originalWarn))
    beforeEach(() => (console.warn = () => {}))

    it('filter debouncing works', async () => {
      jest.useFakeTimers()
      let lastFilterTimer = null
      const wrapper = mount(BTable, {
        propsData: {
          fields: testFields,
          items: testItems,
          filterDebounce: 100 // 100ms
        }
      })
      expect(wrapper).toBeDefined()
      expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
      expect(wrapper.findAll('tbody > tr').length).toBe(3)
      expect(wrapper.vm.$_filterTimer).toBe(null)
      await waitNT(wrapper.vm)
      expect(wrapper.emitted('input')).toBeDefined()
      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.emitted('input')[0][0]).toEqual(testItems)
      expect(wrapper.vm.$_filterTimer).toBe(null)
      lastFilterTimer = wrapper.vm.$_filterTimer

      // Set filter to a single character
      await wrapper.setProps({
        filter: '1'
      })
      await waitNT(wrapper.vm)
      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.vm.$_filterTimer).not.toBe(null)
      expect(wrapper.vm.$_filterTimer).not.toEqual(lastFilterTimer)
      lastFilterTimer = wrapper.vm.$_filterTimer
      expect(wrapper.vm.localFilter).not.toEqual('1')

      // Change filter
      await wrapper.setProps({
        filter: 'z'
      })
      await waitNT(wrapper.vm)
      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.vm.$_filterTimer).not.toBe(null)
      expect(wrapper.vm.$_filterTimer).not.toEqual(lastFilterTimer)
      lastFilterTimer = wrapper.vm.$_filterTimer
      expect(wrapper.vm.localFilter).not.toEqual('z')

      jest.runTimersToTime(101)
      await waitNT(wrapper.vm)
      expect(wrapper.emitted('input').length).toBe(2)
      expect(wrapper.emitted('input')[1][0]).toEqual([testItems[2]])
      expect(wrapper.vm.$_filterTimer).toEqual(lastFilterTimer)
      lastFilterTimer = wrapper.vm.$_filterTimer
      expect(wrapper.vm.localFilter).toEqual('z')

      // Change filter
      await wrapper.setProps({
        filter: '1'
      })
      await waitNT(wrapper.vm)
      expect(wrapper.vm.$_filterTimer).not.toBe(null)
      expect(wrapper.emitted('input').length).toBe(2)
      expect(wrapper.vm.$_filterTimer).not.toEqual(lastFilterTimer)
      lastFilterTimer = wrapper.vm.$_filterTimer
      expect(wrapper.vm.localFilter).not.toEqual('1')
      expect(wrapper.vm.localFilter).toEqual('z')

      // Change filter-debounce to no debouncing
      await wrapper.setProps({
        filterDebounce: 0
      })
      await waitNT(wrapper.vm)
      // Should clear the pending timer
      expect(wrapper.vm.$_filterTimer).toBe(null)
      // Should immediately filter the items
      expect(wrapper.emitted('input').length).toBe(3)
      expect(wrapper.emitted('input')[2][0]).toEqual([testItems[1]])
      expect(wrapper.vm.localFilter).toEqual('1')

      wrapper.destroy()
    })
  })
})
