import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 3, b: 'b', c: 'x' }, { a: 1, b: 'c', c: 'y' }, { a: 2, b: 'a', c: 'z' }]
const testFields = [
  { key: 'a', label: 'A', sortable: true },
  { key: 'b', label: 'B', sortable: true },
  { key: 'c', label: 'C', sortable: false }
]

describe('table sorting', () => {
  it('should not be sorted by default', async () => {
    let visibleRows = null
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      on: {
        input: val => {
          // When v-model updated
          visibleRows = val
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').lnegth).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(testItems)
    expect(visibleRows).toEqual(testItems)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(
      $rows
        .at(0)
        .findAll('td')
        .at(0)
        .text()
    ).toBe('3')
    expect(
      $rows
        .at(1)
        .findAll('td')
        .at(0)
        .text()
    ).toBe('1')
    expect(
      $rows
        .at(2)
        .findAll('td')
        .at(0)
        .text()
    ).toBe('2')
  })
})
