import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BToast, ToastPlugin } from './index'

const localVue = new CreateLocalVue()

const TIMEOUT = 3000
const INTERVAL = 50
const setTO = window.setTimeout

const waitForExpect = function waitForExpect(
  expectationFn,
  timeout = TIMEOUT,
  interval = INTERVAL
) {
  interval = interval < 1 ? 1 : interval
  const maxTries = Math.ceil(timeout / interval)
  let tries = 0
  return new Promise((resolve, reject) => {
    const rejectOrRerun = error => {
      if (tries > maxTries) {
        reject(error)
      } else {
        setTO(runExpectation, interval)
      }
    }
    const runExpectation = () => {
      tries += 1
      try {
        Promise.resolve(expectationFn())
          .then(resolve)
          .catch(rejectOrRerun)
      } catch (error) {
        rejectOrRerun(error)
      }
    }
    setTO(runExpectation, 0)
  })
}

describe('b-toast', () => {
  beforeAll(() => {
    localVue.use(ToastPlugin)
    // Prevent multiple Vue warnings in tests
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterAll(() => {
    console.warn.mockClear()
  })

  it('has expected structure', async () => {
    const wrapper = mount(BToast, {
      attachToDocument: true,
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

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-toast')
    expect(wrapper.classes()).toContain('b-toast-prepend')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toEqual('alert')
    expect(wrapper.attributes('aria-live')).toEqual('assertive')
    expect(wrapper.attributes('aria-atomic')).toEqual('true')

    expect(wrapper.find('.toast').exists()).toBe(true)
    const $toast = wrapper.find('.toast')
    expect($toast.is('div')).toBe(true)
    expect($toast.classes()).toContain('toast')
    expect($toast.attributes('tabindex')).toEqual('0')

    expect($toast.find('.toast-header').exists()).toBe(true)
    const $header = $toast.find('.toast-header')
    expect($header.is('header')).toBe(true)
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
    expect($body.is('div')).toBe(true)
    expect($body.classes().length).toBe(1)
    expect($body.text()).toEqual('content')

    wrapper.destroy()
  })

  it('visible prop works', async () => {
    const app = {
      template: `
        <div>
          <b-toast
            :visible="false"
            static
            no-auto-hide
            title="title"
          >
            content
          </b-toast>
        </div>
      `
    }
    const wrapper = mount(app, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    const $toast = wrapper.find(BToast)
    expect($toast.exists()).toBe(true)
    expect($toast.isVueInstance()).toBe(true)
    expect($toast.element.nodeType).toBe(Node.COMMENT_NODE)

    expect($toast.emitted('show')).not.toBeDefined()
    expect($toast.emitted('shown')).not.toBeDefined()
    expect($toast.emitted('hide')).not.toBeDefined()
    expect($toast.emitted('hidden')).not.toBeDefined()

    $toast.setProps({
      visible: true
    })

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($toast.emitted('show')).toBeDefined()
    expect($toast.emitted('show').length).toBe(1)
    // For some reason vue-test-utils beta.30 doesn't emit
    // the afterEnter or afterLeave events for transition
    // await waitForExpect(() => {
    //   expect($toast.emitted('shown')).toBeDefined()
    // }, 1000)
    // expect($toast.emitted('shown').length).toBe(1)
    expect($toast.emitted('hide')).not.toBeDefined()
    expect($toast.emitted('hidden')).not.toBeDefined()
    // expect($toast.element.nodeType).toBe(Node.ELEMENT_NODE)

    $toast.setProps({
      visible: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($toast.emitted('hide')).toBeDefined()
    expect($toast.emitted('hide').length).toBe(1)
    expect($toast.emitted('show').length).toBe(1)
    // For some reason vue-test-utils beta.30 doesn't emit
    // the afterEnter or afterLeave events for transition
    // expect($toast.emitted('shown').length).toBe(1)
    // await waitForExpect(() => {
    //  expect($toast.emitted('hidden')).toBeDefined()
    // }, 1000)
    // expect($toast.emitted('hidden').length).toBe(1)
    // expect($toast.element.nodeType).toBe(Node.COMMENT_NODE)

    wrapper.destroy()
  })

  it('toast with link closes on click works', async () => {
    const wrapper = mount(BToast, {
      attachToDocument: true,
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

    expect(wrapper.isVueInstance()).toBe(true)
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)

    const $body = wrapper.find('.toast-body')
    expect($body.is('a')).toBe(true)
    expect($body.attributes('href')).toEqual('#foobar')

    expect(wrapper.emitted('hide')).not.toBeDefined()
    expect(wrapper.emitted('hidden')).not.toBeDefined()
    expect(wrapper.emitted('change')).not.toBeDefined()

    $body.trigger('click')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('hide')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    // For some reason vue-test-utils beta.30 doesn't emit
    // the afterEnter or afterLeave events for transition
    // expect(wrapper.emitted('hidden')).toBeDefined()
    // expect(wrapper.html()).toBe('')

    wrapper.destroy()
  })

  it('auto-hide works', async () => {
    jest.useFakeTimers()
    const wrapper = mount(BToast, {
      attachToDocument: true,
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

    expect(wrapper.isVueInstance()).toBe(true)
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.vm.timer).not.toEqual(null)

    jest.runOnlyPendingTimers()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()

    // For some reason vue-test-utils beta.30 doesn't emit
    // the afterEnter or afterLeave events for transition
    // expect(wrapper.is('div')).not.toBe(true)
    // expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)
    expect(wrapper.vm.timer).toBe(null)

    wrapper.destroy()
  })

  it('hover pause works', async () => {
    const wrapper = mount(BToast, {
      attachToDocument: true,
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

    expect(wrapper.isVueInstance()).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.vm.timer).not.toEqual(null)

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.timer).toEqual(null)

    wrapper.trigger('mouseleave')
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.vm.$forceUpdate()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.timer).not.toEqual(null)

    wrapper.destroy()
  })

  it('hover pause has no effect when no-hover-pause is set', async () => {
    const wrapper = mount(BToast, {
      attachToDocument: true,
      localVue: localVue,
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

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.vm.timer).not.toBe(null)

    wrapper.trigger('mouseenter')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.timer).not.toBe(null)

    wrapper.trigger('mouseleave')
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.timer).not.toBe(null)

    wrapper.destroy()
  })
})
