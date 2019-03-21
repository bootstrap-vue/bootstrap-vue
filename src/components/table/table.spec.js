import Table from './table'
import { mount } from '@vue/test-utils'

const items1 = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const fields1 = ['a', 'b', 'c']

describe('table', () => {
  it('has expected default classes', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(2)
  })
})
