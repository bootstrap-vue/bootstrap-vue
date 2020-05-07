import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BTable } from './table'

describe('table > row details', () => {
  it('does not show details if slot row-details not defined', async () => {
    const testItems = [
      { a: 1, b: 2, c: 3, _showDetails: true },
      { a: 5, b: 5, c: 6 },
      { a: 7, b: 8, c: 9, _showDetails: false }
    ]
    const testFields = ['a', 'b', 'c']
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(3)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)

    wrapper.destroy()
  })

  it('expected rows have details showing', async () => {
    const testItems = [
      { a: 1, b: 2, c: 3, _showDetails: true },
      { a: 5, b: 5, c: 6 },
      { a: 7, b: 8, c: 9, _showDetails: false }
    ]
    const testFields = ['a', 'b', 'c']
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        // Named slots get turned into scopedSlots in Vue 2.6.x
        'row-details': '<div>foobar</div>'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(4)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(3)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect($trs.at(1).text()).toBe('foobar')

    wrapper.destroy()
  })

  it('prop `details-td-class` works', async () => {
    const testItems = [
      { a: 1, b: 2, c: 3, _showDetails: true },
      { a: 5, b: 5, c: 6 },
      { a: 7, b: 8, c: 9, _showDetails: false }
    ]
    const testFields = ['a', 'b', 'c']
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        detailsTdClass: 'foobar-class'
      },
      slots: {
        // Named slots get turned into scopedSlots in Vue 2.6.x
        'row-details': '<div>foobar</div>'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(4)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect($trs.at(0).findAll('td').length).toBe(3)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect($trs.at(1).findAll('td').length).toBe(1)
    expect($trs.at(1).text()).toBe('foobar')
    const $detailsTd = $trs.at(1).find('td')
    expect($detailsTd.classes().length).toBe(1)
    expect($detailsTd.classes()).toContain('foobar-class')
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect($trs.at(2).findAll('td').length).toBe(3)
    expect(
      $trs
        .at(3)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect($trs.at(3).findAll('td').length).toBe(3)

    wrapper.destroy()
  })

  it('should show details slot when _showDetails changed', async () => {
    const testItems = [
      { a: 1, b: 2, c: 3, _showDetails: true },
      { a: 5, b: 5, c: 6 },
      { a: 7, b: 8, c: 9, _showDetails: false }
    ]
    const testFields = ['a', 'b', 'c']
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        // Named slots get turned into scopedSlots in Vue 2.6.x
        'row-details': '<div>foobar</div>'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(4)

    wrapper.vm.localItems[2]._showDetails = true
    await waitNT(wrapper.vm)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(5)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect($trs.at(1).text()).toBe('foobar')
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(3)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(4)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect($trs.at(4).text()).toBe('foobar')

    wrapper.destroy()
  })

  it('should hide details slot when _showDetails changed', async () => {
    const testItems = [
      { a: 1, b: 2, c: 3, _showDetails: true },
      { a: 5, b: 5, c: 6 },
      { a: 7, b: 8, c: 9, _showDetails: false }
    ]
    const testFields = ['a', 'b', 'c']
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        // named slots get turned into scopedSlots in Vue 2.6.x
        'row-details': '<div>foobar</div>'
      }
    })
    let $trs
    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(4)
    $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(4)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect($trs.at(1).text()).toBe('foobar')
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(3)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)

    wrapper.vm.localItems[0]._showDetails = false
    await waitNT(wrapper.vm)
    $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(3)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)

    wrapper.destroy()
  })

  it('should have extra spacer tr when details showing and striped=true', async () => {
    const testItems = [
      { a: 1, b: 2, c: 3, _showDetails: true },
      { a: 5, b: 5, c: 6 },
      { a: 7, b: 8, c: 9, _showDetails: false }
    ]
    const testFields = ['a', 'b', 'c']
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        striped: true
      },
      slots: {
        // Named slots get turned into scopedSlots in Vue 2.6.x
        'row-details': '<div>foobar</div>'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(5)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(0)
        .find('tr.d-none')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.d-none')
        .exists()
    ).toBe(true)
    expect(
      $trs
        .at(2)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect(
      $trs
        .at(2)
        .find('tr.d-none')
        .exists()
    ).toBe(false)
    expect($trs.at(2).text()).toBe('foobar')
    expect(
      $trs
        .at(3)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(3)
        .find('tr.d-none')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(4)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(4)
        .find('tr.d-none')
        .exists()
    ).toBe(false)

    wrapper.destroy()
  })

  it('should show details slot when slot method toggleDetails() called', async () => {
    const testItems = [{ a: 1, b: 2, c: 3, _showDetails: true }]
    const testFields = ['a', 'b', 'c']
    let scopeDetails = null
    let scopeField = null
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'row-details': function(scope) {
          scopeDetails = scope
          return 'foobar'
        },
        'cell(a)': function(scope) {
          scopeField = scope
          return 'AAA'
        }
      }
    })
    let $trs
    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr').length).toBe(2)

    $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(2)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect($trs.at(1).text()).toBe('foobar')

    // Toggle details via details slot
    expect(scopeDetails).not.toBe(null)
    scopeDetails.toggleDetails()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(1)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)

    // Toggle details via field slot
    expect(scopeField).not.toBe(null)
    scopeField.toggleDetails()
    await waitNT(wrapper.vm)

    expect(wrapper.findAll('tbody > tr').length).toBe(2)

    $trs = wrapper.findAll('tbody > tr')
    expect($trs.length).toBe(2)
    expect(
      $trs
        .at(0)
        .find('tr.b-table-details')
        .exists()
    ).toBe(false)
    expect(
      $trs
        .at(1)
        .find('tr.b-table-details')
        .exists()
    ).toBe(true)
    expect($trs.at(1).text()).toBe('foobar')

    wrapper.destroy()
  })
})
