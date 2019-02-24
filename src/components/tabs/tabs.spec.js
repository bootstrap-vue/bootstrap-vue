import Vue from 'vue'
import Tab from './tab'
import Tabs from './tabs'
import { mount } from '@vue/test-utils'

describe('tabs', async () => {
  it('default has expected classes and structure', async () => {
    const wrapper = mount(Tabs)

    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('tabs')
    expect(wrapper.classes()).not.toContain('row')
    expect(wrapper.classes()).not.toContain('no-gutters')
    expect(wrapper.attributes('id')).toBeDefined()
  })

  it('default has expected data state', async () => {
    const wrapper = mount(Tabs)

    expect(wrapper.vm.currentTab).toBe(-1)
    expect(wrapper.vm.tabs.length).toBe(0)
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
    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 0 (1st tab)
    expect(tabs.emitted('input')[0][0]).toBe(0)

    // Set 2nd Tab to be active
    tabs.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tabs.emitted('input').length).toBe(2)
    // Should emit index of 1 (2nd tab)
    expect(tabs.emitted('input')[1][0]).toBe(1)

    // Set 3rd Tab to be active
    tabs.setProps({ value: 2 })
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.emitted('input').length).toBe(3)
    // Should emit index of 2 (3rd tab)
    expect(tabs.emitted('input')[2][0]).toBe(2)
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
    expect(tabs.emitted('input')).toBeDefined()
    expect(tabs.emitted('input').length).toBe(1)
    // Should emit index of 0 (1st tab)
    expect(tabs.emitted('input')[0][0]).toBe(0)

    // Try to set 2nd (disabled) Tab to be active
    tabs.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    // Will try activate next non-disabled tab instead (3rd tab, index 2)
    expect(tabs.vm.currentTab).toBe(2)
    expect(tabs.emitted('input').length).toBe(2)
    // Should emit index of 2 (3rd tab)
    expect(tabs.emitted('input')[1][0]).toBe(2)

    // Needed for test since value not bound to actual v-model on App
    tabs.setProps({ value: 2 })
    await wrapper.vm.$nextTick()
    // Try and set 2nd Tab to be active
    tabs.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    // Will find the previous non-disabled tab (1st tab, index 0)
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.emitted('input').length).toBe(3)
    // Should emit index of 0 (1st tab)
    expect(tabs.emitted('input')[2][0]).toBe(0)
  })

  it('clicking on tab activates the tab, and tab emits click event', async () => {
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

    const tab1 = tabs.findAll(Tab).at(0)
    const tab2 = tabs.findAll(Tab).at(1)
    const tab3 = tabs.findAll(Tab).at(2)

    const buttons = wrapper.findAll('.nav-link')
    expect(buttons).toBeDefined()
    expect(buttons.length).toBe(3)

    // Expect 1st tab (index 0) to be active
    expect(tabs.vm.currentTab).toBe(0)
    expect(tabs.vm.tabs[0].localActive).toBe(true)

    // Try to set 2nd Tab to be active via click
    expect(tab2.emitted('click')).not.toBeDefined()
    buttons[1].element.trigger('click')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(1)
    expect(tab2.vm.localActive).toBe(true)
    expect(tab2.emitted('click')).toBeDefined()

    // Try to set 3rd Tab to be active via click
    expect(tab3.emitted('click')).not.toBeDefined()
    buttons[2].element.trigger('click')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(2)
    expect(tab3.vm.localActive).toBe(true)
    expect(tab3.emitted('click')).toBeDefined()

    // Try to set 1st Tab to be active via click
    expect(tab1.emitted('click')).not.toBeDefined()
    buttons[1].element.trigger('click')
    await wrapper.vm.$nextTick()
    expect(tabs.vm.currentTab).toBe(0)
    expect(tab1.vm.localActive).toBe(true)
    expect(tab1.emitted('click')).toBeDefined()
  })
})
