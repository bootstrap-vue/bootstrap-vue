import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
const testFields = ['a']

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

    // Click first row
    wrapper
      .findAll('tbody > tr')
      .at(0)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected')).toBeDefined()
    expect(wrapper.emitted('row-selected').length).toBe(1)
    expect(wrapper.emitted('row-selected')[0][0]).toEqual([testItems[0]])

    // Click third row
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(2)
    expect(wrapper.emitted('row-selected')[1][0]).toEqual([testItems[2]])

    // Click third row again
    wrapper
      .findAll('tbody > tr')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('row-selected').length).toBe(3)
    expect(wrapper.emitted('row-selected')[2][0]).toEqual([])
  })
})
