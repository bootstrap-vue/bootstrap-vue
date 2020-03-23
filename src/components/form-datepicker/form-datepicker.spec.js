import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormDatepicker } from './form-datepicker'
// import { formatYMD } from '../../utils/date'

// Note that JSDOM only supports `en-US` (`en`) locale for `Intl`

describe('form-date', () => {
  const originalCreateRange = document.createRange

  beforeEach(() => {
    // https://github.com/FezVrasta/popper.js/issues/478#issuecomment-407422016
    // Hack to make Popper not bork out during tests
    // Note popper still does not do any positioning calculation in JSDOM though
    // So we cannot test actual positioning of the menu, just detect when it is open
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    })
  })

  afterEach(() => {
    // Reset overrides
    document.createRange = originalCreateRange
  })

  it('has expected base structure', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        id: 'test-base'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-datepicker')
    expect(wrapper.classes()).toContain('b-form-btn-label-control')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.attributes('role')).toEqual('group')

    expect(wrapper.find('.dropdown-menu').exists()).toBe(true)
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').attributes('role')).toEqual('dialog')
    expect(wrapper.find('.dropdown-menu').attributes('aria-modal')).toEqual('false')

    expect(wrapper.find('label.form-control').exists()).toBe(true)
    expect(wrapper.find('label.form-control').attributes('for')).toEqual('test-base')
    expect(wrapper.find('label.form-control').classes()).not.toContain('sr-only')

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)

    const $btn = wrapper.find('button#test-base')
    expect($btn.exists()).toBe(true)
    expect($btn.attributes('aria-haspopup')).toEqual('dialog')
    expect($btn.attributes('aria-expanded')).toEqual('false')
    expect($btn.find('svg.bi-calendar').exists()).toBe(true)

    wrapper.destroy()
  })

  it('has expected base structure in button-only mode', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        id: 'test-button-only',
        buttonOnly: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('b-form-datepicker')
    expect(wrapper.classes()).not.toContain('b-form-btn-label-control')
    expect(wrapper.classes()).not.toContain('form-control')
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.attributes('role')).not.toEqual('group')

    expect(wrapper.find('.dropdown-menu').exists()).toBe(true)
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').attributes('role')).toEqual('dialog')
    expect(wrapper.find('.dropdown-menu').attributes('aria-modal')).toEqual('false')

    expect(wrapper.find('label.form-control').exists()).toBe(true)
    expect(wrapper.find('label.form-control').attributes('for')).toEqual('test-button-only')
    expect(wrapper.find('label.form-control').classes()).toContain('sr-only')

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)

    const $btn = wrapper.find('button#test-button-only')
    expect($btn.exists()).toBe(true)
    expect($btn.attributes('aria-haspopup')).toEqual('dialog')
    expect($btn.attributes('aria-expanded')).toEqual('false')
    expect($btn.find('svg.bi-calendar').exists()).toBe(true)

    wrapper.destroy()
  })

  it('renders hidden input when name prop is set', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: '',
        name: 'foobar'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(true)
    expect(wrapper.find('input[type="hidden"]').attributes('name')).toBe('foobar')
    expect(wrapper.find('input[type="hidden"]').attributes('value')).toBe('')

    wrapper.setProps({
      value: '2020-01-20'
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(true)
    expect(wrapper.find('input[type="hidden"]').attributes('name')).toBe('foobar')
    expect(wrapper.find('input[type="hidden"]').attributes('value')).toBe('2020-01-20')

    wrapper.destroy()
  })

  it('reacts to changes in value', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: ''
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    wrapper.setProps({
      value: '2020-01-20'
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    // TBD

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: '',
        id: 'test-focus-blur'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-focus-blur')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)

    expect(document.activeElement).not.toBe($toggle.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).toBe($toggle.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(document.activeElement).not.toBe($toggle.element)

    wrapper.destroy()
  })

  it('hover works to change icons', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: '',
        id: 'test-hover'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-hover')
    const $label = wrapper.find('button#test-hover ~ label')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)
    expect($toggle.find('svg.bi-calendar').exists()).toBe(true)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(false)

    $toggle.trigger('mouseenter')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($toggle.find('svg.bi-calendar').exists()).toBe(false)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(true)

    $toggle.trigger('mouseleave')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($toggle.find('svg.bi-calendar').exists()).toBe(true)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(false)

    $label.trigger('mouseenter')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($toggle.find('svg.bi-calendar').exists()).toBe(false)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(true)

    $label.trigger('mouseleave')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($toggle.find('svg.bi-calendar').exists()).toBe(true)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(false)

    wrapper.destroy()
  })

  it('opens calendar when toggle button clicked', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: '',
        id: 'test-open'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-open')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)

    const $menu = wrapper.find('.dropdown-menu')

    expect($menu.exists()).toBe(true)
    expect($menu.classes()).not.toContain('show')

    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')

    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).not.toContain('show')

    wrapper.destroy()
  })

  it('emits new value when date updated', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: '',
        id: 'test-emit-input'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('input')).not.toBeDefined()

    const $toggle = wrapper.find('button#test-emit-input')
    const $menu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)
    expect($menu.exists()).toBe(true)
    expect($menu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(true)

    expect(wrapper.emitted('context')).toBeDefined()
    const lastIndex = wrapper.emitted('context').length - 1
    // `activeYMD` will be the date that calendar has focused by default
    const activeYMD = wrapper.emitted('context')[lastIndex][0].activeYMD

    expect(activeYMD).not.toBe(null)
    expect(activeYMD).not.toBe('')
    expect(/^\d+-\d\d-\d\d$/.test(activeYMD)).toBe(true)

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    // Simulate picking todays date on calendar by `keydown.enter` on grid
    // The calendar has today's date as the default calendar day button
    $grid.trigger('keydown.enter')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).not.toContain('show')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(activeYMD)

    wrapper.destroy()
  })

  it('does not close popup when prop `no-close-on-select` is set', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        value: '',
        id: 'test-no-close',
        noCloseOnSelect: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-no-close')
    const $menu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)
    expect($menu.exists()).toBe(true)
    expect($menu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(true)

    expect(wrapper.emitted('context')).toBeDefined()
    const lastIndex = wrapper.emitted('context').length - 1
    // `activeYMD` will be the date that calendar has focused by default
    const activeYMD = wrapper.emitted('context')[lastIndex][0].activeYMD

    expect(activeYMD).not.toBe(null)
    expect(activeYMD).not.toBe('')
    expect(/^\d+-\d\d-\d\d$/.test(activeYMD)).toBe(true)

    const $grid = wrapper.find('[role="application"]')
    expect($grid.exists()).toBe(true)

    // Simulate picking todays date on calendar by `keydown.enter` on grid
    // The calendar has today's date as the default calendar day button
    $grid.trigger('keydown.enter')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Calendar should remain open
    expect($menu.classes()).toContain('show')

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(activeYMD)

    wrapper.destroy()
  })

  it('renders optional footer buttons', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        id: 'test-footer',
        value: '1900-01-01',
        noCloseOnSelect: true,
        name: 'foobar',
        todayButton: true,
        resetButton: true,
        closeButton: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-footer')
    const $menu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)
    expect($menu.exists()).toBe(true)
    expect($menu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')

    const $value = wrapper.find('input[type="hidden"]')
    expect($value.exists()).toBe(true)
    expect($value.attributes('name')).toBe('foobar')
    expect($value.attributes('value')).toBe('1900-01-01')

    const $footer = wrapper.find('.b-form-date-controls')
    expect($footer.exists()).toBe(true)

    const $btns = $footer.findAll('button')

    expect($btns.length).toBe(3)

    const $today = $btns.at(0)
    const $reset = $btns.at(1)
    const $close = $btns.at(2)

    $today.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')
    expect($value.attributes('value')).not.toBe('1900-01-01')
    expect($value.attributes('value')).not.toBe('')
    expect(/^\d+-\d\d-\d\d$/.test($value.attributes('value'))).toBe(true)

    $reset.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')
    expect($value.attributes('value')).toBe('')

    $close.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).not.toContain('show')
    expect($value.attributes('value')).toBe('')

    wrapper.destroy()
  })

  it('prop reset-value works', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        id: 'test-reset',
        value: '2020-01-15',
        resetValue: '1900-01-01',
        name: 'foobar',
        resetButton: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-reset')
    const $menu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.is('button')).toBe(true)
    expect($menu.exists()).toBe(true)
    expect($menu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).toContain('show')

    const $value = wrapper.find('input[type="hidden"]')
    expect($value.exists()).toBe(true)
    expect($value.attributes('name')).toBe('foobar')
    expect($value.attributes('value')).toBe('2020-01-15')

    const $footer = wrapper.find('.b-form-date-controls')
    expect($footer.exists()).toBe(true)

    const $btns = $footer.findAll('button')

    expect($btns.length).toBe(1)

    const $reset = $btns.at(0)

    $reset.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($menu.classes()).not.toContain('show')
    expect($value.attributes('value')).toBe('1900-01-01')

    wrapper.destroy()
  })

  it('`button-content` static slot works', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachToDocument: true,
      propsData: {
        id: 'test-button-slot',
        value: '2020-01-15'
      },
      slots: {
        'button-content': 'foobar'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toggle = wrapper.find('button#test-button-slot')

    expect($toggle.exists()).toBe(true)
    expect($toggle.text()).toEqual('foobar')

    wrapper.destroy()
  })
})
