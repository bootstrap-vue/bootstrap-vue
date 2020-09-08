import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import defaultSortCompare from './helpers/default-sort-compare'
import { BTable } from './table'

const testItems = [{ a: 3, b: 'b', c: 'x' }, { a: 1, b: 'c', c: 'y' }, { a: 2, b: 'a', c: 'z' }]
const testFields = [
  { key: 'a', label: 'A', sortable: true },
  { key: 'b', label: 'B', sortable: true },
  { key: 'c', label: 'C', sortable: false }
]

describe('table > sorting', () => {
  it('should not be sorted by default', async () => {
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

  it('should emit `field.sortKey` if specified and no local sorting', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: [...testFields, { key: 'd', label: 'D', sortable: true, sortKey: 'non-local' }],
        items: testItems,
        noLocalSorting: true
      }
    })

    expect(wrapper).toBeDefined()

    await wrapper
      .findAll('thead > tr > th')
      .at(3)
      .trigger('keydown.enter')
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    expect(wrapper.emitted('sort-changed')[0][0].sortBy).toEqual('non-local')
  })

  it('should sort column descending when sortBy set and sortDesc changed, with proper attributes', async () => {
    const wrapper = mount(BTable, {
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

    await waitNT(wrapper.vm)
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

    // Currently sorted as ascending
    expect($ths.at(0).attributes('aria-sort')).toBe('ascending')
    // For switching to descending
    expect(
      $ths
        .at(0)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortDesc)

    // Not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // For sorting by ascending
    expect(
      $ths
        .at(1)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortAsc)

    // Not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // For clearing sorting
    expect(
      $ths
        .at(2)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortClear)

    // Change sort direction
    await wrapper.setProps({ sortDesc: true })
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

    // Currently sorted as descending
    expect($ths.at(0).attributes('aria-sort')).toBe('descending')
    // For switching to ascending
    expect(
      $ths
        .at(0)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortAsc)

    // Not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // For sorting by ascending
    expect(
      $ths
        .at(1)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortAsc)

    // Not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // For clearing sorting
    expect(
      $ths
        .at(2)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortClear)

    // Clear sort
    await wrapper.setProps({
      sortBy: null,
      sortDesc: false
    })
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

    // Currently not sorted
    expect($ths.at(0).attributes('aria-sort')).toBe('none')
    // For sorting by ascending
    expect(
      $ths
        .at(0)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortAsc)

    // Not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // For sorting by ascending
    expect(
      $ths
        .at(1)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortAsc)

    // Not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // For clearing sorting
    expect(
      $ths
        .at(2)
        .find('.sr-only')
        .exists()
    ).toBe(false)

    wrapper.destroy()
  })

  it('should accept custom sort compare', async () => {
    const wrapper = mount(BTable, {
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

    await waitNT(wrapper.vm)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    const $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the first column text value
    const columnA = $rows.map(row => {
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
    const wrapper = mount(BTable, {
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

    // Should not be sorted
    await waitNT(wrapper.vm)
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
    await wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
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
    await wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
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
    await wrapper
      .findAll('thead > tr > th')
      .at(1)
      .trigger('keydown.enter')
    expect(wrapper.emitted('sort-changed').length).toBe(3)
    expect(wrapper.emitted('sort-changed')[2][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    const columnB = $rows.map(row => {
      return row
        .findAll('td')
        .at(1)
        .text()
    })
    expect(columnB[0]).toBe('a')
    expect(columnB[1]).toBe('b')
    expect(columnB[2]).toBe('c')

    // Click third column header to clear sort
    await wrapper
      .findAll('thead > tr > th')
      .at(2)
      .trigger('click')
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
    const wrapper = mount(BTable, {
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

    // Should not be sorted
    await waitNT(wrapper.vm)
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(2)

    // Sort by first column
    await wrapper
      .findAll('tfoot > tr > th')
      .at(0)
      .trigger('click')
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(3)

    // Click first column header again to reverse sort
    await wrapper
      .findAll('tfoot > tr > th')
      .at(0)
      .trigger('click')
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(3)

    // Click second column header to sort by it (by using keydown.enter)
    await wrapper
      .findAll('tfoot > tr > th')
      .at(1)
      .trigger('keydown.enter')
    expect(wrapper.emitted('sort-changed').length).toBe(3)
    expect(wrapper.emitted('sort-changed')[2][0]).toEqual(wrapper.vm.context)
    $rows = wrapper.findAll('tbody > tr').wrappers
    expect($rows.length).toBe(3)
    // Map the rows to the column text value
    const columnB = $rows.map(row => {
      return row
        .findAll('td')
        .at(1)
        .text()
    })
    expect(columnB[0]).toBe('a')
    expect(columnB[1]).toBe('b')
    expect(columnB[2]).toBe('c')

    // Click third column header to clear sort
    await wrapper
      .findAll('tfoot > tr > th')
      .at(2)
      .trigger('click')
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(2)

    wrapper.destroy()
  })

  it('should not sort columns when clicking footers and no-footer-sorting set', async () => {
    const wrapper = mount(BTable, {
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
    await waitNT(wrapper.vm)
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(0)

    // Click first column
    await wrapper
      .findAll('tfoot > tr > th')
      .at(0)
      .trigger('click')
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(0)

    // Click third column header
    await wrapper
      .findAll('tfoot > tr > th')
      .at(2)
      .trigger('click')
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
    expect(wrapper.findAll('tfoot > tr > th > .sr-only').length).toBe(0)

    wrapper.destroy()
  })

  it('should sort column descending first, when sort-direction=desc', async () => {
    const wrapper = mount(BTable, {
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

    await waitNT(wrapper.vm)
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

    // Currently not sorted
    expect($ths.at(0).attributes('aria-sort')).toBe('none')
    // For switching to descending
    expect(
      $ths
        .at(0)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortDesc)

    // Not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // For sorting by ascending
    expect(
      $ths
        .at(1)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortDesc)

    // Not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // For clearing sorting
    expect(
      $ths
        .at(2)
        .find('.sr-only')
        .exists()
    ).toBe(false)

    // Change sort direction (should be descending first)
    await wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')

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

    // Currently sorted as descending
    expect($ths.at(0).attributes('aria-sort')).toBe('descending')
    // For switching to ascending
    expect(
      $ths
        .at(0)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortAsc)

    // Not sorted by this column
    expect($ths.at(1).attributes('aria-sort')).toBe('none')
    // For sorting by ascending
    expect(
      $ths
        .at(1)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortDesc)

    // Not a sortable column
    expect($ths.at(2).attributes('aria-sort')).not.toBeDefined()
    // For clearing sorting
    expect(
      $ths
        .at(2)
        .find('.sr-only')
        .text()
    ).toContain(wrapper.vm.labelSortClear)

    wrapper.destroy()
  })

  it('non-sortable header th should not emit a sort-changed event when clicked and prop no-sort-reset is set', async () => {
    const wrapper = mount(BTable, {
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
    await waitNT(wrapper.vm)
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
    await wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
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
    await wrapper
      .findAll('thead > tr > th')
      .at(2)
      .trigger('click')
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

  it('sorting by virtual column formatter works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        items: [{ a: 5, b: 2 }, { a: 10, b: 9 }],
        fields: [
          'a',
          'b',
          {
            key: 'c',
            sortable: true,
            formatter(value, key, item) {
              return item.a - item.b
            },
            sortByFormatted: true
          }
        ],
        // Initially unsorted
        sortBy: ''
      }
    })

    expect(wrapper).toBeDefined()
    let $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(2)

    // First Row - unsorted
    let $tds = $trs.at(0).findAll('td')
    expect($tds.length).toBe(3)
    expect($tds.at(0).text()).toBe('5')
    expect($tds.at(1).text()).toBe('2')
    expect($tds.at(2).text()).toBe('3') // 5 - 2

    await wrapper.setProps({
      sortBy: 'c',
      sortDesc: false
    })

    // Grab the sorted TRs
    $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(2)

    // First Row - sorted (smallest first)
    $tds = $trs.at(0).findAll('td')
    expect($tds.length).toBe(3)
    expect($tds.at(0).text()).toBe('10')
    expect($tds.at(1).text()).toBe('9')
    expect($tds.at(2).text()).toBe('1') // 10 - 9

    wrapper.destroy()
  })
})
