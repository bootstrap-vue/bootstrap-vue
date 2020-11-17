import { RouterLink, createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import { createContainer, waitRAF } from '../../../tests/utils'
import { h } from '../../vue'
import { BLink } from '../link'
import { BDropdownItem } from './dropdown-item'

describe('dropdown-item', () => {
  it('renders with tag "a" and href="#" by default', async () => {
    const wrapper = mount(BDropdownItem)

    expect(wrapper.element.tagName).toBe('LI')

    const $a = wrapper.find('a')
    expect($a.exists()).toBe(true)
    expect($a.attributes('href')).toBe('#')

    wrapper.unmount()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItem)

    expect(wrapper.element.tagName).toBe('LI')

    const $a = wrapper.find('a')
    expect($a.exists()).toBe(true)
    expect($a.classes()).toContain('dropdown-item')
    expect($a.attributes('href')).toBe('#')

    wrapper.unmount()
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      global: {
        provide: {
          bvDropdown: {
            hide(arg) {
              called = true
              refocus = arg
            }
          }
        }
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const $a = wrapper.find('a')
    expect($a.exists()).toBe(true)
    await $a.trigger('click')
    await waitRAF()
    expect(called).toBe(true)
    expect(refocus).toBe(true)

    wrapper.unmount()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      global: {
        provide: {
          bvDropdown: {
            hide(arg) {
              called = true
              refocus = arg
            }
          }
        }
      },
      props: { disabled: true }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const $a = wrapper.find('a')
    expect($a.exists()).toBe(true)
    await $a.trigger('click')
    await waitRAF()
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.unmount()
  })

  it('has linkClass when prop is passed a value', () => {
    const wrapper = mount(BDropdownItem, {
      props: {
        linkClass: 'link-class'
      }
    })

    expect(wrapper.element.tagName).toBe('LI')

    const $a = wrapper.find('a')
    expect($a.exists()).toBe(true)
    expect($a.classes()).toContain('link-class')
    expect($a.classes()).toContain('dropdown-item')

    wrapper.unmount()
  })

  describe('router-link support', () => {
    it('works', async () => {
      const App = {
        render() {
          return h('ul', [
            // <router-link>
            h(BDropdownItem, { props: { to: '/a' } }, ['to-a']),
            // Regular link
            h(BDropdownItem, { props: { href: '/a' } }, ['href-a']),
            // <router-link>
            h(BDropdownItem, { props: { to: { path: '/b' } } }, ['to-path-b']),
            // Regular link
            h(BDropdownItem, { props: { href: '/b' } }, ['href-a']),
            h('router-view')
          ])
        }
      }

      const router = createRouter({
        history: createWebHistory(),
        routes: [
          { path: '/', component: { name: 'R', template: '<div class="r">ROOT</div>' } },
          { path: '/a', component: { name: 'A', template: '<div class="a">A</div>' } },
          { path: '/b', component: { name: 'B', template: '<div class="a">B</div>' } }
        ]
      })

      router.push('/')
      await router.isReady()

      const wrapper = mount(App, {
        attachTo: createContainer(),
        global: {
          plugins: [router]
        }
      })

      expect(wrapper.vm).toBeDefined()
      expect(wrapper.element.tagName).toBe('UL')

      expect(wrapper.findAll('li').length).toBe(4)
      expect(wrapper.findAll('a').length).toBe(4)

      const $links = wrapper.findAllComponents(BLink)
      expect($links.length).toBe(4)

      expect($links[0].exists()).toBe(true)
      expect($links[0].findComponent(RouterLink).exists()).toBe(true)

      expect($links[1].exists()).toBe(true)
      expect($links[1].findComponent(RouterLink).exists()).toBe(false)

      expect($links[2].exists()).toBe(true)
      expect($links[2].findComponent(RouterLink).exists()).toBe(true)

      expect($links[3].exists()).toBe(true)
      expect($links[3].findComponent(RouterLink).exists()).toBe(false)

      wrapper.unmount()
    })
  })
})
