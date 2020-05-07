import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BLink } from '../link/link'
import { BTab } from './tab'
import { BTabs } from './tabs'

describe('tabs', () => {
  it('default has expected classes and structure', async () => {
    const wrapper = mount(BTabs)

    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('tabs')
    expect(wrapper.classes()).not.toContain('row')
    expect(wrapper.classes()).not.toContain('no-gutters')
    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('default has expected data state', async () => {
    const wrapper = mount(BTabs)

    expect(wrapper.vm.currentTab).toBe(-1)
    expect(wrapper.vm.tabs.length).toBe(0)

    wrapper.destroy()
  })

  it('has correct card classes when prop card is true', async () => {
    const wrapper = mount(BTabs, {
      propsData: { card: true },
      slots: { default: [BTab, BTab, BTab] }
    })

    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('tabs')
    expect(wrapper.findAll('.card-header').length).toBe(1)
    expect(wrapper.findAll('ul').length).toBe(1)
    expect(wrapper.find('ul').classes()).toContain('nav')
    expect(wrapper.find('ul').classes()).toContain('nav-tabs')
    expect(wrapper.find('ul').classes()).toContain('card-header-tabs')

    wrapper.destroy()
  })

  it('has correct card classes when props card and vertical are true', async () => {
    const wrapper = mount(BTabs, {
      propsData: { card: true, vertical: true },
      slots: { default: [BTab, BTab, BTab] }
    })

    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('tabs')
    expect(wrapper.classes()).toContain('row')
    expect(wrapper.classes()).toContain('no-gutters')
    expect(wrapper.findAll('.card-header').length).toBe(1)
    expect(wrapper.findAll('ul').length).toBe(1)
    expect(wrapper.find('ul').classes()).toContain('nav')
    expect(wrapper.find('ul').classes()).toContain('nav-tabs')
    expect(wrapper.find('ul').classes()).toContain('card-header')
    expect(wrapper.find('ul').classes()).toContain('flex-column')
    expect(wrapper.find('ul').classes()).toContain('h-100')
    expect(wrapper.find('ul').classes()).toContain('border-bottom-0')
    expect(wrapper.find('ul').classes()).toContain('rounded-0')
    expect(wrapper.findAll('.tab-content.col').length).toBe(1)
    expect(wrapper.findAll('.col-auto').length).toBe(1)

    wrapper.destroy()
  })

  it('sets correct tab active for initial value', async () => {
    const tabIndex = 1
    const wrapper = mount(BTabs, {
      propsData: { value: tabIndex },
      slots: { default: [BTab, BTab, BTab] }
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.currentTab).toBe(tabIndex)
    expect(wrapper.vm.tabs.length).toBe(3)
    expect(wrapper.vm.tabs[tabIndex].localActive).toBe(true)

    wrapper.destroy()
  })

  it('sets correct tab active when first tab is disabled', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, [
          h(BTab, { props: { disabled: true } }, 'tab 0'),
          h(BTab, { props: {} }, 'tab 1'),
          h(BTab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 2nd tab (index 1) to be active
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.vm.tabs[1].localActive).toBe(true)

    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    wrapper.destroy()
  })

  it('sets current index based on active prop of b-tab', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, [
          h(BTab, { props: { active: false } }, 'tab 0'),
          h(BTab, { props: { active: true } }, 'tab 1'),
          h(BTab, { props: { active: false } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()

    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 2nd tab (index 1) to be active
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.vm.tabs[1].localActive).toBe(true)

    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    wrapper.destroy()
  })

  it('selects first non-disabled tab when active tab disabled', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, [
          h(BTab, { props: { active: false, disabled: true } }, 'tab 0'),
          h(BTab, { props: { active: true } }, 'tab 1'),
          h(BTab, { props: { active: false } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 2nd tab (index 1) to be active
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.findAllComponents(BTab).at(0).vm.localActive).toBe(false)
    expect(tabs.findAllComponents(BTab).at(1).vm.localActive).toBe(true)
    expect(tabs.findAllComponents(BTab).at(2).vm.localActive).toBe(false)

    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    // Deactivate current tab (BTab 2, index 1)
    await tabs
      .findAllComponents(BTab)
      .at(1)
      .setProps({ active: false })

    // Expect last tab (index 2) to be active
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.findAllComponents(BTab).at(0).vm.localActive).toBe(false)
    expect(tabs.findAllComponents(BTab).at(1).vm.localActive).toBe(false)
    expect(tabs.findAllComponents(BTab).at(2).vm.localActive).toBe(true)
    expect(tabs.emitted('input').length).toBe(2)
    expect(tabs.emitted('input')[1][0]).toBe(2)

    wrapper.destroy()
  })

  it('v-model works', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0 } }, [
          h(BTab, { props: {} }, 'tab 0'),
          h(BTab, { props: {} }, 'tab 1'),
          h(BTab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    // It should not emit an input event as the value is the same
    expect(tabs.emitted('input')).not.toBeDefined()

    // Set 2nd BTab to be active
    await tabs.setProps({ value: 1 })
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    // Set 3rd BTab to be active
    await tabs.setProps({ value: 2 })
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.emitted('input').length).toBe(2)
    // Should emit index of 2 (3rd tab)
    expect(tabs.emitted('input')[1][0]).toBe(2)

    wrapper.destroy()
  })

  it('v-model works when trying to activate a disabled tab', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0 } }, [
          h(BTab, { props: {} }, 'tab 0'),
          h(BTab, { props: { disabled: true } }, 'tab 1'),
          h(BTab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    expect(tabs.emitted('input')).not.toBeDefined()

    // Try to set 2nd (disabled) BTab to be active
    await tabs.setProps({ value: 1 })
    await waitRAF()
    // Will try activate next non-disabled tab instead (3rd tab, index 2)
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 2 (3rd tab)
    expect(tabs.emitted('input')[0][0]).toBe(2)

    // Needed for test since value not bound to actual v-model on App
    await tabs.setProps({ value: 2 })
    await waitRAF()
    // Try and set 2nd BTab to be active
    await tabs.setProps({ value: 1 })
    await waitRAF()
    // Will find the previous non-disabled tab (1st tab, index 0)
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.emitted('input').length).toBe(2)
    // Should emit index of 0 (1st tab)
    expect(tabs.emitted('input')[1][0]).toBe(0)

    wrapper.destroy()
  })

  it('`activate-tab` event works', async () => {
    const App = Vue.extend({
      methods: {
        preventTab(next, prev, bvEvt) {
          // Prevent 3rd tab (index === 2) from activating
          if (next === 2) {
            bvEvt.preventDefault()
          }
        }
      },
      render(h) {
        return h(BTabs, { props: { value: 0 }, on: { 'activate-tab': this.preventTab } }, [
          h(BTab, { props: {} }, 'tab 0'),
          h(BTab, { props: {} }, 'tab 1'),
          h(BTab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    expect(tabs.emitted('input')).not.toBeDefined()
    expect(tabs.emitted('activate-tab')).not.toBeDefined()

    // Set 2nd BTab to be active
    await tabs.setProps({ value: 1 })
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    expect(tabs.emitted('input')[0][0]).toBe(1)
    expect(tabs.emitted('activate-tab')).toBeDefined()
    expect(tabs.emitted('activate-tab').length).toBe(1)
    expect(tabs.emitted('activate-tab')[0][0]).toBe(1)
    expect(tabs.emitted('activate-tab')[0][1]).toBe(0)
    expect(tabs.emitted('activate-tab')[0][2]).toBeDefined()
    expect(tabs.emitted('activate-tab')[0][2].vueTarget).toBe(tabs.vm)

    // Attempt to set 3rd BTab to be active
    await tabs.setProps({ value: 2 })
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(2)
    expect(tabs.emitted('input')[1][0]).toBe(1)
    expect(tabs.emitted('activate-tab').length).toBe(2)
    expect(tabs.emitted('activate-tab')[1][0]).toBe(2)
    expect(tabs.emitted('activate-tab')[1][1]).toBe(1)
    expect(tabs.emitted('activate-tab')[1][2]).toBeDefined()
    expect(tabs.emitted('activate-tab')[1][2].vueTarget).toBe(tabs.vm)
    expect(tabs.emitted('activate-tab')[1][2].defaultPrevented).toBe(true)

    wrapper.destroy()
  })

  it('clicking on tab activates the tab, and tab emits click event', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0 } }, [
          h(BTab, { props: { title: 'one' } }, 'tab 0'),
          h(BTab, { props: { title: 'two' } }, 'tab 1'),
          h(BTab, { props: { title: 'three' } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    const tab1 = tabs.findAllComponents(BTab).at(0)
    const tab2 = tabs.findAllComponents(BTab).at(1)
    const tab3 = tabs.findAllComponents(BTab).at(2)

    expect(wrapper.findAll('.nav-link')).toBeDefined()
    expect(wrapper.findAll('.nav-link').length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // Try to set 2nd BTab to be active via click
    expect(tab2.emitted('click')).not.toBeDefined()
    await wrapper
      .findAll('.nav-link')
      .at(1)
      .trigger('click')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)
    expect(tab2.emitted('click')).toBeDefined()

    // Try to set 3rd BTab to be active via click
    expect(tab3.emitted('click')).not.toBeDefined()
    await wrapper
      .findAll('.nav-link')
      .at(2)
      .trigger('click')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)
    expect(tab3.emitted('click')).toBeDefined()

    // Try to set 1st BTab to be active via click (space === click in keynav mode)
    expect(tab1.emitted('click')).not.toBeDefined()
    await wrapper
      .findAll('.nav-link')
      .at(0)
      .trigger('keydown.space')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)
    expect(tab1.emitted('click')).toBeDefined()

    wrapper.destroy()
  })

  it('pressing space on tab activates the tab, and tab emits click event', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0, noKeyNav: true } }, [
          h(BTab, { props: { title: 'one' } }, 'tab 0'),
          h(BTab, { props: { title: 'two' } }, 'tab 1'),
          h(BTab, { props: { title: 'three' } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    const tab1 = tabs.findAllComponents(BTab).at(0)
    const tab2 = tabs.findAllComponents(BTab).at(1)
    const tab3 = tabs.findAllComponents(BTab).at(2)

    expect(wrapper.findAll('.nav-link')).toBeDefined()
    expect(wrapper.findAll('.nav-link').length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // Try to set 2nd BTab to be active via space keypress
    expect(tab2.emitted('click')).not.toBeDefined()
    await wrapper
      .findAll('.nav-link')
      .at(1)
      .trigger('keydown.space')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)
    expect(tab2.emitted('click')).toBeDefined()

    // Try to set 3rd BTab to be active via space keypress
    expect(tab3.emitted('click')).not.toBeDefined()
    await wrapper
      .findAll('.nav-link')
      .at(2)
      .trigger('keydown.space')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)
    expect(tab3.emitted('click')).toBeDefined()

    // Try to set 1st BTab to be active via space keypress
    expect(tab1.emitted('click')).not.toBeDefined()
    await wrapper
      .findAll('.nav-link')
      .at(0)
      .trigger('keydown.space')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)
    expect(tab1.emitted('click')).toBeDefined()

    wrapper.destroy()
  })

  it('key nav works', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0 } }, [
          h(BTab, { props: { title: 'one' } }, 'tab 0'),
          h(BTab, { props: { title: 'two' } }, 'tab 1'),
          h(BTab, { props: { title: 'three' } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    const tab1 = tabs.findAllComponents(BTab).at(0)
    const tab2 = tabs.findAllComponents(BTab).at(1)
    const tab3 = tabs.findAllComponents(BTab).at(2)

    expect(wrapper.findAll('.nav-link')).toBeDefined()
    expect(wrapper.findAll('.nav-link').length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // RIGHT moves to next tab
    await wrapper
      .findAllComponents(BLink)
      .at(0)
      .trigger('keydown.right')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)

    // END key moves to last tab
    await wrapper
      .findAllComponents(BLink)
      .at(1)
      .trigger('keydown.end')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)

    // LEFT moves to previous tab
    await wrapper
      .findAllComponents(BLink)
      .at(2)
      .trigger('keydown.left')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)

    // HOME moves to first tab
    await wrapper
      .findAllComponents(BLink)
      .at(1)
      .trigger('keydown.home')
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    wrapper.destroy()
  })

  it('disabling active tab selects first non-disabled tab', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 2 } }, [
          h(BTab, { props: { title: 'one' } }, 'tab 0'),
          h(BTab, { props: { title: 'two' } }, 'tab 1'),
          h(BTab, { props: { title: 'three', disabled: false } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    const tab1 = tabs.findAllComponents(BTab).at(0)
    const tab2 = tabs.findAllComponents(BTab).at(1)
    const tab3 = tabs.findAllComponents(BTab).at(2)

    // Expect 3rd tab (index 2) to be active
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)

    // Disable 3rd tab
    await tab3.setProps({ disabled: true })
    await waitRAF()

    // Expect 1st tab to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // Enable 3rd tab and Disable 1st tab
    await tab3.setProps({ disabled: false })
    await tab1.setProps({ disabled: true })
    await waitRAF()

    // Expect 2nd tab to be active
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)

    wrapper.destroy()
  })

  it('tab title slots are reactive', async () => {
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 2 } }, [
          h(BTab, { props: { title: 'original' } }, 'tab content')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(1)

    // Expect tab button content to be `original`
    expect(wrapper.find('.nav-link').text()).toBe('original')

    // Get the BTab's instance
    const tabVm = wrapper.findComponent(BTab).vm
    expect(tabVm).toBeDefined()

    // Change title slot content
    tabVm.$slots.title = [tabVm.$createElement('span', 'foobar')]
    tabVm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Expect tab button content to be `foobar`
    expect(wrapper.find('.nav-link').text()).toBe('foobar')

    wrapper.destroy()
  })

  it('"active-nav-item-class" is applied to active nav item', async () => {
    const activeNavItemClass = 'text-success'
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0, activeNavItemClass } }, [
          h(BTab, { props: {} }, 'tab 0'),
          h(BTab, { props: {} }, 'tab 1'),
          h(BTab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    const getNavItemByTab = tab => wrapper.find(`#${tab.$el.id}___BV_tab_button__`)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    // Expect 1st tabs nav item to have "active-nav-item-class" applied
    expect(getNavItemByTab(tabs.vm.tabs[0]).classes(activeNavItemClass)).toBe(true)

    // Set 2nd tab to be active
    tabs.setProps({ value: 1 })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    // Expect 2nd tabs nav item to have "active-nav-item-class" applied
    expect(getNavItemByTab(tabs.vm.tabs[1]).classes(activeNavItemClass)).toBe(true)
    // Expect 1st tabs nav item to don't have "active-nav-item-class" applied anymore
    expect(getNavItemByTab(tabs.vm.tabs[0]).classes(activeNavItemClass)).toBe(false)

    wrapper.destroy()
  })

  it('"active-tab-class" is applied to active tab', async () => {
    const activeTabClass = 'text-success'
    const App = Vue.extend({
      render(h) {
        return h(BTabs, { props: { value: 0, activeTabClass } }, [
          h(BTab, { props: {} }, 'tab 0'),
          h(BTab, { props: {} }, 'tab 1'),
          h(BTab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    const tabs = wrapper.findComponent(BTabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAllComponents(BTab).length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    // Expect 1st tab to have "active-tab-class" applied
    expect(tabs.vm.tabs[0].$el.classList.contains(activeTabClass)).toBe(true)

    // Set 2nd tab to be active
    await tabs.setProps({ value: 1 })
    await waitRAF()
    expect(tabs.vm.currentTab).toBe(1)
    // Expect 2nd tab to have "active-tab-class" applied
    expect(tabs.vm.tabs[1].$el.classList.contains(activeTabClass)).toBe(true)
    // Expect 1st tab to don't have "active-tab-class" applied anymore
    expect(tabs.vm.tabs[0].$el.classList.contains(activeTabClass)).toBe(false)

    wrapper.destroy()
  })
})
