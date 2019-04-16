import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import BTable from './table'
import stringifyRecordValues from './helpers/stringify-record-values'

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

    let $rows = wrapper.findAll('tbody > tr')
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
    expect(wrapper.emitted('filtered')).not.toBeDefined()

    wrapper.setProps({
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

    wrapper.setProps({
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

    wrapper.setProps({
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

    wrapper.setProps({
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
    expect(wrapper.emitted('filtered')).not.toBeDefined()

    wrapper.setProps({
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

    wrapper.setProps({
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

    wrapper.setProps({
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
})
