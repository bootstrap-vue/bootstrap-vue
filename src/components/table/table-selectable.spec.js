import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
const testFields = [{ key: 'a', sortable: true }]

describe('table row select', () => {
  it('should not emit row-selected event default', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()
  })

  it('should not have aria-selected/tabindex attribute when not selctable and no row-clicked listener', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(4)
    // Doesn't have aria-selected attribute on all TRs
    expect($rows.wrapper.is('tr[aria-selected]')).toBe(false)
    // Doesn't have tabindex attribute on all TRs
    expect($rows.wrapper.is('tr[tabindex]')).toBe(false)
  })

  it('select mode single works', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(4)
    expect(wrapper.findAll('tbody > tr').is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click third row
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[2]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click third row again
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)
  })

  it('select mode multi works', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'multi'
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click third row
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[0], testItems[2]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click third row again
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click first row again
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(4)
    expect(wrapper.emitted('row-selected')[3][0]).toEqual([])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)
  })

  it('select mode range works', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'range'
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').is('[aria-selected="false"]')).toBe(true)

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Shift-Click third row
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click', { shiftKey: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([
      testItems[0],
      testItems[1],
      testItems[2]
    ])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click third row again
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([testItems[2]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click fourth row
    wrapper
      .findAll('tbody > tr')
      .at(3)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(4)
    expect(wrapper.emitted('row-selected')[3][0]).toEqual([testItems[3]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="true"]')).toBe(true)

    // Click fourth row again
    wrapper
      .findAll('tbody > tr')
      .at(3)
      .trigger('click')
    await wrapper.vm.$nextTick()
    // No change to selected rows
    expect(wrapper.emitted('row-selected').length).toBe(4)
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="true"]')).toBe(true)

    // Ctrl-Click second row
    wrapper
      .findAll('tbody > tr')
      .at(1)
      .trigger('click', { ctrlKey: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(5)
    expect(wrapper.emitted('row-selected')[4][0]).toEqual([testItems[1], testItems[3]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="true"]')).toBe(true)

    // Ctrl-Click second row
    wrapper
      .findAll('tbody > tr')
      .at(1)
      .trigger('click', { ctrlKey: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(6)
    expect(wrapper.emitted('row-selected')[5][0]).toEqual([testItems[3]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="true"]')).toBe(true)

    // Ctrl-Click fourth row
    wrapper
      .findAll('tbody > tr')
      .at(3)
      .trigger('click', { ctrlKey: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(7)
    expect(wrapper.emitted('row-selected')[6][0]).toEqual([])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)
  })

  it('sort change clears selection', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Click row header
    wrapper
      .findAll('thead > tr > th')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('sort-changed')).toBeDefined()
    expect(wrapper.emitted('sort-changed').length).toBe(1)
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)
  })

  it('filter change clears selection', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single'
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').is('[aria-selected="false"]')).toBe(true)

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(3).is('[aria-selected="false"]')).toBe(true)

    // Change filter
    wrapper.setProps({
      filter: '2'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').is('[aria-selected="false"]')).toBe(true)
  })

  it('pagination change clears selection', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        selectable: true,
        selectMode: 'single',
        perPage: 3,
        currentPage: 1
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).not.toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').is('[aria-selected="false"]')).toBe(true)

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    // We only have 3 rows max per page
    expect(wrapper.findAll('tbody > tr').at(0).is('[aria-selected="true"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(1).is('[aria-selected="false"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').at(2).is('[aria-selected="false"]')).toBe(true)

    // Change page
    wrapper.setProps({
      currentPage: 2
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([])
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr').is('[tabindex="0"]')).toBe(true)
    expect(wrapper.findAll('tbody > tr').is('[aria-selected="false"]')).toBe(true)
  })
})
