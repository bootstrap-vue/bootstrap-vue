import { mount } from '@vue/test-utils'
import { BTable } from './table'

describe('table > field-formatter', () => {
  it('item field formatter as function works', async () => {
    const wrapper = mount(BTable, {
      props: {
        items: [{ a: 1, b: 2 }],
        fields: [
          {
            key: 'a',
            formatter(value, key, item) {
              return item.a + item.b
            }
          },
          'b'
        ]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(2)
    const $tds = wrapper.findAll('tbody > tr > td')
    expect($tds[0].text()).toBe('3')
    expect($tds[1].text()).toBe('2')

    wrapper.unmount()
  })

  it('item field formatter as string works', async () => {
    const Parent = {
      methods: {
        formatter(value, key, item) {
          return item.a + item.b
        }
      }
    }
    const wrapper = mount(BTable, {
      parentComponent: Parent,
      props: {
        items: [{ a: 1, b: 2 }],
        fields: [{ key: 'a', formatter: 'formatter' }, 'b']
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(2)
    const $tds = wrapper.findAll('tbody > tr > td')
    expect($tds[0].text()).toBe('3')
    expect($tds[1].text()).toBe('2')

    wrapper.unmount()
  })
})
