import { mount } from '@vue/test-utils'
import { BTableLite } from './table-lite'

const items1 = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const fields1 = ['a', 'b', 'c']

describe('table-lite', () => {
  it('has expected default classes', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class "table-striped" when striped=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        striped: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-striped')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "table-bordered" when bordered=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        bordered: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-bordered')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "table-borderless" when borderless=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        borderless: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-borderless')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "table-hover" when hover=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        hover: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-hover')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "table-sm" when small=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        small: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-sm')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "table-dark" when dark=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        dark: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-dark')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "border" when outlined=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        outlined: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "b-table-fixed" when fixed=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        fixed: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('b-table-fixed')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "b-table-stacked" when stacked=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        stacked: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('b-table-stacked')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "b-table-stacked-md" when stacked=md', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        stacked: 'md'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('b-table-stacked-md')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('has class "table-responsive" when responsive=true', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        responsive: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('table-responsive')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.find('table').classes()).toContain('table')
    expect(wrapper.find('table').classes()).toContain('b-table')
    expect(wrapper.find('table').classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has class "table-responsive-md" when responsive=md', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        responsive: 'md'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('table-responsive-md')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.find('table').classes()).toContain('table')
    expect(wrapper.find('table').classes()).toContain('b-table')
    expect(wrapper.find('table').classes().length).toBe(2)

    wrapper.destroy()
  })

  it('stacked has precedence over responsive', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        stacked: true,
        responsive: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).not.toContain('table-responsive')
    expect(wrapper.classes()).toContain('b-table-stacked')
    expect(wrapper.classes()).toContain('table')
    expect(wrapper.classes()).toContain('b-table')
    expect(wrapper.classes().length).toBe(3)

    wrapper.destroy()
  })

  it('stacked has data-label attribute on all tbody > tr td', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: fields1,
        stacked: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(2)
    const $trs = wrapper.findAll('tbody > tr').wrappers

    // Labels will have run through startCase
    expect(
      $trs[0]
        .findAll('td')
        .at(0)
        .attributes('data-label')
    ).toBe('A')
    expect(
      $trs[1]
        .findAll('td')
        .at(0)
        .attributes('data-label')
    ).toBe('A')

    expect(
      $trs[0]
        .findAll('td')
        .at(1)
        .attributes('data-label')
    ).toBe('B')
    expect(
      $trs[1]
        .findAll('td')
        .at(1)
        .attributes('data-label')
    ).toBe('B')

    expect(
      $trs[0]
        .findAll('td')
        .at(2)
        .attributes('data-label')
    ).toBe('C')
    expect(
      $trs[1]
        .findAll('td')
        .at(2)
        .attributes('data-label')
    ).toBe('C')

    wrapper.destroy()
  })

  it('item _rowVariant works', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: [{ a: 1, _rowVariant: 'primary' }],
        fields: ['a'],
        dark: false
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.find('tbody > tr').classes()).toContain('table-primary')

    await wrapper.setProps({
      dark: true
    })

    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.find('tbody > tr').classes()).toContain('bg-primary')

    wrapper.destroy()
  })

  it('item _cellVariants works', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: [{ a: 1, _cellVariants: { a: 'info' } }],
        fields: ['a'],
        dark: false
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(1)
    expect(wrapper.find('tbody > tr > td').classes()).toContain('table-info')

    await wrapper.setProps({
      dark: true
    })

    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(1)
    expect(wrapper.find('tbody > tr > td').classes()).toContain('bg-info')

    wrapper.destroy()
  })

  it('changing items array works', async () => {
    const items1 = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
    const items2 = [{ a: 3, b: 4 }]
    const wrapper = mount(BTableLite, {
      propsData: {
        items: items1,
        fields: ['a', 'b']
      }
    })
    expect(wrapper).toBeDefined()

    expect(wrapper.findAll('tbody > tr').length).toBe(2)
    await wrapper.setProps({
      items: items2
    })
    expect(wrapper.findAll('tbody > tr').length).toBe(1)

    wrapper.destroy()
  })

  it('tbody-tr-class works', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
        fields: ['a', 'b'],
        tbodyTrClass: 'foobar'
      }
    })

    expect(wrapper).toBeDefined()

    // Prop as a string
    expect(wrapper.findAll('tbody > tr').length).toBe(2)
    let $trs = wrapper.findAll('tbody > tr')
    expect($trs.at(0).classes()).toContain('foobar')
    expect($trs.at(1).classes()).toContain('foobar')

    // As a function
    await wrapper.setProps({
      tbodyTrClass: item => {
        return item.a === 1 ? 'foo' : 'bar'
      }
    })

    expect(wrapper.findAll('tbody > tr').length).toBe(2)
    $trs = wrapper.findAll('tbody > tr')
    expect($trs.at(0).classes()).toContain('foo')
    expect($trs.at(0).classes()).not.toContain('bar')
    expect($trs.at(1).classes()).toContain('bar')
    expect($trs.at(1).classes()).not.toContain('foo')

    wrapper.destroy()
  })

  it('thead and tfoot variant and classes work', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: [{ a: 1, b: 2 }],
        fields: ['a', 'b'],
        footClone: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('thead > tr').length).toBe(1)
    expect(wrapper.findAll('tfoot > tr').length).toBe(1)

    expect(wrapper.find('thead').classes().length).toBe(0)
    expect(wrapper.find('tfoot').classes().length).toBe(0)

    await wrapper.setProps({
      headVariant: 'light'
    })

    expect(wrapper.find('thead').classes()).toContain('thead-light')
    expect(wrapper.find('tfoot').classes()).toContain('thead-light')

    await wrapper.setProps({
      footVariant: 'dark'
    })

    expect(wrapper.find('thead').classes()).toContain('thead-light')
    expect(wrapper.find('tfoot').classes()).toContain('thead-dark')

    await wrapper.setProps({
      theadClass: 'foo',
      tfootClass: 'bar'
    })

    expect(wrapper.find('thead').classes()).toContain('thead-light')
    expect(wrapper.find('thead').classes()).toContain('foo')
    expect(wrapper.find('tfoot').classes()).toContain('thead-dark')
    expect(wrapper.find('tfoot').classes()).toContain('bar')

    await wrapper.setProps({
      theadTrClass: 'willy',
      tfootTrClass: 'wonka'
    })

    expect(wrapper.find('thead > tr').classes()).toContain('willy')
    expect(wrapper.find('tfoot > tr').classes()).toContain('wonka')

    wrapper.destroy()
  })

  it('item field isRowHeader works', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
        items: [{ a: 1, b: 2 }],
        fields: [{ key: 'a', isRowHeader: true }, 'b']
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > *').length).toBe(2)

    expect(wrapper.findAll('tbody > tr > *').at(0).element.tagName).toBe('TH')
    expect(
      wrapper
        .findAll('tbody > tr > *')
        .at(0)
        .attributes('role')
    ).toBe('rowheader')
    expect(
      wrapper
        .findAll('tbody > tr > *')
        .at(0)
        .attributes('scope')
    ).toBe('row')

    expect(wrapper.findAll('tbody > tr > *').at(1).element.tagName).toBe('TD')
    expect(
      wrapper
        .findAll('tbody > tr > *')
        .at(1)
        .attributes('role')
    ).toBe('cell')
    expect(
      wrapper
        .findAll('tbody > tr > *')
        .at(1)
        .attributes('scope')
    ).toBeUndefined()

    wrapper.destroy()
  })

  it('item field tdAttr and tdClass works', async () => {
    const Parent = {
      methods: {
        parentTdAttrs() {
          return { 'data-parent': 'parent' }
        }
      }
    }
    const wrapper = mount(BTableLite, {
      parentComponent: Parent,
      propsData: {
        items: [{ a: 1, b: 2, c: 3 }],
        fields: [
          { key: 'a', tdAttr: { 'data-foo': 'bar' } },
          { key: 'b', tdClass: () => 'baz' },
          { key: 'c', tdAttr: 'parentTdAttrs' }
        ]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(3)

    const $tds = wrapper.findAll('tbody > tr > td')

    expect($tds.at(0).attributes('data-foo')).toBe('bar')
    expect($tds.at(0).attributes('data-parent')).toBeUndefined()
    expect($tds.at(0).classes().length).toBe(0)

    expect($tds.at(1).classes()).toContain('baz')
    expect($tds.at(1).attributes('data-foo')).toBeUndefined()
    expect($tds.at(1).attributes('data-parent')).toBeUndefined()

    expect($tds.at(2).attributes('data-parent')).toBe('parent')
    expect($tds.at(2).attributes('data-foo')).toBeUndefined()
    expect($tds.at(2).classes().length).toBe(0)

    wrapper.destroy()
  })

  it('item field thAttr works', async () => {
    const Parent = {
      methods: {
        parentThAttrs(value, key, item, type) {
          return { 'data-type': type }
        }
      }
    }

    const wrapper = mount(BTableLite, {
      parentComponent: Parent,
      propsData: {
        items: [{ a: 1, b: 2, c: 3 }],
        fields: [
          { key: 'a', thAttr: { 'data-foo': 'bar' } },
          { key: 'b', thAttr: 'parentThAttrs', isRowHeader: true },
          {
            key: 'c',
            thAttr: (v, k, i, t) => {
              return { 'data-type': t }
            }
          }
        ]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('thead > tr').length).toBe(1)
    expect(wrapper.findAll('thead > tr > th').length).toBe(3)
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(2)
    expect(wrapper.findAll('tbody > tr > th').length).toBe(1)

    const $headerThs = wrapper.findAll('thead > tr > th')
    expect($headerThs.at(0).attributes('data-foo')).toBe('bar')
    expect($headerThs.at(0).attributes('data-type')).toBeUndefined()
    expect($headerThs.at(0).classes().length).toBe(0)

    expect($headerThs.at(1).attributes('data-foo')).toBeUndefined()
    expect($headerThs.at(1).attributes('data-type')).toBe('head')
    expect($headerThs.at(1).classes().length).toBe(0)

    expect($headerThs.at(2).attributes('data-foo')).toBeUndefined()
    expect($headerThs.at(2).attributes('data-type')).toBe('head')
    expect($headerThs.at(2).classes().length).toBe(0)

    const $bodyThs = wrapper.findAll('tbody > tr > th')

    expect($bodyThs.at(0).attributes('data-foo')).toBeUndefined()
    expect($bodyThs.at(0).attributes('data-type')).toBe('row')
    expect($bodyThs.at(0).classes().length).toBe(0)

    wrapper.destroy()
  })

  it('item field formatter as function works', async () => {
    const wrapper = mount(BTableLite, {
      propsData: {
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
    expect($tds.at(0).text()).toBe('3')
    expect($tds.at(1).text()).toBe('2')

    wrapper.destroy()
  })

  it('item field formatter as string works', async () => {
    const Parent = {
      methods: {
        formatter(value, key, item) {
          return item.a + item.b
        }
      }
    }
    const wrapper = mount(BTableLite, {
      parentComponent: Parent,
      propsData: {
        items: [{ a: 1, b: 2 }],
        fields: [{ key: 'a', formatter: 'formatter' }, 'b']
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('tbody > tr').length).toBe(1)
    expect(wrapper.findAll('tbody > tr > td').length).toBe(2)
    const $tds = wrapper.findAll('tbody > tr > td')
    expect($tds.at(0).text()).toBe('3')
    expect($tds.at(1).text()).toBe('2')

    wrapper.destroy()
  })
})
