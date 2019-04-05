import BTable from './table'
import normalizeFields from './helpers/normalize-fields'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > tbody bottom-row slot', () => {
  it('should not have bottom row by default', async () => {
    const wrapper = mount(BTable, {
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

    wrapper.destroy()
  })

  it('should render named slot `bottom-row`', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        'bottom-row': `<td span="${testFields.length}">foobar</td>`
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
        .at(testItems.length)
        .text()
    ).toBe('foobar')
    expect(
      wrapper
        .findAll('tbody > tr')
        .at(testItems.length)
        .classes()
    ).toContain('b-table-bottom-row')

    wrapper.destroy()
  })

  it('should render scoped slot `bottom-row`', async () => {
    let fields = []
    let columns
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'bottom-row': function(scope) {
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
        .at(testItems.length)
        .text()
    ).toBe('foobar')
    expect(
      wrapper
        .findAll('tbody > tr')
        .at(testItems.length)
        .classes()
    ).toContain('b-table-bottom-row')

    wrapper.destroy()
  })
})
