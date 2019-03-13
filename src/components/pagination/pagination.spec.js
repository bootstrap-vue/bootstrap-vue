import Pagination from './pagination'
import { isVisible, getBCR, contains } from '../../utils/dom'
import { mount } from '@vue/test-utils'

describe('pagination', () => {
  it('renders with correct basic structure for root element', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalRows: 1,
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
        totalRows: 1,
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
        totalRows: 1,
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
        totalRows: 1,
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
        totalRows: 1,
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
        totalRows: 1,
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
        totalRows: 1,
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
        totalRows: 1,
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

  it('has atribute aria-controls on page links when prop aria-controls is set', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        hideGotoEndButtons: true,
        hideEllipsis: true,
        totalRows: 3,
        perPage: 1,
        value: 1,
        ariaControls: 'foo'
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.findAll('li').length).toBe(5)
    expect(wrapper.findAll('a.page-link').length).toBe(4)
    expect(wrapper.findAll('a.page-link').is('[aria-controls="foo"]')).toBe(true)

    wrapper.setProps({
      ariaControls: null
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('li').length).toBe(5)
    expect(wrapper.findAll('a.page-link').length).toBe(4)
    expect(wrapper.findAll('a.page-link').is('[aria-controls]')).toBe(false)
  })

  it('has atribute aria-label on page links', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        hideGotoEndButtons: true,
        hideEllipsis: true,
        totalRows: 3,
        perPage: 1,
        value: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.findAll('li').length).toBe(5)
    expect(wrapper.findAll('a').length).toBe(4)
    expect(
      wrapper
        .findAll('a')
        .at(0)
        .attributes('aria-label')
    ).toBe('Go to page 1')
    expect(
      wrapper
        .findAll('a')
        .at(1)
        .attributes('aria-label')
    ).toBe('Go to page 2')
    expect(
      wrapper
        .findAll('a')
        .at(2)
        .attributes('aria-label')
    ).toBe('Go to page 3')
    expect(
      wrapper
        .findAll('a')
        .at(3)
        .attributes('aria-label')
    ).toBe('Go to next page')
  })

  it('has all links disabled when prop disabled set', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalRows: 3,
        perPage: 1,
        value: 1,
        disabled: true
      }
    })
    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.findAll('li').length).toBe(7)
    expect(wrapper.findAll('.page-item').length).toBe(7)
    expect(wrapper.findAll('.page-item').is('li.page-item.disabled')).toBe(true)
    expect(wrapper.findAll('.page-link').is('span.page-link')).toBe(true)
    expect(
      wrapper
        .findAll('.page-link')
        .at(2)
        .attributes('aria-disabled')
    ).toBe('true')
    expect(
      wrapper
        .findAll('.page-link')
        .at(3)
        .attributes('aria-disabled')
    ).toBe('true')
    expect(
      wrapper
        .findAll('.page-link')
        .at(4)
        .attributes('aria-disabled')
    ).toBe('true')
  })

  it('renders classes d-none and d-sm-flex when more than 3 pages', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalRows: 70,
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
    // Grab the page buttons (includes bookends)
    wrapper.findAll('li').wrappers.forEach((li, index) => {
      expect(li.classes()).toContain('page-item')
      expect(li.attributes('role')).toContain('none')
      expect(li.attributes('role')).toContain('presentation')
      if (index === 0) {
        // First button
        expect(li.classes()).toContain('disabled')
      } else if (index === 1) {
        // Prev button
        expect(li.classes()).toContain('disabled')
      } else if (index === 9) {
        // Next buton
        expect(li.classes()).not.toContain('disabled')
      } else if (index === 10) {
        // Last button
        expect(li.classes()).not.toContain('disabled')
      } else {
        // Page number buttons
        if (index === 2) {
          expect(li.classes()).toContain('active')
        } else {
          expect(li.classes()).not.toContain('active')
        }
        if (index < 5) {
          expect(li.classes()).not.toContain('d-none')
          expect(li.classes()).not.toContain('d-sm-flex')
        } else if (index > 4) {
          expect(li.classes()).toContain('d-none')
          expect(li.classes()).toContain('d-sm-flex')
        }
      }
    })

    // should have the first and last 2 pages buttons with the display classes
    // When currentPage = 4
    wrapper.setProps({
      value: '4'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(4)
    // Grab the page buttons (including bookends)
    wrapper.findAll('li').wrappers.forEach((li, index) => {
      expect(li.classes()).toContain('page-item')
      expect(li.attributes('role')).toContain('none')
      expect(li.attributes('role')).toContain('presentation')
      if (index === 0) {
        // First button
        expect(li.classes()).not.toContain('disabled')
      } else if (index === 1) {
        // Prev button
        expect(li.classes()).not.toContain('disabled')
      } else if (index === 9) {
        // Next buton
        expect(li.classes()).not.toContain('disabled')
      } else if (index === 10) {
        // Last button
        expect(li.classes()).not.toContain('disabled')
      } else {
        // Page number buttons
        if (index === 5) {
          expect(li.classes()).toContain('active')
        } else {
          expect(li.classes()).not.toContain('active')
        }
        if (index > 3 && index < 7) {
          expect(li.classes()).not.toContain('d-none')
          expect(li.classes()).not.toContain('d-sm-flex')
        } else if (index < 4 || index > 6) {
          expect(li.classes()).toContain('d-none')
          expect(li.classes()).toContain('d-sm-flex')
        }
      }
    })

    // should have the first 4 pages buttons with the display classes
    // When currentPage = 4
    wrapper.setProps({
      value: '7'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(7)
    // Grab the page buttons (including bookends)
    wrapper.findAll('li').wrappers.forEach((li, index) => {
      expect(li.classes()).toContain('page-item')
      expect(li.attributes('role')).toContain('none')
      expect(li.attributes('role')).toContain('presentation')
      // Page number buttons
      if (index >= 2 && index <= 5) {
        // pages 1 to 4
        expect(li.classes()).toContain('d-none')
        expect(li.classes()).toContain('d-sm-flex')
      } else if (index >= 6 && index <= 8) {
        // pages 5 to 7
        expect(li.classes()).not.toContain('d-none')
        expect(li.classes()).not.toContain('d-sm-flex')
      }
    })
  })

  it('places ellipsis in correct places', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalRows: 70,
        perPage: 10,
        limit: 5,
        currentPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)

    // Should have ellipsis in place of last button
    // When currentPage = 0
    expect(wrapper.vm.currentPage).toBe(1)
    // Grab the page buttons
    let lis = wrapper.findAll('li')
    expect(lis.length).toBe(9)
    expect(lis.at(2).attributes('role')).not.toBe('separator')
    expect(lis.at(6).attributes('role')).toBe('separator')

    // should have both ellipsis showing
    // When currentPage = 4
    wrapper.setProps({
      value: '4'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(4)
    lis = wrapper.findAll('li')
    expect(lis.length).toBe(9)
    expect(lis.at(2).attributes('role')).toBe('separator')
    expect(lis.at(6).attributes('role')).toBe('separator')

    // should have first ellipsis showing
    // When currentPage = 5
    wrapper.setProps({
      value: 5
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(5)
    lis = wrapper.findAll('li')
    expect(lis.length).toBe(9)
    expect(lis.at(2).attributes('role')).toBe('separator')
    expect(lis.at(6).attributes('role')).not.toBe('separator')
  })

  it('clicking buttons updates the v-model', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalRows: 3,
        perPage: 1,
        currentPage: 1
      }
    })
    expect(wrapper.is('ul')).toBe(true)

    // Grab the page buttons
    let lis = wrapper.findAll('li')
    expect(lis.length).toBe(7)

    expect(wrapper.vm.currentPage).toBe(1)
    expect(wrapper.emitted('input')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()

    // click on 2nd button
    wrapper
      .findAll('li')
      .at(3)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(2)
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('input')[0][0]).toBe(2)
    expect(wrapper.emitted('change')[0][0]).toBe(2)

    // click goto last button
    wrapper
      .findAll('li')
      .at(6)
      .find('a')
      .trigger('keydown.space') /* generates a click event */
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(3)
    expect(wrapper.emitted('input')[1][0]).toBe(3)
    expect(wrapper.emitted('change')[1][0]).toBe(3)

    // click prev button
    wrapper
      .findAll('li')
      .at(1)
      .find('a')
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(2)
    expect(wrapper.emitted('input')[2][0]).toBe(2)
    expect(wrapper.emitted('change')[2][0]).toBe(2)
  })

  it('changing the limit changes the nuber of buttons shown', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalRows: 9,
        perPage: 1,
        currentPage: 5,
        limit: 10
      }
    })
    expect(wrapper.is('ul')).toBe(true)

    // Should be 13 <LI> total
    expect(wrapper.findAll('li').length).toBe(13)

    wrapper.setProps({
      limit: 4
    })
    await wrapper.vm.$nextTick()

    // Should be 8 <LI> total
    expect(wrapper.findAll('li').length).toBe(8)
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('pagination keyboard navigation', () => {
    beforeEach(() => {
      // Mock getBCR so that the isVisible(el) test returns true.
      // In our test below, all pagination buttons would normally be visible.
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
          width: 24,
          height: 24,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      })
    })

    it('keyboard navigation works', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          totalRows: 3,
          perPage: 1,
          value: 2,
          limit: 3
        },
        attachToDocument: true
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.is('ul')).toBe(true)
      // Grab the button links (2 bookends + 3 pages + 2 bookends)
      let links = wrapper.findAll('a.page-link')
      expect(links.length).toBe(7)

      // Sanity check for getBCR override
      expect(wrapper.element.getBoundingClientRect().width).toBe(24)
      expect(getBCR(links.at(3).element).width).toBe(24)
      expect(contains(document.body, links.at(3).element)).toBe(true)
      expect(isVisible(links.at(3).element)).toBe(true)

      // Focus the active button
      links.at(3).element.focus()
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(3).element)

      // LEFT
      // links.at(3).trigger('keydown.left')
      wrapper.trigger('keydown.left')
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(2).element)

      // RIGHT
      links.at(2).trigger('keydown.right')
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(3).element)

      // SHIFT-RIGHT
      links.at(2).trigger('keydown.right', { shiftKey: true })
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(6).element)

      // SHIFT-LEFT
      links.at(6).trigger('keydown.left', { shiftKey: true })
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(0).element)
    })

    it('internal method focusCurrent() works', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          totalRows: 3,
          perPage: 1,
          value: 2,
          limit: 3
        },
        attachToDocument: true
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.is('ul')).toBe(true)
      // Grab the button links (2 bookends + 3 pages + 2 bookends)
      let links = wrapper.findAll('a.page-link')
      expect(links.length).toBe(7)

      // Focus the last button
      links.at(6).element.focus()
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(6).element)

      wrapper.vm.focusCurrent()
      await wrapper.vm.$nextTick()
      expect(document.activeElement).toEqual(links.at(3).element)
    })

    it('Current page button is focused when button display changes', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          totalRows: 10,
          perPage: 1,
          value: 1,
          limit: 5
        },
        attachToDocument: true
      })
      let links

      await wrapper.vm.$nextTick()
      expect(wrapper.is('ul')).toBe(true)
      // Grab the button links (2 disabled bookends + 4 pages + (-ellipsis) + 2 bookends)
      links = wrapper.findAll('a.page-link')
      expect(links.length).toBe(6)

      // Click on hte 4th button (page 4, index 3)
      links.at(3).element.click()
      await wrapper.vm.$nextTick()
      // links re-rendered with first bookends enabled and an ellipsis
      links = wrapper.findAll('a.page-link')
      // HTe 4th link should be page 4, and retain focus
      expect(document.activeElement).toEqual(links.at(3).element)
    })
  })
})
