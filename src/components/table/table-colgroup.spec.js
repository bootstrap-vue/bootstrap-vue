import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import normalizeFields from './helpers/normalize-fields'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > colgroup', () => {
  it('should not have colgroup by default', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('colgroup').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should render named slot `table-colgroup`', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        'table-colgroup': '<col><col><col>'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('table > colgroup').exists()).toBe(true)
    expect(
      wrapper
        .find('colgroup')
        .findAll('col')
        .exists()
    ).toBe(true)
    expect(wrapper.find('colgroup').findAll('col').length).toBe(3)

    wrapper.destroy()
  })

  it('should render scoped slot `table-colgroup`', async () => {
    let fields = []
    let columns
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'table-colgroup': function(scope) {
          fields = scope.fields
          columns = scope.columns
          return this.$createElement('col', { attrs: { span: columns } })
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    await waitNT(wrapper.vm)
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
    expect(wrapper.find('col').attributes('span')).toBe('3')

    wrapper.destroy()
  })
})
