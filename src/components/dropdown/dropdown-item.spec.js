import VueRouter from 'vue-router'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import BDropdownItem from './dropdown-item'

describe('dropdown-item', () => {
  it('renders with tag "a" and href="#" by default', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item.is('a')).toBe(true)
    expect(item.attributes('href')).toBe('#')

    wrapper.destroy()
  })

  it('has class "dropdown-item"', async () => {
    const wrapper = mount(BDropdownItem)
    expect(wrapper.is('li')).toBe(true)

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
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item).toBeDefined()
    item.trigger('click')
    await waitNT(wrapper.vm)
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
    expect(wrapper.is('li')).toBe(true)

    const item = wrapper.find('a')
    expect(item).toBeDefined()
    item.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(called).toBe(false)
    expect(refocus).toBe(null)

    wrapper.destroy()
  })

  describe('router-link support', () => {
    it('works', async () => {
      const localVue = new CreateLocalVue()
      localVue.use(VueRouter)

      const router = new VueRouter({
        mode: 'abstract',
        routes: [
          { path: '/', component: { name: 'R', template: '<div class="r">ROOT</div>' } },
          { path: '/a', component: { name: 'A', template: '<div class="a">A</div>' } },
          { path: '/b', component: { name: 'B', template: '<div class="a">B</div>' } }
        ]
      })

      const App = localVue.extend({
        router,
        render(h) {
          return h('ul', {}, [
            h(BDropdownItem, { props: { to: '/a' } }, ['to-a']),
            h(BDropdownItem, { props: { href: '/a' } }, ['href-a']),
            h(BDropdownItem, { props: { to: { path: '/b' } } }, ['to-path-b']),
            h(BDropdownItem, { props: { href: '/b' } }, ['href-a']),
            h('router-view')
          ])
        }
      })

      const wrapper = mount(App, {
        localVue: localVue,
        attachToDocument: true
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.is('ul')).toBe(true)

      expect(wrapper.findAll('li').length).toBe(4)
      expect(wrapper.findAll('a').length).toBe(4)

      const $links = wrapper.findAll('a')

      expect($links.at(0).isVueInstance()).toBe(true)
      expect($links.at(1).isVueInstance()).toBe(false)
      expect($links.at(2).isVueInstance()).toBe(true)
      expect($links.at(3).isVueInstance()).toBe(false)

      expect($links.at(0).vm.$options.name).toBe('RouterLink')
      expect($links.at(2).vm.$options.name).toBe('RouterLink')

      wrapper.destroy()
    })
  })
})
