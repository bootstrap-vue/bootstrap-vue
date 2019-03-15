import PaginationNav from './pagination-nav'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

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
        value: 1,
        limit: 10
      }
    })
    expect(wrapper.is('nav')).toBe(true)

    expect(wrapper.findAll('li').length).toBe(7)

    expect(wrapper.vm.computedCurrentPage).toBe(1)
    expect(wrapper.emitted('input')).not.toBeDefined()

    // click on current page button (does nothing)
    wrapper
      .findAll('li')
      .at(2)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.vm.computedCurrentPage).toBe(1)
    expect(wrapper.emitted('input')).not.toBeDefined()

    // click on 2nd page button
    wrapper
      .findAll('li')
      .at(3)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.vm.computedCurrentPage).toBe(2)
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
    expect(wrapper.vm.computedCurrentPage).toBe(3)
    expect(wrapper.emitted('input')[1][0]).toBe(3)

    // click prev button
    wrapper
      .findAll('li')
      .at(1)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    expect(wrapper.vm.computedCurrentPage).toBe(2)
    expect(wrapper.emitted('input')[2][0]).toBe(2)
  })

  describe('autodetect page', () => {
    // Note: JSDOM only works with hash URL updates out of the box

    it('detects current page without $router', async () => {
      const wrapper = mount(PaginationNav, {
        propsData: {
          numberOfPages: 3,
          value: null,
          linkGen: page => (page === 2 ? '/' : `/#${page}`)
        }
      })
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.$router).not.toBeDefined()
      expect(wrapper.vm.$route).not.toBeDefined()

      expect(wrapper.is('nav')).toBe(true)
      const $ul = wrapper.find('ul.pagination')
      expect($ul.exists()).toBe(true)

      // Emitted current page (2)
      expect(wrapper.emitted('input')).toBeDefined()
      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.emitted('input')[0][0]).toBe(2) /* page 2, URL = '' */
    })

    it('works with $router to detect path', async () => {
      const App = {
        components: {
          BPaginationNav: PaginationNav
        },
        methods: {
          linkGen(page) {
            // We make page #2 "home" for testing
            // We return a to prop to auto trigger use of $router
            // if using strings, we would need to set use-router=true
            return page === 2 ? { path: '/' } : { path: '/' + page }
          }
        },
        template: `
          <div>
            <b-pagination-nav :number-of-pages="3" :link-gen="linkGen" />
            <router-view />
          </div>
        `
      }
      // Our router view component
      const FooRoute = {
        render(h) {
          // page 2 is linked to route /
          const pageNum = this.$route.params.pageNum || 'home'
          return h('div', { class: 'foo-content' }, [pageNum])
        }
      }
      // Create router instance
      const router = new VueRouter({
        routes: [{ path: '/', component: FooRoute }, { path: '/:page', component: FooRoute }]
      })
      const wrapper = mount(App, { localVue, router })

      expect(wrapper).toBeDefined()

      // Wait for the router to initialize
      await new Promise(resolve => router.onReady(resolve))

      // Wait for the guessCurrentPage to complete
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))

      // The pagination-nav component should exist
      expect(wrapper.find(PaginationNav).exists()).toBe(true)
      expect(wrapper.find(PaginationNav).vm.currentPage).toBe(2)

      // The router view should have the text 'home'
      expect(wrapper.find('.foo-content').exists()).toBe(true)
      expect(wrapper.find('.foo-content').text()).toContain('home')

      // Auto page detect should set us at page #2 (url '/')
      expect(wrapper.emitted('input')).toBeDefined()
      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.emitted('input')[0][0]).toBe(2)

      // Push router to a new page
      router.push('/3')

      // Wait for the guessCurrentPage to complete
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))

      expect(wrapper.emitted('input').length).toBe(2)
      expect(wrapper.emitted('input')[1][0]).toBe(3)

      // The router view should have the text 'home'
      expect(wrapper.find('.foo-content').exists()).toBe(true)
      expect(wrapper.find('.foo-content').text()).toContain('3')
    })
  })
})
