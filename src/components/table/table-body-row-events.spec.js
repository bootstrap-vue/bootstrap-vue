import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table tbody row events', () => {
  it('should emit row-clicked event when a row is clicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) /* row index */
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
  })

  it('should not emit row-clicked event when prop busy is set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
  })

  it('should not emit row-clicked event when vm.localBusy is true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    wrapper.setData({
      localBusy: true
    })
    $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
  })

  it('should emit row-dblclicked event when a row is dblclicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
    $rows.at(1).trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).toBeDefined()
    expect(wrapper.emitted('row-dblclicked').length).toBe(1)
    expect(wrapper.emitted('row-dblclicked')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-dblclicked')[0][1]).toEqual(1) /* row index */
    expect(wrapper.emitted('row-dblclicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
  })

  it('should not emit row-dblclicked event when a row is dblclicked and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
    $rows.at(1).trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
  })
})
