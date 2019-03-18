import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }]
const testFields = [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }, { key: 'c', label: 'C' }]

describe('table tfoot events', () => {
  it('should emit head-clicked event when a head cell is clicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tfoot > tr')
    expect($rows.length).toBe(1)
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()
    $ths.at(0).trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeDefined()
    expect(wrapper.emitted('head-clicked').length).toBe(1)
    expect(wrapper.emitted('head-clicked')[0][0]).toEqual(testFields[0].key) /* field key */
    expect(wrapper.emitted('head-clicked')[0][1]).toEqual(testFields[0]) /* field def */
    expect(wrapper.emitted('head-clicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
    expect(wrapper.emitted('head-clicked')[0][3]).toBe(true) /* is footer */

    $ths.at(2).trigger('click')
    expect(wrapper.emitted('head-clicked').length).toBe(2)
    expect(wrapper.emitted('head-clicked')[1][0]).toEqual(testFields[2].key) /* field key */
    expect(wrapper.emitted('head-clicked')[1][1]).toEqual(testFields[2]) /* field def */
    expect(wrapper.emitted('head-clicked')[1][2]).toBeInstanceOf(MouseEvent) /* event */
    expect(wrapper.emitted('head-clicked')[1][3]).toBe(true) /* is footer */

    wrapper.destroy()
  })

  it('should not emit head-clicked event when prop busy is set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()
    $ths.at(0).trigger('click')
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should not emit head-clicked event when vm.localBusy is true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true
      }
    })
    wrapper.setData({
      localBusy: true
    })
    expect(wrapper).toBeDefined()
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()
    $ths.at(0).trigger('click')
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should not emit head-clicked event when clicking on a button or other interactive element', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true
      },
      slots: {
        // in Vue 2.6x, slots get translated into scopedSlots
        FOOT_a: '<button id="a">button</button>',
        FOOT_b: '<input id="b" />',
        // Will use HEAD slot if foot slot not defined
        HEAD_c: '<a href="#" id="c">link</a>'
      }
    })
    expect(wrapper).toBeDefined()
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()

    const $btn = wrapper.find('button[id="a"]')
    expect($btn.exists()).toBe(true)
    $btn.trigger('click')
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()

    const $input = wrapper.find('input[id="b"]')
    expect($input.exists()).toBe(true)
    $input.trigger('click')
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()

    const $link = wrapper.find('a[id="c"]')
    expect($link.exists()).toBe(true)
    $link.trigger('click')
    expect(wrapper.emitted('head-clicked')).not.toBeDefined()

    wrapper.destroy()
  })
})
