import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > caption', () => {
  it('should not have caption by default', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('caption').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should render named slot `table-caption`', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      slots: {
        'table-caption': 'foobar'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')
    expect(wrapper.find('caption').attributes('id')).not.toBeDefined()
    expect(wrapper.find('table').classes()).not.toContain('b-table-caption-top')

    wrapper.destroy()
  })

  it('should render scoped slot `table-caption`', async () => {
    let scope = null
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      scopedSlots: {
        'table-caption': function(props) {
          scope = props
          return this.$createElement('b', 'foobar')
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(scope).toEqual({}) /* scoped is an empty object for caption */
    expect(
      wrapper
        .find('caption')
        .find('b')
        .exists()
    ).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')

    wrapper.destroy()
  })

  it('should render `caption` when prop caption is set', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        caption: 'foobar'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')
    expect(wrapper.find('caption').attributes('id')).not.toBeDefined()
    expect(wrapper.find('caption').classes()).not.toContain('b-table-caption-top')

    wrapper.destroy()
  })

  it('should render `caption` when prop caption-html is set', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        captionHtml: '<b>foobar</b>'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(
      wrapper
        .find('caption')
        .find('b')
        .exists()
    ).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')
    expect(wrapper.find('caption').attributes('id')).not.toBeDefined()
    expect(wrapper.find('caption').classes()).not.toContain('b-table-caption-top')

    wrapper.destroy()
  })

  it('should render `caption` with table class when prop caption-top is set', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        caption: 'foobar',
        captionTop: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')
    expect(wrapper.find('caption').attributes('id')).not.toBeDefined()
    expect(wrapper.find('table').classes()).toContain('b-table-caption-top')

    wrapper.destroy()
  })

  it('should render `caption` with id attribute when prop stacked is true', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: 'zzz',
        fields: testFields,
        items: testItems,
        caption: 'foobar',
        stacked: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.attributes('id')).toBe('zzz')
    await waitNT(wrapper.vm)
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')
    expect(wrapper.find('caption').attributes('id')).toBeDefined()
    expect(wrapper.find('caption').attributes('id')).toBe('zzz__caption_')

    wrapper.destroy()
  })

  it('should render `caption` with id attribute when prop stacked is sm', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: 'zzz',
        fields: testFields,
        items: testItems,
        caption: 'foobar',
        stacked: 'sm'
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.attributes('id')).toBe('zzz')
    await waitNT(wrapper.vm)
    expect(wrapper.find('table > caption').exists()).toBe(true)
    expect(wrapper.find('caption').text()).toBe('foobar')
    expect(wrapper.find('caption').attributes('id')).toBeDefined()
    expect(wrapper.find('caption').attributes('id')).toBe('zzz__caption_')

    wrapper.destroy()
  })
})
