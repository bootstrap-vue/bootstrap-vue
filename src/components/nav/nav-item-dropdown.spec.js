import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BNavItemDropdown } from './nav-item-dropdown'

describe('nav-item-dropdown', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavItemDropdown)

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.element.hasAttribute('id')).toBe(true)
    expect(wrapper.classes()).toContain('nav-item')
    expect(wrapper.classes()).toContain('b-nav-dropdown')
    expect(wrapper.classes()).toContain('dropdown')

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.element.tagName).toBe('A')
    expect($toggle.element.hasAttribute('id')).toBe(true)
    expect($toggle.attributes('role')).toEqual('button')
    expect($toggle.attributes('aria-haspopup')).toEqual('true')
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($toggle.attributes('href')).toEqual('#')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link')

    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.element.tagName).toBe('UL')
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toEqual($toggle.attributes('id'))
    expect($menu.classes()).toContain('dropdown-menu')

    wrapper.destroy()
  })

  it('should have custom toggle class when "toggle-class" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        toggleClass: 'nav-link-custom'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.classes()).toContain('nav-link-custom')

    wrapper.destroy()
  })

  it('should be disabled when "disabled" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.classes()).toContain('disabled')
    expect($toggle.attributes('aria-disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('should have href with ID when "id" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        id: 'foo'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.hasAttribute('id')).toBe(true)
    expect(wrapper.attributes('id')).toEqual('foo')

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.attributes('href')).toEqual('#foo')

    wrapper.destroy()
  })

  it('should have correct toggle content when "text" prop set [DEPRECATED]', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'foo'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.text()).toEqual('foo')

    wrapper.destroy()
  })

  it('should have correct toggle content when "html" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'foo',
        html: '<span>bar</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.find('span').exists()).toBe(true)
    expect($toggle.text()).toEqual('bar')

    wrapper.destroy()
  })

  it('should have correct toggle content from "text" slot', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'foo',
        html: '<span>bar</span>'
      },
      slots: {
        text: '<strong>baz</strong>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.find('strong').exists()).toBe(true)
    expect($toggle.text()).toEqual('baz')

    wrapper.destroy()
  })

  it('should have correct toggle content from "button-content" slot', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'foo',
        html: '<span>bar</span>'
      },
      slots: {
        'button-content': '<article>foobar</article>',
        text: '<strong>baz</strong>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.find('article').exists()).toBe(true)
    expect($toggle.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('should have correct menu content for "default" slot', async () => {
    let slotScope = null
    const wrapper = mount(BNavItemDropdown, {
      scopedSlots: {
        default(scope) {
          slotScope = scope
          return this.$createElement('div', 'foo')
        }
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.find('div').exists()).toBe(true)
    expect($menu.text()).toEqual('foo')

    expect(slotScope).toBeDefined()
    expect(slotScope.hide).toBeDefined()

    wrapper.destroy()
  })

  it('should only render menu content when visible when "lazy" prop set', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        lazy: true
      },
      scopedSlots: {
        default() {
          return this.$createElement('div', 'bar')
        }
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.visible).toBe(false)
    await waitNT(wrapper.vm)

    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.find('div').exists()).toBe(false)

    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.vm.visible).toBe(true)
    expect($menu.find('div').exists()).toBe(true)
    expect($menu.text()).toEqual('bar')

    wrapper.vm.hide()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.vm.visible).toBe(false)
    expect($menu.find('div').exists()).toBe(false)

    wrapper.destroy()
  })

  it('should open/close on toggle click', async () => {
    const wrapper = mount(BNavItemDropdown)

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')
    expect(wrapper.vm.visible).toBe(false)
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    await $toggle.trigger('click')
    await waitRAF()
    expect(wrapper.vm.visible).toBe(true)
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    await $toggle.trigger('click')
    await waitRAF()
    expect(wrapper.vm.visible).toBe(false)
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    wrapper.destroy()
  })

  it('should prevent toggle click', async () => {
    const wrapper = mount(BNavItemDropdown, {
      propsData: {
        text: 'toggle'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    const $toggle = wrapper.find('.dropdown-toggle')

    await $toggle.trigger('click')
    expect(wrapper.emitted('toggle')).toBeDefined()
    expect(wrapper.emitted('toggle').length).toBe(1)
    expect(wrapper.emitted('toggle')[0]).toBeDefined()
    expect(wrapper.emitted('toggle')[0][0].defaultPrevented).toBe(true)

    wrapper.destroy()
  })
})
