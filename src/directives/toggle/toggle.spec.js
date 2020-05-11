import { mount, createLocalVue } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { VBToggle } from './toggle'

// Emitted control event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to event for toggle state update (emitted by collapse)
const EVENT_STATE = 'bv::collapse::state'

// Listen to event for toggle sync state update (emitted by collapse)
const EVENT_STATE_SYNC = 'bv::collapse::sync::state'

describe('v-b-toggle directive', () => {
  it('works on buttons', async () => {
    const localVue = createLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
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
    })

    const wrapper = mount(App, {
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').attributes('tabindex')).not.toBeDefined()
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').attributes('tabindex')).not.toBeDefined()
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works on passing ID as directive value', async () => {
    const localVue = createLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
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
    })

    const wrapper = mount(App, {
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works on passing ID as directive argument', async () => {
    const localVue = createLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
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
    })

    const wrapper = mount(App, {
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('works with multiple targets, and updates when targets change', async () => {
    const localVue = createLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
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
    })

    const wrapper = mount(App, {
      propsData: {
        target: 'test1'
      },
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')

    const $button = wrapper.find('button')

    expect($button.attributes('aria-controls')).toBe('test1')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')
    expect(spy).not.toHaveBeenCalled()

    await wrapper.setProps({
      target: ['test1', 'test2']
    })

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

    await wrapper.setProps({
      target: ['test2']
    })

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
    const localVue = createLocalVue()
    const spy = jest.fn()

    const App = localVue.extend({
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
    })

    const wrapper = mount(App, {
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    expect(wrapper.find('span').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('span').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('span').classes()).toContain('collapsed')
    expect(wrapper.find('span').classes()).not.toContain('not-collapsed')
    expect(wrapper.find('span').text()).toBe('span')

    const $span = wrapper.find('span')
    await $span.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test')
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('span').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('span').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('span').classes()).toContain('collapsed')
    expect(wrapper.find('span').classes()).not.toContain('not-collapsed')

    // Reacts to SPACE keypress
    await $span.trigger('keydown.space')
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toBeCalledWith('test')
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('span').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('span').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('span').classes()).toContain('collapsed')
    expect(wrapper.find('span').classes()).not.toContain('not-collapsed')

    // Reacts to ENTER keypress
    await $span.trigger('keydown.enter')
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toBeCalledWith('test')
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('span').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('span').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('span').classes()).toContain('collapsed')
    expect(wrapper.find('span').classes()).not.toContain('not-collapsed')

    // Test updating component. should maintain role attribute
    await wrapper.setData({
      text: 'foobar'
    })
    expect(wrapper.find('span').text()).toBe('foobar')
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect(wrapper.find('span').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('span').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('span').classes()).toContain('collapsed')
    expect(wrapper.find('span').classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })

  it('responds to state update events', async () => {
    const localVue = createLocalVue()

    const App = localVue.extend({
      directives: {
        bToggle: VBToggle
      },
      template: '<button v-b-toggle.test>button</button>'
    })

    const wrapper = mount(App, {
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    const $root = wrapper.vm.$root

    $root.$emit(EVENT_STATE, 'test', true)
    await waitNT(wrapper.vm)

    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('button').classes()).not.toContain('collapsed')
    expect(wrapper.find('button').classes()).toContain('not-collapsed')

    $root.$emit(EVENT_STATE, 'test', false)
    await waitNT(wrapper.vm)

    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    $root.$emit(EVENT_STATE, 'test', true)
    await waitNT(wrapper.vm)

    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('button').classes()).not.toContain('collapsed')
    expect(wrapper.find('button').classes()).toContain('not-collapsed')

    wrapper.destroy()
  })

  it('responds to private sync state update events', async () => {
    const localVue = createLocalVue()

    const App = localVue.extend({
      directives: {
        bToggle: VBToggle
      },
      template: '<button v-b-toggle.test>button</button>'
    })

    const wrapper = mount(App, {
      localVue
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    const $root = wrapper.vm.$root

    $root.$emit(EVENT_STATE_SYNC, 'test', true)
    await waitNT(wrapper.vm)

    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('button').classes()).not.toContain('collapsed')
    expect(wrapper.find('button').classes()).toContain('not-collapsed')

    $root.$emit(EVENT_STATE_SYNC, 'test', false)
    await waitNT(wrapper.vm)

    expect(wrapper.find('button').attributes('aria-controls')).toBe('test')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').classes()).toContain('collapsed')
    expect(wrapper.find('button').classes()).not.toContain('not-collapsed')

    wrapper.destroy()
  })
})
