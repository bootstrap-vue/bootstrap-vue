import Vue from 'vue'
import Tab from './tab'
import Tabs from './tabs'
import Link from '../link/link'
import { mount } from '@vue/test-utils'

describe('tabs', () => {
  it('default has expected classes and structure', async () => {
    const wrapper = mount(Tabs)

    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('tabs')
    expect(wrapper.classes()).not.toContain('row')
    expect(wrapper.classes()).not.toContain('no-gutters')
    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('default has expected data state', async () => {
    const wrapper = mount(Tabs)

    expect(wrapper.vm.currentTab).toBe(-1)
    expect(wrapper.vm.tabs.length).toBe(0)

    wrapper.destroy()
  })

  it('sets correct tab active for initial value', async () => {
    const tabIndex = 1
    const wrapper = mount(Tabs, {
      propsData: { value: tabIndex },
      slots: { default: [Tab, Tab, Tab] }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.currentTab).toBe(tabIndex)
    expect(wrapper.vm.tabs.length).toBe(3)
    expect(wrapper.vm.tabs[tabIndex].localActive).toBe(true)

    wrapper.destroy()
  })

  it('sets correct tab active when first tab is disabled', async () => {
    const App = Vue.extend({
      render(h) {
        return h(Tabs, {}, [
          h(Tab, { props: { disabled: true } }, 'tab 0'),
          h(Tab, { props: {} }, 'tab 1'),
          h(Tab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

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
        return h(Tabs, {}, [
          h(Tab, { props: { active: false } }, 'tab 0'),
          h(Tab, { props: { active: true } }, 'tab 1'),
          h(Tab, { props: { active: false } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    // Expect 2nd tab (index 1) to be active
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.vm.tabs[1].localActive).toBe(true)

    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    wrapper.destroy()
  })

  it('selects first non-ditabled tab when active tab disabled', async () => {
    const App = Vue.extend({
      render(h) {
        return h(Tabs, {}, [
          h(Tab, { props: { active: false, disabled: true } }, 'tab 0'),
          h(Tab, { props: { active: true } }, 'tab 1'),
          h(Tab, { props: { active: false } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    // Expect 2nd tab (index 1) to be active
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.findAll(Tab).at(0).vm.localActive).toBe(false)
    expect(tabs.findAll(Tab).at(1).vm.localActive).toBe(true)
    expect(tabs.findAll(Tab).at(2).vm.localActive).toBe(false)

    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    // Deactivate current tab (Tab 2, index 1)
    tabs
      .findAll(Tab)
      .at(1)
      .setProps({ active: false })
    await wrapper.vm.$nextTick()

    // Expect last tab (index 2) to be active
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.findAll(Tab).at(0).vm.localActive).toBe(false)
    expect(tabs.findAll(Tab).at(1).vm.localActive).toBe(false)
    expect(tabs.findAll(Tab).at(2).vm.localActive).toBe(true)
    expect(tabs.emitted('input').length).toBe(2)
    expect(tabs.emitted('input')[1][0]).toBe(2)

    wrapper.destroy()
  })

  it('v-model works', async () => {
    const App = Vue.extend({
      render(h) {
        return h(Tabs, { props: { value: 0 } }, [
          h(Tab, { props: {} }, 'tab 0'),
          h(Tab, { props: {} }, 'tab 1'),
          h(Tab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    // It should not emit an input event as the value is the same
    expect(tabs.emitted('input')).not.toBeDefined()

    // Set 2nd Tab to be active
    tabs.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[0][0]).toBe(1)

    // Set 3rd Tab to be active
    tabs.setProps({ value: 2 })
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.emitted('input').length).toBe(2)
    // Should emit index of 2 (3rd tab)
    expect(tabs.emitted('input')[1][0]).toBe(2)

    wrapper.destroy()
  })

  it('v-model works when trying to activate a disabled tab', async () => {
    const App = Vue.extend({
      render(h) {
        return h(Tabs, { props: { value: 0 } }, [
          h(Tab, { props: {} }, 'tab 0'),
          h(Tab, { props: { disabled: true } }, 'tab 1'),
          h(Tab, { props: {} }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)
    expect(tabs.emitted('input')).not.toBeDefined()

    // Try to set 2nd (disabled) Tab to be active
    tabs.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    // Will try activate next non-disabled tab instead (3rd tab, index 2)
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 2 (3rd tab)
    expect(tabs.emitted('input')[0][0]).toBe(2)

    // Needed for test since value not bound to actual v-model on App
    tabs.setProps({ value: 2 })
    await wrapper.vm.$nextTick()
    // Try and set 2nd Tab to be active
    tabs.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    // Will find the previous non-disabled tab (1st tab, index 0)
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.emitted('input').length).toBe(2)
    // Should emit index of 0 (1st tab)
    expect(tabs.emitted('input')[1][0]).toBe(0)

    wrapper.destroy()
  })

  it('clicking on tab activates the tab, and tab emits click event', async () => {
    const App = Vue.extend({
      render(h) {
        return h(Tabs, { props: { value: 0 } }, [
          h(Tab, { props: { title: 'one' } }, 'tab 0'),
          h(Tab, { props: { title: 'two' } }, 'tab 1'),
          h(Tab, { props: { title: 'three' } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    const tab1 = tabs.findAll(Tab).at(0)
    const tab2 = tabs.findAll(Tab).at(1)
    const tab3 = tabs.findAll(Tab).at(2)

    expect(wrapper.findAll('.nav-link')).toBeDefined()
    expect(wrapper.findAll('.nav-link').length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // Try to set 2nd Tab to be active via click
    expect(tab2.emitted('click')).not.toBeDefined()
    wrapper
      .findAll('.nav-link')
      .at(1)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)
    expect(tab2.emitted('click')).toBeDefined()

    // Try to set 3rd Tab to be active via click
    expect(tab3.emitted('click')).not.toBeDefined()
    wrapper
      .findAll('.nav-link')
      .at(2)
      .trigger('click')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)
    expect(tab3.emitted('click')).toBeDefined()

    // Try to set 1st Tab to be active via click (space === click in keynav mode)
    expect(tab1.emitted('click')).not.toBeDefined()
    wrapper
      .findAll('.nav-link')
      .at(0)
      .trigger('keydown.space')
    await wrapper.vm.$nextTick()
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
        return h(Tabs, { props: { value: 0 } }, [
          h(Tab, { props: { title: 'one' } }, 'tab 0'),
          h(Tab, { props: { title: 'two' } }, 'tab 1'),
          h(Tab, { props: { title: 'three' } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    const tab1 = tabs.findAll(Tab).at(0)
    const tab2 = tabs.findAll(Tab).at(1)
    const tab3 = tabs.findAll(Tab).at(2)

    expect(wrapper.findAll('.nav-link')).toBeDefined()
    expect(wrapper.findAll('.nav-link').length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // RIGHT moves to next tab
    wrapper
      .findAll(Link)
      .at(0)
      .trigger('keydown.right')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)

    // END key moves to last tab
    wrapper
      .findAll(Link)
      .at(1)
      .trigger('keydown.end')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)

    // LEFT moves to previous tab
    wrapper
      .findAll(Link)
      .at(2)
      .trigger('keydown.left')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab3.vm.localActive).toBe(false)

    // HOME moves to first tab
    wrapper
      .findAll(Link)
      .at(1)
      .trigger('keydown.home')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    wrapper.destroy()
  })

  it('disabling active tab selects first non-disabled tab', async () => {
    const App = Vue.extend({
      render(h) {
        return h(Tabs, { props: { value: 2 } }, [
          h(Tab, { props: { title: 'one' } }, 'tab 0'),
          h(Tab, { props: { title: 'two' } }, 'tab 1'),
          h(Tab, { props: { title: 'three', disabled: false } }, 'tab 2')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(3)

    const tab1 = tabs.findAll(Tab).at(0)
    const tab2 = tabs.findAll(Tab).at(1)
    const tab3 = tabs.findAll(Tab).at(2)

    // Expect 3rd tab (index 2) to be active
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab1.vm.localActive).toBe(false)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(true)

    // Disable 3rd tab
    tab3.setProps({ disabled: true })
    await wrapper.vm.$nextTick()

    // Expect 1st tab to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab2.vm.localActive).toBe(false)
    expect(tab3.vm.localActive).toBe(false)

    // Enable 3rd tab and Disable 1st tab
    tab3.setProps({ disabled: false })
    tab1.setProps({ disabled: true })
    await wrapper.vm.$nextTick()

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
        return h(Tabs, { props: { value: 2 } }, [
          h(Tab, { props: { title: 'original' } }, 'tab content')
        ])
      }
    })
    const wrapper = mount(App)
    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()
    const tabs = wrapper.find(Tabs)
    expect(tabs).toBeDefined()
    expect(tabs.findAll(Tab).length).toBe(1)

    // Expect tab button content to be `original`
    expect(wrapper.find('.nav-link').text()).toBe('original')

    // Get the Tab's instance
    const tabVm = wrapper.find(Tab).vm
    expect(tabVm).toBeDefined()

    // Change title slot content
    tabVm.$slots.title = [tabVm.$createElement('span', {}, 'foobar')]
    tabVm.$forceUpdate()
    await wrapper.vm.$nextTick()

    // Expect tab button content to be `foobar`
    expect(wrapper.find('.nav-link').text()).toBe('foobar')

    wrapper.destroy()
  })
})
