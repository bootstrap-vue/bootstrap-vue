import { mount } from '@vue/test-utils'
import { BTable } from './table'
import { BTd } from './td'
import { BTh } from './th'

const items = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const fields = [
  { key: 'a', stickyColumn: true, isRowHeader: true },
  { key: 'b', stickyColumn: true },
  'c'
]

describe('table > sticky columns', () => {
  it('has expected classes when sticky column is enabled and responsive', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        responsive: true,
        footClone: true,
        items,
        fields
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('table-responsive')
    expect(wrapper.classes()).not.toContain('b-table-sticky-header')
    const table = wrapper.find('table')
    expect(table.classes()).toContain('table')
    expect(table.classes()).toContain('b-table')

    // Body
    let trs = wrapper.findAll('tbody > tr')
    expect(trs.length).toBe(2)
    let cells = trs.at(0).findAll('th, td')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTd with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTd)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TD')
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be td
    expect(cells.at(2).vm).not.toBeDefined()
    expect(cells.at(2).element.tagName).toBe('TD')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    // Header cells
    trs = wrapper.findAll('thead > tr')
    expect(trs.length).toBe(1)
    cells = trs.at(0).findAll('th')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTh with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TH')
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be BTh
    expect(
      cells
        .at(2)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(2).element.tagName).toBe('TH')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    // Footer cells
    trs = wrapper.findAll('tfoot > tr')
    expect(trs.length).toBe(1)
    cells = trs.at(0).findAll('th')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTh with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TH')
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be BTh
    expect(
      cells
        .at(2)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(2).element.tagName).toBe('TH')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    wrapper.destroy()
  })

  it('has expected classes when sticky column is enabled with sticky headers', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        responsive: false,
        stickyHeader: true,
        footClone: true,
        items,
        fields
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).not.toContain('table-responsive')
    expect(wrapper.classes()).toContain('b-table-sticky-header')
    const table = wrapper.find('table')
    expect(table.classes()).toContain('table')
    expect(table.classes()).toContain('b-table')

    // Tbody cells
    let trs = wrapper.findAll('tbody > tr')
    expect(trs.length).toBe(2)
    let cells = trs.at(0).findAll('th, td')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTd with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTd)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TD')
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be td
    expect(cells.at(2).vm).not.toBeDefined()
    expect(cells.at(2).element.tagName).toBe('TD')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    // Header cells
    trs = wrapper.findAll('thead > tr')
    expect(trs.length).toBe(1)
    cells = trs.at(0).findAll('th')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTh with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TH')
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be BTh
    expect(
      cells
        .at(2)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(2).element.tagName).toBe('TH')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    // Footer cells
    trs = wrapper.findAll('tfoot > tr')
    expect(trs.length).toBe(1)

    cells = trs.at(0).findAll('th')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTh with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TH')
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be BTh
    expect(
      cells
        .at(2)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(2).element.tagName).toBe('TH')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    wrapper.destroy()
  })

  it('does not have sticky classes when sticky column is enabled and not responsive and no sticky header', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        responsive: false,
        stickyHeader: false,
        footClone: true,
        items,
        fields
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).not.toContain('table-responsive')
    expect(wrapper.classes()).not.toContain('b-table-sticky-header')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')

    // Body
    let trs = wrapper.findAll('tbody > tr')
    expect(trs.length).toBe(2)
    let cells = trs.at(0).findAll('th, td')
    expect(cells.length).toBe(3)

    // First column should be th
    expect(cells.at(0).vm).not.toBeDefined()
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).not.toContain('b-table-sticky-column')

    // Second column should be td
    expect(cells.at(1).vm).not.toBeDefined()
    expect(cells.at(1).element.tagName).toBe('TD')
    expect(cells.at(1).classes()).not.toContain('b-table-sticky-column')

    // Third column should be td
    expect(cells.at(2).vm).not.toBeDefined()
    expect(cells.at(2).element.tagName).toBe('TD')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    // Header cells
    trs = wrapper.findAll('thead > tr')
    expect(trs.length).toBe(1)
    cells = trs.at(0).findAll('th')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).not.toContain('b-table-sticky-column')

    // Second column should be BTh with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TH')
    expect(cells.at(1).classes()).not.toContain('b-table-sticky-column')

    // Third column should be BTh
    expect(
      cells
        .at(2)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(2).element.tagName).toBe('TH')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    // Footer cells
    trs = wrapper.findAll('tfoot > tr')
    expect(trs.length).toBe(1)
    cells = trs.at(0).findAll('th')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(
      cells
        .at(0)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(0).element.tagName).toBe('TH')
    expect(cells.at(0).classes()).not.toContain('b-table-sticky-column')

    // Second column should be BTh with sticky classes
    expect(
      cells
        .at(1)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(1).element.tagName).toBe('TH')
    expect(cells.at(1).classes()).not.toContain('b-table-sticky-column')

    // Third column should be BTh
    expect(
      cells
        .at(2)
        .findComponent(BTh)
        .exists()
    ).toBe(true)
    expect(cells.at(2).element.tagName).toBe('TH')
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    wrapper.destroy()
  })
})
