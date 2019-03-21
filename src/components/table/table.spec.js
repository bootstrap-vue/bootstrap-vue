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

  it('has class "table-striped" when striped=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        striped: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table-striped')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "table-bordered" when bordered=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        bordered: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table-bordered')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "table-borderless" when borderless=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        borderless: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table-borderless')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "table-hover" when hover=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        hover: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table-hover')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "table-sm" when small=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        small: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table-sm')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "table-dark" when dark=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        dark: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('table-dark')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "border" when outlined=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        outlined: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "b-table-fixed" when fixed=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        fixed: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('b-table-fixed')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "b-table-stacked" when stacked=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        stacked: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('b-table-stacked')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "b-table-stacked-md" when stacked=md', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        stacked: 'md'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.classes()).toContain('b-table-stacked-md')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)
  })

  it('has class "table-responsive" when responsive=true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        responsive: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('table-responsive')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.find('table').classes()).toContain('table')
    expect(wrapper.find('table').classes()).toContain('b-table')
    expect(wrapper.find('table').classes().length).toBe(3)
  })

  it('has class "table-responsive-md" when responsive=md', async () => {
    const wrapper = mount(Table, {
      propsData: {
        items: items1,
        fields: fields1,
        responsive: 'md'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.is(Table)).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('table-responsive-md')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.find('table').classes()).toContain('table')
    expect(wrapper.find('table').classes()).toContain('b-table')
    expect(wrapper.find('table').classes().length).toBe(3)
  })
})
