import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTimepicker } from './form-timepicker'

// Note that JSDOM only supports `en-US` (`en`) locale for Intl

describe('form-timepicker', () => {
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

  it('has expected default structure', async () => {
    const wrapper = mount(BFormTimepicker, {
      attachTo: document.body,
      propsData: {
        id: 'test-base'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-form-timepicker')
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
    expect($label.text()).toContain('No time selected')

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)

    const $button = wrapper.find('button#test-base')
    expect($button.exists()).toBe(true)
    expect($button.attributes('aria-haspopup')).toEqual('dialog')
    expect($button.attributes('aria-expanded')).toEqual('false')
    expect($button.find('svg.bi-clock').exists()).toBe(true)

    wrapper.destroy()
  })

  it('has expected default structure when button-only is true', async () => {
    const wrapper = mount(BFormTimepicker, {
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
    expect(wrapper.classes()).toContain('b-form-timepicker')
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
    expect($label.text()).toContain('No time selected')
    expect($label.classes().length).toBe(1)
    expect($label.classes()).toContain('sr-only')

    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)

    const $button = wrapper.find('button#test-button-only')
    expect($button.exists()).toBe(true)
    expect($button.attributes('aria-haspopup')).toEqual('dialog')
    expect($button.attributes('aria-expanded')).toEqual('false')
    expect($button.find('svg.bi-clock').exists()).toBe(true)

    wrapper.destroy()
  })

  it('renders hidden input when name prop is set', async () => {
    const wrapper = mount(BFormTimepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        name: 'foobar',
        hour12: false
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

    await wrapper.setProps({ value: '01:02:03' })
    await waitNT(wrapper.vm)
    await waitRAF()

    $input = wrapper.find('input[type="hidden"]')
    expect($input.exists()).toBe(true)
    expect($input.attributes('name')).toBe('foobar')
    expect($input.attributes('value')).toBe('01:02:00')

    await wrapper.setProps({
      showSeconds: true,
      value: '01:02:33'
    })
    await waitNT(wrapper.vm)
    await waitRAF()

    $input = wrapper.find('input[type="hidden"]')
    expect($input.exists()).toBe(true)
    expect($input.attributes('name')).toBe('foobar')
    expect($input.attributes('value')).toBe('01:02:33')

    wrapper.destroy()
  })

  it('renders placeholder text', async () => {
    const wrapper = mount(BFormTimepicker, {
      attachTo: document.body,
      propsData: {
        value: '',
        hour12: false
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    let $label = wrapper.find('label.form-control')
    expect($label.exists()).toBe(true)
    expect($label.text()).toContain('No time selected')

    await wrapper.setProps({ placeholder: 'foobar' })
    await waitNT(wrapper.vm)
    await waitRAF()

    $label = wrapper.find('label.form-control')
    expect($label.exists()).toBe(true)
    expect($label.text()).not.toContain('No time selected')
    expect($label.text()).toContain('foobar')

    await wrapper.setProps({ value: '01:02:03' })
    await waitNT(wrapper.vm)
    await waitRAF()

    $label = wrapper.find('label.form-control')
    expect($label.exists()).toBe(true)
    expect($label.text()).not.toContain('No time selected')
    expect($label.text()).not.toContain('foobar')

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BFormTimepicker, {
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
    const wrapper = mount(BFormTimepicker, {
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
    expect($toggle.find('svg.bi-clock').exists()).toBe(true)
    expect($toggle.find('svg.bi-clock-fill').exists()).toBe(false)

    await $toggle.trigger('mouseenter')
    expect($toggle.find('svg.bi-clock').exists()).toBe(false)
    expect($toggle.find('svg.bi-clock-fill').exists()).toBe(true)

    await $toggle.trigger('mouseleave')
    expect($toggle.find('svg.bi-clock').exists()).toBe(true)
    expect($toggle.find('svg.bi-clock-fill').exists()).toBe(false)

    await $label.trigger('mouseenter')
    expect($toggle.find('svg.bi-clock').exists()).toBe(false)
    expect($toggle.find('svg.bi-clock-fill').exists()).toBe(true)

    await $label.trigger('mouseleave')
    expect($toggle.find('svg.bi-clock').exists()).toBe(true)
    expect($toggle.find('svg.bi-clock-fill').exists()).toBe(false)

    wrapper.destroy()
  })

  it('opens calendar when toggle button clicked', async () => {
    const wrapper = mount(BFormTimepicker, {
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

  it('renders optional footer buttons', async () => {
    const wrapper = mount(BFormTimepicker, {
      propsData: {
        locale: 'en',
        id: 'test-footer',
        showSeconds: true,
        name: 'foobar',
        hour12: false,
        value: '01:02:03',
        nowButton: true,
        resetButton: true,
        noCloseButton: false
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
    expect($value.attributes('value')).toBe('01:02:03')

    const $footer = wrapper.find('.b-time > footer')
    expect($footer.exists()).toBe(true)

    let $buttons = $footer.findAll('button')

    expect($buttons.length).toBe(3)

    const $now = $buttons.at(0)

    await $now.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).not.toContain('show')
    expect($value.attributes('value')).not.toBe('')
    expect(/^\d\d:\d\d:\d\d$/.test($value.attributes('value'))).toBe(true)

    // Open the popup again
    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).toContain('show')
    expect($value.attributes('value')).not.toBe('')

    $buttons = wrapper.findAll('.b-time > footer button')
    expect($buttons.length).toBe(3)
    const $reset = $buttons.at(1)

    await $reset.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).not.toContain('show')
    expect($value.attributes('value')).toBe('')

    // Open the popup again
    await $toggle.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).toContain('show')
    expect($value.attributes('value')).toBe('')

    $buttons = wrapper.findAll('.b-time > footer button')
    expect($buttons.length).toBe(3)
    const $close = $buttons.at(2)

    await $close.trigger('click')
    await waitRAF()
    await waitRAF()
    expect($dropdownMenu.classes()).not.toContain('show')
    expect($value.attributes('value')).toBe('')

    wrapper.destroy()
  })

  it('`button-content` static slot works', async () => {
    const wrapper = mount(BFormTimepicker, {
      attachTo: document.body,
      propsData: {
        id: 'test-button-slot',
        showSeconds: true,
        value: '11:12:13'
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
