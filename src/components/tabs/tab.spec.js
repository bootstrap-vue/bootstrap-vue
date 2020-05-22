import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BTab } from './tab'

describe('tab', () => {
  it('default has expected classes, attributes and structure', async () => {
    const wrapper = mount(BTab)

    expect(wrapper).toBeDefined()

    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
    expect(wrapper.attributes('role')).toBe('tabpanel')
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('labelledby')).not.toBeDefined()
    expect(wrapper.attributes('tabindex')).not.toBeDefined()
    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.destroy()
  })

  it('default has expected data state', async () => {
    const wrapper = mount(BTab)

    expect(wrapper.vm._isTab).toBe(true)
    expect(wrapper.vm.localActive).toBe(false)
    expect(wrapper.vm.show).toBe(false)

    wrapper.destroy()
  })

  it('has class disabled when disabled=true', async () => {
    const wrapper = mount(BTab, {
      propsData: { disabled: true }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('card-body')

    wrapper.destroy()
  })

  it('has class active when active=true', async () => {
    const wrapper = mount(BTab, {
      propsData: { active: true }
    })

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('card-body')

    wrapper.destroy()
  })

  it('does not have class active when active=true and disabled=true', async () => {
    const wrapper = mount(BTab, {
      propsData: {
        active: true,
        disabled: true
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('card-body')

    wrapper.destroy()
  })

  it('has class active and show when localActive becomes true', async () => {
    const wrapper = mount(BTab)

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('card-body')

    await wrapper.setData({ localActive: true })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('card-body')

    await wrapper.setData({ localActive: false })
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('card-body')

    wrapper.destroy()
  })

  it('emits event "update:active" when localActive becomes true', async () => {
    const wrapper = mount(BTab)

    let called = false
    let value = null
    wrapper.vm.$on('update:active', val => {
      called = true
      value = val
    })

    expect(called).toBe(false)
    expect(value).toBe(null)

    await wrapper.setData({ localActive: true })

    expect(called).toBe(true)
    expect(value).toBe(true)

    wrapper.destroy()
  })

  it('has class card-body when parent has card=true', async () => {
    const wrapper = mount(BTab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: true,
            noKeyNav: true
          }
        }
      }
    })

    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')

    wrapper.destroy()
  })

  it('does not have class card-body when parent has card=true and prop no-body is set', async () => {
    const wrapper = mount(BTab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: true,
            noKeyNav: true
          }
        }
      },
      propsData: {
        noBody: true
      }
    })

    expect(wrapper.classes()).not.toContain('card-body')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')

    wrapper.destroy()
  })

  it("calls parent's updateButton() when title slot provided", async () => {
    let called = false
    let vm = null
    const wrapper = mount(BTab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: false,
            noKeyNav: false,
            updateButton(tab) {
              called = true
              vm = tab
              return true
            }
          }
        }
      },
      slots: {
        title: '<b>foobar</b>'
      }
    })

    await wrapper.setData({ localActive: true })

    expect(called).toBe(true)
    expect(vm).toEqual(wrapper.vm)

    wrapper.destroy()
  })

  it('calls parent de/activateTab() when prop active changes', async () => {
    let activateCalled = false
    let activateVm = null
    let deactivateCalled = false
    let deactivateVm = null

    const wrapper = mount(BTab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: false,
            noKeyNav: false,
            activateTab(tab) {
              activateCalled = true
              activateVm = tab
              tab.localActive = true
              return true
            },
            deactivateTab(tab) {
              deactivateCalled = true
              deactivateVm = tab
              tab.localActive = false
              return true
            }
          }
        }
      }
    })

    expect(activateCalled).toBe(false)
    expect(activateVm).toBe(null)
    expect(deactivateCalled).toBe(false)
    expect(deactivateVm).toBe(null)

    await wrapper.setProps({ active: true })

    expect(activateCalled).toBe(true)
    expect(activateVm).toBe(wrapper.vm)
    expect(deactivateCalled).toBe(false)
    expect(deactivateVm).toBe(null)

    activateCalled = false
    activateVm = null
    deactivateCalled = false
    deactivateVm = null

    await wrapper.setProps({ active: false })

    expect(activateCalled).toBe(false)
    expect(activateVm).toBe(null)
    expect(deactivateCalled).toBe(true)
    expect(deactivateVm).toBe(wrapper.vm)

    wrapper.destroy()
  })

  it('does not call parent activateTab() when prop active changes and disabled=true', async () => {
    let activateCalled = false
    let activateVm = null

    const wrapper = mount(BTab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: false,
            noKeyNav: false,
            activateTab(tab) {
              activateCalled = true
              activateVm = tab
              tab.localActive = true
              return true
            }
          }
        }
      },
      propsData: { disabled: true }
    })

    expect(activateCalled).toBe(false)
    expect(activateVm).toBe(null)

    await wrapper.setProps({ active: true })

    expect(activateCalled).toBe(false)
    expect(activateVm).toBe(null)

    wrapper.destroy()
  })

  it('does not call parent deactivateTab() when deactivate() called and not active', async () => {
    let deactivateCalled = false
    let deactivateVm = null

    const wrapper = mount(BTab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: false,
            noKeyNav: false,
            deactivateTab(tab) {
              deactivateCalled = true
              deactivateVm = tab
              tab.localActive = false
              return true
            }
          }
        }
      }
    })

    expect(deactivateCalled).toBe(false)
    expect(deactivateVm).toBe(null)

    const result = wrapper.vm.deactivate()

    expect(deactivateCalled).toBe(false)
    expect(deactivateVm).toBe(null)
    expect(result).toBe(false)

    wrapper.destroy()
  })
})
