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
  it('has expected classes when sticky column is enabled', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        responsive: true,
        items: items,
        fields: fields
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(BTable)).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('table-responsive')
    const table = wrapper.find('table')
    expect(table.classes()).toContain('table')
    expect(table.classes()).toContain('b-table')

    const trs = wrapper.findAll('tbody > tr')
    expect(trs.length).toBe(2)

    const cells = trs.at(0).findAll('th, td')
    expect(cells.length).toBe(3)

    // First column should be BTh with sticky classes
    expect(cells.at(0).is(BTh)).toBe(true)
    expect(cells.at(0).is('th')).toBe(true)
    expect(cells.at(0).classes()).toContain('b-table-sticky-column')

    // Second column should be BTd with sticky classes
    expect(cells.at(1).is(BTd)).toBe(true)
    expect(cells.at(1).is('td')).toBe(true)
    expect(cells.at(1).classes()).toContain('b-table-sticky-column')

    // Third column should be td
    expect(cells.at(2).is(BTd)).toBe(false)
    expect(cells.at(2).is(BTh)).toBe(false)
    expect(cells.at(2).is('td')).toBe(true)
    expect(cells.at(2).classes()).not.toContain('b-table-sticky-column')

    wrapper.destroy()
  })
})
