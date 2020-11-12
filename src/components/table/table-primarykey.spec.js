import { mount } from '@vue/test-utils'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]

describe('table > primary key', () => {
  it('default should not have ids on table rows', async () => {
    const wrapper = mount(BTable, {
      props: {
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
    expect(trs[0].attributes('id')).toBeUndefined()
    expect(trs[1].attributes('id')).toBeUndefined()
    expect(trs[2].attributes('id')).toBeUndefined()

    wrapper.unmount()
  })

  it('should have ids on table rows when primary key set to field', async () => {
    const wrapper = mount(BTable, {
      props: {
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
    expect(trs[0].attributes('id')).toBeDefined()
    expect(trs[0].attributes('id')).toBe(`foo__row_${testItems[0].a}`)
    expect(trs[1].attributes('id')).toBeDefined()
    expect(trs[1].attributes('id')).toBe(`foo__row_${testItems[1].a}`)
    expect(trs[2].attributes('id')).toBeDefined()
    expect(trs[2].attributes('id')).toBe(`foo__row_${testItems[2].a}`)

    wrapper.unmount()
  })

  it('should not have ids on table rows when primary key set to nonexistent field', async () => {
    const wrapper = mount(BTable, {
      props: {
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
    expect(trs[0].attributes('id')).toBeUndefined()
    expect(trs[1].attributes('id')).toBeUndefined()
    expect(trs[2].attributes('id')).toBeUndefined()

    wrapper.unmount()
  })
})
