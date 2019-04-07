import Vue from 'vue'
import modalManager from './helpers/modal-manager'
import BvModalEvent from './helpers/bv-modal-event.class'
import BButton from '../button/button'
import BButtonClose from '../button/button-close'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import observeDom from '../../utils/observe-dom'
import KeyCodes from '../../utils/key-codes'
import { inBrowser } from '../../utils/env'
import { getComponentConfig } from '../../utils/config'
import { stripTags } from '../../utils/html'
import { contains, eventOff, eventOn, isVisible, select } from '../../utils/dom'

const NAME = 'BModal'

// ObserveDom config to detect changes in modal content
// so that we can adjust the modal padding if needed
const OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class']
}

// Options for DOM event listeners
const EVT_OPTIONS = { passive: true, capture: false }

export const props = {
  title: {
    type: String,
    default: ''
  },
  titleHtml: {
    type: String
  },
  titleTag: {
    type: String,
    default: 'h5'
  },
  size: {
    type: String,
    default: 'md'
  },
  centered: {
    type: Boolean,
    default: false
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  buttonSize: {
    type: String,
    default: ''
  },
  noStacking: {
    type: Boolean,
    default: false
  },
  noFade: {
    type: Boolean,
    default: false
  },
  noCloseOnBackdrop: {
    type: Boolean,
    default: false
  },
  noCloseOnEsc: {
    type: Boolean,
    default: false
  },
  noEnforceFocus: {
    type: Boolean,
    default: false
  },
  headerBgVariant: {
    type: String,
    default: null
  },
  headerBorderVariant: {
    type: String,
    default: null
  },
  headerTextVariant: {
    type: String,
    default: null
  },
  headerCloseVariant: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Array],
    default: null
  },
  bodyBgVariant: {
    type: String,
    default: null
  },
  bodyTextVariant: {
    type: String,
    default: null
  },
  modalClass: {
    type: [String, Array],
    default: null
  },
  dialogClass: {
    type: [String, Array],
    default: null
  },
  contentClass: {
    type: [String, Array],
    default: null
  },
  bodyClass: {
    type: [String, Array],
    default: null
  },
  footerBgVariant: {
    type: String,
    default: null
  },
  footerBorderVariant: {
    type: String,
    default: null
  },
  footerTextVariant: {
    type: String,
    default: null
  },
  footerClass: {
    type: [String, Array],
    default: null
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
  hideHeaderClose: {
    type: Boolean,
    default: false
  },
  hideBackdrop: {
    type: Boolean,
    default: false
  },
  okOnly: {
    type: Boolean,
    default: false
  },
  okDisabled: {
    type: Boolean,
    default: false
  },
  cancelDisabled: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  returnFocus: {
    // type: Object,
    default: null
  },
  headerCloseLabel: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'headerCloseLabel') || '')
  },
  cancelTitle: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'cancelTitle') || '')
  },
  cancelTitleHtml: {
    type: String
  },
  okTitle: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'okTitle') || '')
  },
  okTitleHtml: {
    type: String
  },
  cancelVariant: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'cancelVariant') || '')
  },
  okVariant: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'okVariant') || '')
  },
  lazy: {
    type: Boolean,
    default: false
  },
  busy: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default Vue.extend({
  name: NAME,
  mixins: [idMixin, listenOnRootMixin],
  model: {
    prop: 'visible',
    event: 'change'
  },
  props,
  data() {
    return {
      is_hidden: this.lazy || false, // For lazy modals
      is_visible: false, // Controls modal visible state
      is_transitioning: false, // Used for style control
      is_show: false, // Used for style control
      is_block: false, // Used for style control
      is_opening: false, // To sginal that modal is in the process of opening
      is_closing: false, // To signal that the modal is in the process of closing
      ignoreBackdropClick: false, // Used to signify if click out listener should ignore the click
      isModalOverflowing: false,
      return_focus: this.returnFocus || null,
      // The following items are controlled by the modalManager instance
      scrollbarWidth: 0,
      zIndex: modalManager.getBaseZIndex(),
      isTop: true,
      isBodyOverflowing: false
    }
  },
  computed: {
    modalClasses() {
      return [
        {
          fade: !this.noFade,
          show: this.is_show,
          'd-block': this.is_block
        },
        this.modalClass
      ]
    },
    modalStyles() {
      const sbWidth = `${this.scrollbarWidth}px`
      return {
        paddingLeft: !this.isBodyOverflowing && this.isModalOverflowing ? sbWidth : '',
        paddingRight: this.isBodyOverflowing && !this.isModalOverflowing ? sbWidth : ''
      }
    },
    dialogClasses() {
      return [
        {
          [`modal-${this.size}`]: Boolean(this.size),
          'modal-dialog-centered': this.centered,
          'modal-dialog-scrollable': this.scrollable
        },
        this.dialogClass
      ]
    },
    backdropClasses() {
      return {
        fade: !this.noFade,
        show: this.is_show || this.noFade
      }
    },
    headerClasses() {
      return [
        {
          [`bg-${this.headerBgVariant}`]: Boolean(this.headerBgVariant),
          [`text-${this.headerTextVariant}`]: Boolean(this.headerTextVariant),
          [`border-${this.headerBorderVariant}`]: Boolean(this.headerBorderVariant)
        },
        this.headerClass
      ]
    },
    bodyClasses() {
      return [
        {
          [`bg-${this.bodyBgVariant}`]: Boolean(this.bodyBgVariant),
          [`text-${this.bodyTextVariant}`]: Boolean(this.bodyTextVariant)
        },
        this.bodyClass
      ]
    },
    footerClasses() {
      return [
        {
          [`bg-${this.footerBgVariant}`]: Boolean(this.footerBgVariant),
          [`text-${this.footerTextVariant}`]: Boolean(this.footerTextVariant),
          [`border-${this.footerBorderVariant}`]: Boolean(this.footerBorderVariant)
        },
        this.footerClass
      ]
    },
    modalOuterStyle() {
      // Styles needed for proper stacking of modals
      return {
        position: 'absolute',
        zIndex: this.zIndex
      }
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal !== oldVal) {
        this[newVal ? 'show' : 'hide']()
      }
    }
  },
  created() {
    // Define non-reactive properties
    this._observer = null
  },
  mounted() {
    // Set initial z-index as queried from the DOM
    this.zIndex = modalManager.getBaseZIndex()
    // Listen for events from others to either open or close ourselves
    // and listen to all modals to enable/disable enforce focus
    this.listenOnRoot('bv::show::modal', this.showHandler)
    this.listenOnRoot('bv::hide::modal', this.hideHandler)
    this.listenOnRoot('bv::toggle::modal', this.toggleHandler)
    // Listen for `bv:modal::show events`, and close ourselves if the
    // opening modal not us
    this.listenOnRoot('bv::modal::show', this.modalListener)
    // Initially show modal?
    if (this.visible === true) {
      this.show()
    }
  },
  beforeDestroy() {
    // Ensure everything is back to normal
    if (this._observer) {
      this._observer.disconnect()
      this._observer = null
    }
    this.setEnforceFocus(false)
    this.setResizeEvent(false)
    if (this.is_visible) {
      this.is_visible = false
      this.is_show = false
      this.is_transitioning = false
    }
  },
  methods: {
    // Public Methods
    show() {
      if (this.is_visible || this.is_opening) {
        // If already open, on in the process of opening, do nothing
        /* istanbul ignore next */
        return
      }
      if (this.is_closing) {
        // If we are in the process of closing, wait until hidden before re-opening
        /* istanbul ignore next: very difficult to test */
        this.$once('hidden', this.show)
        /* istanbul ignore next */
        return
      }
      this.is_opening = true
      if (inBrowser && document.activeElement.focus) {
        // Preset the fallback return focus value if it is not set.
        // document.activeElement should be the trigger element that was clicked or
        // in the case of using the v-model, which ever element has current focus.
        // Will be overridden by some commands such as toggle, etc.
        this.return_focus = this.return_focus || document.activeElement
      }
      const showEvt = new BvModalEvent('show', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        relatedTarget: null,
        modalId: this.safeId()
      })
      this.emitEvent(showEvt)
      // Don't show if canceled
      if (showEvt.defaultPrevented || this.is_visible) {
        this.is_opening = false
        return
      }
      // Show the modal
      this.doShow()
    },
    hide(trigger) {
      if (!this.is_visible || this.is_closing) {
        /* istanbul ignore next */
        return
      }
      this.is_closing = true
      const hideEvt = new BvModalEvent('hide', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        relatedTarget: null,
        modalId: this.safeId(),
        trigger: trigger || null
      })
      // We emit specific event for one of the three built-in buttons
      if (trigger === 'ok') {
        this.$emit('ok', hideEvt)
      } else if (trigger === 'cancel') {
        this.$emit('cancel', hideEvt)
      } else if (trigger === 'headerclose') {
        this.$emit('close', hideEvt)
      }
      this.emitEvent(hideEvt)
      // Hide if not canceled
      if (hideEvt.defaultPrevented || !this.is_visible) {
        this.is_closing = false
        return
      }
      // Stop observing for content changes
      if (this._observer) {
        this._observer.disconnect()
        this._observer = null
      }
      this.is_visible = false
      // Update the v-model
      this.$emit('change', false)
    },
    // Public method to toggle modal visibility
    toggle(triggerEl) {
      if (triggerEl) {
        this.return_focus = triggerEl
      }
      if (this.is_visible) {
        this.hide('toggle')
      } else {
        this.show()
      }
    },
    // Private method to finish showing modal
    doShow() {
      /* istanbul ignore next: commenting out for now until we can test stacking */
      if (modalManager.modalsAreOpen && this.noStacking) {
        // If another modal(s) is already open, wait for it(them) to close
        this.listenOnRootOnce('bv::modal::hidden', this.doShow)
        return
      }
      // Place modal in DOM if lazy
      this.is_hidden = false
      this.$nextTick(() => {
        // We do this in `$nextTick()` to ensure the modal is in DOM first
        // before we show it
        this.is_visible = true
        this.is_opening = false
        // Update the v-model
        this.$emit('change', true)
        // Observe changes in modal content and adjust if necessary
        this._observer = observeDom(
          this.$refs.content,
          this.checkModalOverflow.bind(this),
          OBSERVER_CONFIG
        )
      })
    },
    // Transition handlers
    onBeforeEnter() {
      this.is_transitioning = true
      modalManager.registerModal(this)
      this.checkModalOverflow()
      this.setResizeEvent(true)
    },
    onEnter() {
      this.is_block = true
    },
    onAfterEnter() {
      this.is_show = true
      this.is_transitioning = false
      this.$nextTick(() => {
        const shownEvt = new BvModalEvent('shown', {
          cancelable: false,
          vueTarget: this,
          target: this.$refs.modal,
          relatedTarget: null,
          modalId: this.safeId()
        })
        this.emitEvent(shownEvt)
        this.focusFirst()
        this.setEnforceFocus(true)
      })
    },
    onBeforeLeave() {
      this.is_transitioning = true
      this.setResizeEvent(false)
    },
    onLeave() {
      // Remove the 'show' class
      this.is_show = false
    },
    onAfterLeave() {
      this.is_block = false
      this.is_transitioning = false
      this.setEnforceFocus(false)
      this.isModalOverflowing = false
      this.$nextTick(() => {
        this.returnFocusTo()
        this.is_closing = false
        const hiddenEvt = new BvModalEvent('hidden', {
          cancelable: false,
          vueTarget: this,
          target: this.lazy ? null : this.$refs.modal,
          relatedTarget: null,
          modalId: this.safeId()
        })
        this.emitEvent(hiddenEvt)
        modalManager.unregisterModal(this)
      })
    },
    // Event emitter
    emitEvent(bvEvt) {
      const type = bvEvt.type
      this.$emit(type, bvEvt)
      this.emitOnRoot(`bv::modal::${type}`, bvEvt, bvEvt.modalId)
    },
    // UI event handlers
    onDialogMousedown(evt) {
      // Watch to see if the matching mouseup event occurs outside the dialog
      // And if it does, cancel the clickout handler
      const modal = this.$refs.modal
      const onceModalMouseup = evt => {
        eventOff(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS)
        if (evt.target === modal) {
          this.ignoreBackdropClick = true
        }
      }
      eventOn(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS)
    },
    onClickOut(evt) {
      // Do nothing if not visible, backdrop click disabled, or element
      // that generated click event is no longer in document
      if (!this.is_visible || this.noCloseOnBackdrop || !contains(document, evt.target)) {
        return
      }
      if (this.ignoreBackdropClick) {
        // Click was initiated inside the modal content, but finished outside
        // Set by the above onDialogMousedown handler
        this.ignoreBackdropClick = false
        return
      }
      // If backdrop clicked, hide modal
      if (!contains(this.$refs.content, evt.target)) {
        this.hide('backdrop')
      }
    },
    onEsc(evt) {
      // If ESC pressed, hide modal
      if (evt.keyCode === KeyCodes.ESC && this.is_visible && !this.noCloseOnEsc) {
        this.hide('esc')
      }
    },
    // Document focusin listener
    focusHandler(evt) {
      // If focus leaves modal, bring it back
      const modal = this.$refs.modal
      if (
        !this.noEnforceFocus &&
        this.isTop &&
        this.is_visible &&
        modal &&
        document !== evt.target &&
        !contains(modal, evt.target)
      ) {
        modal.focus({ preventScroll: true })
      }
    },
    // Turn on/off focusin listener
    setEnforceFocus(on) {
      const method = on ? eventOn : eventOff
      method(document, 'focusin', this.focusHandler, EVT_OPTIONS)
    },
    // Resize listener
    setResizeEvent(on) {
      const method = on ? eventOn : eventOff
      // These events should probably also check if body is overflowing
      method(window, 'resize', this.checkModalOverflow, EVT_OPTIONS)
      method(window, 'orientationchange', this.checkModalOverflow, EVT_OPTIONS)
    },
    // Root listener handlers
    showHandler(id, triggerEl) {
      if (id === this.id) {
        this.return_focus = triggerEl || document.activeElement || null
        this.show()
      }
    },
    hideHandler(id) {
      if (id === this.id) {
        this.hide('event')
      }
    },
    toggleHandler(id, triggerEl) {
      if (id === this.id) {
        this.toggle(triggerEl)
      }
    },
    modalListener(bvEvt) {
      // If another modal opens, close this one if stacking not permitted
      if (this.noStacking && bvEvt.vueTarget !== this) {
        this.hide()
      }
    },
    // Focus control handlers
    focusFirst() {
      // TODO:
      //   Add support for finding input element with 'autofocus' attribute set
      //   and focus that element
      // Don't try and focus if we are SSR
      if (inBrowser) {
        const modal = this.$refs.modal
        const activeElement = document.activeElement
        // If the modal contains the activeElement, we don't do anything
        if (modal && !(activeElement && contains(modal, activeElement))) {
          // Make sure top of modal is showing (if longer than the viewport)
          // and focus the modal content wrapper
          this.$nextTick(() => {
            modal.scrollTop = 0
            modal.focus()
          })
        }
      }
    },
    returnFocusTo() {
      // Prefer `returnFocus` prop over event specified `return_focus` value
      let el = this.returnFocus || this.return_focus || document.activeElement || null
      // Is el a string CSS Selector?
      el = typeof el === 'string' ? select(el) : el
      if (el) {
        // Possibly could be a component reference
        el = el.$el || el
        if (isVisible(el) && el.focus) {
          el.focus()
        }
      }
    },
    checkModalOverflow() {
      if (this.is_visible) {
        const modal = this.$refs.modal
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight
      }
    }
  },
  render(h) {
    const $slots = this.$slots
    // Modal header
    let header = h(false)
    if (!this.hideHeader) {
      let modalHeader = $slots['modal-header']
      if (!modalHeader) {
        let closeButton = h(false)
        if (!this.hideHeaderClose) {
          closeButton = h(
            BButtonClose,
            {
              props: {
                disabled: this.is_transitioning,
                ariaLabel: this.headerCloseLabel,
                textVariant: this.headerCloseVariant || this.headerTextVariant
              },
              on: {
                click: evt => {
                  this.hide('headerclose')
                }
              }
            },
            [$slots['modal-header-close']]
          )
        }
        modalHeader = [
          h(this.titleTag, { class: ['modal-title'] }, [
            $slots['modal-title'] || this.titleHtml || stripTags(this.title)
          ]),
          closeButton
        ]
      }
      header = h(
        'header',
        {
          ref: 'header',
          staticClass: 'modal-header',
          class: this.headerClasses,
          attrs: { id: this.safeId('__BV_modal_header_') }
        },
        [modalHeader]
      )
    }
    // Modal body
    const body = h(
      'div',
      {
        ref: 'body',
        staticClass: 'modal-body',
        class: this.bodyClasses,
        attrs: { id: this.safeId('__BV_modal_body_') }
      },
      [$slots.default]
    )
    // Modal Footer
    let footer = h(false)
    if (!this.hideFooter) {
      let modalFooter = $slots['modal-footer']
      if (!modalFooter) {
        let cancelButton = h(false)
        if (!this.okOnly) {
          cancelButton = h(
            BButton,
            {
              props: {
                variant: this.cancelVariant,
                size: this.buttonSize,
                disabled: this.cancelDisabled || this.busy || this.is_transitioning
              },
              on: {
                click: evt => {
                  this.hide('cancel')
                }
              }
            },
            [$slots['modal-cancel'] || this.cancelTitleHtml || stripTags(this.cancelTitle)]
          )
        }
        const okButton = h(
          BButton,
          {
            props: {
              variant: this.okVariant,
              size: this.buttonSize,
              disabled: this.okDisabled || this.busy || this.is_transitioning
            },
            on: {
              click: evt => {
                this.hide('ok')
              }
            }
          },
          [$slots['modal-ok'] || this.okTitleHtml || stripTags(this.okTitle)]
        )
        modalFooter = [cancelButton, okButton]
      }
      footer = h(
        'footer',
        {
          ref: 'footer',
          staticClass: 'modal-footer',
          class: this.footerClasses,
          attrs: { id: this.safeId('__BV_modal_footer_') }
        },
        [modalFooter]
      )
    }
    // Assemble modal content
    const modalContent = h(
      'div',
      {
        ref: 'content',
        staticClass: 'modal-content',
        class: this.contentClass,
        attrs: {
          role: 'document',
          id: this.safeId('__BV_modal_content_'),
          'aria-labelledby': this.hideHeader ? null : this.safeId('__BV_modal_header_'),
          'aria-describedby': this.safeId('__BV_modal_body_')
        }
      },
      [header, body, footer]
    )
    // Modal dialog wrapper
    const modalDialog = h(
      'div',
      {
        staticClass: 'modal-dialog',
        class: this.dialogClasses,
        on: {
          mousedown: this.onDialogMousedown
        }
      },
      [modalContent]
    )
    // Modal
    let modal = h(
      'div',
      {
        ref: 'modal',
        staticClass: 'modal',
        class: this.modalClasses,
        style: this.modalStyles,
        directives: [
          { name: 'show', rawName: 'v-show', value: this.is_visible, expression: 'is_visible' }
        ],
        attrs: {
          id: this.safeId(),
          role: 'dialog',
          tabindex: '-1',
          'aria-hidden': this.is_visible ? null : 'true',
          'aria-modal': this.is_visible ? 'true' : null
        },
        on: {
          keydown: this.onEsc,
          click: this.onClickOut
        }
      },
      [modalDialog]
    )
    // Wrap modal in transition
    modal = h(
      'transition',
      {
        props: {
          enterClass: '',
          enterToClass: '',
          enterActiveClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: ''
        },
        on: {
          'before-enter': this.onBeforeEnter,
          enter: this.onEnter,
          'after-enter': this.onAfterEnter,
          'before-leave': this.onBeforeLeave,
          leave: this.onLeave,
          'after-leave': this.onAfterLeave
        }
      },
      [modal]
    )
    // Modal Backdrop
    let backdrop = h(false)
    if (!this.hideBackdrop && (this.is_visible || this.is_transitioning || this.is_block)) {
      backdrop = h(
        'div',
        {
          staticClass: 'modal-backdrop',
          class: this.backdropClasses,
          attrs: {
            id: this.safeId('__BV_modal_backdrop_')
          }
        },
        [$slots['modal-backdrop']]
      )
    }
    // Tab trap to prevent page from scrolling to next element in tab index
    // during enforce focus tab cycle
    let tabTrap = h(false)
    if (this.is_visible && this.isTop && !this.noEnforceFocus) {
      tabTrap = h('div', { attrs: { tabindex: '0' } })
    }
    // Assemble modal and backdrop in an outer div needed for lazy modals
    let outer = h(false)
    if (!this.is_hidden) {
      outer = h(
        'div',
        {
          key: 'modal-outer',
          style: this.modalOuterStyle,
          attrs: { id: this.safeId('__BV_modal_outer_') }
        },
        [modal, tabTrap, backdrop]
      )
    }
    // Wrap in DIV to maintain `this.$el` reference for hide/show method access
    return h('div', {}, [outer])
  }
})
