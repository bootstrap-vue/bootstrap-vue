import { mount, createWrapper, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../../tests/utils'
import { ModalPlugin } from '../index'

describe('$bvModal', () => {
  const localVue = new CreateLocalVue()

  beforeAll(() => {
    localVue.use(ModalPlugin)
  })

  it('$bvModal.show() and $bvModal.hide() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('b-modal', { props: { static: true, id: 'test1' } }, 'content')
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)

    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.vm.$bvModal).toBeDefined()
    expect(wrapper.vm.$bvModal.show).toBeDefined()
    expect(typeof wrapper.vm.$bvModal.show).toEqual('function')
    expect(wrapper.vm.$bvModal.hide).toBeDefined()
    expect(typeof wrapper.vm.$bvModal.hide).toEqual('function')

    const $modal = wrapper.find('.modal')
    expect($modal.exists()).toBe(true)

    expect($modal.element.style.display).toEqual('none')

    wrapper.vm.$bvModal.show('test1')

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($modal.element.style.display).toEqual('')

    wrapper.vm.$bvModal.hide('test1')

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect($modal.element.style.display).toEqual('none')

    wrapper.destroy()
  })

  it('$bvModal.msgBoxOk() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('div', 'app')
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // `$bvModal.msgBoxOk`
    expect(wrapper.vm.$bvModal).toBeDefined()
    const bvModal = wrapper.vm.$bvModal
    expect(bvModal.msgBoxOk).toBeDefined()

    // Should get a promise as result
    const p = bvModal.msgBoxOk('message', {
      static: true,
      id: 'test2',
      title: 'title'
    })
    expect(p).toBeDefined()
    expect(p).toBeInstanceOf(Promise)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Find the modal
    const modal = document.querySelector('#test2')
    expect(modal).toBeDefined()
    expect(modal).not.toEqual(null)
    const $modal = createWrapper(modal)
    expect($modal.is('div')).toBe(true)

    // Find the OK button and click it
    expect($modal.findAll('button').length).toBe(1)
    const $button = $modal.find('button')
    expect($button.text()).toEqual('OK')
    $button.trigger('click')

    // Promise should now resolve
    const result = await p
    expect(result).toEqual(true)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Modal should be gone from DOM
    expect(document.querySelector('#test2')).toBe(null)
  })

  it('$bvModal.msgBoxConfirm() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('div', 'app')
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // `$bvModal.msgBoxConfirm`
    expect(wrapper.vm.$bvModal).toBeDefined()
    const bvModal = wrapper.vm.$bvModal
    expect(bvModal.msgBoxConfirm).toBeDefined()

    // Should get a promise as result
    const p = bvModal.msgBoxConfirm('message', {
      static: true,
      id: 'test3',
      title: 'title'
    })
    expect(p).toBeDefined()
    expect(p).toBeInstanceOf(Promise)

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Find the modal
    const modal = document.querySelector('#test3')
    expect(modal).toBeDefined()
    expect(modal).not.toEqual(null)
    const $modal = createWrapper(modal)
    expect($modal.is('div')).toBe(true)

    // Find the CANCEL button and click it
    expect($modal.findAll('button').length).toBe(2)
    const $buttons = $modal.findAll('button')
    expect($buttons.at(0).text()).toEqual('Cancel')
    expect($buttons.at(1).text()).toEqual('OK')
    $buttons.at(0).trigger('click')

    // Promise should now resolve
    const result = await p
    expect(result).toEqual(false) // Cancel button

    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    // Modal should be gone from DOM
    expect(document.querySelector('#test3')).toBe(null)
  })
})
