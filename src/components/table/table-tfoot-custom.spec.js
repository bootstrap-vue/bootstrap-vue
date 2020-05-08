import { mount } from '@vue/test-utils'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }]
const testFields = [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }, { key: 'c', label: 'C' }]

describe('table > custom tfoot slot', () => {
  it('should not render tfoot by default', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: false
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tfoot').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should render custom-foot slot inside b-tfoot', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: false
      },
      slots: {
        'custom-foot': '<tr><td colspan="3">CUSTOM-FOOTER</td></tr>'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tfoot').exists()).toBe(true)
    expect(wrapper.find('tfoot').text()).toContain('CUSTOM-FOOTER')
    expect(wrapper.find('tfoot').classes().length).toBe(0)

    wrapper.destroy()
  })

  it('should not render custom-foot slot when foot-clone is true', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true
      },
      slots: {
        'custom-foot': '<tr><td colspan="3">CUSTOM-FOOTER</td></tr>'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tfoot').exists()).toBe(true)
    expect(wrapper.find('tfoot').text()).not.toContain('CUSTOM-FOOTER')

    wrapper.destroy()
  })

  it('should have foot-variant on custom-foot slot', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: false,
        footVariant: 'dark'
      },
      slots: {
        'custom-foot': '<tr><td colspan="3">CUSTOM-FOOTER</td></tr>'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tfoot').exists()).toBe(true)
    expect(wrapper.find('tfoot').text()).toContain('CUSTOM-FOOTER')
    expect(wrapper.find('tfoot').classes()).toContain('thead-dark')
    expect(wrapper.find('tfoot').classes().length).toBe(1)

    wrapper.destroy()
  })
})
