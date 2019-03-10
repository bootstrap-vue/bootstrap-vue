import Table from './table'
import normalizeFields from './helpers/normalize-fields'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table colgroup, caption, header, and top/bottom row slots', () => {
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
    expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
    expect(
      wrapper
        .find('thead')
        .find('tr')
        .exists()
    ).toBe(true)
    expect(wrapper.find('thead').findAll('tr').length).toBe(1)
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
    expect(wrapper.find('table > colgroup').exists()).toBe(true)
    expect(
      wrapper
        .find('colgroup')
        .findAll('col')
        .exists()
    ).toBe(true)
    expect(wrapper.find('colgroup').findAll('col').length).toBe(3)
  })

  it('should render scoped slot `colgroup`', async () => {
    let fields = []
    let columns
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'table-colgroup': function(scope) {
          fields = scope.fields
          columns = scope.columns
          return this.$createElement('col', { attrs: { span: columns } }))
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    await wrapper.vm.$nextTick()
    expect(columns).toBe(3)
    expect(fields).toEqual(normalizeFields(testFields))
    expect(wrapper.find('table > colgroup').exists()).toBe(true)
    expect(
      wrapper
        .find('colgroup')
        .findAll('col')
        .exists()
    ).toBe(true)
    expect(wrapper.findAll('col').length).toBe(1)
    expect(wrapper.find('col').atributes('span').toBe('3')
  })
})
