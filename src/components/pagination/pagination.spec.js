import Pagination from './pagination'
import { mount } from '@vue/test-utils'

describe('pagination', async () => {
  it('renders with correct basic structure for root element', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totlaRows: 1,
        perPage: 1,
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
      props: {
        totlaRows: 1,
        perPage: 1,
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    const lis = wrapper.findAll('li')
    expect(lis).toBeDefined()
    expect(lis.length).toBe(5)
    
    lis.forEach((li, index) => {
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
})
