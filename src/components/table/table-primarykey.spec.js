import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]

describe('table > primary key', () => {
  it('default should not have ids on table rows', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems,
        id: 'test'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    const trs = wrapper.find('tbody').findAll('tr')
    expect(trs.length).toBe(testItems.length)
    expect(trs.at(0).attributes('id')).not.toBeDefined()
    expect(trs.at(1).attributes('id')).not.toBeDefined()
    expect(trs.at(2).attributes('id')).not.toBeDefined()

    wrapper.destroy()
  })

  it('should have ids on table rows when primary key set to field', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems,
        id: 'foo',
        primaryKey: 'a'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    const trs = wrapper.find('tbody').findAll('tr')
    expect(trs.length).toBe(testItems.length)
    expect(trs.at(0).attributes('id')).toBeDefined()
    expect(trs.at(0).attributes('id')).toBe(`foo__row_${testItems[0].a}`)
    expect(trs.at(1).attributes('id')).toBeDefined()
    expect(trs.at(1).attributes('id')).toBe(`foo__row_${testItems[1].a}`)
    expect(trs.at(2).attributes('id')).toBeDefined()
    expect(trs.at(2).attributes('id')).toBe(`foo__row_${testItems[2].a}`)

    wrapper.destroy()
  })

  it('should not have ids on table rows when primary key set to nonexistent field', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: testItems,
        id: 'foo',
        primaryKey: 'ZZZ'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(
      wrapper
        .find('tbody')
        .findAll('tr')
        .exists()
    ).toBe(true)
    const trs = wrapper.find('tbody').findAll('tr')
    expect(trs.length).toBe(testItems.length)
    expect(trs.at(0).attributes('id')).not.toBeDefined()
    expect(trs.at(1).attributes('id')).not.toBeDefined()
    expect(trs.at(2).attributes('id')).not.toBeDefined()

    wrapper.destroy()
  })
})
