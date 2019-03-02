import Tab from './tab'
import { mount } from '@vue/test-utils'

jest.useFakeTimers()

// JSDOM always returns and empty object for getComputedStyle
// This patches it so that it returns empty transition values
const { getComputedStyle } = window
window.getComputedStyle = function getComputedStyleStub(el) {
  return {
    ...getComputedStyle(el),
    transitionDelay: '',
    transitionDuration: '',
    animationDelay: '',
    animationDuration: ''
  }
}

describe('tab', async () => {
  it('default has expected classes, attributes and structure', async () => {
    const wrapper = mount(Tab)

    expect(wrapper).toBeDefined()

    await wrapper.vm.$nextTick()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
    expect(wrapper.attributes('role')).toBe('tabpanel')
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    expect(wrapper.attributes('labelledby')).not.toBeDefined()
    expect(wrapper.attributes('tabindex')).not.toBeDefined()
    expect(wrapper.attributes('id')).toBeDefined()
  })

  it('default has expected data state', async () => {
    const wrapper = mount(Tab)

    expect(wrapper.vm._isTab).toBe(true)
    expect(wrapper.vm.localActive).toBe(false)
    expect(wrapper.vm.show).toBe(false)
  })

  it('has class disabled when disabled=true', async () => {
    const wrapper = mount(Tab, {
      propsData: { disabled: true }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
  })

  it('has class active when active=true', async () => {
    const wrapper = mount(Tab, {
      propsData: { active: true }
    })

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
  })

  it('does not have class active when active=true and disabled=true', async () => {
    const wrapper = mount(Tab, {
      propsData: {
        active: true,
        disabled: true
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
  })

  it('has class active and show when localActive becomes true', async () => {
    const wrapper = mount(Tab, {
      mountToDocument: true
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')

    wrapper.setData({ localActive: true })
    await wrapper.vm.$nextTick()
    jest.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('active')
    // requestAnimationFrame does not apepar to envoke callback
    // so we can't test for the `show` class :(
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
  })

  it('emits event "update:active" when localActive becomes true', async () => {
    const wrapper = mount(Tab)

    let called = false
    let value = null
    wrapper.vm.$on('update:active', val => {
      called = true
      value = val
    })

    expect(called).toBe(false)
    expect(value).toBe(null)

    wrapper.setData({ localActive: true })

    expect(called).toBe(true)
    expect(value).toBe(true)
  })

  it('has class fade when parent has fade=true', async () => {
    const wrapper = mount(Tab, {
      provide() {
        return {
          bvTabs: {
            fade: true,
            lazy: false,
            card: false,
            noKeyNav: true
          }
        }
      }
    })

    expect(wrapper.classes()).toContain('fade')
    expect(wrapper.classes()).toContain('tab-pane')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('card-body')
  })

  it('has class card-body when parent has card=true', async () => {
    const wrapper = mount(Tab, {
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
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
  })

  it('does not have class card-body when parent has card=true and prop no-body is set', async () => {
    const wrapper = mount(Tab, {
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
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
  })

  it('has attribute tabindex="0" when parent has keynav enabled and active', async () => {
    const wrapper = mount(Tab, {
      provide() {
        return {
          bvTabs: {
            fade: false,
            lazy: false,
            card: false,
            noKeyNav: false
          }
        }
      },
      propsData: { active: true }
    })

    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it("calls parent's updateButton() when title slot provided", async () => {
    let called = false
    let vm = null
    const wrapper = mount(Tab, {
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

    wrapper.setData({ localActive: true })

    expect(called).toBe(true)
    expect(vm).toEqual(wrapper.vm)
  })

  it('calls parent de/activateTab() when prop active changes', async () => {
    let activateCalled = false
    let activateVm = null
    let deactivateCalled = false
    let deactivateVm = null

    const wrapper = mount(Tab, {
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

    wrapper.setProps({ active: true })

    expect(activateCalled).toBe(true)
    expect(activateVm).toBe(wrapper.vm)
    expect(deactivateCalled).toBe(false)
    expect(deactivateVm).toBe(null)

    activateCalled = false
    activateVm = null
    deactivateCalled = false
    deactivateVm = null

    wrapper.setProps({ active: false })

    expect(activateCalled).toBe(false)
    expect(activateVm).toBe(null)
    expect(deactivateCalled).toBe(true)
    expect(deactivateVm).toBe(wrapper.vm)
  })

  it('does not call parent activateTab() when prop active changes and disabled=true', async () => {
    let activateCalled = false
    let activateVm = null

    const wrapper = mount(Tab, {
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

    wrapper.setProps({ active: true })

    expect(activateCalled).toBe(false)
    expect(activateVm).toBe(null)
  })

  it('does not call parent deactivateTab() when deactivate() called and not active', async () => {
    let deactivateCalled = false
    let deactivateVm = null

    const wrapper = mount(Tab, {
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
  })
})
