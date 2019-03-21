import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [
  { a: 1, b: 2, c: 3 },
  { a: 5, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 },
  { a: 10, b: 11, c: 12 },
  { a: 13, b: 14, c: 15 }
]

describe('table > pagination', () => {
  it('default should not be paginated', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems
      }
    })
    expect(wrapper.findAll('tbody > tr').length).toBe(5)

    wrapper.destroy()
  })

  it('should have 3 rows when per-page=3', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems,
        perPage: 3,
        currentPage: 1
      }
    })
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.at(0).find('td').text()).toBe('1')
    expect($trs.at(1).find('td').text()).toBe('4')
    expect($trs.at(2).find('td').text()).toBe('7')

    wrapper.destroy()
  })

  it('changing pages should update rows', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems,
        perPage: 3,
        currentPage: 1
      }
    })
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.at(0).find('td').text()).toBe('1')
    expect($trs.at(1).find('td').text()).toBe('4')
    expect($trs.at(2).find('td').text()).toBe('7')

    wrapper.setProps({
      currentPage: 2
    })

    expect(wrapper.findAll('tbody > tr').length).toBe(2)
    const $trs = wrapper.findAll('tbody > tr')
    expect($trs.at(0).find('td').text()).toBe('10')
    expect($trs.at(1).find('td').text()).toBe('13')

    wrapper.setProps({
      currentPage: 3
    })

    expect(wrapper.findAll('tbody > tr').length).toBe(0)

    wrapper.destroy()
  })
})
