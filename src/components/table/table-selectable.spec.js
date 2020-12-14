import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BTable } from './table'

const testItems = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
const testFields = [{ key: 'a', sortable: true }]

describe('table > row select', () => {
  it('should not emit row-selected event default', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not have aria-selected/tabindex attribute when not selectable and no row-clicked listener', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-multiselectable')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('b-table-selectable')
    expect(wrapper.classes()).not.toContain('b-table-selectable-no-click')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(4)
    // Doesn't have aria-selected attribute on all TRs
    expect($rows.wrappers.every(r => !r.find('tr[aria-selected]').exists())).toBe(true)
    // Doesn't have tabindex attribute on all TRs
    expect($rows.wrappers.every(r => !r.find('tr[tabindex]').exists())).toBe(true)

    wrapper.destroy()
  })

  it('should have tabindex but not aria-selected when not selectable and has row-clicked listener', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        'row-clicked': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-multiselectable')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('b-table-selectable')
    expect(wrapper.classes()).not.toContain('b-table-selectable-no-click')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(4)
    // Doesn't have aria-selected attribute on all TRs
    expect($rows.wrappers.every(r => !r.find('tr[aria-selected]').exists())).toBe(true)
    // Does have tabindex attribute on all TRs
    expect($rows.wrappers.every(r => r.find('tr[tabindex]').exists())).toBe(true)

    wrapper.destroy()
  })

  it('has class b-table-selectable-no-click when prop no-select-on-click set', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single',
        noSelectOnClick: true
      }
    })

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-multiselectable')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-single')
    expect(wrapper.classes()).toContain('b-table-selectable-no-click')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    wrapper.destroy()
  })

  it('select mode single works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    let $rows

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-multiselectable')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-selectable-no-click')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')
    expect(wrapper.emitted('row-selected')).toBeUndefined()
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(4)
    expect($rows.wrappers.every(r => r.find('[aria-selected="false"]').exists())).toBe(true)
    expect($rows.wrappers.every(r => r.find('[aria-selected="false"]').exists())).toBe(true)
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-single')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    // Click third row to select it
    await wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[2]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('true')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-single')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    // Click third row again to clear selection
    await wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    wrapper.destroy()
  })

  it('select mode multi works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'multi'
      }
    })
    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-multiselectable')).toBe('true')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-range')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    // Click third row
    await wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[0], testItems[2]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('true')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    // Click third row again
    await wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    // Click first row again
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(4)
    expect(wrapper.emitted('row-selected')[3][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-multi')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-range')

    wrapper.destroy()
  })

  it('select mode range works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'range'
      }
    })
    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.attributes('aria-multiselectable')).toBe('true')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')
    expect(wrapper.emitted('row-selected')).toBeUndefined()
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.wrappers.every(r => r.find('[aria-selected="false"]').exists())).toBe(true)

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Shift-Click third row
    await wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click', { shiftKey: true })
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([
      testItems[0],
      testItems[1],
      testItems[2]
    ])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('true')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Click third row again
    await wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([testItems[2]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('true')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Click fourth row
    await wrapper
      .findAll('tbody > tr')
      .at(3)
      .trigger('click')
    expect(wrapper.emitted('row-selected').length).toBe(4)
    expect(wrapper.emitted('row-selected')[3][0]).toEqual([testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Click fourth row again
    await wrapper
      .findAll('tbody > tr')
      .at(3)
      .trigger('click')
    // No change to selected rows
    expect(wrapper.emitted('row-selected').length).toBe(4)
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(r => r.find('[tabindex="0"]').exists())).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Ctrl-Click second row
    await wrapper
      .findAll('tbody > tr')
      .at(1)
      .trigger('click', { ctrlKey: true })
    expect(wrapper.emitted('row-selected').length).toBe(5)
    expect(wrapper.emitted('row-selected')[4][0]).toEqual([testItems[1], testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.element.matches('[tabindex="0"]'))).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Ctrl-Click second row
    await wrapper
      .findAll('tbody > tr')
      .at(1)
      .trigger('click', { ctrlKey: true })
    expect(wrapper.emitted('row-selected').length).toBe(6)
    expect(wrapper.emitted('row-selected')[5][0]).toEqual([testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.element.matches('[tabindex="0"]'))).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    // Ctrl-Click fourth row
    await wrapper
      .findAll('tbody > tr')
      .at(3)
      .trigger('click', { ctrlKey: true })
    expect(wrapper.emitted('row-selected').length).toBe(7)
    expect(wrapper.emitted('row-selected')[6][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.element.matches('[tabindex="0"]'))).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).toContain('b-table-select-range')
    expect(wrapper.classes()).not.toContain('b-table-selecting')
    expect(wrapper.classes()).not.toContain('b-table-select-single')
    expect(wrapper.classes()).not.toContain('b-table-select-multi')

    wrapper.destroy()
  })

  it('sort change clears selection', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.element.matches('[tabindex="0"]'))).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    // Click row header
    await wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('sort-changed')).toBeDefined()
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.element.matches('[tabindex="0"]'))).toBe(true)
    expect($rows.wrappers.every(w => w.element.matches('[aria-selected="false"]'))).toBe(true)

    wrapper.destroy()
  })

  it('filter change clears selection', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.element.matches('[tabindex="0"]'))).toBe(true)
    expect($rows.wrappers.every(w => w.element.matches('[aria-selected="false"]'))).toBe(true)

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    // Change filter
    await wrapper.setProps({ filter: '2' })
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.wrappers.every(w => w.attributes('aria-selected') === 'false')).toBe(true)

    wrapper.destroy()
  })

  it('pagination change clears selection', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single',
        perPage: 3,
        currentPage: 1
      }
    })
    let $rows

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.wrappers.every(w => w.attributes('aria-selected') === 'false')).toBe(true)

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    // We only have 3 rows max per page
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')

    // Change page
    await wrapper.setProps({ currentPage: 2 })
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(1)
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.wrappers.every(w => w.attributes('aria-selected') === 'false')).toBe(true)

    wrapper.destroy()
  })

  it('change in select mode clears selection', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    // Change mode
    await wrapper.setProps({ selectMode: 'range' })
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.wrappers.every(w => w.attributes('aria-selected') === 'false')).toBe(true)

    wrapper.destroy()
  })

  it('disabling selectable clears selection', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Click first row
    await wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')
    expect(wrapper.classes()).toContain('b-table-selectable')
    expect(wrapper.classes()).not.toContain('b-table-selecting-range')

    // Disabled selectable
    await wrapper.setProps({ selectable: false })
    // Does not emit a row-selected event
    expect(wrapper.emitted('row-selected').length).toBe(1)
    $rows = wrapper.findAll('tbody > tr')
    // Should remove tabindex and aria-selected attributes
    expect($rows.wrappers.every(w => w.attributes('tabindex') === undefined)).toBe(true)
    expect($rows.wrappers.every(w => w.attributes('aria-selected') === undefined)).toBe(true)
    expect(wrapper.classes()).not.toContain('b-table-selectable')
    expect(wrapper.classes()).not.toContain('b-table-selecting-range')

    wrapper.destroy()
  })

  it('method `selectAllRows()` in single mode selects only first row', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Execute selectAllRows() method
    wrapper.vm.selectAllRows()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    wrapper.destroy()
  })

  it('method `selectAllRows()` in multi mode selects all rows', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'multi'
      }
    })

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Execute selectAllRows() method
    wrapper.vm.selectAllRows()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0].length).toBe(4)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual(testItems)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('true')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    wrapper.destroy()
  })

  it('method `selectAllRows()` in range mode selects all rows', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'range'
      }
    })

    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Execute selectAllRows() method
    wrapper.vm.selectAllRows()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0].length).toBe(4)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual(testItems)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('true')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('true')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    wrapper.destroy()
  })

  it('method `selectRow()` and `unselectRow()` in single mode works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })

    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Execute selectRow() method (second row)
    wrapper.vm.selectRow(1)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[1]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    // Execute selectRow() method (fourth row)
    wrapper.vm.selectRow(3)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    // Execute unselectRow() method on non-selected row (should not change anything)
    wrapper.vm.unselectRow(0)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    // Execute unselectRow() method on selected row
    wrapper.vm.unselectRow(3)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0].length).toBe(0)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('false')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    wrapper.destroy()
  })

  it('method `selectRow()` and `unselectRow()` in multi mode works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'multi'
      }
    })

    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Execute selectRow() method (second row)
    wrapper.vm.selectRow(1)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[1]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    // Execute selectRow() method (fourth row)
    wrapper.vm.selectRow(3)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0].length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[1], testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    // Execute unselectRow() method on non-selected row (should not change anything)
    wrapper.vm.unselectRow(0)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0].length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[1], testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    // Execute unselectRow() method on selected row
    wrapper.vm.unselectRow(3)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([testItems[1]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    wrapper.destroy()
  })

  it('method `selectRow()` and `unselectRow()` in range mode works', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'range'
      }
    })

    let $rows
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-selected')).toBeUndefined()

    // Execute selectRow() method (second row)
    wrapper.vm.selectRow(1)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[1]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    // Execute selectRow() method (fourth row)
    wrapper.vm.selectRow(3)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0].length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[1], testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    // Execute unselectRow() method on non-selected row (should not change anything)
    wrapper.vm.unselectRow(0)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0].length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[1], testItems[3]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('true')

    // Execute unselectRow() method on selected row
    wrapper.vm.unselectRow(3)
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0].length).toBe(1)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([testItems[1]])
    $rows = wrapper.findAll('tbody > tr')
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)
    expect($rows.at(0).attributes('aria-selected')).toBe('false')
    expect($rows.at(1).attributes('aria-selected')).toBe('true')
    expect($rows.at(2).attributes('aria-selected')).toBe('false')
    expect($rows.at(3).attributes('aria-selected')).toBe('false')

    wrapper.destroy()
  })
})
