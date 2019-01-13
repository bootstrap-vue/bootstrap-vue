import Tab from './tab'
import { mount } from '@vue/test-utils'

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
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('show')
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

  it('has class active when localActive becomes true', async () => {
    const wrapper = mount(Tab)

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')

    wrapper.setData({ localActive: true })

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.classes()).not.toContain('fade')
    expect(wrapper.classes()).not.toContain('card-body')
  })

  it('emits event "update:active" when localActive becomes true', async () => {
    const wrapper = mount(Tab)

    let called = false
    let value = null
    wrapper.vm.$on('update:active', (val) => {
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
      provide () {
        return {
          bTabs: {
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
      provide () {
        return {
          bTabs: {
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
      provide () {
        return {
          bTabs: {
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
      provide () {
        return {
          bTabs: {
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

  it('calls parent\'s updateButton() when title slot provided', async () => {
    let called = false
    let vm = null
    const wrapper = mount(Tab, {
      provide () {
        return {
          bTabs: {
            fade: false,
            lazy: false,
            card: false,
            noKeyNav: false,
            updateButton (tab) {
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
})
