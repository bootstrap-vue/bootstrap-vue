import Table from './table'
import normalizeFields from './helpers/normalize-fields'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table top-row', () => {
  it('should not have top row by default', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(testItems.length)
  })

  it('should render named slot `top-row`', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        'top-row': `<td span="${testFields.length}">foobar</td>`
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(testItems.length + 1)
    expect(
      wrapper
        .findAll('tbody > tr')
        .at(0)
        .text()
    ).toBe('foobar')
    expect(
      wrapper
        .findAll('tbody > tr')
        .at(0)
        .classes()
    ).toContain('b-table-top-row')
  })

  it('should render scoped slot `top-row`', async () => {
    let fields = []
    let columns
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'top-row': function(scope) {
          fields = scope.fields
          columns = scope.columns
          return this.$createElement('td', { attrs: { span: columns } }, 'foobar')
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(columns).toBe(3)
    expect(fields).toEqual(normalizeFields(testFields))
    expect(wrapper.findAll('tbody > tr').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(testItems.length + 1)
    expect(
      wrapper
        .findAll('tbody > tr')
        .at(0)
        .text()
    ).toBe('foobar')
    expect(
      wrapper
        .findAll('tbody > tr')
        .at(0)
        .classes()
    ).toContain('b-table-top-row')
  })
})
