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

  it('renders with correct default HREF', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('nav')).toBe(true)
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is "/", and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/1')
    expect($links.at(1).attributes('href')).toBe('/2')
    expect($links.at(2).attributes('href')).toBe('/1')
    expect($links.at(3).attributes('href')).toBe('/2')
    expect($links.at(4).attributes('href')).toBe('/3')
    expect($links.at(5).attributes('href')).toBe('/4')
    expect($links.at(6).attributes('href')).toBe('/5')
    expect($links.at(7).attributes('href')).toBe('/4')
    expect($links.at(8).attributes('href')).toBe('/5')
  })

  it('renders with correct default page button text', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('nav')).toBe(true)
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    expect($links.at(2).text()).toBe('1')
    expect($links.at(3).text()).toBe('2')
    expect($links.at(4).text()).toBe('3')
    expect($links.at(5).text()).toBe('4')
    expect($links.at(6).text()).toBe('5')
  })

  it('renders with correct HREF when base-url specified', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        baseUrl: '/foo/'
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('nav')).toBe(true)
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is "/", and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/foo/1')
    expect($links.at(1).attributes('href')).toBe('/foo/2')
    expect($links.at(2).attributes('href')).toBe('/foo/1')
    expect($links.at(3).attributes('href')).toBe('/foo/2')
    expect($links.at(4).attributes('href')).toBe('/foo/3')
    expect($links.at(5).attributes('href')).toBe('/foo/4')
    expect($links.at(6).attributes('href')).toBe('/foo/5')
    expect($links.at(7).attributes('href')).toBe('/foo/4')
    expect($links.at(8).attributes('href')).toBe('/foo/5')
  })

  it('renders with correct HREF when link-gen function provided', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        linkGen: page => `?${page}`
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('nav')).toBe(true)
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is "/", and link will be the page number
    expect($links.at(0).attributes('href')).toBe('?1')
    expect($links.at(1).attributes('href')).toBe('?2')
    expect($links.at(2).attributes('href')).toBe('?1')
    expect($links.at(3).attributes('href')).toBe('?2')
    expect($links.at(4).attributes('href')).toBe('?3')
    expect($links.at(5).attributes('href')).toBe('?4')
    expect($links.at(6).attributes('href')).toBe('?5')
    expect($links.at(7).attributes('href')).toBe('?4')
    expect($links.at(8).attributes('href')).toBe('?5')
  })

  it('renders with correct HREF when link-gen function returns object', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        linkGen: page => ({ path: `/baz?${page}` })
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('nav')).toBe(true)
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is "/", and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/baz?1')
    expect($links.at(1).attributes('href')).toBe('/baz?2')
    expect($links.at(2).attributes('href')).toBe('/baz?1')
    expect($links.at(3).attributes('href')).toBe('/baz?2')
    expect($links.at(4).attributes('href')).toBe('/baz?3')
    expect($links.at(5).attributes('href')).toBe('/baz?4')
    expect($links.at(6).attributes('href')).toBe('/baz?5')
    expect($links.at(7).attributes('href')).toBe('/baz?4')
    expect($links.at(8).attributes('href')).toBe('/baz?5')
  })

  it('renders with correct page button text when page-gen function provided', async () => {
    const wrapper = mount(PaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        pageGen: page => `Page ${page}`
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.is('nav')).toBe(true)
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    expect($links.at(2).text()).toBe('Page 1')
    expect($links.at(3).text()).toBe('Page 2')
    expect($links.at(4).text()).toBe('Page 3')
    expect($links.at(5).text()).toBe('Page 4')
    expect($links.at(6).text()).toBe('Page 5')
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
