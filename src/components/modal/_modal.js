import bBtn from '../button/button'
import bBtnClose from '../button/button-close'
import { idMixin, listenOnRootMixin } from '../../mixins'
import { observeDom, warn, KeyCodes } from '../../utils'
import BvEvent from '../../utils/bv-event.class'

import {
  isVisible, selectAll, select, getBCR, addClass, removeClass, hasClass,
  setAttr, removeAttr, getAttr, hasAttr, eventOn, eventOff
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

export default {
  mixins: [ idMixin, listenOnRootMixin ],
  components: { bBtn, bBtnClose },
  render (h) {
    const t = this
    const $slots = t.$slots
    // Modal Header
    let header = h(false)
    if (!t.hideHeader) {
      let modalHeader = $slots['modal-header']
      if (!modalHeader) {
        let closeButton = h(false)
        if (!t.hideHeaderClose) {
          closeButton = h(
            'b-btn-close',
            {
              props: {
                disabled: t.is_transitioning,
                ariaLabel: t.headerCloseLabel,
                textVariant: t.headerTextVariant
              },
              on: { click: (evt) => { t.hide('header-close') } }
            },
            [ $slots['modal-header-close'] ]
          )
        }
        modalHeader = [
          h(t.titleTag, { class: ['modal-title'] }, [ $slots['modal-title'] || t.title ]),
          closeButton
        ]
      }
      header = h(
        'header',
        {
          ref: 'header',
          class: t.headerClasses,
          attrs: { id: t.safeId('__BV_modal_header_') }
        },
        [ modalHeader ]
      )
    }
    // Modal Body
    const body = h(
      'div',
      {
        ref: 'body',
        class: t.bodyClasses,
        attrs: { id: t.safeId('__BV_modal_body_') }
      },
      [ $slots.default ]
    )
    // Modal Footer
    let footer = h(false)
    if (!t.hideFooter) {
      let modalFooter = $slots['modal-footer']
      if (!modalFooter) {
        let okButton = h(false)
        if (!t.okOnly) {
          okButton = h(
            'b-btn',
            {
              props: {
                variant: t.cancelVariant,
                size: t.buttonSize,
                disabled: t.cancelDisabled || t.busy || t.is_transitioning
              },
              on: { click: (evt) => { t.hide('cancel') } }
            },
            [ $slots['modal-cancel'] || t.cancelTitle ]
          )
        }
        const cancelButton = h(
          'b-btn',
          {
            props: {
              variant: t.okVariant,
              size: t.buttonSize,
              disabled: t.okDisabled || t.busy || t.is_transitioning
            },
            on: { click: (evt) => { t.hide('ok') } }
          },
          [ $slots['modal-ok'] || t.okTitle ]
        )
        modalFooter = [ cancelButton, okButton ]
      }
      footer = h(
        'footer',
        {
          ref: 'footer',
          class: t.footerClasses,
          attrs: { id: t.safeId('__BV_modal_footer_') }
        },
        [ modalFooter ]
      )
    }
    // Assemble Modal Content
    const modalContent = h(
      'div',
      {
        ref: 'content',
        class: [ 'modal-content' ],
        attrs: {
          tabindex: '-1',
          role: 'document',
          'aria-labelledby': t.hideHeader ? null : t.safeId('__BV_modal_header_'),
          'aria-describedby': t.safeId('__BV_modal_body_')
        },
        on: {
          focusout: t.onFocusout,
          click: (evt) => { evt.stopPropagation() }
        }
      },
      [ header, body, footer ]
    )
    // Modal Dialog wrapper
    const modalDialog = h('div', { class: t.dialogClasses }, [ modalContent ])
    // Modal
    let modal = h(
      'div',
      {
        ref: 'modal',
        class: t.modalClasses,
        directives: [
          { name: 'show', rawName: 'v-show', value: t.is_visible, expression: 'is_visible' }
        ],
        attrs: {
          id: t.safeId(),
          role: 'dialog',
          'aria-hidden': t.is_visible ? null : 'true'
        },
        on: {
          click: t.onClickOut,
          keydown: t.onEsc
        }
      },
      [ modalDialog ]
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
          'before-enter': t.onBeforeEnter,
          'enter': t.onEnter,
          'after-enter': t.onAfterEnter,
          'before-leave': t.onBeforeLeave,
          'leave': t.onLeave,
          'after-leave': t.onAfterLeave
        }
      },
      [ modal ]
    )
    // Modal Backdrop
    let backdrop = h(false)
    if (!t.hideBackdrop && (t.is_visible || t.is_transitioning)) {
      backdrop = h('div', { class: t.backdropClasses, attrs: { id: t.safeId('__BV_modal_backdrop_') } })
    }
    // Assemble modal and backdrop
    let outer = h(false)
    if (!t.is_hidden) {
      outer = h(
        'div',
        { attrs: { id: t.safeId('__BV_modal_outer_') } },
        [ modal, backdrop ]
      )
    }
    // Wrap in DIV to maintain thi.$el reference for hide/show method aceess
    return h('div', {}, [ outer ])
  },
  data () {
    return {
      is_hidden: this.lazy || false,
      is_visible: false,
      is_transitioning: false,
      is_show: false,
      is_block: false,
      scrollbarWidth: 0,
      isBodyOverflowing: false,
      return_focus: this.returnFocus || null
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: ''
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
    buttonSize: {
      type: String,
      default: ''
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
    okTitle: {
      type: String,
      default: 'OK'
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
  computed: {
    modalClasses () {
      return [
        'modal',
        {
          fade: !this.noFade,
          show: this.is_show,
          'd-block': this.is_block
        }
      ]
    },
    dialogClasses () {
      return [
        'modal-dialog',
        {
          [`modal-${this.size}`]: Boolean(this.size),
          'modal-dialog-centered': this.centered
        }
      ]
    },
    backdropClasses () {
      return [
        'modal-backdrop',
        {
          fade: !this.noFade,
          show: this.is_show || this.noFade
        }
      ]
    },
    headerClasses () {
      return [
        'modal-header',
        {
          [`bg-${this.headerBgVariant}`]: Boolean(this.headerBgVariant),
          [`text-${this.headerTextVariant}`]: Boolean(this.headerTextVariant),
          [`border-${this.headerBorderVariant}`]: Boolean(this.headerBorderVariant)
        },
        this.headerClass
      ]
    },
    bodyClasses () {
      return [
        'modal-body',
        {
          [`bg-${this.bodyBgVariant}`]: Boolean(this.bodyBgVariant),
          [`text-${this.bodyTextVariant}`]: Boolean(this.bodyTextVariant)
        },
        this.bodyClass
      ]
    },
    footerClasses () {
      return [
        'modal-footer',
        {
          [`bg-${this.footerBgVariant}`]: Boolean(this.footerBgVariant),
          [`text-${this.footerTextVariant}`]: Boolean(this.footerTextVariant),
          [`border-${this.footerBorderVariant}`]: Boolean(this.footerBorderVariant)
        },
        this.footerClass
      ]
    }
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this[newVal ? 'show' : 'hide']()
    }
  },
  methods: {
    // Public Methods
    show () {
      if (this.is_visible) {
        return
      }
      const showEvt = new BvEvent('show', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        relatedTarget: null
      })
      this.emitEvent(showEvt)
      if (showEvt.defaultPrevented || this.is_visible) {
        // Don't show if canceled
        return
      }
      if (hasClass(document.body, 'modal-open')) {
        // If another modal is already open, wait for it to close
        this.$root.$once('bv::modal::hidden', this.doShow)
      } else {
        // Show the modal
        this.doShow()
      }
    },
    hide (trigger) {
      if (!this.is_visible) {
        return
      }
      const hideEvt = new BvEvent('hide', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        // this could be the trigger element/component reference
        relatedTarget: null,
        isOK: trigger || null,
        trigger: trigger || null,
        cancel () {
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
    // Private method to finish showing modal
    doShow () {
      // Plce modal in DOM if lazy
      this.is_hidden = false
      this.$nextTick(() => {
        // We do this in nextTick to ensure the modal is in DOM first before we show it
        this.is_visible = true
        this.$emit('change', true)
        // Observe changes in modal content and adjust if necessary
        this._observer = observeDom(this.$refs.content, this.adjustDialog.bind(this), OBSERVER_CONFIG)
      })
    },
    // Transition Handlers
    onBeforeEnter () {
      this.is_transitioning = true
      this.checkScrollbar()
      this.setScrollbar()
      this.adjustDialog()
      addClass(document.body, 'modal-open')
      this.setResizeEvent(true)
    },
    onEnter () {
      this.is_block = true
      this.$refs.modal.scrollTop = 0
    },
    onAfterEnter () {
      this.is_show = true
      this.is_transitioning = false
      this.$nextTick(() => {
        this.focusFirst()
        const shownEvt = new BvEvent('shown', {
          cancelable: false,
          vueTarget: this,
          target: this.$refs.modal,
          relatedTarget: null
        })
        this.emitEvent(shownEvt)
      })
    },
    onBeforeLeave () {
      this.is_transitioning = true
      this.setResizeEvent(false)
    },
    onLeave () {
      // Remove the 'show' class
      this.is_show = false
    },
    onAfterLeave () {
      this.is_block = false
      this.resetAdjustments()
      this.resetScrollbar()
      this.is_transitioning = false
      removeClass(document.body, 'modal-open')
      this.$nextTick(() => {
        this.is_hidden = this.lazy || false
        this.returnFocusTo()
        const hiddenEvt = new BvEvent('hidden', {
          cancelable: false,
          vueTarget: this,
          target: this.lazy ? null : this.$refs.modal,
          relatedTarget: null
        })
        this.emitEvent(hiddenEvt)
      })
    },
    // Event emitter
    emitEvent (bvEvt) {
      const type = bvEvt.type
      this.$emit(type, bvEvt)
      this.$root.$emit(`bv::modal::${type}`, bvEvt)
    },
    // UI Event Handlers
    onClickOut (evt) {
      // If backdrop clicked, hide modal
      if (this.is_visible && !this.noCloseOnBackdrop) {
        this.hide('backdrop')
      }
    },
    onEsc (evt) {
      // If ESC pressed, hide modal
      if (evt.keyCode === KeyCodes.ESC && this.is_visible && !this.noCloseOnEsc) {
        this.hide('esc')
      }
    },
    onFocusout (evt) {
      // If focus leaves modal, bring it back
      // 'focusout' Event Listener bound on content
      const content = this.$refs.content
      if (!this.noEnforceFocus &&
        this.is_visible &&
        content &&
        !content.contains(evt.relatedTarget)) {
        content.focus()
      }
    },
    // Resize Listener
    setResizeEvent (on) {
      ['resize', 'orientationchange'].forEach(evtName => {
        if (on) {
          eventOn(window, evtName, this.adjustDialog)
        } else {
          eventOff(window, evtName, this.adjustDialog)
        }
      })
    },
    // Root Listener handlers
    showHandler (id, triggerEl) {
      if (id === this.id) {
        this.return_focus = triggerEl || null
        this.show()
      }
    },
    hideHandler (id) {
      if (id === this.id) {
        this.hide()
      }
    },
    modalListener (bvEvt) {
      // If another modal opens, close this one
      if (bvEvt.vueTarget !== this) {
        this.hide()
      }
    },
    // Focus control handlers
    focusFirst () {
      // Don't try and focus if we are SSR
      if (typeof document === 'undefined') {
        return
      }
      const content = this.$refs.content
      const modal = this.$refs.modal
      const activeElement = document.activeElement
      if (activeElement && content && content.contains(activeElement)) {
        // If activeElement is child of content, no need to change focus
      } else if (content) {
        if (modal) {
          modal.scrollTop = 0
        }
        // Focus the modal content wrapper
        content.focus()
      }
    },
    returnFocusTo () {
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
    getScrollbarWidth () {
      const scrollDiv = document.createElement('div')
      scrollDiv.className = 'modal-scrollbar-measure'
      document.body.appendChild(scrollDiv)
      this.scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
    },
    adjustDialog () {
      if (!this.is_visible) {
        return
      }
      const modal = this.$refs.modal
      const isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight
      if (!this.isBodyOverflowing && isModalOverflowing) {
        modal.style.paddingLeft = `${this.scrollbarWidth}px`
      }
      if (this.isBodyOverflowing && !isModalOverflowing) {
        modal.style.paddingRight = `${this.scrollbarWidth}px`
      }
    },
    resetAdjustments () {
      const modal = this.$refs.modal
      if (modal) {
        modal.style.paddingLeft = ''
        modal.style.paddingRight = ''
      }
    },
    checkScrollbar () {
      const rect = getBCR(document.body)
      this.isBodyOverflowing = rect.left + rect.right < window.innerWidth
    },
    setScrollbar () {
      if (this.isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        const computedStyle = window.getComputedStyle
        const body = document.body
        const scrollbarWidth = this.scrollbarWidth
        // Adjust fixed content padding
        selectAll(Selector.FIXED_CONTENT).forEach(el => {
          const actualPadding = el.style.paddingRight
          const calculatedPadding = computedStyle(el).paddingRight || 0
          setAttr(el, 'data-padding-right', actualPadding)
          el.style.paddingRight = `${parseFloat(calculatedPadding) + scrollbarWidth}px`
        })
        // Adjust sticky content margin
        selectAll(Selector.STICKY_CONTENT).forEach(el => {
          const actualMargin = el.style.marginRight
          const calculatedMargin = computedStyle(el).marginRight || 0
          setAttr(el, 'data-margin-right', actualMargin)
          el.style.marginRight = `${parseFloat(calculatedMargin) - scrollbarWidth}px`
        })
        // Adjust navbar-toggler margin
        selectAll(Selector.NAVBAR_TOGGLER).forEach(el => {
          const actualMargin = el.style.marginRight
          const calculatedMargin = computedStyle(el).marginRight || 0
          setAttr(el, 'data-margin-right', actualMargin)
          el.style.marginRight = `${parseFloat(calculatedMargin) + scrollbarWidth}px`
        })
        // Adjust body padding
        const actualPadding = body.style.paddingRight
        const calculatedPadding = computedStyle(body).paddingRight
        setAttr(body, 'data-padding-right', actualPadding)
        body.style.paddingRight = `${parseFloat(calculatedPadding) + scrollbarWidth}px`
      }
    },
    resetScrollbar () {
      // Restore fixed content padding
      selectAll(Selector.FIXED_CONTENT).forEach(el => {
        if (hasAttr(el, 'data-padding-right')) {
          el.style.paddingRight = getAttr(el, 'data-padding-right') || ''
          removeAttr(el, 'data-padding-right')
        }
      })
      // Restore sticky content and navbar-toggler margin
      selectAll(`${Selector.STICKY_CONTENT}, ${Selector.NAVBAR_TOGGLER}`).forEach(el => {
        if (hasAttr(el, 'data-margin-right')) {
          el.style.marginRight = getAttr(el, 'data-margin-right') || ''
          removeAttr(el, 'data-margin-right')
        }
      })
      // Restore body padding
      const body = document.body
      if (hasAttr(body, 'data-padding-right')) {
        body.style.paddingRight = getAttr(body, 'data-padding-right') || ''
        removeAttr(body, 'data-padding-right')
      }
    }
  },
  created () {
    // create non-reactive property
    this._observer = null
  },
  mounted () {
    // Measure scrollbar
    this.getScrollbarWidth()
    // Listen for events from others to either open or close ourselves
    this.listenOnRoot('bv::show::modal', this.showHandler)
    this.listenOnRoot('bv::hide::modal', this.hideHandler)
    // Listen for bv:modal::show events, and close ourselves if the opening modal not us
    this.listenOnRoot('bv::modal::show', this.modalListener)
    // Initially show modal?
    if (this.visible === true) {
      this.show()
    }
  },
  beforeDestroy () {
    // Ensure everything is back to normal
    if (this._observer) {
      this._observer.disconnect()
      this._observer = null
    }
    this.setResizeEvent(false)
    // Re-adjust body/navbar/fixed padding/margins (if needed)
    removeClass(document.body, 'modal-open')
    this.resetAdjustments()
    this.resetScrollbar()
  }
}
