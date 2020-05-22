import { mount } from '@vue/test-utils'
import { VBModal } from './modal'

const EVENT_SHOW = 'bv::show::modal'

describe('v-b-modal directive', () => {
  it('works on buttons', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bModal: VBModal
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<button v-b-modal.test>button</button>'
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('button').attributes('tabindex')).not.toBeDefined()
    expect(wrapper.find('button').attributes('role')).not.toBeDefined()
    expect(spy).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    await $button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $button.element)

    wrapper.destroy()
  })

  it('works on links', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bModal: VBModal
      },
      data() {
        return {
          text: 'link'
        }
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<a href="#" v-b-modal.test>{{ text }}</a>'
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('A')
    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('a').attributes('role')).toBe('button')
    expect(wrapper.find('a').attributes('tabindex')).not.toBeDefined()
    expect(wrapper.find('a').text()).toBe('link')

    const $link = wrapper.find('a')
    await $link.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $link.element)
    expect(wrapper.find('a').attributes('role')).toBe('button')
    expect(wrapper.find('a').attributes('tabindex')).not.toBeDefined()

    wrapper.destroy()
  })

  it('works on non-buttons', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bModal: VBModal
      },
      data() {
        return {
          text: 'span'
        }
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<span v-b-modal.test>{{ text }}</span>'
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    expect(wrapper.find('span').text()).toBe('span')

    const $span = wrapper.find('span')
    await $span.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $span.element)
    expect(wrapper.find('span').attributes('role')).toBe('button')

    // Test updating component. should maintain role attribute
    await wrapper.setData({
      text: 'foobar'
    })
    expect(wrapper.find('span').text()).toBe('foobar')
    expect(wrapper.find('span').attributes('role')).toBe('button')

    wrapper.destroy()
  })

  it('works on non-buttons using keydown space', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bModal: VBModal
      },
      data() {
        return {
          text: 'span'
        }
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<span v-b-modal.test>{{ text }}</span>'
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').attributes('tabindex')).toBe('0')
    expect(wrapper.find('span').text()).toBe('span')

    const $span = wrapper.find('span')
    await $span.trigger('keydown.space')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $span.element)
    expect(wrapper.find('span').attributes('role')).toBe('button')

    wrapper.destroy()
  })

  it('works on non-buttons using keydown enter', async () => {
    const spy = jest.fn()
    const App = {
      directives: {
        bModal: VBModal
      },
      data() {
        return {
          text: 'span'
        }
      },
      mounted() {
        this.$root.$on(EVENT_SHOW, spy)
      },
      beforeDestroy() {
        this.$root.$off(EVENT_SHOW, spy)
      },
      template: '<span tabindex="0" v-b-modal.test>{{ text }}</span>'
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').attributes('role')).toBe('button')
    expect(wrapper.find('span').text()).toBe('span')

    const $span = wrapper.find('span')
    await $span.trigger('keydown.enter')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toBeCalledWith('test', $span.element)
    expect(wrapper.find('span').attributes('role')).toBe('button')

    wrapper.destroy()
  })
})
