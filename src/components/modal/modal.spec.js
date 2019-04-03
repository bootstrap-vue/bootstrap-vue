import Modal from './modal'
import { mount, createWrapper } from '@vue/test-utils'

const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

describe('modal', () => {
  describe('structure', () => {
    it('has expected default structure', async () => {
      const wrapper = mount(Modal, {
        propsData: {
          id: 'test'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()

      // This outer DIV will go away once we migrate to Portal-Vue
      // As all modals will be lazy
      expect(wrapper.is('div')).toBe(true)
      expect(wrapper.classes().length).toBe(0)

      // Main outer wraper (has z-index, etc)... the stacker div
      const $outer = createWrapper(wrapper.element.firstElementChild)
      expect($outer.is('div')).toBe(true)
      expect($outer.classes().length).toBe(0)
      expect($outer.element.style.position).toEqual('absolute')
      expect($outer.element.style.zIndex).toEqual('2000')

      // Should not have a backdrop
      expect($outer.find('div.modal-backdrop').exists()).toBe(false)

      // Main modal wraper
      const $modal = $outer.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.attributes('id')).toBeDefined()
      expect($modal.attributes('id')).toEqual('test')
      expect($modal.attributes('role')).toBeDefined()
      expect($modal.attributes('role')).toEqual('dialog')
      expect($modal.attributes('tabindex')).toBeDefined()
      expect($modal.attributes('tabindex')).toEqual('-1')
      expect($modal.attributes('aria-hidden')).toBeDefined()
      expect($modal.attributes('aria-hidden')).toEqual('true')
      expect($modal.classes()).toContain('modal')
      expect($modal.classes()).toContain('fade')
      expect($modal.classes()).not.toContain('show')
      expect($modal.classes()).not.toContain('d-block')
      expect($modal.element.style.display).toEqual('none')

      // Modal dialog wrapper
      const $dialog = $modal.find('div.modal-dialog')
      expect($dialog.exists()).toBe(true)

      wrapper.destroy()
    })

    it('has expected structure when lazy', async () => {
      const wrapper = mount(Modal, {
        propsData: {
          lazy: true
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()

      expect(wrapper.is('div')).toBe(true)
      expect(wrapper.classes().length).toBe(0)
      expect(wrapper.findAll('div > *').length).toBe(0) // no content

      wrapper.destroy()
    })

    it('has expected structure when initially open', async () => {
      const wrapper = mount(Modal, {
        attachToDocument: true,
        propsData: {
          id: 'test',
          visible: true
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      await waitAF()
      await wrapper.vm.$nextTick()
      await waitAF()

      // This outer DIV will go away once we migrate to Portal-Vue
      // As all modals will be lazy
      expect(wrapper.is('div')).toBe(true)
      expect(wrapper.classes().length).toBe(0)

      // Main outer wraper (has z-index, etc)... the stacker div
      const $outer = createWrapper(wrapper.element.firstElementChild)
      expect($outer.is('div')).toBe(true)
      expect($outer.classes().length).toBe(0)
      expect($outer.element.style.position).toEqual('absolute')
      expect($outer.element.style.zIndex).toEqual('2000')

      // Should have a backdrop
      const $backdrop = $outer.find('div.modal-backdrop')
      expect($backdrop.exists()).toBe(true)
      expect($backdrop.classes()).toContain('fade')
      expect($backdrop.classes()).toContain('show')

      // Main modal wraper
      const $modal = $outer.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.attributes('id')).toBeDefined()
      expect($modal.attributes('id')).toEqual('test')
      expect($modal.attributes('role')).toBeDefined()
      expect($modal.attributes('role')).toEqual('dialog')
      expect($modal.attributes('tabindex')).toBeDefined()
      expect($modal.attributes('tabindex')).toEqual('-1')
      expect($modal.attributes('aria-hidden')).not.toBeDefined()
      expect($modal.attributes('aria-modal')).toBeDefined()
      expect($modal.attributes('aria-modal')).toEqual('true')
      expect($modal.classes()).toContain('modal')
      expect($modal.classes()).toContain('fade')
      expect($modal.classes()).toContain('show')
      expect($modal.classes()).toContain('d-block')
      expect($modal.element.style.display).toEqual('')

      // Modal dialog wrapper
      const $dialog = $modal.find('div.modal-dialog')
      expect($dialog.exists()).toBe(true)

      wrapper.destroy()
    })
  })

  describe('default button content, classes and attributes', () => {
    it('footer ok and cancel buttons', async () => {
      const wrapper = mount(Modal)
      expect(wrapper).toBeDefined()

      const $buttons = wrapper.findAll('footer button')
      expect($buttons.length).toBe(2)

      // Cancel button (left-most button)
      const $cancel = $buttons.at(0)
      expect($cancel.attributes('type')).toBe('button')
      expect($cancel.classes()).toContain('btn')
      expect($cancel.classes()).toContain('btn-secondary')
      expect($cancel.text()).toContain('Cancel')

      // OK button (right-most button)
      const $ok = $buttons.at(1)
      expect($ok.attributes('type')).toBe('button')
      expect($ok.classes()).toContain('btn')
      expect($ok.classes()).toContain('btn-primary')
      expect($ok.text()).toContain('OK')

      wrapper.destroy()
    })

    it('header close button', async () => {
      const wrapper = mount(Modal)
      expect(wrapper).toBeDefined()

      const $buttons = wrapper.findAll('header button')
      expect($buttons.length).toBe(1)

      // Close button
      const $close = $buttons.at(0)
      expect($close.attributes('type')).toBe('button')
      expect($close.attributes('aria-label')).toBe('Close')
      expect($close.classes()).toContain('close')
    })
  })
})
