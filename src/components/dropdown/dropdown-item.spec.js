import VueRouter from 'vue-router'
import { createLocalVue, mount } from '@vue/test-utils'
import { createContainer, waitRAF } from '../../../tests/utils'
import { BDropdownItem } from './dropdown-item'

describe('dropdown-item', () => {
  it('renders with tag "a" and href="#" by default', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.element.tagName).toBe('LI')

    const item = wrapper.find('a')
    expect(item.element.tagName).toBe('A')
    expect(item.attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.element.tagName).toBe('LI')

    const item = wrapper.find('a')
    expect(item.classes()).toContain('dropdown-item')
    expect(item.attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('calls dropdown hide(true) method when clicked', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      provide: {
        bvDropdown: {
          hide(arg) {
            called = true
            refocus = arg
          }
        }
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const item = wrapper.find('a')
    expect(item).toBeDefined()
    await item.trigger('click')
    await waitRAF()
    expect(called).toBe(true)
    expect(refocus).toBe(true)

    wrapper.destroy()
  })

  it('does not call dropdown hide(true) method when clicked and disabled', async () => {
    let called = false
    let refocus = null
    const wrapper = mount(BDropdownItem, {
      propsData: { disabled: true },
      provide: {
        bvDropdown: {
          hide(arg) {
            called = true
            refocus = arg
          }
        }
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const item = wrapper.find('a')
    expect(item).toBeDefined()
    await item.trigger('click')
    await waitRAF()
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.destroy()
  })

  it('has linkClass when prop is passed a value', () => {
    const wrapper = mount(BDropdownItem, {
      propsData: {
        linkClass: 'link-class'
      }
    })
    expect(wrapper.element.tagName).toBe('LI')

    const item = wrapper.find('a')
    expect(item.classes()).toContain('link-class')
    expect(item.classes()).toContain('dropdown-item')

    wrapper.destroy()
  })

  describe('router-link support', () => {
    it('works', async () => {
      const localVue = createLocalVue()
      localVue.use(VueRouter)

      const router = new VueRouter({
        mode: 'abstract',
        routes: [
          { path: '/', component: { name: 'R', template: '<div class="r">ROOT</div>' } },
          { path: '/a', component: { name: 'A', template: '<div class="a">A</div>' } },
          { path: '/b', component: { name: 'B', template: '<div class="a">B</div>' } }
        ]
      })

      const App = {
        router,
        render(h) {
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

      const wrapper = mount(App, {
        localVue,
        attachTo: createContainer()
      })

      expect(wrapper.vm).toBeDefined()
      expect(wrapper.element.tagName).toBe('UL')

      expect(wrapper.findAll('li').length).toBe(4)
      expect(wrapper.findAll('a').length).toBe(4)

      const $links = wrapper.findAll('a')

      expect($links.at(0).vm).toBeDefined()
      expect($links.at(0).vm.$options.name).toBe('BLink')
      expect($links.at(0).vm.$children.length).toBe(1)
      expect($links.at(0).vm.$children[0].$options.name).toBe('RouterLink')

      expect($links.at(1).vm).toBeDefined()
      expect($links.at(1).vm.$options.name).toBe('BLink')
      expect($links.at(1).vm.$children.length).toBe(0)

      expect($links.at(2).vm).toBeDefined()
      expect($links.at(2).vm.$options.name).toBe('BLink')
      expect($links.at(2).vm.$children.length).toBe(1)
      expect($links.at(2).vm.$children[0].$options.name).toBe('RouterLink')

      expect($links.at(3).vm).toBeDefined()
      expect($links.at(3).vm.$options.name).toBe('BLink')
      expect($links.at(3).vm.$children.length).toBe(0)

      wrapper.destroy()
    })
  })
})
