import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 3, b: 'b', c: 'x' }, { a: 1, b: 'c', c: 'y' }, { a: 2, b: 'a', c: 'z' }]
const testFields = ['a', 'b', 'c']

describe('table > filtering', () => {
  it('should not be filtered by default', async () => {
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

  it('should be filtered when filter is a string', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        filter: 'z'
      }
    })
    expect(wrapper).toBeDefined()
    await wrapper.vm.$nextTick()

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
})
