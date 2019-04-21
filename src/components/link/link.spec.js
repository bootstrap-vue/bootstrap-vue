import VueRouter from 'vue-router'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import BLink, { propsFactory, pickLinkProps, omitLinkProps, props as linkProps } from './link'

describe('link', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BLink)

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('#')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BLink, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('#')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('foobar')
  })

  it('sets attribute href to user supplied value', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '/foobar'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('should set href to string `to` prop', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        to: '/foobar'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('should set href to path from `to` prop', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        to: { path: '/foobar' }
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).not.toBeDefined()
    expect(wrapper.attributes('aria-disabled')).not.toBeDefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('should default rel to `noopener` when target==="_blank"', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '/foobar',
        target: '_blank'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_blank')
    expect(wrapper.attributes('rel')).toEqual('noopener')
    expect(wrapper.classes().length).toBe(0)
  })

  it('should render the given rel to when target==="_blank"', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '/foobar',
        target: '_blank',
        rel: 'alternate'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_blank')
    expect(wrapper.attributes('rel')).toEqual('alternate')
    expect(wrapper.classes().length).toBe(0)
  })

  it('should add "active" class when prop active=true', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes().length).toBe(1)
  })

  it('should add aria-disabled="true" when disabled', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toEqual('true')
  })

  it("should add '.disabled' class when prop disabled=true", async () => {
    const wrapper = mount(BLink, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('disabled')
  })

  describe('click handling', () => {
    const localVue = new CreateLocalVue()

    it('should invoke click handler bound by Vue when clicked on', async () => {
      let called = 0
      let evt = null
      const wrapper = mount(BLink, {
        listeners: {
          click: e => {
            evt = e
            called++
          }
        }
      })
      expect(wrapper.is('a')).toBe(true)
      expect(called).toBe(0)
      expect(evt).toEqual(null)
      wrapper.find('a').trigger('click')
      expect(called).toBe(1)
      expect(evt).toBeInstanceOf(MouseEvent)
    })

    it('should invoke multiple click handlers bound by Vue when clicked on', async () => {
      const spy1 = jest.fn()
      const spy2 = jest.fn()
      const wrapper = mount(BLink, {
        listeners: {
          click: [spy1, spy2]
        }
      })
      expect(wrapper.is('a')).toBe(true)
      expect(spy1).not.toHaveBeenCalled()
      expect(spy2).not.toHaveBeenCalled()
      wrapper.find('a').trigger('click')
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
    })

    it('should NOT invoke click handler bound by Vue when disabled and clicked', async () => {
      let called = 0
      let evt = null
      const wrapper = mount(BLink, {
        propsData: {
          disabled: true
        },
        listeners: {
          click: e => {
            evt = e
            called++
          }
        }
      })
      expect(wrapper.is('a')).toBe(true)
      expect(called).toBe(0)
      expect(evt).toEqual(null)
      wrapper.find('a').trigger('click')
      expect(called).toBe(0)
      expect(evt).toEqual(null)
    })

    it('should NOT invoke click handler bound via "addEventListener" when disabled and clicked', async () => {
      const wrapper = mount(BLink, {
        propsData: {
          disabled: true
        }
      })
      const spy = jest.fn()
      expect(wrapper.is('a')).toBe(true)
      wrapper.find('a').element.addEventListener('click', spy)
      wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()
    })

    it('should emit "clicked::link" on $root when clicked on', async () => {
      const App = localVue.extend({
        render(h) {
          return h('div', {}, [h(BLink, { props: { href: '/foo' } }, 'link')])
        }
      })
      const spy = jest.fn()
      const wrapper = mount(App, {
        localVue: localVue
      })
      wrapper.vm.$root.$on('clicked::link', spy)
      wrapper.find('a').trigger('click')
      expect(spy).toHaveBeenCalled()

      wrapper.destroy()
    })

    it('should NOT emit "clicked::link" on $root when clicked on when disabled', async () => {
      const App = localVue.extend({
        render(h) {
          return h('div', {}, [h(BLink, { props: { href: '/foo', disabled: true } }, 'link')])
        }
      })
      const spy = jest.fn()
      const wrapper = mount(App, {
        localVue: localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)

      wrapper.vm.$root.$on('clicked::link', spy)
      wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.destroy()
    })
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
        components: { BLink },
        render(h) {
          return h('main', {}, [
            h('b-link', { props: { to: '/a' } }, ['to-a']),
            h('b-link', { props: { href: '/a' } }, ['href-a']),
            h('b-link', { props: { to: { path: '/b' } } }, ['to-path-b']),
            h('b-link', { props: { href: '/b' } }, ['href-a']),
            h('router-view')
          ])
        }
      })

      const wrapper = mount(App, {
        localVue: localVue,
        attachToDocument: true
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.is('main')).toBe(true)

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

  describe('helper methods', () => {
    it('propsFactory() helper', async () => {
      expect(propsFactory()).toEqual(linkProps)
      expect(propsFactory()).not.toBe(linkProps)
    })

    it('pickLinkProps() helper', async () => {
      expect(pickLinkProps([])).toEqual({})
      expect(pickLinkProps(['append'])).toEqual({ append: linkProps.append })
      expect(pickLinkProps('to')).toEqual({ to: linkProps.to })
      expect(pickLinkProps(['append', 'routerTag'])).toEqual({
        append: linkProps.append,
        routerTag: linkProps.routerTag
      })
    })

    it('omitLinkProps() helper', async () => {
      expect(omitLinkProps([])).toEqual({ ...linkProps })
      const propsOmitted = Object.keys(linkProps).filter(p => p !== 'to' && p !== 'append')
      expect(omitLinkProps(propsOmitted)).toEqual({
        to: linkProps.to,
        append: linkProps.append
      })
    })
  })
})
