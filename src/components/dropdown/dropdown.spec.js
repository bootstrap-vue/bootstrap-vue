import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BDropdown } from './dropdown'
import { BDropdownItem } from './dropdown-item'

describe('dropdown', () => {
  const originalCreateRange = document.createRange
  const origGetBCR = Element.prototype.getBoundingClientRect

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
    // Mock getBCR so that the isVisible(el) test returns true
    // Needed for keyboard navigation testing
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 24,
      height: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    // Reset overrides
    document.createRange = originalCreateRange
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('has expected default structure', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    // Wait for auto ID to be generated
    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('b-dropdown')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('id')).toBeDefined()
    const wrapperId = wrapper.attributes('id')

    expect(wrapper.findAll('button').length).toBe(1)
    const $button = wrapper.find('button')
    expect($button.classes()).toContain('btn')
    expect($button.classes()).toContain('btn-secondary')
    expect($button.classes()).toContain('dropdown-toggle')
    expect($button.classes().length).toBe(3)
    expect($button.attributes('aria-haspopup')).toBeDefined()
    expect($button.attributes('aria-haspopup')).toEqual('true')
    expect($button.attributes('aria-expanded')).toBeDefined()
    expect($button.attributes('aria-expanded')).toEqual('false')
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual(`${wrapperId}__BV_toggle_`)
    expect($button.text()).toEqual('')

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.is('ul')).toBe(true)
    expect($menu.classes().length).toBe(1)
    expect($menu.attributes('role')).toBeDefined()
    expect($menu.attributes('role')).toEqual('menu')
    expect($menu.attributes('tabindex')).toBeDefined()
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toBeDefined()
    expect($menu.attributes('aria-labelledby')).toEqual(`${wrapperId}__BV_toggle_`)
    expect($menu.text()).toEqual('')

    wrapper.destroy()
  })

  it('split mode has expected default structure', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    // Wait for auto ID to be generated
    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('b-dropdown')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('id')).toBeDefined()
    const wrapperId = wrapper.attributes('id')

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($split.classes()).toContain('btn')
    expect($split.classes()).toContain('btn-secondary')
    expect($split.attributes('id')).toBeDefined()
    expect($split.attributes('id')).toEqual(`${wrapperId}__BV_button_`)
    expect($split.attributes('type')).toBeDefined()
    expect($split.attributes('type')).toEqual('button')
    expect($split.text()).toEqual('')

    expect($toggle.classes()).toContain('btn')
    expect($toggle.classes()).toContain('btn-secondary')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('dropdown-toggle-split')
    expect($toggle.classes().length).toBe(4)
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($toggle.attributes('id')).toBeDefined()
    expect($toggle.attributes('id')).toEqual(`${wrapperId}__BV_toggle_`)
    expect($toggle.attributes('type')).toBeDefined()
    expect($toggle.attributes('type')).toEqual('button')
    expect($toggle.findAll('span.sr-only').length).toBe(1)
    expect($toggle.find('span.sr-only').text()).toEqual('Toggle Dropdown')
    expect($toggle.text()).toEqual('Toggle Dropdown')

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.is('ul')).toBe(true)
    expect($menu.classes().length).toBe(1)
    expect($menu.attributes('role')).toBeDefined()
    expect($menu.attributes('role')).toEqual('menu')
    expect($menu.attributes('tabindex')).toBeDefined()
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toBeDefined()
    expect($menu.attributes('aria-labelledby')).toEqual(`${wrapperId}__BV_button_`)
    expect($menu.text()).toEqual('')

    wrapper.destroy()
  })

  it('split mode accepts split-button-type value', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true,
        splitButtonType: 'submit'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toContain('dropdown')

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($split.attributes('type')).toBeDefined()
    expect($split.attributes('type')).toEqual('submit')

    expect($toggle.attributes('type')).toBeDefined()
    expect($toggle.attributes('type')).toEqual('button')

    wrapper.destroy()
  })

  it('renders default slot inside menu', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('does not render default slot inside menu when prop lazy set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        lazy: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.text()).not.toEqual('foobar')

    wrapper.destroy()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        id: 'test'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    const wrapperId = wrapper.attributes('id')

    expect(wrapper.findAll('button').length).toBe(1)
    const $button = wrapper.find('button')
    expect($button.attributes('id')).toEqual(`${wrapperId}__BV_toggle_`)

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.attributes('aria-labelledby')).toBeDefined()
    expect($menu.attributes('aria-labelledby')).toEqual(`${wrapperId}__BV_toggle_`)

    wrapper.destroy()
  })

  it('should not have "btn-group" class when block is true', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        block: true
      }
    })
    expect(wrapper.classes()).not.toContain('btn-group')
    wrapper.destroy()
  })

  it('should have "btn-group" and "d-flex" classes when block and split are true', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        block: true,
        split: true
      }
    })
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('d-flex')
    wrapper.destroy()
  })

  it('should have "dropdown-toggle-no-caret" class when no-caret is true', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        noCaret: true
      }
    })
    expect(wrapper.find('.dropdown-toggle').classes()).toContain('dropdown-toggle-no-caret')
    wrapper.destroy()
  })

  it('should not have "dropdown-toggle-no-caret" class when no-caret and split are true', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        noCaret: true,
        split: true
      }
    })
    expect(wrapper.find('.dropdown-toggle').classes()).not.toContain('dropdown-toggle-no-caret')
    wrapper.destroy()
  })

  it('should have a toggle with the given toggle tag', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        toggleTag: 'div'
      }
    })
    expect(wrapper.find('.dropdown-toggle').is('div')).toBe(true)
    wrapper.destroy()
  })

  it('should have class dropup when prop dropup set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        dropup: true
      }
    })
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropup')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')
    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropup')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')
    wrapper.destroy()
  })

  it('should have class dropright when prop dropright set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        dropright: true
      }
    })
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropright')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')
    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropright')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')
    wrapper.destroy()
  })

  it('should have class dropleft when prop dropleft set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        dropleft: true
      }
    })
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropleft')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')
    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropleft')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')
    wrapper.destroy()
  })

  it('split should have class specified in split class property', () => {
    const splitClass = 'custom-button-class'
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        splitClass,
        split: true
      }
    })
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)

    expect($split.classes()).toContain(splitClass)
  })

  it('menu should have class dropdown-menu-right when prop right set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        right: true
      }
    })
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('dropdown-menu-right')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')
    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('dropdown-menu-right')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')
    wrapper.destroy()
  })

  it('split mode emits click event when split button clicked', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.emitted('click')).not.toBeDefined()

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)

    $split.trigger('click')

    expect(wrapper.emitted('click')).toBeDefined()
    expect(wrapper.emitted('click').length).toBe(1)

    wrapper.destroy()
  })

  it('dropdown opens and closes', async () => {
    const localVue = new CreateLocalVue()
    const App = localVue.extend({
      render(h) {
        return h('div', { attrs: { id: 'container' } }, [
          h(BDropdown, { props: { id: 'test' } }, [h(BDropdownItem, {}, 'item')]),
          h('input', { attrs: { id: 'input' } })
        ])
      }
    })

    const wrapper = mount(App, {
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.dropdown').length).toBe(1)
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu .dropdown-item').length).toBe(1)

    const $container = wrapper.find('#container')
    const $dropdown = wrapper.find('.dropdown')
    const $toggle = wrapper.find('.dropdown-toggle')
    const $menu = wrapper.find('.dropdown-menu')
    const $item = wrapper.find('.dropdown-item')
    const $input = wrapper.find('#input')

    expect($dropdown.isVueInstance()).toBe(true)

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu by clicking toggle
    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')
    expect(document.activeElement).toBe($menu.element)

    // Close menu by clicking toggle again
    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu again
    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect(document.activeElement).toBe($menu.element)
    expect($dropdown.classes()).toContain('show')

    // Close by clicking dropdown-item
    $item.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu via ´.show()´ method
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')

    // Close menu via ´.hide()´ method
    $dropdown.vm.hide()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu via ´.show()´ method again
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')
    expect(document.activeElement).toBe($menu.element)

    // Close menu by moving focus away from menu
    $input.trigger('focusin')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu via keydown.down event on toggle button
    $toggle.trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect(document.activeElement).toBe($menu.element)

    // Close menu by clicking outside
    $container.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu via ´.show()´ method again
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // Close menu by keydown.esc event on dropdown item
    $item.trigger('keydown.esc')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu via ´.show()´ method again
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // When disabled changes to true, menu should close
    $dropdown.setProps({
      disabled: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // When disabled, show() wont open menu
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Re-enable dropdown and open it
    $dropdown.setProps({
      disabled: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // Should close on root emit when argument is not self
    wrapper.vm.$root.$emit('bv::dropdown::shown')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    wrapper.destroy()
  })

  it('preventDefault() works on show event', async () => {
    let prevent = true
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      listeners: {
        show: bvEvt => {
          if (prevent) {
            bvEvt.preventDefault()
          }
        }
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).not.toBeDefined()

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.findAll('.dropdown').length).toBe(1)
    const $toggle = wrapper.find('button')
    const $dropdown = wrapper.find('.dropdown')

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Should prevent menu from opening
    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Allow menu to open
    prevent = false
    $toggle.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(2)
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')

    wrapper.destroy()
  })

  it('Keyboard navigation works when open', async () => {
    const localVue = new CreateLocalVue()
    const App = localVue.extend({
      render(h) {
        return h('div', {}, [
          h(BDropdown, { props: { id: 'test' } }, [
            h(BDropdownItem, { attrs: { id: 'item-1' } }, 'item'),
            h(BDropdownItem, { attrs: { id: 'item-2' } }, 'item'),
            h(BDropdownItem, { attrs: { id: 'item-3' }, props: { disabled: true } }, 'item'),
            h(BDropdownItem, { attrs: { id: 'item-4' } }, 'item')
          ])
        ])
      }
    })

    const wrapper = mount(App, {
      attachToDocument: true
    })

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.findAll('.dropdown').length).toBe(1)
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu .dropdown-item').length).toBe(4)

    const $toggle = wrapper.find('.dropdown-toggle')
    const $menu = wrapper.find('.dropdown-menu')
    const $items = wrapper.findAll('.dropdown-item')

    // Expect menu to be closed
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Trigger keydown.down on toggle to open menu
    $toggle.trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect(document.activeElement).toBe($menu.element)

    // Move to first menu item
    $menu.trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(0).element)

    // Move to second menu item
    $items.at(0).trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(1).element)

    // Move down to next menu item (should skip disabled item)
    $items.at(1).trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(3).element)

    // Move down to next menu item (should remain on same item)
    $items.at(3).trigger('keydown.down')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(3).element)

    // Move up to previous menu item (should skip disabled item)
    $items.at(3).trigger('keydown.up')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(1).element)

    // Move up to previous menu item
    $items.at(1).trigger('keydown.up')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(0).element)

    // Move up to previous menu item (should remain on first item)
    $items.at(0).trigger('keydown.up')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(0).element)

    wrapper.destroy()
  })

  it('when boundary not set should not have class position-static', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true
    })
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('position-static')
    wrapper.destroy()
  })

  it('when boundary set to viewport should have class position-static', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        boundary: 'viewport'
      }
    })
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).toContain('position-static')
    wrapper.destroy()
  })

  it('toggle button size works', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        size: 'lg'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(1)
    const $toggle = wrapper.find('.btn')

    expect($toggle.is('button')).toBe(true)
    expect($toggle.classes()).toContain('btn-lg')

    wrapper.destroy()
  })

  it('split button size works', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true,
        size: 'lg'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $split = wrapper.findAll('.btn').at(0)
    const $toggle = wrapper.findAll('.btn').at(1)

    expect($split.is('button')).toBe(true)
    expect($split.classes()).toContain('btn-lg')
    expect($toggle.is('button')).toBe(true)
    expect($toggle.classes()).toContain('btn-lg')

    wrapper.destroy()
  })

  it('toggle button content works', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        text: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(1)
    const $toggle = wrapper.find('.btn')

    expect($toggle.is('button')).toBe(true)
    expect($toggle.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('split button content works', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true,
        text: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $split = wrapper.findAll('.btn').at(0)

    expect($split.is('button')).toBe(true)
    expect($split.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('variant works on non-split button', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(1)
    const $toggle = wrapper.find('.btn')

    expect($toggle.is('button')).toBe(true)
    expect($toggle.classes()).toContain('btn-primary')
    expect($toggle.classes()).not.toContain('btn-secondary')

    wrapper.destroy()
  })

  it('variant works on split button', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true,
        variant: 'primary'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $split = wrapper.findAll('.btn').at(0)
    const $toggle = wrapper.findAll('.btn').at(1)

    expect($split.is('button')).toBe(true)
    expect($split.classes()).toContain('btn-primary')
    expect($split.classes()).not.toContain('btn-secondary')

    expect($toggle.is('button')).toBe(true)
    expect($toggle.classes()).toContain('btn-primary')
    expect($toggle.classes()).not.toContain('btn-secondary')

    // Change split button variant
    wrapper.setProps({
      splitVariant: 'danger'
    })
    expect($split.classes()).toContain('btn-danger')
    expect($toggle.classes()).toContain('btn-primary')

    wrapper.destroy()
  })

  it('split mode has href when prop split-href set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true,
        splitHref: '/foo'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $buttons = wrapper.findAll('.btn')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($toggle.is('button')).toBe(true)

    expect($split.is('a')).toBe(true)
    expect($split.classes()).toContain('btn')
    expect($split.classes()).toContain('btn-secondary')
    expect($split.attributes('href')).toBeDefined()
    expect($split.attributes('href')).toEqual('/foo')

    wrapper.destroy()
  })

  it('split mode has href when prop split-to set', async () => {
    const wrapper = mount(BDropdown, {
      attachToDocument: true,
      propsData: {
        split: true,
        splitTo: '/foo'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $buttons = wrapper.findAll('.btn')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($toggle.is('button')).toBe(true)

    expect($split.is('a')).toBe(true)
    expect($split.classes()).toContain('btn')
    expect($split.classes()).toContain('btn-secondary')
    expect($split.attributes('href')).toBeDefined()
    expect($split.attributes('href')).toEqual('/foo')

    wrapper.destroy()
  })
})
