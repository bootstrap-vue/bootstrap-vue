import { mount, createWrapper, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../../tests/utils'
import { ToastPlugin } from '../index'

describe('$bvToast', () => {
  const localVue = new CreateLocalVue()

  beforeAll(() => {
    localVue.use(ToastPlugin)
  })

  it('$bvToast.show() and $bvToast.hide() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h(
          'b-toast',
          {
            props: {
              id: 'test1',
              static: true,
              visible: false,
              noAutoHide: true
            }
          },
          'content'
        )
      }
    })
    const wrapper = mount(App, {
      attachTo: createContainer(),
      localVue
    })

    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.$bvToast).toBeDefined()
    expect(wrapper.vm.$bvToast.show).toBeDefined()
    expect(typeof wrapper.vm.$bvToast.show).toEqual('function')
    expect(wrapper.vm.$bvToast.hide).toBeDefined()
    expect(typeof wrapper.vm.$bvToast.hide).toEqual('function')

    expect(wrapper.find('.toast').exists()).toBe(false)

    wrapper.vm.$bvToast.show('test1')

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('.toast').exists()).toBe(true)

    wrapper.vm.$bvToast.hide('test1')

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('.toast').exists()).toBe(false)

    wrapper.destroy()
  })

  it('$bvModal.toast() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('div', 'app')
      }
    })
    const wrapper = mount(App, {
      attachTo: createContainer(),
      localVue
    })

    expect(wrapper.vm).toBeDefined()

    // `$bvModal.toast`
    expect(wrapper.vm.$bvToast).toBeDefined()
    const bvToast = wrapper.vm.$bvToast
    expect(bvToast.toast).toBeDefined()
    expect(typeof bvToast.toast).toEqual('function')

    // Trigger a toast
    bvToast.toast('message', {
      id: 'test2',
      title: 'title',
      noAutoHide: true
    })

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Find the toast
    const toast = document.querySelector('#test2')
    expect(toast).toBeDefined()
    expect(toast).not.toEqual(null)
    const $toast = createWrapper(toast)
    expect($toast.element.tagName).toBe('DIV')

    // Find  header
    expect($toast.find('.toast-header').exists()).toBe(true)
    expect($toast.find('.toast-header').text()).toContain('title')

    // Find body
    expect($toast.find('.toast-body').exists()).toBe(true)
    expect($toast.find('.toast-body').text()).toContain('message')

    // Find the Close button and click it
    expect($toast.findAll('button').length).toBe(1)
    const $button = $toast.find('button')
    expect($button.classes()).toContain('close')

    await $button.trigger('click')
    await waitRAF()
    await waitRAF()
    await waitRAF()
    await waitRAF()

    // Toast should be gone from DOM
    expect(document.querySelector('#test2')).toBe(null)
  })
})
