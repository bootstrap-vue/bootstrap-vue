import { mount } from '@vue/test-utils'
import { BSkeletonTable } from './skeleton-table'

describe('skeleton-table', () => {
  it('element has default layout', async () => {
    const wrapper = mount(BSkeletonTable)

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.findAll('thead > tr > th').length).toBe(5)
    expect(wrapper.findAll('tbody > tr').length).toBe(3)
    expect(wrapper.findAll('tbody > tr > td > div').length).toBe(15)
    expect(wrapper.find('tfoot').exists()).toBe(false)

    wrapper.destroy()
  })

  it("prop `hide-header` doesn't render `<thead>`", async () => {
    const wrapper = mount(BSkeletonTable, {
      propsData: {
        hideHeader: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(false)

    wrapper.destroy()
  })

  it('prop `show-footer` renders `<tfoot>`', async () => {
    const wrapper = mount(BSkeletonTable, {
      propsData: {
        showFooter: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('tfoot').exists()).toBe(true)

    wrapper.destroy()
  })

  it('setting `rows` prop changes amount of `tr` rendered in `tbody`', async () => {
    const wrapper = mount(BSkeletonTable, {
      propsData: {
        rows: 7
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.findAll('tbody > tr').length).toBe(7)

    wrapper.destroy()
  })

  it('setting `columns` prop changes amount of `th` rendered in `thead`', async () => {
    const wrapper = mount(BSkeletonTable, {
      propsData: {
        columns: 6
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.findAll('thead > tr > th').length).toBe(6)

    wrapper.destroy()
  })

  it('`table-props` are properly passed to the table', async () => {
    const wrapper = mount(BSkeletonTable, {
      propsData: {
        tableProps: {
          bordered: true,
          striped: true
        }
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.classes()).toContain('table-bordered')
    expect(wrapper.classes()).toContain('table-striped')

    wrapper.destroy()
  })

  it('`animation` prop changes animation used in cells', async () => {
    const wrapper = mount(BSkeletonTable, {
      propsData: {
        animation: 'fade'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('tbody > tr > td > div').classes()).toContain('b-skeleton-animate-fade')

    wrapper.destroy()
  })
})
