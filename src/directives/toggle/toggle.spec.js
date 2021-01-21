import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { VBToggle } from './toggle'

// Emitted control event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to event for toggle state update (emitted by collapse)
const EVENT_STATE = 'bv::collapse::state'

// Listen to event for toggle sync state update (emitted by collapse)
const EVENT_SYNC_STATE = 'bv::collapse::sync-state'

describe('v-b-toggle directive', () => {
  it('works on buttons', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bToggle: VBToggle
      },
      created() {
        this.$root.$on(EVENT_TOGGLE, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_TOGGLE, spy)
      },
      template: '<button v-b-toggle.test>button</button>'
    }

    const wrapper = mount(App)

    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.attributes('tabindex')).toBeUndefined()
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.attributes('tabindex')).toBeUndefined()
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works on passing ID as directive value', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bToggle: VBToggle
      },
      mounted() {
        this.$root.$on(EVENT_TOGGLE, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_TOGGLE, spy)
      },
      template: `<button v-b-toggle="'test'">button</button>`
    }

    const wrapper = mount(App)

    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works on passing ID as directive argument', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bToggle: VBToggle
      },
      mounted() {
        this.$root.$on(EVENT_TOGGLE, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_TOGGLE, spy)
      },
      template: `<button v-b-toggle:test>button</button>`
    }

    const wrapper = mount(App)

    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works on passing ID as href value on links', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bToggle: VBToggle
      },
      created() {
        this.$root.$on(EVENT_TOGGLE, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_TOGGLE, spy)
      },
      template: '<a href="#test" v-b-toggle>link</a>'
    }

    const wrapper = mount(App)

    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('A')
    expect(spy).not.toHaveBeenCalled()

    const $link = wrapper.find('a')
    expect($link.attributes('aria-controls')).toBe('test')
    expect($link.attributes('aria-expanded')).toBe('false')
    expect($link.attributes('tabindex')).toBeUndefined()
    expect($link.classes()).toContain('collapsed')
    expect($link.classes()).not.toContain('not-collapsed')

    await $link.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($link.attributes('aria-controls')).toBe('test')
    expect($link.attributes('aria-expanded')).toBe('false')
    expect($link.attributes('tabindex')).toBeUndefined()
    expect($link.classes()).toContain('collapsed')
    expect($link.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works with multiple targets, and updates when targets change', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bToggle: VBToggle
      },
      props: {
        target: {
          type: [String, Array],
          default: null
        }
      },
      mounted() {
        this.$root.$on(EVENT_TOGGLE, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_TOGGLE, spy)
      },
      template: `<button v-b-toggle="target">button</button>`
    }

    const wrapper = mount(App, {
      propsData: {
        target: 'test1'
      }
    })

    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test1')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    await wrapper.setProps({ target: ['test1', 'test2'] })
    expect($button.attributes('aria-controls')).toBe('test1 test2')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')
    expect(spy).not.toHaveBeenCalled()

    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(1, 'test1')
    expect(spy).toHaveBeenNthCalledWith(2, 'test2')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($button.attributes('aria-controls')).toBe('test1 test2')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    await wrapper.setProps({ target: ['test2'] })
    expect($button.attributes('aria-controls')).toBe('test2')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')
    expect(spy).toHaveBeenCalledTimes(2)

    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenNthCalledWith(3, 'test2')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($button.attributes('aria-controls')).toBe('test2')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works on non-buttons', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bToggle: VBToggle
      },
      data() {
        return {
          text: 'span'
        }
      },
      mounted() {
        this.$root.$on(EVENT_TOGGLE, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_TOGGLE, spy)
      },
      template: '<span v-b-toggle.test>{{ text }}</span>'
    }

    const wrapper = mount(App)

    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(spy).not.toHaveBeenCalled()

    const $span = wrapper.find('span')
    expect($span.attributes('role')).toBe('button')
    expect($span.attributes('tabindex')).toBe('0')
    expect($span.attributes('aria-controls')).toBe('test')
    expect($span.attributes('aria-expanded')).toBe('false')
    expect($span.classes()).toContain('collapsed')
    expect($span.classes()).not.toContain('not-collapsed')
    expect($span.text()).toBe('span')

    await $span.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')
    expect($span.attributes('role')).toBe('button')
    expect($span.attributes('tabindex')).toBe('0')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($span.attributes('aria-controls')).toBe('test')
    expect($span.attributes('aria-expanded')).toBe('false')
    expect($span.classes()).toContain('collapsed')
    expect($span.classes()).not.toContain('not-collapsed')

    // Reacts to SPACE keypress
    await $span.trigger('keydown.space')
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toBeCalledWith('test')
    expect($span.attributes('role')).toBe('button')
    expect($span.attributes('tabindex')).toBe('0')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($span.attributes('aria-controls')).toBe('test')
    expect($span.attributes('aria-expanded')).toBe('false')
    expect($span.classes()).toContain('collapsed')
    expect($span.classes()).not.toContain('not-collapsed')

    // Reacts to ENTER keypress
    await $span.trigger('keydown.enter')
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toBeCalledWith('test')
    expect($span.attributes('role')).toBe('button')
    expect($span.attributes('tabindex')).toBe('0')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($span.attributes('aria-controls')).toBe('test')
    expect($span.attributes('aria-expanded')).toBe('false')
    expect($span.classes()).toContain('collapsed')
    expect($span.classes()).not.toContain('not-collapsed')

    // Test updating component, should maintain role attribute
    await wrapper.setData({ text: 'foobar' })
    expect($span.text()).toBe('foobar')
    expect($span.attributes('role')).toBe('button')
    expect($span.attributes('tabindex')).toBe('0')

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($span.attributes('aria-controls')).toBe('test')
    expect($span.attributes('aria-expanded')).toBe('false')
    expect($span.classes()).toContain('collapsed')
    expect($span.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('responds to state update events', async () => {
    const App = {
      directives: {
        bToggle: VBToggle
      },
      template: '<button v-b-toggle.test>button</button>'
    }

    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')

    const $root = wrapper.vm.$root

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    $root.$emit(EVENT_STATE, 'test', true)
    await waitNT(wrapper.vm)
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('true')
    expect($button.classes()).not.toContain('collapsed')
    expect($button.classes()).toContain('not-collapsed')

    $root.$emit(EVENT_STATE, 'test', false)
    await waitNT(wrapper.vm)
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    $root.$emit(EVENT_STATE, 'test', true)
    await waitNT(wrapper.vm)
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('true')
    expect($button.classes()).not.toContain('collapsed')
    expect($button.classes()).toContain('not-collapsed')

    wrapper.destroy()
  })

  it('responds to private sync state update events', async () => {
    const App = {
      directives: {
        bToggle: VBToggle
      },
      template: '<button v-b-toggle.test>button</button>'
    }

    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')

    const $root = wrapper.vm.$root

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    $root.$emit(EVENT_SYNC_STATE, 'test', true)
    await waitNT(wrapper.vm)
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('true')
    expect($button.classes()).not.toContain('collapsed')
    expect($button.classes()).toContain('not-collapsed')

    $root.$emit(EVENT_SYNC_STATE, 'test', false)
    await waitNT(wrapper.vm)
    expect($button.attributes('aria-controls')).toBe('test')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })
})
