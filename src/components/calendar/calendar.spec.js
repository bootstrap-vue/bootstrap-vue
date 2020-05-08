import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BCalendar } from './calendar'
import { formatYMD } from '../../utils/date'

//  Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('calendar', () => {
  it('has expected base structure', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer()
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
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
      attachTo: createContainer(),
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
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
      attachTo: createContainer(),
      propsData: {
        value: '2020-01-01' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.selectedYMD).toBe('2020-01-01')

    await wrapper.setProps({
      value: '2020-01-15'
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.selectedYMD).toBe('2020-01-15')

    wrapper.destroy()
  })

  it('clicking a date selects date', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-01-01' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
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

    await $btn.trigger('click')

    expect($cell.attributes('aria-selected')).toBeDefined()
    expect($cell.attributes('aria-selected')).toEqual('true')
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    wrapper.destroy()
  })

  it('date navigation buttons work', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        showDecadeNav: true,
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.attributes('data-month')).toBe('2020-02')

    const $navBtns = wrapper.findAll('.b-calendar-nav button')
    expect($navBtns.length).toBe(7)

    // Prev Month
    await $navBtns.at(2).trigger('click')
    expect($grid.attributes('data-month')).toBe('2020-01')

    // Next Month
    await $navBtns.at(4).trigger('click')
    expect($grid.attributes('data-month')).toBe('2020-02')

    // Prev Year
    await $navBtns.at(1).trigger('click')
    expect($grid.attributes('data-month')).toBe('2019-02')

    // Next Year
    await $navBtns.at(5).trigger('click')
    expect($grid.attributes('data-month')).toBe('2020-02')

    // Prev Decade
    await $navBtns.at(0).trigger('click')
    expect($grid.attributes('data-month')).toBe('2010-02')

    // Next Decade
    await $navBtns.at(6).trigger('click')
    expect($grid.attributes('data-month')).toBe('2020-02')

    // Current Month
    // Handle the rare case this test is run right at midnight where
    // the current month rolled over at midnight when clicked
    const thisMonth1 = formatYMD(new Date()).slice(0, -3)
    await $navBtns.at(3).trigger('click')
    const thisMonth2 = formatYMD(new Date()).slice(0, -3)
    const thisMonth = $grid.attributes('data-month')
    expect(thisMonth === thisMonth1 || thisMonth === thisMonth2).toBe(true)

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.element.tagName).toBe('DIV')

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

  it('clicking output header focuses grid', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)
    expect($grid.element.tagName).toBe('DIV')

    expect(document.activeElement).not.toBe($grid.element)

    const $output = wrapper.find('header > output')
    expect($output.exists()).toBe(true)

    await $output.trigger('click')
    expect(document.activeElement).toBe($grid.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).not.toBe($grid.element)

    await $output.trigger('focus')
    expect(document.activeElement).toBe($grid.element)

    wrapper.destroy()
  })

  it('keyboard navigation works', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-02-15' // Leap year
      }
    })

    expect(wrapper.vm).toBeDefined()
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
    await $grid.trigger('keydown.left')
    $cell = wrapper.find('[data-date="2020-02-14"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Right
    await $grid.trigger('keydown.right')
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Up
    await $grid.trigger('keydown.up')
    $cell = wrapper.find('[data-date="2020-02-08"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Down
    await $grid.trigger('keydown.down')
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // PageUp
    await $grid.trigger('keydown.pageup')
    $cell = wrapper.find('[data-date="2020-01-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // PageDown
    await $grid.trigger('keydown.pagedown')
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Alt + PageUp
    await $grid.trigger('keydown.pageup', { altKey: true })
    $cell = wrapper.find('[data-date="2019-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // End (selected date)
    await $grid.trigger('keydown.end')
    $cell = wrapper.find('[data-date="2020-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Alt + PageDown
    await $grid.trigger('keydown.pagedown', { altKey: true })
    $cell = wrapper.find('[data-date="2021-02-15"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('id')).toBeDefined()
    expect($grid.attributes('aria-activedescendant')).toEqual($cell.attributes('id'))

    // Home (today's date)
    await $grid.trigger('keydown.home')
    const todayID = $grid.attributes('aria-activedescendant')
    expect(todayID).toBeDefined()
    $cell = $grid.find(`#${todayID}`)
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('aria-label')).toBeDefined()
    expect($cell.attributes('aria-label')).toContain('(Today)')

    wrapper.destroy()
  })
})
