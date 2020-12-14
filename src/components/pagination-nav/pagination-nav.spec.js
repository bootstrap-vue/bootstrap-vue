import VueRouter from 'vue-router'
import { createLocalVue, mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BPaginationNav } from './pagination-nav'

const localVue = createLocalVue()
localVue.use(VueRouter)

// The majority of tests for the core of pagination mixin are performed
// in pagination.spec.js. Here we just test the differences that
// <pagination-nav> has

// We use a (currently) undocumented wrapper method `destroy()` at the end
// of each test to remove the VM and DOM from the JSDOM document, as
// the wrapper's and instances remain after each test completes

describe('pagination-nav', () => {
  it('renders with correct basic structure for root elements', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 1,
        value: 1
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    // <pagination-nav> has an outer wrapper of nav
    expect(wrapper.element.tagName).toBe('NAV')
    const $ul = wrapper.find('ul.pagination')
    expect($ul.exists()).toBe(true)

    // NAV Attributes
    expect(wrapper.attributes('aria-hidden')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')

    // UL Classes
    expect($ul.classes()).toContain('pagination')
    expect($ul.classes()).toContain('b-pagination')
    expect($ul.classes()).not.toContain('pagination-sm')
    expect($ul.classes()).not.toContain('pagination-lg')
    expect($ul.classes()).not.toContain('justify-content-center')
    expect($ul.classes()).not.toContain('justify-content-end')
    // UL Attributes
    expect($ul.attributes('role')).not.toBe('menubar')
    expect($ul.attributes('aria-disabled')).toBe('false')
    expect($ul.attributes('aria-label')).not.toBe('Pagination')

    wrapper.destroy()
  })

  it('renders with correct default HREF', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is '/', and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/1')
    expect($links.at(1).attributes('href')).toBe('/2')
    expect($links.at(2).attributes('href')).toBe('/1')
    expect($links.at(3).attributes('href')).toBe('/2')
    expect($links.at(4).attributes('href')).toBe('/3')
    expect($links.at(5).attributes('href')).toBe('/4')
    expect($links.at(6).attributes('href')).toBe('/5')
    expect($links.at(7).attributes('href')).toBe('/4')
    expect($links.at(8).attributes('href')).toBe('/5')

    wrapper.destroy()
  })

  it('renders with correct default page button text', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    expect($links.at(2).text()).toBe('1')
    expect($links.at(3).text()).toBe('2')
    expect($links.at(4).text()).toBe('3')
    expect($links.at(5).text()).toBe('4')
    expect($links.at(6).text()).toBe('5')

    wrapper.destroy()
  })

  it('disabled renders correct', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 1,
        value: 1,
        disabled: true
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    // <pagination-nav> has an outer wrapper of nav
    expect(wrapper.element.tagName).toBe('NAV')
    const $ul = wrapper.find('ul.pagination')
    expect($ul.exists()).toBe(true)

    // NAV Attributes
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('aria-disabled')).toBe('true')

    // UL Classes
    expect($ul.classes()).toContain('pagination')
    expect($ul.classes()).toContain('b-pagination')

    // UL Attributes
    expect($ul.attributes('role')).not.toBe('menubar')
    expect($ul.attributes('aria-disabled')).toBe('true')

    // LI classes
    expect(wrapper.findAll('li').length).toBe(5)
    expect(wrapper.findAll('li.page-item').length).toBe(5)
    expect(wrapper.findAll('li.disabled').length).toBe(5)

    // LI Inner should be span elements
    expect(wrapper.findAll('li > span').length).toBe(5)
    expect(wrapper.findAll('li > span.page-link').length).toBe(5)
    expect(wrapper.findAll('li > span[aria-disabled="true"').length).toBe(5)

    wrapper.destroy()
  })

  it('reacts to changes in number-of-pages', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 3,
        value: 2,
        limit: 10
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    let $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(7)

    await wrapper.setProps({
      numberOfPages: 5
    })

    await waitNT(wrapper.vm)
    $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    wrapper.destroy()
  })

  it('renders with correct HREF when base-url specified', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        baseUrl: '/foo/'
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is '/', and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/foo/1')
    expect($links.at(1).attributes('href')).toBe('/foo/2')
    expect($links.at(2).attributes('href')).toBe('/foo/1')
    expect($links.at(3).attributes('href')).toBe('/foo/2')
    expect($links.at(4).attributes('href')).toBe('/foo/3')
    expect($links.at(5).attributes('href')).toBe('/foo/4')
    expect($links.at(6).attributes('href')).toBe('/foo/5')
    expect($links.at(7).attributes('href')).toBe('/foo/4')
    expect($links.at(8).attributes('href')).toBe('/foo/5')

    wrapper.destroy()
  })

  it('renders with correct HREF when link-gen function provided', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        linkGen: page => `?${page}`
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is '/', and link will be the page number
    expect($links.at(0).attributes('href')).toBe('?1')
    expect($links.at(1).attributes('href')).toBe('?2')
    expect($links.at(2).attributes('href')).toBe('?1')
    expect($links.at(3).attributes('href')).toBe('?2')
    expect($links.at(4).attributes('href')).toBe('?3')
    expect($links.at(5).attributes('href')).toBe('?4')
    expect($links.at(6).attributes('href')).toBe('?5')
    expect($links.at(7).attributes('href')).toBe('?4')
    expect($links.at(8).attributes('href')).toBe('?5')

    wrapper.destroy()
  })

  it('renders with correct HREF when link-gen function returns object', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        linkGen: page => ({ path: `/baz?${page}` })
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is '/', and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/baz?1')
    expect($links.at(1).attributes('href')).toBe('/baz?2')
    expect($links.at(2).attributes('href')).toBe('/baz?1')
    expect($links.at(3).attributes('href')).toBe('/baz?2')
    expect($links.at(4).attributes('href')).toBe('/baz?3')
    expect($links.at(5).attributes('href')).toBe('/baz?4')
    expect($links.at(6).attributes('href')).toBe('/baz?5')
    expect($links.at(7).attributes('href')).toBe('/baz?4')
    expect($links.at(8).attributes('href')).toBe('/baz?5')

    wrapper.destroy()
  })

  it('renders with correct page button text when page-gen function provided', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        numberOfPages: 5,
        value: 3,
        limit: 10,
        pageGen: page => `Page ${page}`
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    expect($links.at(2).text()).toBe('Page 1')
    expect($links.at(3).text()).toBe('Page 2')
    expect($links.at(4).text()).toBe('Page 3')
    expect($links.at(5).text()).toBe('Page 4')
    expect($links.at(6).text()).toBe('Page 5')

    wrapper.destroy()
  })

  it('renders with correct HREF when array of links set via pages prop', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        value: 3,
        limit: 10,
        pages: ['/baz?1', '/baz?2', '/baz?3', '/baz?4', '/baz?5']
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is '/', and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/baz?1')
    expect($links.at(1).attributes('href')).toBe('/baz?2')
    expect($links.at(2).attributes('href')).toBe('/baz?1')
    expect($links.at(3).attributes('href')).toBe('/baz?2')
    expect($links.at(4).attributes('href')).toBe('/baz?3')
    expect($links.at(5).attributes('href')).toBe('/baz?4')
    expect($links.at(6).attributes('href')).toBe('/baz?5')
    expect($links.at(7).attributes('href')).toBe('/baz?4')
    expect($links.at(8).attributes('href')).toBe('/baz?5')

    // Page buttons have correct content
    expect($links.at(2).text()).toBe('1')
    expect($links.at(3).text()).toBe('2')
    expect($links.at(4).text()).toBe('3')
    expect($links.at(5).text()).toBe('4')
    expect($links.at(6).text()).toBe('5')

    wrapper.destroy()
  })

  it('renders with correct HREF when array of links and text set via pages prop', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        value: 3,
        limit: 10,
        pages: [
          { link: '/baz?1', text: 'one' },
          { link: '/baz?2', text: 'two' },
          { link: '/baz?3', text: 'three' },
          { link: '/baz?4', text: 'four' },
          { link: '/baz?5', text: 'five' }
        ]
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    const $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(9)

    // Default base URL is '/', and link will be the page number
    expect($links.at(0).attributes('href')).toBe('/baz?1')
    expect($links.at(1).attributes('href')).toBe('/baz?2')
    expect($links.at(2).attributes('href')).toBe('/baz?1')
    expect($links.at(3).attributes('href')).toBe('/baz?2')
    expect($links.at(4).attributes('href')).toBe('/baz?3')
    expect($links.at(5).attributes('href')).toBe('/baz?4')
    expect($links.at(6).attributes('href')).toBe('/baz?5')
    expect($links.at(7).attributes('href')).toBe('/baz?4')
    expect($links.at(8).attributes('href')).toBe('/baz?5')

    // Page buttons have correct content
    expect($links.at(2).text()).toBe('one')
    expect($links.at(3).text()).toBe('two')
    expect($links.at(4).text()).toBe('three')
    expect($links.at(5).text()).toBe('four')
    expect($links.at(6).text()).toBe('five')

    wrapper.destroy()
  })

  it('reacts to changes in pages array length', async () => {
    const wrapper = mount(BPaginationNav, {
      propsData: {
        value: 2,
        limit: 10,
        pages: ['/baz?1', '/baz?2', '/baz?3']
      }
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('NAV')
    let $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(7)

    expect($links.at(0).attributes('href')).toBe('/baz?1')
    expect($links.at(1).attributes('href')).toBe('/baz?1')
    expect($links.at(2).attributes('href')).toBe('/baz?1')
    expect($links.at(3).attributes('href')).toBe('/baz?2')
    expect($links.at(4).attributes('href')).toBe('/baz?3')
    expect($links.at(5).attributes('href')).toBe('/baz?3')
    expect($links.at(6).attributes('href')).toBe('/baz?3')

    // Add extra page
    await wrapper.setProps({
      pages: ['/baz?1', '/baz?2', '/baz?3', '/baz?4']
    })
    await waitNT(wrapper.vm)

    $links = wrapper.findAll('a.page-link')
    expect($links.length).toBe(8)

    expect($links.at(0).attributes('href')).toBe('/baz?1')
    expect($links.at(1).attributes('href')).toBe('/baz?1')
    expect($links.at(2).attributes('href')).toBe('/baz?1')
    expect($links.at(3).attributes('href')).toBe('/baz?2')
    expect($links.at(4).attributes('href')).toBe('/baz?3')
    expect($links.at(5).attributes('href')).toBe('/baz?4')
    expect($links.at(6).attributes('href')).toBe('/baz?3')
    expect($links.at(7).attributes('href')).toBe('/baz?4')

    wrapper.destroy()
  })

  it('clicking buttons updates the v-model', async () => {
    const App = {
      methods: {
        onPageClick(bvEvent, page) {
          // Prevent 3rd page from being selected
          if (page === 3) {
            bvEvent.preventDefault()
          }
        }
      },
      render(h) {
        return h(BPaginationNav, {
          props: {
            baseUrl: '#', // Needed to prevent JSDOM errors
            numberOfPages: 5,
            value: 1,
            limit: 10
          },
          on: { 'page-click': this.onPageClick }
        })
      }
    }

    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    const paginationNav = wrapper.findComponent(BPaginationNav)
    expect(paginationNav).toBeDefined()
    expect(paginationNav.element.tagName).toBe('NAV')

    // Grab the page links
    const lis = paginationNav.findAll('li')
    expect(lis.length).toBe(9)

    expect(paginationNav.vm.computedCurrentPage).toBe(1)
    expect(paginationNav.emitted('input')).toBeUndefined()
    expect(paginationNav.emitted('change')).toBeUndefined()
    expect(paginationNav.emitted('page-click')).toBeUndefined()

    // Click on current (1st) page link (does nothing)
    await lis
      .at(2)
      .find('a')
      .trigger('click')
    await waitRAF()
    expect(paginationNav.vm.computedCurrentPage).toBe(1)
    expect(paginationNav.emitted('input')).toBeUndefined()
    expect(paginationNav.emitted('change')).toBeUndefined()
    expect(paginationNav.emitted('page-click')).toBeUndefined()

    // Click on 2nd page link
    await lis
      .at(3)
      .find('a')
      .trigger('click')
    await waitRAF()
    expect(paginationNav.vm.computedCurrentPage).toBe(2)
    expect(paginationNav.emitted('input')).toBeDefined()
    expect(paginationNav.emitted('change')).toBeDefined()
    expect(paginationNav.emitted('page-click')).toBeDefined()
    expect(paginationNav.emitted('input')[0][0]).toBe(2)
    expect(paginationNav.emitted('change')[0][0]).toBe(2)
    expect(paginationNav.emitted('page-click').length).toBe(1)

    // Click goto last page link
    await lis
      .at(8)
      .find('a')
      .trigger('click')
    await waitRAF()
    expect(paginationNav.vm.computedCurrentPage).toBe(5)
    expect(paginationNav.emitted('input')[1][0]).toBe(5)
    expect(paginationNav.emitted('change')[1][0]).toBe(5)
    expect(paginationNav.emitted('page-click').length).toBe(2)

    // Click prev page link
    await lis
      .at(1)
      .find('a')
      .trigger('click')
    await waitRAF()
    expect(paginationNav.vm.computedCurrentPage).toBe(4)
    expect(paginationNav.emitted('input')[2][0]).toBe(4)
    expect(paginationNav.emitted('change')[2][0]).toBe(4)
    expect(paginationNav.emitted('page-click').length).toBe(3)

    // Click on 3rd page link (prevented)
    await lis
      .at(4)
      .find('a')
      .trigger('click')
    await waitRAF()
    expect(paginationNav.vm.computedCurrentPage).toBe(4)
    expect(paginationNav.emitted('input').length).toBe(3)
    expect(paginationNav.emitted('change').length).toBe(3)
    expect(paginationNav.emitted('page-click').length).toBe(4)

    wrapper.destroy()
  })

  describe('auto-detect page', () => {
    // Note: JSDOM only works with hash URL updates out of the box

    beforeEach(() => {
      // Make sure theJSDOM is at '/', as JSDOM instances for each test!
      window.history.pushState({}, '', '/')
    })

    it('detects current page without $router', async () => {
      const wrapper = mount(BPaginationNav, {
        propsData: {
          numberOfPages: 3,
          value: null,
          linkGen: page => (page === 2 ? '/' : `/#${page}`)
        }
      })
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      expect(wrapper.vm.$router).toBeUndefined()
      expect(wrapper.vm.$route).toBeUndefined()

      expect(wrapper.element.tagName).toBe('NAV')
      const $ul = wrapper.find('ul.pagination')
      expect($ul.exists()).toBe(true)

      // Emitted current page (2)
      expect(wrapper.emitted('input')).toBeDefined()
      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.emitted('input')[0][0]).toBe(2) // Page 2, URL = ''

      wrapper.destroy()
    })

    it('works with $router to detect path and linkGen returns location object', async () => {
      const App = {
        components: { BPaginationNav },
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
            <b-pagination-nav :number-of-pages="3" :link-gen="linkGen"></b-pagination-nav>
            <router-view></router-view>
          </div>
        `
      }
      // Our router view component
      const FooRoute = {
        render(h) {
          return h('div', { class: 'foo-content' }, ['stub'])
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
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // The pagination-nav component should exist
      expect(wrapper.findComponent(BPaginationNav).exists()).toBe(true)
      // And should be on page 2
      expect(wrapper.findComponent(BPaginationNav).vm.currentPage).toBe(2)

      // Push router to a new page
      wrapper.vm.$router.push('/3')

      // Wait for the guessCurrentPage to complete
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // The pagination-nav component should exist
      expect(wrapper.findComponent(BPaginationNav).exists()).toBe(true)
      // And should be on page 3
      expect(wrapper.findComponent(BPaginationNav).vm.currentPage).toBe(3)

      wrapper.destroy()
    })

    it('works with $router to detect path and use-router set and linkGen returns string', async () => {
      const App = {
        components: { BPaginationNav },
        methods: {
          linkGen(page) {
            // We make page #2 "home" for testing
            // We return a to prop to auto trigger use of $router
            // if using strings, we would need to set use-router=true
            return page === 2 ? '/' : `/${page}`
          }
        },
        template: `
          <div>
            <b-pagination-nav :number-of-pages="3" :link-gen="linkGen" use-router></b-pagination-nav>
            <router-view></router-view>
          </div>
        `
      }
      // Our router view component
      const FooRoute = {
        render(h) {
          return h('div', { class: 'foo-content' }, ['stub'])
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
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // The <pagination-nav> component should exist
      expect(wrapper.findComponent(BPaginationNav).exists()).toBe(true)
      // And should be on page 2
      expect(wrapper.findComponent(BPaginationNav).vm.currentPage).toBe(2)

      // Push router to a new page
      wrapper.vm.$router.push('/3')

      // Wait for the guessCurrentPage to complete
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // The pagination-nav component should exist
      expect(wrapper.findComponent(BPaginationNav).exists()).toBe(true)
      // And should be on page 3
      expect(wrapper.findComponent(BPaginationNav).vm.currentPage).toBe(3)

      wrapper.destroy()
    })
  })
})
