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
        return h(
          Tabs,
          {},
          [
            h(Tab, { props: { disabled: true } }, 'tab 0'),
            h(Tab, { props: {} }, 'tab 0'),
            h(Tab, { props: {} }, 'tab 0')
          ]
          )
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
})
