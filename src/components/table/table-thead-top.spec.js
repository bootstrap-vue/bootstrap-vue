import { mount } from '@vue/test-utils'
import BTable from './table'
import normalizeFields from './helpers/normalize-fields'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > thead thead-top slot', () => {
  it('should not have thead-top row by default', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.findAll('thead > tr').exists()).toBe(true)
    expect(wrapper.findAll('thead > tr').length).toBe(1)

    wrapper.destroy()
  })

  it('should render named slot `thead-top`', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        'thead-top': `<tr class="test"><th span="${testFields.length}">foobar</th></tr>`
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.findAll('thead > tr').exists()).toBe(true)
    expect(wrapper.findAll('thead > tr').length).toBe(2)
    expect(
      wrapper
        .findAll('thead > tr')
        .at(0)
        .text()
    ).toBe('foobar')
    expect(
      wrapper
        .findAll('thead > tr')
        .at(0)
        .classes()
    ).toContain('test')

    wrapper.destroy()
  })

  it('should render scoped slot `thead-top`', async () => {
    let fields = []
    let columns
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'thead-top': function(scope) {
          fields = scope.fields
          columns = scope.columns
          return this.$createElement('tr', { class: 'test' }, [
            this.$createElement('th', { attrs: { span: columns } }, 'foobar')
          ])
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(columns).toBe(3)
    expect(fields).toEqual(normalizeFields(testFields))
    expect(wrapper.findAll('thead > tr').exists()).toBe(true)
    expect(wrapper.findAll('thead > tr').length).toBe(2)
    expect(
      wrapper
        .findAll('thead > tr')
        .at(0)
        .text()
    ).toBe('foobar')
    expect(
      wrapper
        .findAll('thead > tr')
        .at(0)
        .classes()
    ).toContain('test')

    wrapper.destroy()
  })
})
