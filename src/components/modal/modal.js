import BButton from '../button/button'
import BButtonClose from '../button/button-close'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import observeDom from '../../utils/observe-dom'
import warn from '../../utils/warn'
import KeyCodes from '../../utils/key-codes'
import BvEvent from '../../utils/bv-event.class'
import { stripTags } from '../../utils/html'

import {
  addClass,
  contains,
  eventOff,
  eventOn,
  getAttr,
  getBCR,
  getCS,
  hasAttr,
  hasClass,
  isVisible,
  removeAttr,
  removeClass,
  select,
  selectAll,
  setAttr
} from '../../utils/dom'

// Selectors for padding/margin adjustments
const Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
}

// ObserveDom config
const OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class']
}

// modal wrapper ZINDEX offset incrememnt
const ZINDEX_OFFSET = 2000

// Modal open count helpers
function getModalOpenCount() {
  return parseInt(getAttr(document.body, 'data-modal-open-count') || 0, 10)
}

function setModalOpenCount(count) {
  setAttr(document.body, 'data-modal-open-count', String(count))
  return count
}

function incrementModalOpenCount() {
  return setModalOpenCount(getModalOpenCount() + 1)
}

function decrementModalOpenCount() {
  return setModalOpenCount(Math.max(getModalOpenCount() - 1, 0))
}

// Returns the current visible modal highest z-index
function getModalMaxZIndex() {
  return selectAll('div.modal') /* find all modals that are in document */
    .filter(isVisible) /* filter only visible ones */
    .map(m => m.parentElement) /* select the outer div */
    .reduce((max, el) => {
      /* compute the highest z-index */
      return Math.max(max, parseInt(el.style.zIndex || 0, 10))
    }, 0)
}

// Returns the next z-index to be used by a modal to ensure proper stacking
// regardless of document order. Increments by 2000
function getModalNextZIndex() {
  return getModalMaxZIndex() + ZINDEX_OFFSET
}

