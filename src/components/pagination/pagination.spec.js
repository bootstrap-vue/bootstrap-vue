import Pagination from './pagination'
import { mount } from '@vue/test-utils'

describe('pagination', async () => {
  it('renders with correct basic structure for root element', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).not.toContain('pagination-sm')
    expect(wrapper.classes()).not.toContain('pagination-lg')
    expect(wrapper.classes()).not.toContain('justify-content-center')
    expect(wrapper.classes()).not.toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('renders with correct basic inner structure', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    const lis = wrapper.findAll('li')
    expect(lis).toBeDefined()
    expect(lis.length).toBe(5)

    lis.wrappers.forEach((li, index) => {
      expect(li.classes()).toContain('page-item')
      expect(li.attributes('role')).toContain('none')
      expect(li.attributes('role')).toContain('presentation')
      const pageLink = li.find('.page-link')
      expect(pageLink).toBeDefined()
      if (index === 2) {
        expect(li.classes()).toContain('active')
        expect(li.classes()).not.toContain('disabled')
        expect(pageLink.is('a')).toBe(true)
      } else {
        expect(li.classes()).not.toContain('active')
        expect(li.classes()).toContain('disabled')
        expect(pageLink.is('span')).toBe(true)
      }
    })

    const first = lis.at(0)
    const prev = lis.at(1)
    const page = lis.at(2)
    const next = lis.at(3)
    const last = lis.at(4)

    // Button content
    expect(first.find('.page-link').text()).toEqual('«')
    expect(prev.find('.page-link').text()).toEqual('‹')
    expect(page.find('.page-link').text()).toEqual('1')
    expect(next.find('.page-link').text()).toEqual('›')
    expect(last.find('.page-link').text()).toEqual('»')

    // Page button attrs
    expect(page.find('.page-link').attributes('href')).toEqual('#')
    expect(page.find('.page-link').attributes('role')).toEqual('menuitemradio')
    expect(page.find('.page-link').attributes('aria-checked')).toEqual('true')
    expect(page.find('.page-link').attributes('aria-posinset')).toEqual('1')
    expect(page.find('.page-link').attributes('aria-setsize')).toEqual('1')
    expect(page.find('.page-link').attributes('tabindex')).toEqual('0')
    expect(page.find('.page-link').attributes('aria-label')).toEqual('Go to page 1')
    expect(page.find('.page-link').attributes('target')).toEqual('_self')
  })

  it('has class "pagination-sm" when prop size="sm"', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        size: 'sm',
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).toContain('pagination-sm')
    expect(wrapper.classes()).not.toContain('pagination-lg')
    expect(wrapper.classes()).not.toContain('justify-content-center')
    expect(wrapper.classes()).not.toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('has class "pagination-lg" when prop size="lg"', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        size: 'lg',
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).not.toContain('pagination-sm')
    expect(wrapper.classes()).toContain('pagination-lg')
    expect(wrapper.classes()).not.toContain('justify-content-center')
    expect(wrapper.classes()).not.toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('has class "pagination-foo" when prop size="foo"', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        size: 'foo',
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination-foo')
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).not.toContain('pagination-sm')
    expect(wrapper.classes()).not.toContain('pagination-lg')
    expect(wrapper.classes()).not.toContain('justify-content-center')
    expect(wrapper.classes()).not.toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('has class "justify-content-center" when prop align="center"', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        align: 'center',
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).not.toContain('pagination-sm')
    expect(wrapper.classes()).not.toContain('pagination-lg')
    expect(wrapper.classes()).toContain('justify-content-center')
    expect(wrapper.classes()).not.toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('has class "justify-content-end" when prop align="right"', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        align: 'right',
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).not.toContain('pagination-sm')
    expect(wrapper.classes()).not.toContain('pagination-lg')
    expect(wrapper.classes()).not.toContain('justify-content-center')
    expect(wrapper.classes()).toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('has class "justify-content-end" when prop align="end"', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        align: 'end',
        totlaRows: 1,
        perPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    // Classes
    expect(wrapper.classes()).toContain('pagination')
    expect(wrapper.classes()).toContain('b-pagination')
    expect(wrapper.classes()).not.toContain('pagination-sm')
    expect(wrapper.classes()).not.toContain('pagination-lg')
    expect(wrapper.classes()).not.toContain('justify-content-center')
    expect(wrapper.classes()).toContain('justify-content-end')
    // Attributes
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('aria-label')).toBe('Pagination')
  })

  it('renders classes d-none and d-sm-flex when more than 3 pages', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totlaRows: 70,
        perPage: 10,
        limit: 7,
        currentPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    const lis = wrapper.findAll('li')
    expect(lis).toBeDefined()
    // including bookend buttons
    expect(lis.length).toBe(11)

    // should have the last 4 page buttons with the display classes
    // When currentPage = 0
    expect(wrapper.vm.currentPage).toBe(1)
    lis.filter(w => w.find('a'))
      .wrappers.forEach((li, index) => {
        expect(li.classes()).toContain('page-item')
        expect(li.attributes('role')).toContain('none')
        expect(li.attributes('role')).toContain('presentation')
        if (index < 3) {
          expect(li.classes()).not.toContain('d-none')
          expect(li.classes()).not.toContain('d-sm-flex')
        } else {
          expect(li.classes()).toContain('d-none')
          expect(li.classes()).toContain('d-sm-flex')
        }
      })

    // should have the first and last 2 pages buttons with the display classes
    // When currentPage = 4
    wraper.setProps({
      value: '4'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(4)
    lis.filter(w => w.find('a'))
      .wrappers.forEach((li, index) => {
        expect(li.classes()).toContain('page-item')
        expect(li.attributes('role')).toContain('none')
        expect(li.attributes('role')).toContain('presentation')
        if (index > 1 && index < 6) {
          expect(li.classes()).not.toContain('d-none')
          expect(li.classes()).not.toContain('d-sm-flex')
        } else {
          expect(li.classes()).toContain('d-none')
          expect(li.classes()).toContain('d-sm-flex')
        }
      })
  })
})
