import Vue from '../../utils/vue'
import modalManager from './helpers/modal-manager'
import BvModalEvent from './helpers/bv-modal-event.class'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BVTransition from '../../utils/bv-transition'
import KeyCodes from '../../utils/key-codes'
import observeDom from '../../utils/observe-dom'
import { BTransporterSingle } from '../../utils/transporter'
import { isBrowser } from '../../utils/env'
import { isString } from '../../utils/inspect'
import { getComponentConfig } from '../../utils/config'
import { stripTags } from '../../utils/html'
import { contains, eventOff, eventOn, isVisible, select } from '../../utils/dom'
import { BButton } from '../button/button'
import { BButtonClose } from '../button/button-close'

// --- Constants ---

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
  size: {
    type: String,
    default: () => getComponentConfig(NAME, 'size')
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
  title: {
    type: String,
    default: ''
  },
  titleHtml: {
    type: String
  },
  titleTag: {
    type: String,
    default: () => getComponentConfig(NAME, 'titleTag')
  },
  titleClass: {
    type: [String, Array, Object],
    default: null
  },
  titleSrOnly: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: null
  },
  headerBgVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'headerBgVariant')
  },
  headerBorderVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'headerBorderVariant')
  },
  headerTextVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'headerTextVariant')
  },
  headerCloseVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'headerCloseVariant')
  },
  headerClass: {
    type: [String, Array, Object],
    default: null
  },
  bodyBgVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'bodyBgVariant')
  },
  bodyTextVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'bodyTextVariant')
  },
  modalClass: {
    type: [String, Array, Object],
    default: null
  },
  dialogClass: {
    type: [String, Array, Object],
    default: null
  },
  contentClass: {
    type: [String, Array, Object],
    default: null
  },
  bodyClass: {
    type: [String, Array, Object],
    default: null
  },
  footerBgVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'footerBgVariant')
  },
  footerBorderVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'footerBorderVariant')
  },
  footerTextVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'footerTextVariant')
  },
  footerClass: {
    type: [String, Array, Object],
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
    default: () => getComponentConfig(NAME, 'headerCloseLabel')
  },
  cancelTitle: {
    type: String,
    default: () => getComponentConfig(NAME, 'cancelTitle')
  },
  cancelTitleHtml: {
    type: String
  },
  okTitle: {
    type: String,
    default: () => getComponentConfig(NAME, 'okTitle')
  },
  okTitleHtml: {
    type: String
  },
  cancelVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'cancelVariant')
  },
  okVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'okVariant')
  },
  lazy: {
    type: Boolean,
    default: false
  },
  busy: {
    type: Boolean,
    default: false
  },
  static: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BModal = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin],
  model: {
    prop: 'visible',
    event: 'change'
  },
  props,
  data() {
    return {
      isHidden: true, // If modal should not be in document
      isVisible: false, // Controls modal visible state
      isTransitioning: false, // Used for style control
      isShow: false, // Used for style control
      isBlock: false, // Used for style control
      isOpening: false, // To signal that the modal is in the process of opening
      isClosing: false, // To signal that the modal is in the process of closing
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
          show: this.isShow
        },
        this.modalClass
      ]
    },
    modalStyles() {
      const sbWidth = `${this.scrollbarWidth}px`
      return {
        paddingLeft: !this.isBodyOverflowing && this.isModalOverflowing ? sbWidth : '',
        paddingRight: this.isBodyOverflowing && !this.isModalOverflowing ? sbWidth : '',
        // Needed to fix issue https://github.com/bootstrap-vue/bootstrap-vue/issues/3457
        // Even though we are using v-show, we must ensure 'none' is restored in the styles
        display: this.isBlock ? 'block' : 'none'
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
    titleClases() {
      return [{ 'sr-only': this.titleSrOnly }, this.titleClass]
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
    },
    slotScope() {
      return {
        ok: this.onOk,
        cancel: this.onCancel,
        close: this.onClose,
        hide: this.hide,
        visible: this.isVisible
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
      this.$nextTick(this.show)
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
    if (this.isVisible) {
      this.isVisible = false
      this.isShow = false
      this.isTransitioning = false
    }
  },
  methods: {
    // Private method to update the v-model
    updateModel(val) {
      if (val !== this.visible) {
        this.$emit('change', val)
      }
    },
    // Private method to create a BvModalEvent object
    buildEvent(type, opts = {}) {
      return new BvModalEvent(type, {
        // Default options
        cancelable: false,
        target: this.$refs.modal || this.$el || null,
        relatedTarget: null,
        trigger: null,
        // Supplied options
        ...opts,
        // Options that can't be overridden
        vueTarget: this,
        componentId: this.safeId()
      })
    },
    // Public method to show modal
    show() {
      if (this.isVisible || this.isOpening) {
        // If already open, on in the process of opening, do nothing
        /* istanbul ignore next */
        return
      }
      if (this.isClosing) {
        // If we are in the process of closing, wait until hidden before re-opening
        /* istanbul ignore next: very difficult to test */
        this.$once('hidden', this.show)
        /* istanbul ignore next */
        return
      }
      this.isOpening = true
      // Set the element to return focus to when closed
      this.return_focus = this.return_focus || this.getActiveElement()
      const showEvt = this.buildEvent('show', {
        cancelable: true
      })
      this.emitEvent(showEvt)
      // Don't show if canceled
      if (showEvt.defaultPrevented || this.isVisible) {
        this.isOpening = false
        // Ensure the v-model reflects the current state
        this.updateModel(false)
        return
      }
      // Show the modal
      this.doShow()
    },
    // Public method to hide modal
    hide(trigger = '') {
      if (!this.isVisible || this.isClosing) {
        /* istanbul ignore next */
        return
      }
      this.isClosing = true
      const hideEvt = this.buildEvent('hide', {
        cancelable: trigger !== 'FORCE',
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
      if (hideEvt.defaultPrevented || !this.isVisible) {
        this.isClosing = false
        // Ensure v-model reflects current state
        this.updateModel(true)
        return
      }
      // Stop observing for content changes
      if (this._observer) {
        this._observer.disconnect()
        this._observer = null
      }
      // Trigger the hide transition
      this.isVisible = false
      // Update the v-model
      this.updateModel(false)
    },
    // Public method to toggle modal visibility
    toggle(triggerEl) {
      if (triggerEl) {
        this.return_focus = triggerEl
      }
      if (this.isVisible) {
        this.hide('toggle')
      } else {
        this.show()
      }
    },
    // Private method to get the current document active element
    getActiveElement() {
      if (isBrowser) {
        const activeElement = document.activeElement
        // Note: On IE11, `document.activeElement` may be null.
        // So we test it for truthiness first.
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3206
        // Returning focus to document.body may cause unwanted scrolls, so we
        // exclude setting focus on body
        if (activeElement && activeElement !== document.body && activeElement.focus) {
          // Preset the fallback return focus value if it is not set
          // `document.activeElement` should be the trigger element that was clicked or
          // in the case of using the v-model, which ever element has current focus
          // Will be overridden by some commands such as toggle, etc.
          return activeElement
        }
      }
      return null
    },
    // Private method to finish showing modal
    doShow() {
      /* istanbul ignore next: commenting out for now until we can test stacking */
      if (modalManager.modalsAreOpen && this.noStacking) {
        // If another modal(s) is already open, wait for it(them) to close
        this.listenOnRootOnce('bv::modal::hidden', this.doShow)
        return
      }
      modalManager.registerModal(this)
      // Place modal in DOM
      this.isHidden = false
      this.$nextTick(() => {
        // We do this in `$nextTick()` to ensure the modal is in DOM first
        // before we show it
        this.isVisible = true
        this.isOpening = false
        // Update the v-model
        this.updateModel(true)
        this.$nextTick(() => {
          // In a nextTick in case modal content is lazy
          // Observe changes in modal content and adjust if necessary
          this._observer = observeDom(
            this.$refs.content,
            this.checkModalOverflow.bind(this),
            OBSERVER_CONFIG
          )
        })
      })
    },
    // Transition handlers
    onBeforeEnter() {
      this.isTransitioning = true
      this.setResizeEvent(true)
    },
    onEnter() {
      this.isBlock = true
    },
    onAfterEnter() {
      this.checkModalOverflow()
      this.isShow = true
      this.isTransitioning = false
      this.$nextTick(() => {
        this.emitEvent(this.buildEvent('shown'))
        this.focusFirst()
        this.setEnforceFocus(true)
      })
    },
    onBeforeLeave() {
      this.isTransitioning = true
      this.setResizeEvent(false)
    },
    onLeave() {
      // Remove the 'show' class
      this.isShow = false
    },
    onAfterLeave() {
      this.isBlock = false
      this.isTransitioning = false
      this.setEnforceFocus(false)
      this.isModalOverflowing = false
      this.isHidden = true
      this.$nextTick(() => {
        this.returnFocusTo()
        this.isClosing = false
        this.return_focus = null
        modalManager.unregisterModal(this)
        // TODO: Need to find a way to pass the `trigger` property
        //       to the `hidden` event, not just only the `hide` event
        this.emitEvent(this.buildEvent('hidden'))
      })
    },
    // Event emitter
    emitEvent(bvModalEvt) {
      const type = bvModalEvt.type
      // We emit on root first incase a global listener wants to cancel
      // the event first before the instance emits it's event
      this.emitOnRoot(`bv::modal::${type}`, bvModalEvt, bvModalEvt.componentId)
      this.$emit(type, bvModalEvt)
    },
    // UI event handlers
    onDialogMousedown() {
      // Watch to see if the matching mouseup event occurs outside the dialog
      // And if it does, cancel the clickOut handler
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
      if (this.ignoreBackdropClick) {
        // Click was initiated inside the modal content, but finished outside.
        // Set by the above onDialogMousedown handler
        this.ignoreBackdropClick = false
        return
      }
      // Do nothing if not visible, backdrop click disabled, or element
      // that generated click event is no longer in document body
      if (!this.isVisible || this.noCloseOnBackdrop || !contains(document.body, evt.target)) {
        return
      }
      // If backdrop clicked, hide modal
      if (!contains(this.$refs.content, evt.target)) {
        this.hide('backdrop')
      }
    },
    onOk() {
      this.hide('ok')
    },
    onCancel() {
      this.hide('cancel')
    },
    onClose() {
      this.hide('headerclose')
    },
    onEsc(evt) {
      // If ESC pressed, hide modal
      if (evt.keyCode === KeyCodes.ESC && this.isVisible && !this.noCloseOnEsc) {
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
        this.isVisible &&
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
      // These events should probably also check if
      // body is overflowing
      method(window, 'resize', this.checkModalOverflow, EVT_OPTIONS)
      method(window, 'orientationchange', this.checkModalOverflow, EVT_OPTIONS)
    },
    // Root listener handlers
    showHandler(id, triggerEl) {
      if (id === this.safeId()) {
        this.return_focus = triggerEl || this.getActiveElement()
        this.show()
      }
    },
    hideHandler(id) {
      if (id === this.safeId()) {
        this.hide('event')
      }
    },
    toggleHandler(id, triggerEl) {
      if (id === this.safeId()) {
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
      // Don't try and focus if we are SSR
      if (isBrowser) {
        const modal = this.$refs.modal
        const activeElement = this.getActiveElement()
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
      // Prefer `returnFocus` prop over event specified
      // `return_focus` value
      let el = this.returnFocus || this.return_focus || null
      // Is el a string CSS selector?
      el = isString(el) ? select(el) : el
      if (el) {
        // Possibly could be a component reference
        el = el.$el || el
        if (isVisible(el) && el.focus) {
          el.focus()
        }
      }
    },
    checkModalOverflow() {
      if (this.isVisible) {
        const modal = this.$refs.modal
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight
      }
    },
    makeModal(h) {
      // Modal header
      let header = h()
      if (!this.hideHeader) {
        let modalHeader = this.normalizeSlot('modal-header', this.slotScope)
        if (!modalHeader) {
          let closeButton = h()
          if (!this.hideHeaderClose) {
            closeButton = h(
              BButtonClose,
              {
                props: {
                  disabled: this.isTransitioning,
                  ariaLabel: this.headerCloseLabel,
                  textVariant: this.headerCloseVariant || this.headerTextVariant
                },
                on: { click: this.onClose }
              },
              [this.normalizeSlot('modal-header-close')]
            )
          }
          const domProps =
            !this.hasNormalizedSlot('modal-title') && this.titleHtml
              ? { innerHTML: this.titleHtml }
              : {}
          modalHeader = [
            h(
              this.titleTag,
              {
                staticClass: 'modal-title',
                class: this.titleClases,
                attrs: { id: this.safeId('__BV_modal_title_') },
                domProps
              },
              [this.normalizeSlot('modal-title', this.slotScope) || stripTags(this.title)]
            ),
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
        this.normalizeSlot('default', this.slotScope)
      )

      // Modal footer
      let footer = h()
      if (!this.hideFooter) {
        let modalFooter = this.normalizeSlot('modal-footer', this.slotScope)
        if (!modalFooter) {
          let cancelButton = h()
          if (!this.okOnly) {
            const cancelHtml = this.cancelTitleHtml ? { innerHTML: this.cancelTitleHtml } : null
            cancelButton = h(
              BButton,
              {
                props: {
                  variant: this.cancelVariant,
                  size: this.buttonSize,
                  disabled: this.cancelDisabled || this.busy || this.isTransitioning
                },
                on: { click: this.onCancel }
              },
              [
                this.normalizeSlot('modal-cancel') ||
                  (cancelHtml ? h('span', { domProps: cancelHtml }) : stripTags(this.cancelTitle))
              ]
            )
          }
          const okHtml = this.okTitleHtml ? { innerHTML: this.okTitleHtml } : null
          const okButton = h(
            BButton,
            {
              props: {
                variant: this.okVariant,
                size: this.buttonSize,
                disabled: this.okDisabled || this.busy || this.isTransitioning
              },
              on: { click: this.onOk }
            },
            [
              this.normalizeSlot('modal-ok') ||
                (okHtml ? h('span', { domProps: okHtml }) : stripTags(this.okTitle))
            ]
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
            id: this.safeId('__BV_modal_content_')
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
          on: { mousedown: this.onDialogMousedown }
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
            { name: 'show', rawName: 'v-show', value: this.isVisible, expression: 'isVisible' }
          ],
          attrs: {
            id: this.safeId(),
            role: 'dialog',
            tabindex: '-1',
            'aria-hidden': this.isVisible ? null : 'true',
            'aria-modal': this.isVisible ? 'true' : null,
            'aria-label': this.ariaLabel,
            'aria-labelledby':
              this.hideHeader ||
              this.ariaLabel ||
              !(this.hasNormalizedSlot('modal-title') || this.titleHtml || this.title)
                ? null
                : this.safeId('__BV_modal_title_'),
            'aria-describedby': this.safeId('__BV_modal_body_')
          },
          on: { keydown: this.onEsc, click: this.onClickOut }
        },
        [modalDialog]
      )

      // Wrap modal in transition
      // Sadly, we can't use BVTransition here due to the differences in
      // transition durations for .modal and .modal-dialog. Not until
      // issue https://github.com/vuejs/vue/issues/9986 is resolved
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
            beforeEnter: this.onBeforeEnter,
            enter: this.onEnter,
            afterEnter: this.onAfterEnter,
            beforeLeave: this.onBeforeLeave,
            leave: this.onLeave,
            afterLeave: this.onAfterLeave
          }
        },
        [modal]
      )

      // Modal backdrop
      let backdrop = h()
      if (!this.hideBackdrop && this.isVisible) {
        backdrop = h(
          'div',
          { staticClass: 'modal-backdrop', attrs: { id: this.safeId('__BV_modal_backdrop_') } },
          [this.normalizeSlot('modal-backdrop')]
        )
      }
      backdrop = h(BVTransition, { props: { noFade: this.noFade } }, [backdrop])

      // Tab trap to prevent page from scrolling to next element in
      // tab index during enforce focus tab cycle
      let tabTrap = h()
      if (this.isVisible && this.isTop && !this.noEnforceFocus) {
        tabTrap = h('div', { attrs: { tabindex: '0' } })
      }
      // Assemble modal and backdrop in an outer <div>
      return h(
        'div',
        {
          key: `modal-outer-${this._uid}`,
          style: this.modalOuterStyle,
          attrs: { id: this.safeId('__BV_modal_outer_') }
        },
        [modal, tabTrap, backdrop]
      )
    }
  },
  render(h) {
    if (this.static) {
      return this.lazy && this.isHidden ? h() : this.makeModal(h)
    } else {
      return this.isHidden ? h() : h(BTransporterSingle, {}, [this.makeModal(h)])
    }
  }
})

export default BModal
