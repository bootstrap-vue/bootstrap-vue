import modalPlugin from './index'
import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'

const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

describe('$bvModal', () => {
  const localVue = new CreateLocalVue()
  localVue.use(modalPlugin)

  it('$bvModal.show() and $bvModal.hide() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('b-modal', { id: 'test1' }, 'content')
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)

    await wrapper.vm.nextTick()
    await waitAF()

    expect(wrapper.vm.$bvModal).toBeDefined()
    expect(wrapper.vm.$bvModal.show).toBeDefined()
    expect(typeof wrapper.vm.$bvModal.show).toEqual('function')
    expect(wrapper.vm.$bvModal.hide).toBeDefined()
    expect(typeof wrapper.vm.$bvModal.hide).toEqual('function')

    const $modal = wrapper.find('.modal')
    expect($modal.exists()).toBe(true)

    expect($modal.element.style('display')).toEqual('none')

    wrapper.vm.$bvModal.show('test1')

    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()

    expect($modal.element.style('display')).toEqual('')

    wrapper.vm.$bvModal.hide('test1')

    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()

    expect($modal.element.style('display')).toEqual('none')

    wrapper.destroy()
  })

  it('$bvModal.msgBoxOk() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('div', {}, 'app')
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // $bvModal.msgBoxOk
    expect(wrapper.vm.$bvModal).toBeDefined()
    const bvModal = wrapper.vm.$bvModal
    expect(bvModal.msgBoxOk).toBeDefined()

    // Should get a promise as result
    const p = bvModal.msgBoxOk('message', {
      id: 'test2',
      title: 'title'
    })
    expect(p).toBeDefined()
    expect(p).toBeInstanceOf(Promise)
    
    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()

    // Find the modal
    const modal = document.select('#test2')
    expect(modal).toBeDefined()
    $modal = createWrapper(modal)
    expect($modal.is('div')).toBe(true)

    // Find the OK button and click it
    expect($modal.findAll('button').length).toBe(1)
    const $button = $modal.find('button')
    expect($button.text()).toEqual('OK')
    $button.trigger('click')

    // Promise should now resolve.
    const result = await p
    expect(result).toEqual('true')
    
    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()

    // Modal should be gone from DOM
    expect($modal.$el.parentNode).toBe(null)
  })

  it('$bvModal.msgBoxConfirm() works', async () => {
    const App = localVue.extend({
      render(h) {
        return h('div', {}, 'app')
      }
    })
    const wrapper = mount(App, {
      attachToDocument: true,
      localVue: localVue
    })

    expect(wrapper.isVueInstance()).toBe(true)

    // $bvModal.msgBoxConfirm
    expect(wrapper.vm.$bvModal).toBeDefined()
    const bvModal = wrapper.vm.$bvModal
    expect(bvModal.msgBoxConfirm).toBeDefined()

    // Should get a promise as result
    const p = bvModal.msgBoxConfirm('message', {
      id: 'test3',
      title: 'title'
    })
    expect(p).toBeDefined()
    expect(p).toBeInstanceOf(Promise)
    
    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()

    // Find the modal
    const modal = document.select('#test3')
    expect(modal).toBeDefined()
    $modal = createWrapper(modal)
    expect($modal.is('div')).toBe(true)

    // Find the CANCEL button and click it
    expect($modal.findAll('button').length).toBe(2)
    $buttons = $modal.findAll('button')
    expect($button.at(0).text()).toEqual('Cancel')
    expect($button.at(1).text()).toEqual('OK')
    $button.at(0).trigger('click')

    // Promise should now resolve.
    const result = await p
    expect(result).toEqual('false') // cancel button
    
    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()
    await wrapper.vm.nextTick()
    await waitAF()

    // Modal should be gone from DOM
    expect($modal.$el.parentNode).toBe(null)
  })
})
