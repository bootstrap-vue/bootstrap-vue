import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BCalendar } from './calendar'
import { formatYMD } from '../../utils/date'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('calendar', () => {
  it('has expected base structure', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-calendar')
    expect(wrapper.find('.b-calendar>div').exists()).toBe(true)
    expect(wrapper.find('.b-calendar>div').attributes('role')).toEqual('group')
    expect(wrapper.find('.b-calendar>div').attributes('dir')).toBeDefined()
    expect(wrapper.find('.b-calendar>div').attributes('lang')).toBeDefined()
    const $header = wrapper.find('.b-calendar>div>header')
    expect($header.exists()).toBe(true)
    expect($header.find('output').exists()).toBe(true)
    expect($header.find('output').attributes('role')).toEqual('status')
    expect($header.find('output').attributes('for')).toBeDefined()
    expect($header.find('output').attributes('data-selected')).toEqual('')
    expect($header.find('output').attributes('aria-live')).toEqual('polite')
    expect($header.find('output').attributes('aria-atomic')).toEqual('true')
    expect(wrapper.find('.b-calendar>div>div.b-calendar-nav').exists()).toBe(true)
    expect(wrapper.find('.b-calendar>div>div.b-calendar-nav').attributes('role')).toEqual('group')
    expect(wrapper.findAll('.b-calendar>div>div.b-calendar-nav>button').length).toBe(5)
    expect(wrapper.find('.b-calendar>div>div[role="application"]').exists()).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.destroy()
  })

  it('has expected structure when value is set', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $header = wrapper.find('.b-calendar>div>header')
    expect($header.exists()).toBe(true)
    expect($header.find('output').exists()).toBe(true)
    expect($header.find('output').attributes('data-selected')).toEqual('2020-02-15')

    wrapper.destroy()
  })

  it('reacts to changes in value', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-01-01' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.selectedYMD).toBe('2020-01-01')

    wrapper.setProps({
      value: '2020-01-15'
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.selectedYMD).toBe('2020-01-15')

    wrapper.destroy()
  })

  it('clicking a date selects date', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-01-01' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $cell = wrapper.find('[data-date="2020-01-25"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('aria-selected')).not.toBeDefined()
    expect($cell.attributes('id')).toBeDefined()
    const $btn = $cell.find('.btn')
    expect($btn.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).not.toEqual($cell.attributes('id'))

    $btn.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($cell.attributes('aria-selected')).toBeDefined()
    expect($cell.attributes('aria-selected')).toEqual('true')
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    wrapper.destroy()
  })

  it('date navigation buttons work', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.attributes('data-month')).toBe('2020-02')

    const $navBtns = wrapper.findAll('.b-calendar-nav button')
    expect($navBtns.length).toBe(5)

    // Prev Month
    $navBtns.at(1).trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($grid.attributes('data-month')).toBe('2020-01')

    // Next Month
    $navBtns.at(3).trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($grid.attributes('data-month')).toBe('2020-02')

    // Prev Year
    $navBtns.at(0).trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($grid.attributes('data-month')).toBe('2019-02')

    // Next Year
    $navBtns.at(4).trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($grid.attributes('data-month')).toBe('2020-02')

    // Current Month
    // Handle the rare case this test is run right at midnight where
    // the current month rolled over at midnight when clicked
    const thisMonth1 = formatYMD(new Date()).slice(0, -3)
    $navBtns.at(2).trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    const thisMonth2 = formatYMD(new Date()).slice(0, -3)
    const thisMonth = $grid.attributes('data-month')
    expect(thisMonth === thisMonth1 || thisMonth === thisMonth2).toBe(true)

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.is('div')).toBe(true)

    expect(document.activeElement).not.toBe($grid.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($grid.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).not.toBe($grid.element)

    wrapper.destroy()
  })

  it('keyboard navigation works', async () => {
    const wrapper = mount(BCalendar, {
      attachToDocument: true,
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.attributes('aria-activedescendant')).toBeDefined()

    let $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Left
    $grid.trigger('keydown.left')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-02-14"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Right
    $grid.trigger('keydown.right')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Up
    $grid.trigger('keydown.up')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-02-08"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Down
    $grid.trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // PageUp
    $grid.trigger('keydown.pageup')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-01-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // PageDown
    $grid.trigger('keydown.pagedown')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Alt + PageUp
    $grid.trigger('keydown.pageup', { altKey: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2019-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // End (selected date)
    $grid.trigger('keydown.end')
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Alt + PageDown
    $grid.trigger('keydown.pagedown', { altKey: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    $cell = wrapper.find('[data-date="2021-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Home (today's date)
    $grid.trigger('keydown.home')
    await waitNT(wrapper.vm)
    await waitRAF()
    const todayID = $grid.attributes('aria-activedescendant')
    expect(todayID).toBeDefined()
    $cell = $grid.find(`#${todayID}`)
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('aria-label')).toBeDefined()
    expect($cell.attributes('aria-label')).toContain('(Today)')

    wrapper.destroy()
  })
})
