import PaginationNav from './pagination-nav'
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
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

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

  it('clicking buttons updates the v-model', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 3,
        value: 1
      }
    })
    expect(wrapper.is('nav')).toBe(true)

    expect(wrapper.findAll('li').length).toBe(7)

    expect(wrapper.vm.currentPage).toBe(1)
    expect(wrapper.emitted('input')).not.toBeDefined()

    // click on 2nd button
    wrapper
      .findAll('li')
      .at(3)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.vm.currentPage).toBe(2)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toBe(2)

    // click goto last button
    wrapper
      .findAll('li')
      .at(6)
      .find('a')
      .trigger('keydown.space') /* generates a click event */
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.vm.currentPage).toBe(3)
    expect(wrapper.emitted('input')[1][0]).toBe(3)

    // click prev button
    wrapper
      .findAll('li')
      .at(1)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.vm.currentPage).toBe(2)
    expect(wrapper.emitted('input')[2][0]).toBe(2)
  })
})
