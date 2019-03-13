import PaginationNav from './pagination-nav'
import { requestAF } from '../../utils/dom'
import { mount } from '@vue/test-utils'

// The majority of tests for the core of pagination mixin are performed
// in pagination.spec.js.  Here we just test the differences that
// pagination-nav has

describe('pagination-nav', () => {
  it('renders with correct basic structure for root elements', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 1,
        value: 1
      }
    })
    // pagination-nav has an outer wrapper of nav
    expect(wrapper.is('nav')).toBe(true)
    const $ul = wrapper.find('ul.pagination')
    expect($ul.exists()).toBe(true)

    // NAV Attributes
    expect(wrapper.attributes('aria-hidden')).toBe('false')

    // UL Classes
    expect($ul.classes()).toContain('pagination')
    expect($ul.classes()).toContain('b-pagination')
    expect($ul.classes()).not.toContain('pagination-sm')
    expect($ul.classes()).not.toContain('pagination-lg')
    expect($ul.classes()).not.toContain('justify-content-center')
    expect($ul.classes()).not.toContain('justify-content-end')
    // UL Attributes
    expect($ul.attributes('role')).toBe('menubar')
    expect($ul.attributes('aria-disabled')).toBe('false')
    expect($ul.attributes('aria-label')).toBe('Pagination')
  })
})
