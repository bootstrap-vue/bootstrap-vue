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
    expect($cell.attributes('aria-selected')).toBeUndefined()
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

  it('has correct header tag when "header-tag" prop is set', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-02-15', // Leap year,
        headerTag: 'div'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $header = wrapper.find('.b-calendar-header')
    expect($header.exists()).toBe(true)
    expect($header.element.tagName).toBe('DIV')

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

  it('should disable key navigation when `no-key-nav` prop set', () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        noKeyNav: true,
        navButtonVariant: 'primary'
      }
    })

    const $nav = wrapper.find('.b-calendar-nav')
    const $buttons = $nav.findAll('button[tabindex="-1"]')

    expect($nav.attributes('tabindex')).toEqual('-1')
    expect($buttons.length).toEqual(5)
    expect(wrapper.find('.b-calendar>div>div[role="application"]').attributes('tabindex')).toEqual(
      '-1'
    )
  })

  it('`nav-button-variant` changes nav button class if `nav-button-class` not provided', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        navButtonVariant: 'primary'
      }
    })

    const $nav = wrapper.find('.b-calendar-nav')
    const $buttons = $nav.findAll('button')

    expect($buttons.length).toBe(5)
    expect($buttons.at(0).classes()).toContain('btn-outline-primary')
    expect($buttons.at(1).classes()).toContain('btn-outline-primary')
    expect($buttons.at(2).classes()).toContain('btn-outline-primary')
    expect($buttons.at(3).classes()).toContain('btn-outline-primary')
    expect($buttons.at(4).classes()).toContain('btn-outline-primary')
  })

  it('`nav-button-class` changes nav button class', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        navButtonClass: 'btn-primary'
      }
    })

    const $nav = wrapper.find('.b-calendar-nav')
    const $buttons = $nav.findAll('button')

    expect($buttons.length).toBe(5)
    for(let i = 0; i < 5; i++) {
      expect($buttons.at(i).classes()).toContain('btn-primary')
      expect($buttons.at(i).classes()).not.toContain('btn-outline-primary')
    }
  })

  it('`nav-button-class` changes nav button class even if `nav-button-variant` is provided', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        navButtonVariant: 'secondary',
        navButtonClass: 'btn-primary'
      }
    })

    const $nav = wrapper.find('.b-calendar-nav')
    const $buttons = $nav.findAll('button')

    expect($buttons.length).toBe(5)
    for(let i = 0; i < 5; i++) {
      expect($buttons.at(i).classes()).toContain('btn-primary')
      expect($buttons.at(i).classes()).not.toContain('btn-outline-secondary')
    }
  })

  it('`selected-variant` changes button class of selected date if `selected-date-button-classes` not provided', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        selectedVariant: 'warning',
        value: '2021-01-01'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $cell = $grid.find('[data-date="2021-01-01"]')
    expect($cell.exists()).toBe(true)

    const $button = $cell.find('span')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('btn-warning')

    wrapper.destroy()
  })

  it('`selected-date-button-class` changes button classes of selected date', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        selectedDateButtonClass: 'font-weight-bold btn-info text-warning',
        value: '2021-01-01'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $cell = $grid.find('[data-date="2021-01-01"]')
    expect($cell.exists()).toBe(true)

    const $button = $cell.find('span')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('font-weight-bold')
    expect($button.classes()).toContain('btn-info')
    expect($button.classes()).toContain('text-warning')

    wrapper.destroy()
  })

  it('`selected-date-button-classes` changes button classes of selected date even if `selected-variant` is provided', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        selectedDateButtonClass: 'font-weight-bold btn-info text-warning',
        selectedVariant: 'warning',
        value: '2021-01-01'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $cell = $grid.find('[data-date="2021-01-01"]')
    expect($cell.exists()).toBe(true)

    const $button = $cell.find('span')
    expect($button.exists()).toBe(true)
    expect($button.classes()).toContain('font-weight-bold')
    expect($button.classes()).toContain('btn-info')
    expect($button.classes()).toContain('text-warning')
    expect($button.classes()).not.toContain('btn-warning')

    wrapper.destroy()
  })

  it('`date-button-class` changes default date button classes', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        dateButtonClass: 'btn-info',
        value: '2021-01-01'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $cells = $grid.findAll('[data-date]')
    for (let i = 0; i < $cells.length; i++) {
      const $cell = $cells.at(i)
      const inMonth = $cell.attributes('data-date').startsWith('2021-01')
      const $button = $cell.find('span')
      const isSelected = $cell.attributes('data-date') === '2021-01-01' // expect selected date to remain untouched

      if(inMonth && !isSelected) {
        expect($button.classes()).toContain('btn-info')
      } else {
        expect($button.classes()).not.toContain('btn-info')
      }
    }

    wrapper.destroy()
  })

  it('`today-variant` changes button class of today if `today-date-button-class` not provided', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        todayVariant: 'info'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $button = $grid.find('[aria-label~="(Today)"]>span')
    expect($button.exists()).toBe(true)

    expect($button.classes()).toContain('btn-outline-info')

    wrapper.destroy()
  })

  it('`today-date-button-class` changes button class of today', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        todayDateButtonClass: 'btn-success text-warning shadow'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $button = $grid.find('[aria-label~="(Today)"]>span')
    expect($button.exists()).toBe(true)

    expect($button.classes()).toContain('btn-success')
    expect($button.classes()).toContain('text-warning')
    expect($button.classes()).toContain('shadow')

    wrapper.destroy()
  })

  it('`today-date-button-class` changes button class of today even if `today-variant` is provided', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        todayVariant: 'info',
        todayDateButtonClass: 'btn-success text-warning shadow'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $button = $grid.find('[aria-label~="(Today)"]>span')
    expect($button.exists()).toBe(true)

    expect($button.classes()).toContain('btn-success')
    expect($button.classes()).toContain('text-warning')
    expect($button.classes()).toContain('shadow')
    expect($button.classes()).not.toContain('btn-info')

    wrapper.destroy()
  })

  it('`other-month-date-button-class` changes button class of dates outside of the current month', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        otherMonthDateButtonClass: 'btn-success text-warning shadow',
        value: '2021-02-01'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    const $cells = $grid.findAll('[data-date]:not([data-date^="2021-02"])')
    expect($cells.length).toBe(7)

    for(let i = 0; i < $cells.length; i++) {
      const $button = $cells.at(i).find('span');
      expect($button.classes()).toContain('btn-success')
      expect($button.classes()).toContain('text-warning')
      expect($button.classes()).toContain('shadow')
      expect($button.classes()).not.toContain('text-muted')
    }

    wrapper.destroy()
  })

  it('disables dates based on `date-disabled-fn` prop', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-01-01',
        dateDisabledFn(ymd) {
          return ymd === '2020-01-02'
        }
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    let $cell = $grid.find('[data-date="2020-01-01"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('aria-disabled')).toBeUndefined()

    $cell = $grid.find('[data-date="2020-01-02"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('aria-disabled')).toEqual('true')

    $cell = $grid.find('[data-date="2020-01-03"]')
    expect($cell.exists()).toBe(true)
    expect($cell.attributes('aria-disabled')).toBeUndefined()

    wrapper.destroy()
  })

  it('applies classes on dates based on `date-info-fn` prop', async () => {
    const wrapper = mount(BCalendar, {
      attachTo: createContainer(),
      propsData: {
        value: '2020-01-01',
        dateInfoFn(ymd) {
          return ymd === '2020-01-02' ? 'my-info' : null
        }
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    let $cell = $grid.find('[data-date="2020-01-01"]')
    expect($cell.exists()).toBe(true)
    expect($cell.classes()).not.toContain('my-info')

    $cell = $grid.find('[data-date="2020-01-02"]')
    expect($cell.exists()).toBe(true)
    expect($cell.classes()).toContain('my-info')

    $cell = $grid.find('[data-date="2020-01-03"]')
    expect($cell.exists()).toBe(true)
    expect($cell.classes()).not.toContain('my-info')

    wrapper.destroy()
  })
})
