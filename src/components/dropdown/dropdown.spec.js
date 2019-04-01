import Dropdown from './dropdown'
import DropdownItem from './dropdown-item'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

// Mock Popper so that tests will work
jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js')

  const Popper = () => {
    return {
      destroy: () => {},
      scheduleUpdate: () => {}
    }
  }
  Popper.placements = PopperJS.placements

  return Popper
})

describe('dropdown', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(Dropdown, {
      attachToDocument: true
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    // Wait for auto ID to be generated
    await wrapper.vm.$nextTick()

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
    expect($menu.is('div')).toBe(true)
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
    const wrapper = mount(Dropdown, {
      attachToDocument: true,
      propsData: {
        split: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    // Wait for auto ID to be generated
    await wrapper.vm.$nextTick()

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
    expect($toggle.findAll('span.sr-only').length).toBe(1)
    expect($toggle.find('span.sr-only').text()).toEqual('Toggle Dropdown')
    expect($toggle.text()).toEqual('Toggle Dropdown')

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.is('div')).toBe(true)
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

  it('renders default slot inside menu', async () => {
    const wrapper = mount(Dropdown, {
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

  it('has user supplied ID', async () => {
    const wrapper = mount(Dropdown, {
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

  it('dropdown opens and closes', async () => {
    const localVue = new CreateLocalVue()
    const App = localVue.extend({
      render(h) {
        return h('div', {}, [h(Dropdown, { props: { id: 'test' } }, [h(DropdownItem, {}, 'item')])])
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

    const $dropdown = wrapper.find('.dropdown')
    const $toggle = wrapper.find('.dropdown-toggle')
    const $menu = wrapper.find('.dropdown-menu')
    const $item = wrapper.find('.dropdown-item')

    expect($dropdown.isVueInstance()).toBe(true)

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu by clicking toggle
    $toggle.trigger('click')
    await wrapper.vm.$nextTick()

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // Close menu by clicking toggle again
    $toggle.trigger('click')
    await wrapper.vm.$nextTick()

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu again
    $toggle.trigger('click')
    await wrapper.vm.$nextTick()

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    wrapper.destroy()
  })
})
