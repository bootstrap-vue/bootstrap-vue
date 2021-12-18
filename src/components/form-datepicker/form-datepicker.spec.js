import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormDatepicker } from './form-datepicker'

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
      attachTo: document.body,
      propsData: {
        id: 'test-base'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-form-datepicker')
    expect(wrapper.classes()).toContain('b-form-btn-label-control')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.attributes('role')).toEqual('group')

    const $dropdownMenu = wrapper.find('.dropdown-menu')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')
    expect($dropdownMenu.attributes('role')).toEqual('dialog')
    expect($dropdownMenu.attributes('aria-modal')).toEqual('false')

    const $label = wrapper.find('label.form-control')
    expect($label.exists()).toBe(true)
    expect($label.attributes('for')).toEqual('test-base')
    expect($label.classes()).not.toContain('sr-only')

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)

    const $button = wrapper.find('button#test-base')
    expect($button.exists()).toBe(true)
    expect($button.attributes('aria-haspopup')).toEqual('dialog')
    expect($button.attributes('aria-expanded')).toEqual('false')
    expect($button.find('svg.bi-calendar').exists()).toBe(true)

    wrapper.destroy()
  })

  it('has expected base structure in button-only mode', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        id: 'test-button-only',
        buttonOnly: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-form-datepicker')
    expect(wrapper.classes()).toContain('b-form-btn-label-control')
    expect(wrapper.classes()).not.toContain('form-control')
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.attributes('role')).not.toEqual('group')

    const $dropdownMenu = wrapper.find('.dropdown-menu')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')
    expect($dropdownMenu.attributes('role')).toEqual('dialog')
    expect($dropdownMenu.attributes('aria-modal')).toEqual('false')

    const $label = wrapper.find('label')
    expect($label.exists()).toBe(true)
    expect($label.attributes('for')).toEqual('test-button-only')
    expect($label.classes().length).toBe(1)
    expect($label.classes()).toContain('sr-only')

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)

    const $button = wrapper.find('button#test-button-only')
    expect($button.exists()).toBe(true)
    expect($button.attributes('aria-haspopup')).toEqual('dialog')
    expect($button.attributes('aria-expanded')).toEqual('false')
    expect($button.find('svg.bi-calendar').exists()).toBe(true)

    wrapper.destroy()
  })

  it('renders custom placeholder', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        placeholder: 'FOOBAR'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $label = wrapper.find('label.form-control')
    expect($label.exists()).toBe(true)
    expect($label.text()).toContain('FOOBAR')

    wrapper.destroy()
  })

  it('renders hidden input when name prop is set', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        name: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    let $input = wrapper.find('input[type="hidden"]')
    expect($input.exists()).toBe(true)
    expect($input.attributes('name')).toBe('foobar')
    expect($input.attributes('value')).toBe('')

    await wrapper.setProps({ value: '2020-01-20' })
    await waitNT(wrapper.vm)
    await waitRAF()

    $input = wrapper.find('input[type="hidden"]')
    expect($input.exists()).toBe(true)
    expect($input.attributes('name')).toBe('foobar')
    expect($input.attributes('value')).toBe('2020-01-20')

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        id: 'test-focus-blur'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-focus-blur')
    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')
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
      attachTo: document.body,
      propsData: {
        value: '',
        id: 'test-hover'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-hover')
    const $label = wrapper.find('button#test-hover ~ label')

    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')
    expect($toggle.find('svg.bi-calendar').exists()).toBe(true)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(false)

    await $toggle.trigger('mouseenter')
    expect($toggle.find('svg.bi-calendar').exists()).toBe(false)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(true)

    await $toggle.trigger('mouseleave')
    expect($toggle.find('svg.bi-calendar').exists()).toBe(true)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(false)

    await $label.trigger('mouseenter')
    expect($toggle.find('svg.bi-calendar').exists()).toBe(false)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(true)

    await $label.trigger('mouseleave')
    expect($toggle.find('svg.bi-calendar').exists()).toBe(true)
    expect($toggle.find('svg.bi-calendar-fill').exists()).toBe(false)

    wrapper.destroy()
  })

  it('opens calendar when toggle button clicked', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        id: 'test-open'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-open')
    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')

    const $dropdownMenu = wrapper.find('.dropdown-menu')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')

    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).toContain('show')

    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).not.toContain('show')

    wrapper.destroy()
  })

  it('emits new value when date updated', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        id: 'test-emit-input'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.emitted('input')).toBeUndefined()

    const $toggle = wrapper.find('button#test-emit-input')
    const $dropdownMenu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).toContain('show')
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
    await $grid.trigger('keydown.enter')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).not.toContain('show')
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(activeYMD)

    wrapper.destroy()
  })

  it('does not close popup when prop `no-close-on-select` is set', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        id: 'test-no-close',
        noCloseOnSelect: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-no-close')
    const $dropdownMenu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).toContain('show')
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
    await $grid.trigger('keydown.enter')
    await waitRAF()
    await waitRAF()

    // Calendar should remain open
    expect($dropdownMenu.classes()).toContain('show')

    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toBe(activeYMD)

    wrapper.destroy()
  })

  it('renders optional footer buttons', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
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

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-footer')
    const $dropdownMenu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).toContain('show')

    const $value = wrapper.find('input[type="hidden"]')
    expect($value.exists()).toBe(true)
    expect($value.attributes('name')).toBe('foobar')
    expect($value.attributes('value')).toBe('1900-01-01')

    const $footer = wrapper.find('.b-form-date-controls')
    expect($footer.exists()).toBe(true)

    const $buttons = $footer.findAll('button')
    expect($buttons.length).toBe(3)

    const $today = $buttons.at(0)
    const $reset = $buttons.at(1)
    const $close = $buttons.at(2)

    await $today.trigger('click')
    await waitRAF()
    await waitRAF()

    expect($dropdownMenu.classes()).toContain('show')
    expect($value.attributes('value')).not.toBe('1900-01-01')
    expect($value.attributes('value')).not.toBe('')
    expect(/^\d+-\d\d-\d\d$/.test($value.attributes('value'))).toBe(true)

    await $reset.trigger('click')
    await waitRAF()
    await waitRAF()

    expect($dropdownMenu.classes()).toContain('show')
    expect($value.attributes('value')).toBe('')

    await $close.trigger('click')
    await waitRAF()
    await waitRAF()

    expect($dropdownMenu.classes()).not.toContain('show')
    expect($value.attributes('value')).toBe('')

    wrapper.destroy()
  })

  it('prop reset-value works', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        id: 'test-reset',
        value: '2020-01-15',
        resetValue: '1900-01-01',
        name: 'foobar',
        resetButton: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-reset')
    const $dropdownMenu = wrapper.find('.dropdown-menu')

    expect($toggle.exists()).toBe(true)
    expect($toggle.element.tagName).toBe('BUTTON')
    expect($dropdownMenu.exists()).toBe(true)
    expect($dropdownMenu.classes()).not.toContain('show')
    expect(wrapper.find('.b-calendar').exists()).toBe(false)

    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()

    expect($dropdownMenu.classes()).toContain('show')

    const $value = wrapper.find('input[type="hidden"]')
    expect($value.exists()).toBe(true)
    expect($value.attributes('name')).toBe('foobar')
    expect($value.attributes('value')).toBe('2020-01-15')

    const $footer = wrapper.find('.b-form-date-controls')
    expect($footer.exists()).toBe(true)

    const $buttons = $footer.findAll('button')
    expect($buttons.length).toBe(1)

    const $reset = $buttons.at(0)

    await $reset.trigger('click')
    await waitRAF()
    await waitRAF()

    expect($dropdownMenu.classes()).not.toContain('show')
    expect($value.attributes('value')).toBe('1900-01-01')

    wrapper.destroy()
  })

  it('`button-content` static slot works', async () => {
    const wrapper = mount(BFormDatepicker, {
      attachTo: document.body,
      propsData: {
        id: 'test-button-slot',
        value: '2020-01-15'
      },
      slots: {
        'button-content': 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    const $toggle = wrapper.find('button#test-button-slot')

    expect($toggle.exists()).toBe(true)
    expect($toggle.text()).toEqual('foobar')

    wrapper.destroy()
  })
})
