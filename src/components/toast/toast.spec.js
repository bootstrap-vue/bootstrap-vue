import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import BToast from './toast'

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
      attachToDocument: true,
      stubs: {
        transition: false
      },
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

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-toast')
    expect(wrapper.classes()).toContain('b-toast-prepend')
    expect(wrapper.classes().length).toBe(2)

    expect(wrapper.find('.toast').exists()).toBe(true)
    const $toast = wrapper.find('.toast')
    expect($toast.is('div')).toBe(true)
    expect($toast.classes()).toContain('toast')
    expect($toast.classes()).toContain('fade')
    expect($toast.classes()).toContain('show')
    expect($toast.classes().length).toBe(2)
    expect($toast.attributes('role')).toEqual('alert')
    expect($toast.attributes('aria-live')).toEqual('assertive')
    expect($toast.attributes('aria-atomic')).toEqual('true')
    expect($toast.attributes('tabindex')).toEqual('-1')

    wrapper.destroy()
  })

  // expect(wrapper.element.nodeType).toBe(Node.COMMENT_NODE)
})
