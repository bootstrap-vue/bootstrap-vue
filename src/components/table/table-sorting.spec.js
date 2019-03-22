import Table from './table'
import defaultSortCompare from './helpers/default-sort-compare'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 3, b: 'b', c: 'x' }, { a: 1, b: 'c', c: 'y' }, { a: 2, b: 'a', c: 'z' }]
const testFields = [
  { key: 'a', label: 'A', sortable: true },
  { key: 'b', label: 'B', sortable: true },
  { key: 'c', label: 'C', sortable: false }
]

describe('table > sorting', () => {
  it('should not be sorted by default', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    await wrapper.vm.$nextTick()
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

  it('should sort column descending when sortBy set and sortDesc changed, with proper attributes', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        sortBy: 'a',
        sortDesc: false
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('1')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('3')

    let $ths = wrapper.findAll('thead > tr > th')

    // currently sorted as ascending
    expect($ths.at(0).attributes('aria-sort')).toBe('ascending')
    // for switching to descending
    expect($ths.at(0).attributes('aria-label')).toBe(wrapper.vm.labelSortDesc)

    // not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // for sorting by ascending
    expect($ths.at(1).attributes('aria-label')).toBe(wrapper.vm.labelSortAsc)

    // not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // for clearing sorting
    expect($ths.at(2).attributes('aria-label')).toBe(wrapper.vm.labelSortClear)

    // Change sort direction
    wrapper.setProps({
      sortDesc: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input').length).toBe(2)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('1')

    $ths = wrapper.findAll('thead > tr > th')

    // currently sorted as descending
    expect($ths.at(0).attributes('aria-sort')).toBe('descending')
    // for switching to ascending
    expect($ths.at(0).attributes('aria-label')).toBe(wrapper.vm.labelSortAsc)

    // not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // for sorting by ascending
    expect($ths.at(1).attributes('aria-label')).toBe(wrapper.vm.labelSortAsc)

    // not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // for clearing sorting
    expect($ths.at(2).attributes('aria-label')).toBe(wrapper.vm.labelSortClear)

    // Clear sort
    wrapper.setProps({
      sortBy: null,
      sortDesc: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input').length).toBe(4)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')

    $ths = wrapper.findAll('thead > tr > th')

    // currently not sorted
    expect($ths.at(0).attributes('aria-sort')).toBe('none')
    // for sorting by ascending
    expect($ths.at(0).attributes('aria-label')).toBe(wrapper.vm.labelSortAsc)

    // not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // for sorting by ascending
    expect($ths.at(1).attributes('aria-label')).toBe(wrapper.vm.labelSortAsc)

    // not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // for clearing sorting
    expect($ths.at(2).attributes('aria-label')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should accept custom sort compare', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        sortBy: 'a',
        sortDesc: false,
        sortCompare: (a, b, sortBy) => {
          // We just use our default sort compare to test passing a function
          return defaultSortCompare(a, b, sortBy)
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('1')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('3')

    wrapper.destroy()
  })

  it('should sort columns when clicking headers', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA
    let columnB

    // Should not be sorted
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('sort-changed')).not.toBeDefined()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')

    // Sort by first column
    wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed')).toBeDefined()
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    expect(wrapper.emitted('sort-changed')[0][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('1')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('3')

    // Click first column header again to reverse sort
    wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(2)
    expect(wrapper.emitted('sort-changed')[1][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('1')

    // Click second column header to sort by it (by using keydown.enter)
    wrapper
      .findAll('thead > tr > th')
      .at(1)
      .trigger('keydown.enter')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(3)
    expect(wrapper.emitted('sort-changed')[2][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnB = $rows.map(row => {
      return row
        .findAll('td')
        .at(1)
        .text()
    })
    expect(columnB[0]).toBe('a')
    expect(columnB[1]).toBe('b')
    expect(columnB[2]).toBe('c')

    // Click third column header to clear sort
    wrapper
      .findAll('thead > tr > th')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(4)
    expect(wrapper.emitted('sort-changed')[3][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
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

  it('should sort columns when clicking footers', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA
    let columnB

    // Should not be sorted
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('sort-changed')).not.toBeDefined()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')
    // Should have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(2)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(2)

    // Sort by first column
    wrapper
      .findAll('tfoot > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed')).toBeDefined()
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    expect(wrapper.emitted('sort-changed')[0][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('1')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('3')
    // Should have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(2)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(3)

    // Click first column header again to reverse sort
    wrapper
      .findAll('tfoot > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(2)
    expect(wrapper.emitted('sort-changed')[1][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('1')
    // Should have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(2)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(3)

    // Click second column header to sort by it (by using keydown.enter)
    wrapper
      .findAll('tfoot > tr > th')
      .at(1)
      .trigger('keydown.enter')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(3)
    expect(wrapper.emitted('sort-changed')[2][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnB = $rows.map(row => {
      return row
        .findAll('td')
        .at(1)
        .text()
    })
    expect(columnB[0]).toBe('a')
    expect(columnB[1]).toBe('b')
    expect(columnB[2]).toBe('c')

    // Click third column header to clear sort
    wrapper
      .findAll('tfoot > tr > th')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(4)
    expect(wrapper.emitted('sort-changed')[3][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')
    // Should have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(2)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(2)

    wrapper.destroy()
  })

  it('should not sort columns when clicking footers and no-footer-sorting set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true,
        noFooterSorting: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA

    // Should not be sorted
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('sort-changed')).not.toBeDefined()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')
    // Shouldn't have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(0)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(0)

    // Click first column
    wrapper
      .findAll('tfoot > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed')).not.toBeDefined()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')
    // Shouldn't have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(0)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(0)

    // Click third column header
    wrapper
      .findAll('tfoot > tr > th')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed')).not.toBeDefined()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')
    // Shouldn't have aria-* labels
    expect(wrapper.findAll('tfoot > tr > th[aria-sort]').length).toBe(0)
    expect(wrapper.findAll('tfoot > tr > th[aria-label]').length).toBe(0)

    wrapper.destroy()
  })

  it('should sort column descending first, when sort-direction=desc', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        sortDesc: false,
        sortDirection: 'desc'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA

    await wrapper.vm.$nextTick()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')

    let $ths = wrapper.findAll('thead > tr > th')

    // currently not sorted
    expect($ths.at(0).attributes('aria-sort')).toBe('none')
    // for switching to descending
    expect($ths.at(0).attributes('aria-label')).toBe(wrapper.vm.labelSortDesc)

    // not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // for sorting by ascending
    expect($ths.at(1).attributes('aria-label')).toBe(wrapper.vm.labelSortDesc)

    // not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // for clearing sorting
    expect($ths.at(2).attributes('aria-label')).not.toBeDefined()

    // Change sort direction (should be descending first)
    wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()

    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('1')

    $ths = wrapper.findAll('thead > tr > th')

    // currently sorted as descending
    expect($ths.at(0).attributes('aria-sort')).toBe('descending')
    // for switching to ascending
    expect($ths.at(0).attributes('aria-label')).toBe(wrapper.vm.labelSortAsc)

    // not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // for sorting by ascending
    expect($ths.at(1).attributes('aria-label')).toBe(wrapper.vm.labelSortDesc)

    // not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // for clearing sorting
    expect($ths.at(2).attributes('aria-label')).toBe(wrapper.vm.labelSortClear)

    wrapper.destroy()
  })

  it('non-sortable header th should not emit a sort-changed event when clicked and prop no-sort-reset is set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        noSortReset: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    let $rows
    let columnA

    // Should not be sorted
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('sort-changed')).not.toBeDefined()
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('3')
    expect(columnA[1]).toBe('1')
    expect(columnA[2]).toBe('2')

    // Click first column to sort
    wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed')).toBeDefined()
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('1')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('3')

    // Click third column header (should not clear sorting)
    wrapper
      .findAll('thead > tr > th')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    columnA = $rows.map(row => {
      return row
        .findAll('td')
        .at(0)
        .text()
    })
    expect(columnA[0]).toBe('1')
    expect(columnA[1]).toBe('2')
    expect(columnA[2]).toBe('3')

    wrapper.destroy()
  })
})
