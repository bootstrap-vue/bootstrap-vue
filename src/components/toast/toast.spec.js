import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BToast } from './toast'

describe('b-toast', () => {
  beforeAll(() => {
    // Prevent multiple Vue warnings in tests
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterAll(() => {
    console.warn.mockClear()
  })

  it('has expected structure', async () => {
    const wrapper = mount(BToast, {
      attachTo: createContainer(),
      propsData: {
        static: true,
        noAutoHide: true,
        visible: true,
        title: 'title'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-toast')
    expect(wrapper.classes()).toContain('b-toast-prepend')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toEqual('alert')
    expect(wrapper.attributes('aria-live')).toEqual('assertive')
    expect(wrapper.attributes('aria-atomic')).toEqual('true')

    expect(wrapper.find('.toast').exists()).toBe(true)
    const $toast = wrapper.find('.toast')
    expect($toast.element.tagName).toBe('DIV')
    expect($toast.classes()).toContain('toast')
    expect($toast.attributes('tabindex')).toEqual('0')

    expect($toast.find('.toast-header').exists()).toBe(true)
    const $header = $toast.find('.toast-header')
    expect($header.element.tagName).toBe('HEADER')
    expect($header.classes().length).toBe(1)
    expect($header.find('strong').exists()).toBe(true)
    expect($header.find('strong').text()).toEqual('title')
    expect($header.find('strong').classes()).toContain('mr-2')
    expect($header.find('button').exists()).toBe(true)
    expect($header.find('button').classes()).toContain('close')
    expect($header.find('button').classes()).toContain('ml-auto')
    expect($header.find('button').classes()).toContain('mb-1')

    expect($toast.find('.toast-body').exists()).toBe(true)
    const $body = $toast.find('.toast-body')
    expect($body.element.tagName).toBe('DIV')
    expect($body.classes().length).toBe(1)
    expect($body.text()).toEqual('content')

    wrapper.destroy()
  })

  it('visible prop works', async () => {
    const wrapper = mount(BToast, {
      attachTo: createContainer(),
      propsData: {
        static: true,
        noAutoHide: true,
        visible: false,
        title: 'title',
        href: '#foobar'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)

    expect(wrapper.emitted('show')).not.toBeDefined()
    expect(wrapper.emitted('shown')).not.toBeDefined()
    expect(wrapper.emitted('hide')).not.toBeDefined()
    expect(wrapper.emitted('hidden')).not.toBeDefined()

    await wrapper.setProps({ visible: true })
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')

    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('shown')).toBeDefined()
    expect(wrapper.emitted('hide')).not.toBeDefined()
    expect(wrapper.emitted('hidden')).not.toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect(wrapper.emitted('shown').length).toBe(1)

    await wrapper.setProps({ visible: false })
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)

    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('shown')).toBeDefined()
    expect(wrapper.emitted('hide')).toBeDefined()
    expect(wrapper.emitted('hidden')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect(wrapper.emitted('shown').length).toBe(1)
    expect(wrapper.emitted('hide').length).toBe(1)
    expect(wrapper.emitted('hidden').length).toBe(1)

    wrapper.destroy()
  })

  it('alert with link closes on click works', async () => {
    const wrapper = mount(BToast, {
      attachTo: createContainer(),
      propsData: {
        static: true,
        noAutoHide: true,
        visible: true,
        title: 'title',
        href: '#foobar'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')

    const $body = wrapper.find('.toast-body')
    expect($body.element.tagName).toBe('A')
    expect($body.attributes('href')).toEqual('#foobar')

    expect(wrapper.emitted('hide')).not.toBeDefined()
    expect(wrapper.emitted('hidden')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()

    $body.element.focus()
    await $body.trigger('click')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)

    expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)

    expect(wrapper.emitted('hide')).toBeDefined()
    expect(wrapper.emitted('hidden')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()

    wrapper.destroy()
  })

  it('auto-hide works', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BToast, {
      attachTo: createContainer(),
      propsData: {
        static: true,
        noAutoHide: false,
        visible: true,
        title: 'title'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.$_dismissTimer).not.toEqual(null)

    jest.runOnlyPendingTimers()

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)
    expect(wrapper.vm.$_dismissTimer).toBe(null)

    wrapper.destroy()
  })

  it('hover pause works', async () => {
    const wrapper = mount(BToast, {
      attachTo: createContainer(),
      propsData: {
        static: true,
        noAutoHide: false,
        visible: true,
        title: 'title'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.$_dismissTimer).not.toEqual(null)
    await waitNT(wrapper.vm)
    await waitRAF()

    await wrapper.trigger('mouseenter')
    await waitRAF()
    expect(wrapper.vm.$_dismissTimer).toEqual(null)

    await wrapper.trigger('mouseleave')
    await waitRAF()
    expect(wrapper.vm.$_dismissTimer).not.toEqual(null)

    wrapper.destroy()
  })

  it('hover pause has no effect when no-hover-pause is set', async () => {
    const wrapper = mount(BToast, {
      attachTo: createContainer(),
      propsData: {
        static: true,
        noAutoHide: false,
        noHoverPause: true,
        visible: true,
        title: 'title'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm.timer).not.toEqual(null)
    await waitNT(wrapper.vm)
    await waitRAF()

    await wrapper.trigger('mouseenter')
    await waitRAF()
    expect(wrapper.vm.timer).not.toEqual(null)

    await wrapper.trigger('mouseleave')
    await waitRAF()
    expect(wrapper.vm.timer).not.toEqual(null)

    wrapper.destroy()
  })
})