// @vue/component
export default {
  name: 'BModal',
  components: { BButton, BButtonClose },
  mixins: [idMixin, listenOnRootMixin],
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
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
      default: 'Close'
    },
    cancelTitle: {
      type: String,
      default: 'Cancel'
    },
    cancelTitleHtml: {
      type: String
    },
    okTitle: {
      type: String,
      default: 'OK'
    },
    okTitleHtml: {
      type: String
    },
    cancelVariant: {
      type: String,
      default: 'secondary'
    },
    okVariant: {
      type: String,
      default: 'primary'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_hidden: this.lazy || false, // for lazy modals
      is_visible: false, // controls modal visible state
      is_transitioning: false, // Used for style control
      is_show: false, // Used for style control
      is_block: false, // Used for style control
      is_opening: false, // Semaphore for previnting incorrect modal open counts
      is_closing: false, // Semapbore for preventing incorrect modal open counts
      scrollbarWidth: 0,
      zIndex: ZINDEX_OFFSET, // z-index for modal stacking
      isTop: true, // If the modal is the topmost opened modal
      isBodyOverflowing: false,
      return_focus: this.returnFocus || null
    }
  },
  computed: {
    contentClasses() {
      return ['modal-content', this.contentClass]
    },
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
      return {
        // We only set these styles on the stacked modals (ones with next z-index > 0).
        position: 'absolute',
        zIndex: this.zIndex
      }
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this[newVal ? 'show' : 'hide']()
    }
  },
  created() {
    // create non-reactive property
    this._observer = null
  },
  mounted() {
    // Listen for events from others to either open or close ourselves
    // And listen to all modals to enable/disable enforce focus
    this.listenOnRoot('bv::show::modal', this.showHandler)
    this.listenOnRoot('bv::modal::shown', this.shownHandler)
    this.listenOnRoot('bv::hide::modal', this.hideHandler)
    this.listenOnRoot('bv::modal::hidden', this.hiddenHandler)
    this.listenOnRoot('bv::toggle::modal', this.toggleHandler)
    // Listen for bv:modal::show events, and close ourselves if the opening modal not us
    this.listenOnRoot('bv::modal::show', this.modalListener)
    // Initially show modal?
    if (this.visible === true) {
      this.show()
    }
  },
  beforeDestroy() /* instanbul ignore next */ {
    // Ensure everything is back to normal
    if (this._observer) {
      this._observer.disconnect()
      this._observer = null
    }
    // Ensure our root "once" listener is gone
    this.$root.$off('bv::modal::hidden', this.doShow)
    this.setEnforceFocus(false)
    this.setResizeEvent(false)
    if (this.is_visible) {
      this.is_visible = false
      this.is_show = false
      this.is_transitioning = false
      const count = decrementModalOpenCount()
      if (count === 0) {
        // Re-adjust body/navbar/fixed padding/margins (as we were the last modal open)
        this.setModalOpenClass(false)
        this.resetScrollbar()
        this.resetDialogAdjustments()
      }
    }
  },
  methods: {
    // Public Methods
    show() {
      if (this.is_visible || this.is_opening) {
        // if already open, on in the process of opening, do nothing
        return
      }
      if (this.is_closing) {
        // if we are in the process of closing, wait until hidden before re-opening
        this.$once('hidden', this.show)
        return
      }
      this.is_opening = true
      const showEvt = new BvEvent('show', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        modalId: this.safeId(),
        relatedTarget: null
      })
      this.emitEvent(showEvt)
      // Don't show if canceled
      if (showEvt.defaultPrevented || this.is_visible) {
        this.is_opening = false
        return
      }
      if (!this.noStacking) {
        // Find the z-index to use
        this.zIndex = getModalNextZIndex()
        // Show the modal
        this.doShow()
        return
      }
      if (hasClass(document.body, 'modal-open')) {
        // If another modal is already open, wait for it to close
        this.$root.$once('bv::modal::hidden', this.doShow)
        return
      }
      // Show the modal
      this.doShow()
    },
    hide(trigger) {
      if (!this.is_visible || this.is_closing) {
        return
      }
      this.is_closing = true
      const hideEvt = new BvEvent('hide', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        modalId: this.safeId(),
        // this could be the trigger element/component reference
        relatedTarget: null,
        isOK: trigger || null,
        trigger: trigger || null,
        cancel() {
          // Backwards compatibility
          warn('b-modal: evt.cancel() is deprecated. Please use evt.preventDefault().')
          this.preventDefault()
        }
      })
      if (trigger === 'ok') {
        this.$emit('ok', hideEvt)
      } else if (trigger === 'cancel') {
        this.$emit('cancel', hideEvt)
      }
      this.emitEvent(hideEvt)
      // Hide if not canceled
      if (hideEvt.defaultPrevented || !this.is_visible) {
        this.is_closing = false
        return
      }
      // stop observing for content changes
      if (this._observer) {
        this._observer.disconnect()
        this._observer = null
      }
      this.is_visible = false
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
      // Place modal in DOM if lazy
      this.is_hidden = false
      this.$nextTick(() => {
        // We do this in nextTick to ensure the modal is in DOM first before we show it
        this.is_visible = true
        this.is_opening = false
        this.$emit('change', true)
        // Observe changes in modal content and adjust if necessary
        this._observer = observeDom(
          this.$refs.content,
          this.adjustDialog.bind(this),
          OBSERVER_CONFIG
        )
      })
    },
    // Transition Handlers
    onBeforeEnter() {
      this.getScrollbarWidth()
      this.is_transitioning = true
      this.checkScrollbar()
      const count = incrementModalOpenCount()
      if (count === 1) {
        this.setScrollbar()
      }
      this.adjustDialog()
      this.setModalOpenClass(true)
      this.setResizeEvent(true)
    },
    onEnter() {
      this.is_block = true
    },
    onAfterEnter() {
      this.is_show = true
      this.is_transitioning = false
      this.$nextTick(() => {
        const shownEvt = new BvEvent('shown', {
          cancelable: false,
          vueTarget: this,
          target: this.$refs.modal,
          modalId: this.safeId(),
          relatedTarget: null
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
      this.resetDialogAdjustments()
      this.is_transitioning = false
      const count = decrementModalOpenCount()
      if (count === 0) {
        this.resetScrollbar()
        this.setModalOpenClass(false)
      }
      this.setEnforceFocus(false)
      this.$nextTick(() => {
        this.is_hidden = this.lazy || false
        this.zIndex = ZINDEX_OFFSET
        this.returnFocusTo()
        this.is_closing = false
        const hiddenEvt = new BvEvent('hidden', {
          cancelable: false,
          vueTarget: this,
          target: this.lazy ? null : this.$refs.modal,
          modalId: this.safeId(),
          relatedTarget: null
        })
        this.emitEvent(hiddenEvt)
      })
    },
    // Event emitter
    emitEvent(bvEvt) {
      const type = bvEvt.type
      this.$emit(type, bvEvt)
      this.$root.$emit(`bv::modal::${type}`, bvEvt, this.safeId())
    },
    // UI Event Handlers
    onClickOut(evt) {
      // Do nothing if not visible, backdrop click disabled, or element that generated
      // click event is no longer in document
      if (!this.is_visible || this.noCloseOnBackdrop || !contains(document, evt.target)) {
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
      const options = { passive: true, capture: false }
      if (on) {
        eventOn(document, 'focusin', this.focusHandler, options)
      } else {
        eventOff(document, 'focusin', this.focusHandler, options)
      }
    },
    // Resize Listener
    setResizeEvent(on) /* istanbul ignore next: can't easily test in JSDOM */ {
      ;['resize', 'orientationchange'].forEach(evtName => {
        const options = { passive: true, capture: false }
        if (on) {
          eventOn(window, evtName, this.adjustDialog, options)
        } else {
          eventOff(window, evtName, this.adjustDialog, options)
        }
      })
    },
    // Root Listener handlers
    showHandler(id, triggerEl) {
      if (id === this.id) {
        this.return_focus = triggerEl || null
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
    shownHandler() {
      this.setTop()
    },
    hiddenHandler() {
      this.setTop()
    },
    setTop() {
      // Determine if we are the topmost visible modal
      this.isTop = this.zIndex >= getModalMaxZIndex()
    },
    modalListener(bvEvt) {
      // If another modal opens, close this one
      if (this.noStacking && bvEvt.vueTarget !== this) {
        this.hide()
      }
    },
    // Focus control handlers
    focusFirst() {
      // Don't try and focus if we are SSR
      if (typeof document === 'undefined') {
        return
      }
      const modal = this.$refs.modal
      const activeElement = document.activeElement
      if (activeElement && contains(modal, activeElement)) {
        // If activeElement is child of modal or is modal, no need to change focus
        return
      }
      if (modal) {
        // make sure top of modal is showing (if longer than the viewport) and
        // focus the modal content wrapper
        this.$nextTick(() => {
          modal.scrollTop = 0
          modal.focus()
        })
      }
    },
    returnFocusTo() {
      // Prefer returnFocus prop over event specified return_focus value
      let el = this.returnFocus || this.return_focus || null
      if (typeof el === 'string') {
        // CSS Selector
        el = select(el)
      }
      if (el) {
        el = el.$el || el
        if (isVisible(el)) {
          el.focus()
        }
      }
    },
    // Utility methods
    getScrollbarWidth() {
      const scrollDiv = document.createElement('div')
      scrollDiv.className = 'modal-scrollbar-measure'
      document.body.appendChild(scrollDiv)
      this.scrollbarWidth = getBCR(scrollDiv).width - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
    },
    setModalOpenClass(open) {
      if (open) {
        addClass(document.body, 'modal-open')
      } else {
        removeClass(document.body, 'modal-open')
      }
    },
    adjustDialog() {
      if (!this.is_visible) {
        return
      }
      const modal = this.$refs.modal
      const isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight
      if (!this.isBodyOverflowing && isModalOverflowing) {
        modal.style.paddingLeft = `${this.scrollbarWidth}px`
      } else {
        modal.style.paddingLeft = ''
      }
      if (this.isBodyOverflowing && !isModalOverflowing) {
        modal.style.paddingRight = `${this.scrollbarWidth}px`
      } else {
        modal.style.paddingRight = ''
      }
    },
    resetDialogAdjustments() {
      const modal = this.$refs.modal
      if (modal) {
        modal.style.paddingLeft = ''
        modal.style.paddingRight = ''
      }
    },
    checkScrollbar() /* istanbul ignore next: getBCR can't be tested in JSDOM */ {
      const { left, right, height } = getBCR(document.body)
      // Extra check for body.height needed for stacked modals
      this.isBodyOverflowing = left + right < window.innerWidth || height > window.innerHeight
    },
    setScrollbar() {
      /* istanbul ignore if: get Computed Style can't be tested in JSDOM */
      if (this.isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        const body = document.body
        const scrollbarWidth = this.scrollbarWidth
        body._paddingChangedForModal = []
        body._marginChangedForModal = []
        // Adjust fixed content padding
        selectAll(Selector.FIXED_CONTENT).forEach(el => {
          const actualPadding = el.style.paddingRight
          const calculatedPadding = getCS(el).paddingRight || 0
          setAttr(el, 'data-padding-right', actualPadding)
          el.style.paddingRight = `${parseFloat(calculatedPadding) + scrollbarWidth}px`
          body._paddingChangedForModal.push(el)
        })
        // Adjust sticky content margin
        selectAll(Selector.STICKY_CONTENT).forEach(el => {
          const actualMargin = el.style.marginRight
          const calculatedMargin = getCS(el).marginRight || 0
          setAttr(el, 'data-margin-right', actualMargin)
          el.style.marginRight = `${parseFloat(calculatedMargin) - scrollbarWidth}px`
          body._marginChangedForModal.push(el)
        })
        // Adjust navbar-toggler margin
        selectAll(Selector.NAVBAR_TOGGLER).forEach(el => {
          const actualMargin = el.style.marginRight
          const calculatedMargin = getCS(el).marginRight || 0
          setAttr(el, 'data-margin-right', actualMargin)
          el.style.marginRight = `${parseFloat(calculatedMargin) + scrollbarWidth}px`
          body._marginChangedForModal.push(el)
        })
        // Adjust body padding
        const actualPadding = body.style.paddingRight
        const calculatedPadding = getCS(body).paddingRight
        setAttr(body, 'data-padding-right', actualPadding)
        body.style.paddingRight = `${parseFloat(calculatedPadding) + scrollbarWidth}px`
      }
    },
    resetScrollbar() {
      const body = document.body
      if (body._paddingChangedForModal) {
        // Restore fixed content padding
        body._paddingChangedForModal.forEach(el => {
          if (hasAttr(el, 'data-padding-right')) {
            el.style.paddingRight = getAttr(el, 'data-padding-right') || ''
            removeAttr(el, 'data-padding-right')
          }
        })
      }
      if (body._marginChangedForModal) {
        // Restore sticky content and navbar-toggler margin
        body._marginChangedForModal.forEach(el => {
          if (hasAttr(el, 'data-margin-right')) {
            el.style.marginRight = getAttr(el, 'data-margin-right') || ''
            removeAttr(el, 'data-margin-right')
          }
        })
      }
      body._paddingChangedForModal = null
      body._marginChangedForModal = null
      // Restore body padding
      if (hasAttr(body, 'data-padding-right')) {
        body.style.paddingRight = getAttr(body, 'data-padding-right') || ''
        removeAttr(body, 'data-padding-right')
      }
    }
  },
  render(h) {
    const $slots = this.$slots
    // Modal Header
    let header = h(false)
    if (!this.hideHeader) {
      let modalHeader = $slots['modal-header']
      if (!modalHeader) {
        let closeButton = h(false)
        if (!this.hideHeaderClose) {
          closeButton = h(
            'b-button-close',
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
    // Modal Body
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
            'b-button',
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
          'b-button',
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
    // Assemble Modal Content
    const modalContent = h(
      'div',
      {
        ref: 'content',
        class: this.contentClasses,
        attrs: {
          role: 'document',
          id: this.safeId('__BV_modal_content_'),
          'aria-labelledby': this.hideHeader ? null : this.safeId('__BV_modal_header_'),
          'aria-describedby': this.safeId('__BV_modal_body_')
        }
      },
      [header, body, footer]
    )
    // Modal Dialog wrapper
    const modalDialog = h(
      'div',
      {
        staticClass: 'modal-dialog',
        class: this.dialogClasses
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
    if (!this.hideBackdrop && (this.is_visible || this.is_transitioning)) {
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
    // Tab trap to prevent page from scrolling to next element in tab index during enforce focus tab cycle
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
    // Wrap in DIV to maintain thi.$el reference for hide/show method aceess
    return h('div', {}, [outer])
  }
}
