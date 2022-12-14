import { createWrapper, mount } from '@vue/test-utils'
import { isVue3 } from '../../vue'
import { waitNT, waitRAF, getInstanceFromVNode } from '../../../tests/utils'
import { BModal } from './modal'
import { BvModalEvent } from './helpers/bv-modal-event.class'

// The default Z-INDEX for modal backdrop
const DEFAULT_ZINDEX = 1040

describe('modal', () => {
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // Mock `getBCR()` so that the `isVisible(el)` test returns `true`
    // Needed for z-index checks
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 24,
      height: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    // Restore prototype
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  describe('structure', () => {
    it('has expected default structure', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test'
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)

      // Main outer wrapper (has z-index, etc.)... The stacker <div>
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes().length).toBe(0)
      expect(wrapper.element.style.position).toEqual('absolute')
      expect(wrapper.element.style.zIndex).toEqual(`${DEFAULT_ZINDEX}`)

      // Should not have a backdrop
      expect(wrapper.find('div.modal-backdrop').exists()).toBe(false)

      // Main modal wrapper
      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.attributes('id')).toBeDefined()
      expect($modal.attributes('id')).toEqual('test')
      expect($modal.attributes('role')).toBeDefined()
      expect($modal.attributes('role')).toEqual('dialog')
      expect($modal.attributes('aria-hidden')).toBeDefined()
      expect($modal.attributes('aria-hidden')).toEqual('true')
      expect($modal.classes()).toContain('modal')
      expect($modal.element.style.display).toEqual('none')

      // Modal dialog wrapper
      const $dialog = $modal.find('div.modal-dialog')
      expect($dialog.exists()).toBe(true)

      // Modal content wrapper
      const $content = $dialog.find('div.modal-content')
      expect($content.exists()).toBe(true)
      expect($content.attributes('tabindex')).toBeDefined()
      expect($content.attributes('tabindex')).toEqual('-1')

      wrapper.destroy()
    })

    it('has expected default structure when static and lazy', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          lazy: true
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      expect(wrapper.element.nodeType).toEqual(Node.COMMENT_NODE)

      wrapper.destroy()
    })

    it('has expected default structure when not static', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: false
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      expect(wrapper.element.nodeType).toEqual(Node.COMMENT_NODE)

      wrapper.destroy()
    })

    it('has expected structure when initially open', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitRAF()

      // Main outer wrapper (has z-index, etc.)... The stacker <div>
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes().length).toBe(0)
      expect(wrapper.element.style.position).toEqual('absolute')
      expect(wrapper.element.style.zIndex).toEqual(`${DEFAULT_ZINDEX}`)

      // Main modal wrapper
      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.attributes('id')).toBeDefined()
      expect($modal.attributes('id')).toEqual('test')
      expect($modal.attributes('role')).toBeDefined()
      expect($modal.attributes('role')).toEqual('dialog')
      expect($modal.attributes('aria-hidden')).toBeUndefined()
      expect($modal.attributes('aria-modal')).toBeDefined()
      expect($modal.attributes('aria-modal')).toEqual('true')
      expect($modal.classes()).toContain('modal')
      expect($modal.element.style.display).toEqual('block')

      // Should have a backdrop
      const $backdrop = wrapper.find('div.modal-backdrop')
      expect($backdrop.exists()).toBe(true)

      // Modal dialog wrapper
      const $dialog = $modal.find('div.modal-dialog')
      expect($dialog.exists()).toBe(true)

      // Modal content wrapper
      const $content = $dialog.find('div.modal-content')
      expect($content.exists()).toBe(true)
      expect($content.attributes('tabindex')).toBeDefined()
      expect($content.attributes('tabindex')).toEqual('-1')

      wrapper.destroy()
    })

    it('renders appended to body when initially open and not static', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: false,
          id: 'test-target',
          visible: true
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitRAF()
      expect(wrapper.element.nodeType).toEqual(Node.COMMENT_NODE)

      const outer = document.getElementById('test-target___BV_modal_outer_')
      expect(outer).toBeDefined()
      expect(outer).not.toBe(null)

      expect(getInstanceFromVNode(outer)).toBeDefined() // Target
      if (!isVue3) {
        expect(getInstanceFromVNode(outer).$options.name).toBe('BVTransporterTarget')
      }
      expect(outer.parentElement).toBeDefined()
      expect(outer.parentElement).toBe(document.body)

      // Destroy modal
      wrapper.destroy()

      await waitNT(wrapper.vm)
      await waitRAF()

      // Should no longer be in document
      expect(outer.parentElement).toEqual(null)
    })

    it('has expected structure when closed after being initially open', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()

      // Main outer wrapper (has z-index, etc.)... The stacker <div>
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes().length).toBe(0)
      expect(wrapper.element.style.position).toEqual('absolute')
      expect(wrapper.element.style.zIndex).toEqual(`${DEFAULT_ZINDEX}`)

      // Main modal wrapper
      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.attributes('aria-hidden')).toBeUndefined()
      expect($modal.attributes('aria-modal')).toBeDefined()
      expect($modal.attributes('aria-modal')).toEqual('true')
      expect($modal.element.style.display).toEqual('block')

      // Should have a backdrop
      const $backdrop = wrapper.find('div.modal-backdrop')
      expect($backdrop.exists()).toBe(true)

      // Now we close the modal via the value prop
      await wrapper.setProps({
        visible: false
      })
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      expect($modal.attributes('aria-hidden')).toBeDefined()
      expect($modal.attributes('aria-hidden')).toEqual('true')
      expect($modal.attributes('aria-modal')).toBeUndefined()
      expect($modal.element.style.display).toEqual('none')

      // Backdrop should be removed
      expect(wrapper.find('div.modal-backdrop').exists()).toBe(false)

      wrapper.destroy()
    })

    it('title-html prop works', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          titleHtml: '<em>title</em>'
        }
      })

      expect(wrapper.vm).toBeDefined()

      // Modal title
      const $title = wrapper.find('.modal-title')
      expect($title.exists()).toBe(true)
      expect($title.html()).toContain('<em>title</em>')

      wrapper.destroy()
    })

    it('has correct header tag when "header-tag" prop is set', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          headerTag: 'div'
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $header = wrapper.find('.modal-header')
      expect($header.exists()).toBe(true)
      expect($header.element.tagName).toBe('DIV')

      wrapper.destroy()
    })

    it('has correct footer tag when "footer-tag" prop is set', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          footerTag: 'div'
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $footer = wrapper.find('.modal-footer')
      expect($footer.exists()).toBe(true)
      expect($footer.element.tagName).toBe('DIV')

      wrapper.destroy()
    })
  })

  describe('default button content, classes and attributes', () => {
    // We may want to move these tests into individual files for manageability
    it('default footer ok and cancel buttons', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true
        }
      })
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

    it('default header close button', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true
        }
      })
      expect(wrapper).toBeDefined()

      const $buttons = wrapper.findAll('header button')
      expect($buttons.length).toBe(1)

      // Close button
      const $close = $buttons.at(0)
      expect($close.attributes('type')).toBe('button')
      expect($close.attributes('aria-label')).toBe('Close')
      expect($close.classes()).toContain('close')

      wrapper.destroy()
    })

    it('ok-title-html and cancel-title-html works', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          okTitleHtml: '<em>ok</em>',
          cancelTitleHtml: '<em>cancel</em>'
        }
      })
      expect(wrapper).toBeDefined()

      const $buttons = wrapper.findAll('footer button')
      expect($buttons.length).toBe(2)

      // Cancel button (left-most button)
      const $cancel = $buttons.at(0)
      expect($cancel.attributes('type')).toBe('button')
      expect($cancel.text()).toContain('cancel')
      // `v-html` is applied to a span
      expect($cancel.html()).toContain('<em>cancel</em>')

      // OK button (right-most button)
      const $ok = $buttons.at(1)
      expect($ok.attributes('type')).toBe('button')
      expect($ok.text()).toContain('ok')
      // `v-html` is applied to a span
      expect($ok.html()).toContain('<em>ok</em>')

      wrapper.destroy()
    })

    it('modal-ok and modal-cancel button content slots works', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true
        },
        slots: {
          'modal-ok': '<em>bar ok</em>',
          'modal-cancel': '<em>foo cancel</em>'
        }
      })
      expect(wrapper).toBeDefined()

      const $buttons = wrapper.findAll('footer button')
      expect($buttons.length).toBe(2)

      // Cancel button (left-most button)
      const $cancel = $buttons.at(0)
      expect($cancel.attributes('type')).toBe('button')
      expect($cancel.text()).toContain('foo cancel')
      // `v-html` is applied to a span
      expect($cancel.html()).toContain('<em>foo cancel</em>')

      // OK button (right-most button)
      const $ok = $buttons.at(1)
      expect($ok.attributes('type')).toBe('button')
      expect($ok.text()).toContain('bar ok')
      // `v-html` is applied to a span
      expect($ok.html()).toContain('<em>bar ok</em>')

      wrapper.destroy()
    })
  })

  describe('button and event functionality', () => {
    it('header close button triggers modal close and is preventable', async () => {
      let cancelHide = true
      let trigger = null
      let event = null
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        },
        listeners: {
          hide: bvEvent => {
            if (cancelHide) {
              bvEvent.preventDefault()
            }
            trigger = bvEvent.trigger
            event = bvEvent
          }
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')

      const $buttons = wrapper.findAll('header button')
      expect($buttons.length).toBe(1)

      // Close button
      const $close = $buttons.at(0)
      expect($close.attributes('type')).toBe('button')
      expect($close.attributes('aria-label')).toBe('Close')
      expect($close.classes()).toContain('close')

      expect(wrapper.emitted('hide')).toBeUndefined()
      expect(trigger).toEqual(null)
      expect(event).toEqual(null)

      // Try and close modal (but we prevent it)
      await $close.trigger('click')
      expect(trigger).toEqual('headerclose')
      expect(event).toBeInstanceOf(BvModalEvent)

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should still be open
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal (and not prevent it)
      cancelHide = false
      trigger = null
      event = null
      await $close.trigger('click')
      expect(trigger).toEqual('headerclose')
      expect(event).toBeInstanceOf(BvModalEvent)

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      wrapper.destroy()
    })

    it('footer OK and CANCEL buttons trigger modal close and are preventable', async () => {
      let cancelHide = true
      let trigger = null
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        },
        listeners: {
          hide: bvEvent => {
            if (cancelHide) {
              bvEvent.preventDefault()
            }
            trigger = bvEvent.trigger
          }
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')

      const $buttons = wrapper.findAll('footer button')
      expect($buttons.length).toBe(2)

      // Cancel button (left-most button)
      const $cancel = $buttons.at(0)
      expect($cancel.text()).toContain('Cancel')

      // OK button (right-most button)
      const $ok = $buttons.at(1)
      expect($ok.text()).toContain('OK')

      expect(wrapper.emitted('hide')).toBeUndefined()
      expect(trigger).toEqual(null)

      // Try and close modal (but we prevent it)
      await $ok.trigger('click')
      expect(trigger).toEqual('ok')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should still be open
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal (and not prevent it)
      cancelHide = false
      trigger = null
      await $cancel.trigger('click')
      expect(trigger).toEqual('cancel')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      // Modal should have emitted these events
      expect(wrapper.emitted('ok')).toBeDefined()
      expect(wrapper.emitted('ok').length).toBe(1)
      expect(wrapper.emitted('cancel')).toBeDefined()
      expect(wrapper.emitted('cancel').length).toBe(1)
      expect(wrapper.emitted('hidden')).toBeDefined()
      expect(wrapper.emitted('hidden').length).toBe(1)

      wrapper.destroy()
    })

    it('pressing ESC closes modal', async () => {
      let trigger = null
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        },
        listeners: {
          hide: bvEvent => {
            trigger = bvEvent.trigger
          }
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')

      expect(wrapper.emitted('hide')).toBeUndefined()
      expect(trigger).toEqual(null)

      // Try and close modal via ESC
      await $modal.trigger('keydown.esc')
      expect(trigger).toEqual('esc')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      // Modal should have emitted these events
      expect(wrapper.emitted('hide')).toBeDefined()
      expect(wrapper.emitted('hide').length).toBe(1)
      expect(wrapper.emitted('hidden')).toBeDefined()
      expect(wrapper.emitted('hidden').length).toBe(1)

      expect(wrapper.emitted('ok')).toBeUndefined()
      expect(wrapper.emitted('cancel')).toBeUndefined()

      wrapper.destroy()
    })

    it('click outside closes modal', async () => {
      let trigger = null
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        },
        listeners: {
          hide: bvEvent => {
            trigger = bvEvent.trigger
          }
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')

      expect(wrapper.emitted('hide')).toBeUndefined()
      expect(trigger).toEqual(null)

      // Try and close modal via click out
      await $modal.trigger('click')
      expect(trigger).toEqual('backdrop')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      // Modal should have emitted these events
      expect(wrapper.emitted('hide')).toBeDefined()
      expect(wrapper.emitted('hide').length).toBe(1)
      expect(wrapper.emitted('hidden')).toBeDefined()
      expect(wrapper.emitted('hidden').length).toBe(1)

      expect(wrapper.emitted('ok')).toBeUndefined()
      expect(wrapper.emitted('cancel')).toBeUndefined()

      wrapper.destroy()
    })

    it('mousedown inside followed by mouse up outside (click) does not close modal', async () => {
      let trigger = null
      let called = false
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true
        },
        listeners: {
          hide: bvEvent => {
            called = true
            trigger = bvEvent.trigger
          }
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      const $dialog = wrapper.find('div.modal-dialog')
      expect($dialog.exists()).toBe(true)

      const $footer = wrapper.find('footer.modal-footer')
      expect($footer.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')

      expect(wrapper.emitted('hide')).toBeUndefined()
      expect(trigger).toEqual(null)

      // Try and close modal via a "dragged" click out
      // starting from inside modal and finishing on backdrop
      await $dialog.trigger('mousedown')
      await $modal.trigger('mouseup')
      await $modal.trigger('click')
      await waitRAF()
      await waitRAF()
      expect(called).toEqual(false)
      expect(trigger).toEqual(null)

      // Modal should not be closed
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal via a "dragged" click out
      // starting from inside modal and finishing on backdrop
      await $footer.trigger('mousedown')
      await $modal.trigger('mouseup')
      await $modal.trigger('click')
      await waitRAF()
      await waitRAF()
      expect(called).toEqual(false)
      expect(trigger).toEqual(null)

      // Modal should not be closed
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal via click out
      await $modal.trigger('click')
      await waitRAF()
      await waitRAF()
      expect(called).toEqual(true)
      expect(trigger).toEqual('backdrop')

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      wrapper.destroy()
    })

    it('$root bv::show::modal and bv::hide::modal work', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: false
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('none')

      // Try and open modal via `bv::show::modal`
      wrapper.vm.$root.$emit('bv::show::modal', 'test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be open
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal via `bv::hide::modal`
      wrapper.vm.$root.$emit('bv::hide::modal', 'test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      wrapper.destroy()
    })

    it('$root bv::toggle::modal works', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: false
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('none')

      // Try and open modal via `bv::toggle::modal`
      wrapper.vm.$root.$emit('bv::toggle::modal', 'test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be open
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal via `bv::toggle::modal`
      wrapper.vm.$root.$emit('bv::toggle::modal', 'test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      // Try and open modal via `bv::toggle::modal` with wrong ID
      wrapper.vm.$root.$emit('bv::toggle::modal', 'not-test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should not be open
      expect($modal.element.style.display).toEqual('none')

      wrapper.destroy()
    })

    it('show event is cancellable', async () => {
      let prevent = true
      let called = 0
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: false
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('none')

      wrapper.vm.$on('show', bvEvent => {
        called = true
        if (prevent) {
          bvEvent.preventDefault()
        }
      })

      // Try and open modal via `bv::show::modal`
      wrapper.vm.$root.$emit('bv::show::modal', 'test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should not open
      expect(called).toBe(true)
      expect($modal.element.style.display).toEqual('none')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Allow modal to open
      prevent = false
      called = false

      // Try and open modal via `bv::show::modal`
      wrapper.vm.$root.$emit('bv::show::modal', 'test')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be open
      expect(called).toBe(true)
      expect($modal.element.style.display).toEqual('block')

      wrapper.destroy()
    })

    it('instance .toggle() methods works', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: false
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('none')

      // Try and open modal via `.toggle()` method
      wrapper.vm.toggle()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be open
      expect($modal.element.style.display).toEqual('block')

      // Try and close modal via `.toggle()` method
      wrapper.vm.toggle()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      wrapper.destroy()
    })

    it('modal closes when no-stacking is true and another modal opens', async () => {
      const wrapper = mount(BModal, {
        attachTo: document.body,
        propsData: {
          static: true,
          id: 'test',
          visible: true,
          noStacking: true
        }
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')

      // Simulate an other modal opening (by emitting a fake BvEvent)
      // `bvEvent.vueTarget` is normally a Vue instance, but in this
      // case we just use a random object since we are checking inequality
      wrapper.vm.$root.$emit('bv::modal::show', { vueTarget: Number })

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')

      wrapper.destroy()
    })
  })

  describe('focus management', () => {
    it('returns focus to previous active element when return focus not set and not using v-b-toggle', async () => {
      const App = {
        render(h) {
          return h('div', [
            h('button', { class: 'trigger', attrs: { id: 'trigger', type: 'button' } }, 'trigger'),
            h(BModal, { props: { static: true, id: 'test', visible: false } }, 'modal content')
          ])
        }
      }
      const wrapper = mount(App, {
        attachTo: document.body
      })

      expect(wrapper.vm).toBeDefined()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitNT(wrapper.vm)

      const $button = wrapper.find('button.trigger')
      expect($button.exists()).toBe(true)
      expect($button.element.tagName).toBe('BUTTON')

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('none')
      expect(document.activeElement).toBe(document.body)

      // Set the active element to the button
      $button.element.focus()
      expect(document.activeElement).toBe($button.element)

      // Try and open modal via `.toggle()` method
      wrapper.findComponent(BModal).vm.toggle()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be open
      expect($modal.element.style.display).toEqual('block')
      expect(document.activeElement).not.toBe(document.body)
      expect(document.activeElement).not.toBe($button.element)
      expect($modal.element.contains(document.activeElement)).toBe(true)

      // Try and close modal via `.toggle()` method
      wrapper.findComponent(BModal).vm.toggle()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')
      expect(document.activeElement).toBe($button.element)

      wrapper.destroy()
    })

    it('returns focus to element specified in toggle() method', async () => {
      const App = {
        render(h) {
          return h('div', [
            h('button', { class: 'trigger', attrs: { id: 'trigger', type: 'button' } }, 'trigger'),
            h(
              'button',
              { class: 'return-to', attrs: { id: 'return-to', type: 'button' } },
              'trigger'
            ),
            h(BModal, { props: { static: true, id: 'test', visible: false } }, 'modal content')
          ])
        }
      }
      const wrapper = mount(App, {
        attachTo: document.body
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

      const $button = wrapper.find('button.trigger')
      expect($button.exists()).toBe(true)
      expect($button.element.tagName).toBe('BUTTON')

      const $button2 = wrapper.find('button.return-to')
      expect($button2.exists()).toBe(true)
      expect($button2.element.tagName).toBe('BUTTON')

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('none')
      expect(document.activeElement).toBe(document.body)

      // Set the active element to the button
      $button.element.focus()
      expect(document.activeElement).toBe($button.element)

      // Try and open modal via `.toggle()` method
      wrapper.findComponent(BModal).vm.toggle('button.return-to')

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be open
      expect($modal.element.style.display).toEqual('block')
      expect(document.activeElement).not.toBe(document.body)
      expect(document.activeElement).not.toBe($button.element)
      expect(document.activeElement).not.toBe($button2.element)
      expect($modal.element.contains(document.activeElement)).toBe(true)

      // Try and close modal via `.toggle()` method
      wrapper.findComponent(BModal).vm.toggle()

      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()
      await waitNT(wrapper.vm)
      await waitRAF()

      // Modal should now be closed
      expect($modal.element.style.display).toEqual('none')
      expect(document.activeElement).toBe($button2.element)

      wrapper.destroy()
    })

    it('if focus leaves modal it returns to modal', async () => {
      const App = {
        render(h) {
          return h('div', [
            h('button', { attrs: { id: 'button', type: 'button' } }, 'Button'),
            h(BModal, { props: { static: true, id: 'test', visible: true } }, 'Modal content')
          ])
        }
      }
      const wrapper = mount(App, {
        attachTo: document.body
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

      const $button = wrapper.find('#button')
      expect($button.exists()).toBe(true)
      expect($button.element.tagName).toBe('BUTTON')

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      const $content = $modal.find('div.modal-content')
      expect($content.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')
      expect(document.activeElement).not.toBe(document.body)
      expect(document.activeElement).toBe($content.element)

      // Try and focus the external button
      $button.element.focus()
      await $button.trigger('focusin')
      expect(document.activeElement).not.toBe($button.element)
      expect(document.activeElement).toBe($content.element)

      // Emulate TAB by focusing the `bottomTrap` span element
      // Should focus first button in modal (in the header)
      const $bottomTrap = createWrapper(wrapper.findComponent(BModal).vm.$refs['bottom-trap'])
      expect($bottomTrap.exists()).toBe(true)
      expect($bottomTrap.element.tagName).toBe('SPAN')
      // Find the close (x) button (it is the only one with the `.close` class)
      const $closeButton = $modal.find('button.close')
      expect($closeButton.exists()).toBe(true)
      expect($closeButton.element.tagName).toBe('BUTTON')
      // Focus the tab trap
      $bottomTrap.element.focus()
      await $bottomTrap.trigger('focusin')
      expect(document.activeElement).not.toBe($bottomTrap.element)
      expect(document.activeElement).not.toBe($content.element)
      // The close (x) button (first tabable in modal) should be focused
      expect(document.activeElement).toBe($closeButton.element)

      // Emulate CTRL-TAB by focusing the `topTrap` div element
      // Should focus last button in modal (in the footer)
      const $topTrap = createWrapper(wrapper.findComponent(BModal).vm.$refs['top-trap'])
      expect($topTrap.exists()).toBe(true)
      expect($topTrap.element.tagName).toBe('SPAN')
      // Find the OK button (it is the only one with `.btn-primary` class)
      const $okButton = $modal.find('button.btn.btn-primary')
      expect($okButton.exists()).toBe(true)
      expect($okButton.element.tagName).toBe('BUTTON')
      // Focus the tab trap
      $topTrap.element.focus()
      await $topTrap.trigger('focusin')
      expect(document.activeElement).not.toBe($topTrap.element)
      expect(document.activeElement).not.toBe($bottomTrap.element)
      expect(document.activeElement).not.toBe($content.element)
      // The OK button (last tabbable in modal) should be focused
      expect(document.activeElement).toBe($okButton.element)

      wrapper.destroy()
    })

    it('it allows focus for elements when "no-enforce-focus" enabled', async () => {
      const App = {
        render(h) {
          return h('div', [
            h('button', { attrs: { id: 'button1', type: 'button' } }, 'Button 1'),
            h('button', { attrs: { id: 'button2', type: 'button' } }, 'Button 2'),
            h(
              BModal,
              {
                props: {
                  static: true,
                  id: 'test',
                  visible: true,
                  noEnforceFocus: true
                }
              },
              'Modal content'
            )
          ])
        }
      }
      const wrapper = mount(App, {
        attachTo: document.body
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

      const $button1 = wrapper.find('#button1')
      expect($button1.exists()).toBe(true)
      expect($button1.element.tagName).toBe('BUTTON')

      const $button2 = wrapper.find('#button2')
      expect($button2.exists()).toBe(true)
      expect($button2.element.tagName).toBe('BUTTON')

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      const $content = $modal.find('div.modal-content')
      expect($content.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')
      expect(document.activeElement).not.toBe(document.body)
      expect(document.activeElement).toBe($content.element)

      // Try to focus button1
      $button1.element.focus()
      await $button1.trigger('focusin')
      expect(document.activeElement).toBe($button1.element)
      expect(document.activeElement).not.toBe($content.element)

      // Try to focus button2
      $button2.element.focus()
      await $button2.trigger('focusin')
      expect(document.activeElement).toBe($button2.element)
      expect(document.activeElement).not.toBe($content.element)

      wrapper.destroy()
    })

    it('it allows focus for elements in "ignore-enforce-focus-selector" prop', async () => {
      const App = {
        render(h) {
          return h('div', [
            h('button', { attrs: { id: 'button1', type: 'button' } }, 'Button 1'),
            h('button', { attrs: { id: 'button2', type: 'button' } }, 'Button 2'),
            h(
              BModal,
              {
                props: {
                  static: true,
                  id: 'test',
                  visible: true,
                  ignoreEnforceFocusSelector: '#button1'
                }
              },
              'Modal content'
            )
          ])
        }
      }
      const wrapper = mount(App, {
        attachTo: document.body
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

      const $button1 = wrapper.find('#button1')
      expect($button1.exists()).toBe(true)
      expect($button1.element.tagName).toBe('BUTTON')

      const $button2 = wrapper.find('#button2')
      expect($button2.exists()).toBe(true)
      expect($button2.element.tagName).toBe('BUTTON')

      const $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      const $content = $modal.find('div.modal-content')
      expect($content.exists()).toBe(true)

      expect($modal.element.style.display).toEqual('block')
      expect(document.activeElement).not.toBe(document.body)
      expect(document.activeElement).toBe($content.element)

      // Try to focus button1
      $button1.element.focus()
      await $button1.trigger('focusin')
      expect(document.activeElement).toBe($button1.element)
      expect(document.activeElement).not.toBe($content.element)

      // Try to focus button2
      $button2.element.focus()
      await $button2.trigger('focusin')
      expect(document.activeElement).not.toBe($button2.element)
      expect(document.activeElement).toBe($content.element)

      wrapper.destroy()
    })
  })
})
