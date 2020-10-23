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

    wrapper.unmount()
  })

  it("prop `hide-header` doesn't render `<thead>`", async () => {
    const wrapper = mount(BSkeletonTable, {
      props: {
        hideHeader: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('thead').exists()).toBe(false)

    wrapper.unmount()
  })

  it('prop `show-footer` renders `<tfoot>`', async () => {
    const wrapper = mount(BSkeletonTable, {
      props: {
        showFooter: true
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('tfoot').exists()).toBe(true)

    wrapper.unmount()
  })

  it('setting `rows` prop changes amount of `tr` rendered in `tbody`', async () => {
    const wrapper = mount(BSkeletonTable, {
      props: {
        rows: 7
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.findAll('tbody > tr').length).toBe(7)

    wrapper.unmount()
  })

  it('setting `columns` prop changes amount of `th` rendered in `thead`', async () => {
    const wrapper = mount(BSkeletonTable, {
      props: {
        columns: 6
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.findAll('thead > tr > th').length).toBe(6)

    wrapper.unmount()
  })

  it('`table-props` are properly passed to the table', async () => {
    const wrapper = mount(BSkeletonTable, {
      props: {
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

    wrapper.unmount()
  })

  it('`animation` prop changes animation used in cells', async () => {
    const wrapper = mount(BSkeletonTable, {
      props: {
        animation: 'fade'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find('tbody > tr > td > div').classes()).toContain('b-skeleton-animate-fade')

    wrapper.unmount()
  })
})
