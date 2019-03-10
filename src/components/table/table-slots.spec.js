import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('b-table colgroup, caption, and top/bottom, or header slots', () => {
  it('should not have colgroup or caption by default', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('colgroup').exists()).toBe(false)
    expect(wrapper.find('caption').exists()).toBe(false)
    expect(wrapper.find('tr.b-table-top-row').exists()).toBe(false)
    expect(wrapper.find('tr.b-table-bottom-row').exists()).toBe(false)
    expect(
      wrapper
        .find('tbody')
        .find('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('tbody').find('tr').length).toBe(testItems.length)
    expect(
      wrapper
        .find('thead')
        .find('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('thead').find('tr').length).toBe(1)
  })

  it('should render named slot `colgroup`', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        'table-colgroup': '<col /><col /><col />'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('colgroup').exists()).toBe(true)
    expect(
      wrapper
        .find('colgroup')
        .findAll('col')
        .exists()
    ).toBe(true)
    expect(wrapper.find('colgroup').findAll('col').length).toBe(3)
  })

  it('should render scoped slot `colgroup`', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'table-colgroup': (scope) => {
          return '<col /><col /><col />'
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('colgroup').exists()).toBe(true)
    expect(
      wrapper
        .find('colgroup')
        .findAll('col')
        .exists()
    ).toBe(true)
    expect(wrapper.find('colgroup').findAll('col').length).toBe(3)
  })
})
