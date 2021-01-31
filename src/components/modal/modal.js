import { COMPONENT_UID_KEY, Vue } from '../../vue'
import { NAME_MODAL } from '../../constants/components'
import { IS_BROWSER } from '../../constants/env'
import {
  EVENT_NAME_CANCEL,
  EVENT_NAME_CHANGE,
  EVENT_NAME_CLOSE,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_OK,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  EVENT_NAME_TOGGLE,
  EVENT_OPTIONS_NO_CAPTURE
} from '../../constants/events'
import { CODE_ESC } from '../../constants/key-codes'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_OBJECT,
  PROP_TYPE_STRING
} from '../../constants/props'
import { HTMLElement } from '../../constants/safe-types'
import {
  SLOT_NAME_DEFAULT,
  SLOT_NAME_MODAL_BACKDROP,
  SLOT_NAME_MODAL_CANCEL,
  SLOT_NAME_MODAL_FOOTER,
  SLOT_NAME_MODAL_HEADER,
  SLOT_NAME_MODAL_HEADER_CLOSE,
  SLOT_NAME_MODAL_OK,
  SLOT_NAME_MODAL_TITLE
} from '../../constants/slots'
import { arrayIncludes, concat } from '../../utils/array'
import {
  attemptFocus,
  closest,
  contains,
  getActiveElement,
  getTabables,
  requestAF,
  select
} from '../../utils/dom'
import { getRootActionEventName, getRootEventName, eventOn, eventOff } from '../../utils/events'
import { htmlOrText } from '../../utils/html'
import { identity } from '../../utils/identity'
import { isString, isUndefinedOrNull } from '../../utils/inspect'
import { makeModelMixin } from '../../utils/model'
import { sortKeys } from '../../utils/object'
import { observeDom } from '../../utils/observe-dom'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { idMixin, props as idProps } from '../../mixins/id'
import { listenOnDocumentMixin } from '../../mixins/listen-on-document'
import { listenOnRootMixin } from '../../mixins/listen-on-root'
import { listenOnWindowMixin } from '../../mixins/listen-on-window'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { scopedStyleMixin } from '../../mixins/scoped-style'
import { BButton } from '../button/button'
import { BButtonClose } from '../button/button-close'
import { BVTransition } from '../transition/bv-transition'
import { BVTransporter } from '../transporter/transporter'
import { BvModalEvent } from './helpers/bv-modal-event.class'
import { modalManager } from './helpers/modal-manager'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('visible', {
  type: PROP_TYPE_BOOLEAN,
  defaultValue: false,
  event: EVENT_NAME_CHANGE
})

const TRIGGER_BACKDROP = 'backdrop'
const TRIGGER_ESC = 'esc'
const TRIGGER_FORCE = 'FORCE'
const TRIGGER_TOGGLE = 'toggle'

const BUTTON_CANCEL = 'cancel'
// TODO: This should be renamed to 'close'
const BUTTON_CLOSE = 'headerclose'
const BUTTON_OK = 'ok'

const BUTTONS = [BUTTON_CANCEL, BUTTON_CLOSE, BUTTON_OK]

// `ObserveDom` config to detect changes in modal content
// so that we can adjust the modal padding if needed
const OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class']
}

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ariaLabel: makeProp(PROP_TYPE_STRING),
    autoFocusButton: makeProp(
      PROP_TYPE_STRING,
      null,
      /* istanbul ignore next */ value => {
        return isUndefinedOrNull(value) || arrayIncludes(BUTTONS, value)
      }
    ),
    bodyBgVariant: makeProp(PROP_TYPE_STRING),
    bodyClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    bodyTextVariant: makeProp(PROP_TYPE_STRING),
    busy: makeProp(PROP_TYPE_BOOLEAN, false),
    buttonSize: makeProp(PROP_TYPE_STRING),
    cancelDisabled: makeProp(PROP_TYPE_BOOLEAN, false),
    cancelTitle: makeProp(PROP_TYPE_STRING, 'Cancel'),
    cancelTitleHtml: makeProp(PROP_TYPE_STRING),
    cancelVariant: makeProp(PROP_TYPE_STRING, 'secondary'),
    centered: makeProp(PROP_TYPE_BOOLEAN, false),
    contentClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    dialogClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    footerBgVariant: makeProp(PROP_TYPE_STRING),
    footerBorderVariant: makeProp(PROP_TYPE_STRING),
    footerClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    footerTag: makeProp(PROP_TYPE_STRING, 'footer'),
    footerTextVariant: makeProp(PROP_TYPE_STRING),
    headerBgVariant: makeProp(PROP_TYPE_STRING),
    headerBorderVariant: makeProp(PROP_TYPE_STRING),
    headerClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    headerCloseContent: makeProp(PROP_TYPE_STRING, '&times;'),
    headerCloseLabel: makeProp(PROP_TYPE_STRING, 'Close'),
    headerCloseVariant: makeProp(PROP_TYPE_STRING),
    headerTag: makeProp(PROP_TYPE_STRING, 'header'),
    headerTextVariant: makeProp(PROP_TYPE_STRING),
    // TODO: Rename to `noBackdrop` and deprecate `hideBackdrop`
    hideBackdrop: makeProp(PROP_TYPE_BOOLEAN, false),
    // TODO: Rename to `noFooter` and deprecate `hideFooter`
    hideFooter: makeProp(PROP_TYPE_BOOLEAN, false),
    // TODO: Rename to `noHeader` and deprecate `hideHeader`
    hideHeader: makeProp(PROP_TYPE_BOOLEAN, false),
    // TODO: Rename to `noHeaderClose` and deprecate `hideHeaderClose`
    hideHeaderClose: makeProp(PROP_TYPE_BOOLEAN, false),
    ignoreEnforceFocusSelector: makeProp(PROP_TYPE_ARRAY_STRING),
    lazy: makeProp(PROP_TYPE_BOOLEAN, false),
    modalClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    noCloseOnBackdrop: makeProp(PROP_TYPE_BOOLEAN, false),
    noCloseOnEsc: makeProp(PROP_TYPE_BOOLEAN, false),
    noEnforceFocus: makeProp(PROP_TYPE_BOOLEAN, false),
    noFade: makeProp(PROP_TYPE_BOOLEAN, false),
    noStacking: makeProp(PROP_TYPE_BOOLEAN, false),
    okDisabled: makeProp(PROP_TYPE_BOOLEAN, false),
    okOnly: makeProp(PROP_TYPE_BOOLEAN, false),
    okTitle: makeProp(PROP_TYPE_STRING, 'OK'),
    okTitleHtml: makeProp(PROP_TYPE_STRING),
    okVariant: makeProp(PROP_TYPE_STRING, 'primary'),
    // HTML Element, CSS selector string or Vue component instance
    returnFocus: makeProp([HTMLElement, PROP_TYPE_OBJECT, PROP_TYPE_STRING]),
    scrollable: makeProp(PROP_TYPE_BOOLEAN, false),
    size: makeProp(PROP_TYPE_STRING, 'md'),
    static: makeProp(PROP_TYPE_BOOLEAN, false),
    title: makeProp(PROP_TYPE_STRING),
    titleClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    titleHtml: makeProp(PROP_TYPE_STRING),
    titleSrOnly: makeProp(PROP_TYPE_BOOLEAN, false),
    titleTag: makeProp(PROP_TYPE_STRING, 'h5')
  }),
  NAME_MODAL
)

// --- Main component ---

// @vue/component
export const BModal = /*#__PURE__*/ Vue.extend({
  name: NAME_MODAL,
  mixins: [
    attrsMixin,
    idMixin,
    modelMixin,
    listenOnDocumentMixin,
    listenOnRootMixin,
    listenOnWindowMixin,
    normalizeSlotMixin,
    scopedStyleMixin
  ],
  inheritAttrs: false,
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
      // The following items are controlled by the modalManager instance
      scrollbarWidth: 0,
      zIndex: modalManager.getBaseZIndex(),
      isTop: true,
      isBodyOverflowing: false
    }
  },
  computed: {
    modalId() {
      return this.safeId()
    },
    modalOuterId() {
      return this.safeId('__BV_modal_outer_')
    },
    modalHeaderId() {
      return this.safeId('__BV_modal_header_')
    },
    modalBodyId() {
      return this.safeId('__BV_modal_body_')
    },
    modalTitleId() {
      return this.safeId('__BV_modal_title_')
    },
    modalContentId() {
      return this.safeId('__BV_modal_content_')
    },
    modalFooterId() {
      return this.safeId('__BV_modal_footer_')
    },
    modalBackdropId() {
      return this.safeId('__BV_modal_backdrop_')
    },
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
          [`modal-${this.size}`]: this.size,
          'modal-dialog-centered': this.centered,
          'modal-dialog-scrollable': this.scrollable
        },
        this.dialogClass
      ]
    },
    headerClasses() {
      return [
        {
          [`bg-${this.headerBgVariant}`]: this.headerBgVariant,
          [`text-${this.headerTextVariant}`]: this.headerTextVariant,
          [`border-${this.headerBorderVariant}`]: this.headerBorderVariant
        },
        this.headerClass
      ]
    },
    titleClasses() {
      return [{ 'sr-only': this.titleSrOnly }, this.titleClass]
    },
    bodyClasses() {
      return [
        {
          [`bg-${this.bodyBgVariant}`]: this.bodyBgVariant,
          [`text-${this.bodyTextVariant}`]: this.bodyTextVariant
        },
        this.bodyClass
      ]
    },
    footerClasses() {
      return [
        {
          [`bg-${this.footerBgVariant}`]: this.footerBgVariant,
          [`text-${this.footerTextVariant}`]: this.footerTextVariant,
          [`border-${this.footerBorderVariant}`]: this.footerBorderVariant
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
        cancel: this.onCancel,
        close: this.onClose,
        hide: this.hide,
        ok: this.onOk,
        visible: this.isVisible
      }
    },
    computeIgnoreEnforceFocusSelector() {
      // Normalize to an single selector with selectors separated by `,`
      return concat(this.ignoreEnforceFocusSelector)
        .filter(identity)
        .join(',')
        .trim()
    },
    computedAttrs() {
      // If the parent has a scoped style attribute, and the modal
      // is portalled, add the scoped attribute to the modal wrapper
      const scopedStyleAttrs = !this.static ? this.scopedStyleAttrs : {}

      return {
        ...scopedStyleAttrs,
        ...this.bvAttrs,
        id: this.modalOuterId
      }
    },
    computedModalAttrs() {
      const { isVisible, ariaLabel } = this

      return {
        id: this.modalId,
        role: 'dialog',
        'aria-hidden': isVisible ? null : 'true',
        'aria-modal': isVisible ? 'true' : null,
        'aria-label': ariaLabel,
        'aria-labelledby':
          this.hideHeader ||
          ariaLabel ||
          // TODO: Rename slot to `title` and deprecate `modal-title`
          !(this.hasNormalizedSlot(SLOT_NAME_MODAL_TITLE) || this.titleHtml || this.title)
            ? null
            : this.modalTitleId,
        'aria-describedby': this.modalBodyId
      }
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue) {
        this[newValue ? 'show' : 'hide']()
      }
    }
  },
  created() {
    // Define non-reactive properties
    this.$_observer = null
    this.$_returnFocus = this.returnFocus || null
  },
  mounted() {
    // Set initial z-index as queried from the DOM
    this.zIndex = modalManager.getBaseZIndex()
    // Listen for events from others to either open or close ourselves
    // and listen to all modals to enable/disable enforce focus
    this.listenOnRoot(getRootActionEventName(NAME_MODAL, EVENT_NAME_SHOW), this.showHandler)
    this.listenOnRoot(getRootActionEventName(NAME_MODAL, EVENT_NAME_HIDE), this.hideHandler)
    this.listenOnRoot(getRootActionEventName(NAME_MODAL, EVENT_NAME_TOGGLE), this.toggleHandler)
    // Listen for `bv:modal::show events`, and close ourselves if the
    // opening modal not us
    this.listenOnRoot(getRootEventName(NAME_MODAL, EVENT_NAME_SHOW), this.modalListener)
    // Initially show modal?
    if (this[MODEL_PROP_NAME] === true) {
      this.$nextTick(this.show)
    }
  },
  beforeDestroy() {
    // Ensure everything is back to normal
    modalManager.unregisterModal(this)
    this.setObserver(false)
    if (this.isVisible) {
      this.isVisible = false
      this.isShow = false
      this.isTransitioning = false
    }
  },
  methods: {
    setObserver(on = false) {
      this.$_observer && this.$_observer.disconnect()
      this.$_observer = null
      if (on) {
        this.$_observer = observeDom(
          this.$refs.content,
          this.checkModalOverflow.bind(this),
          OBSERVER_CONFIG
        )
      }
    },
    // Private method to update the v-model
    updateModel(value) {
      if (value !== this[MODEL_PROP_NAME]) {
        this.$emit(MODEL_EVENT_NAME, value)
      }
    },
    // Private method to create a BvModalEvent object
    buildEvent(type, options = {}) {
      return new BvModalEvent(type, {
        // Default options
        cancelable: false,
        target: this.$refs.modal || this.$el || null,
        relatedTarget: null,
        trigger: null,
        // Supplied options
        ...options,
        // Options that can't be overridden
        vueTarget: this,
        componentId: this.modalId
      })
    },
    // Public method to show modal
    show() {
      if (this.isVisible || this.isOpening) {
        // If already open, or in the process of opening, do nothing
        /* istanbul ignore next */
        return
      }
      /* istanbul ignore next */
      if (this.isClosing) {
        // If we are in the process of closing, wait until hidden before re-opening
        /* istanbul ignore next */
        this.$once(EVENT_NAME_HIDDEN, this.show)
        /* istanbul ignore next */
        return
      }
      this.isOpening = true
      // Set the element to return focus to when closed
      this.$_returnFocus = this.$_returnFocus || this.getActiveElement()
      const showEvent = this.buildEvent(EVENT_NAME_SHOW, {
        cancelable: true
      })
      this.emitEvent(showEvent)
      // Don't show if canceled
      if (showEvent.defaultPrevented || this.isVisible) {
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
      const hideEvent = this.buildEvent(EVENT_NAME_HIDE, {
        cancelable: trigger !== TRIGGER_FORCE,
        trigger: trigger || null
      })
      // We emit specific event for one of the three built-in buttons
      if (trigger === BUTTON_OK) {
        this.$emit(EVENT_NAME_OK, hideEvent)
      } else if (trigger === BUTTON_CANCEL) {
        this.$emit(EVENT_NAME_CANCEL, hideEvent)
      } else if (trigger === BUTTON_CLOSE) {
        this.$emit(EVENT_NAME_CLOSE, hideEvent)
      }
      this.emitEvent(hideEvent)
      // Hide if not canceled
      if (hideEvent.defaultPrevented || !this.isVisible) {
        this.isClosing = false
        // Ensure v-model reflects current state
        this.updateModel(true)
        return
      }
      // Stop observing for content changes
      this.setObserver(false)
      // Trigger the hide transition
      this.isVisible = false
      // Update the v-model
      this.updateModel(false)
    },
    // Public method to toggle modal visibility
    toggle(triggerEl) {
      if (triggerEl) {
        this.$_returnFocus = triggerEl
      }
      if (this.isVisible) {
        this.hide(TRIGGER_TOGGLE)
      } else {
        this.show()
      }
    },
    // Private method to get the current document active element
    getActiveElement() {
      // Returning focus to `document.body` may cause unwanted scrolls,
      // so we exclude setting focus on body
      const activeElement = getActiveElement(IS_BROWSER ? [document.body] : [])
      // Preset the fallback return focus value if it is not set
      // `document.activeElement` should be the trigger element that was clicked or
      // in the case of using the v-model, which ever element has current focus
      // Will be overridden by some commands such as toggle, etc.
      // Note: On IE 11, `document.activeElement` may be `null`
      // So we test it for truthiness first
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/3206
      return activeElement && activeElement.focus ? activeElement : null
    },
    // Private method to finish showing modal
    doShow() {
      /* istanbul ignore next: commenting out for now until we can test stacking */
      if (modalManager.modalsAreOpen && this.noStacking) {
        // If another modal(s) is already open, wait for it(them) to close
        this.listenOnRootOnce(getRootEventName(NAME_MODAL, EVENT_NAME_HIDDEN), this.doShow)
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
          // Observe changes in modal content and adjust if necessary
          // In a `$nextTick()` in case modal content is lazy
          this.setObserver(true)
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
      // We add the `show` class 1 frame later
      // `requestAF()` runs the callback before the next repaint, so we need
      // two calls to guarantee the next frame has been rendered
      requestAF(() => {
        requestAF(() => {
          this.isShow = true
        })
      })
    },
    onAfterEnter() {
      this.checkModalOverflow()
      this.isTransitioning = false
      // We use `requestAF()` to allow transition hooks to complete
      // before passing control over to the other handlers
      // This will allow users to not have to use `$nextTick()` or `requestAF()`
      // when trying to pre-focus an element
      requestAF(() => {
        this.emitEvent(this.buildEvent(EVENT_NAME_SHOWN))
        this.setEnforceFocus(true)
        this.$nextTick(() => {
          // Delayed in a `$nextTick()` to allow users time to pre-focus
          // an element if the wish
          this.focusFirst()
        })
      })
    },
    onBeforeLeave() {
      this.isTransitioning = true
      this.setResizeEvent(false)
      this.setEnforceFocus(false)
    },
    onLeave() {
      // Remove the 'show' class
      this.isShow = false
    },
    onAfterLeave() {
      this.isBlock = false
      this.isTransitioning = false
      this.isModalOverflowing = false
      this.isHidden = true
      this.$nextTick(() => {
        this.isClosing = false
        modalManager.unregisterModal(this)
        this.returnFocusTo()
        // TODO: Need to find a way to pass the `trigger` property
        //       to the `hidden` event, not just only the `hide` event
        this.emitEvent(this.buildEvent(EVENT_NAME_HIDDEN))
      })
    },
    emitEvent(bvEvent) {
      const { type } = bvEvent
      // We emit on `$root` first in case a global listener wants to cancel
      // the event first before the instance emits its event
      this.emitOnRoot(getRootEventName(NAME_MODAL, type), bvEvent, bvEvent.componentId)
      this.$emit(type, bvEvent)
    },
    // UI event handlers
    onDialogMousedown() {
      // Watch to see if the matching mouseup event occurs outside the dialog
      // And if it does, cancel the clickOut handler
      const modal = this.$refs.modal
      const onceModalMouseup = event => {
        eventOff(modal, 'mouseup', onceModalMouseup, EVENT_OPTIONS_NO_CAPTURE)
        if (event.target === modal) {
          this.ignoreBackdropClick = true
        }
      }
      eventOn(modal, 'mouseup', onceModalMouseup, EVENT_OPTIONS_NO_CAPTURE)
    },
    onClickOut(event) {
      if (this.ignoreBackdropClick) {
        // Click was initiated inside the modal content, but finished outside.
        // Set by the above onDialogMousedown handler
        this.ignoreBackdropClick = false
        return
      }
      // Do nothing if not visible, backdrop click disabled, or element
      // that generated click event is no longer in document body
      if (!this.isVisible || this.noCloseOnBackdrop || !contains(document.body, event.target)) {
        return
      }
      // If backdrop clicked, hide modal
      if (!contains(this.$refs.content, event.target)) {
        this.hide(TRIGGER_BACKDROP)
      }
    },
    onOk() {
      this.hide(BUTTON_OK)
    },
    onCancel() {
      this.hide(BUTTON_CANCEL)
    },
    onClose() {
      this.hide(BUTTON_CLOSE)
    },
    onEsc(event) {
      // If ESC pressed, hide modal
      if (event.keyCode === CODE_ESC && this.isVisible && !this.noCloseOnEsc) {
        this.hide(TRIGGER_ESC)
      }
    },
    // Document focusin listener
    focusHandler(event) {
      // If focus leaves modal content, bring it back
      const content = this.$refs.content
      const { target } = event
      if (
        this.noEnforceFocus ||
        !this.isTop ||
        !this.isVisible ||
        !content ||
        document === target ||
        contains(content, target) ||
        (this.computeIgnoreEnforceFocusSelector &&
          closest(this.computeIgnoreEnforceFocusSelector, target, true))
      ) {
        return
      }
      const tabables = getTabables(this.$refs.content)
      const bottomTrap = this.$refs['bottom-trap']
      const topTrap = this.$refs['top-trap']
      if (bottomTrap && target === bottomTrap) {
        // If user pressed TAB out of modal into our bottom trab trap element
        // Find the first tabable element in the modal content and focus it
        if (attemptFocus(tabables[0])) {
          // Focus was successful
          return
        }
      } else if (topTrap && target === topTrap) {
        // If user pressed CTRL-TAB out of modal and into our top tab trap element
        // Find the last tabable element in the modal content and focus it
        if (attemptFocus(tabables[tabables.length - 1])) {
          // Focus was successful
          return
        }
      }
      // Otherwise focus the modal content container
      attemptFocus(content, { preventScroll: true })
    },
    // Turn on/off focusin listener
    setEnforceFocus(on) {
      this.listenDocument(on, 'focusin', this.focusHandler)
    },
    // Resize listener
    setResizeEvent(on) {
      this.listenWindow(on, 'resize', this.checkModalOverflow)
      this.listenWindow(on, 'orientationchange', this.checkModalOverflow)
    },
    // Root listener handlers
    showHandler(id, triggerEl) {
      if (id === this.modalId) {
        this.$_returnFocus = triggerEl || this.getActiveElement()
        this.show()
      }
    },
    hideHandler(id) {
      if (id === this.modalId) {
        this.hide('event')
      }
    },
    toggleHandler(id, triggerEl) {
      if (id === this.modalId) {
        this.toggle(triggerEl)
      }
    },
    modalListener(bvEvent) {
      // If another modal opens, close this one if stacking not permitted
      if (this.noStacking && bvEvent.vueTarget !== this) {
        this.hide()
      }
    },
    // Focus control handlers
    focusFirst() {
      // Don't try and focus if we are SSR
      if (IS_BROWSER) {
        requestAF(() => {
          const modal = this.$refs.modal
          const content = this.$refs.content
          const activeElement = this.getActiveElement()
          // If the modal contains the activeElement, we don't do anything
          if (modal && content && !(activeElement && contains(content, activeElement))) {
            const ok = this.$refs['ok-button']
            const cancel = this.$refs['cancel-button']
            const close = this.$refs['close-button']
            // Focus the appropriate button or modal content wrapper
            const autoFocus = this.autoFocusButton
            /* istanbul ignore next */
            const el =
              autoFocus === BUTTON_OK && ok
                ? ok.$el || ok
                : autoFocus === BUTTON_CANCEL && cancel
                  ? cancel.$el || cancel
                  : autoFocus === BUTTON_CLOSE && close
                    ? close.$el || close
                    : content
            // Focus the element
            attemptFocus(el)
            if (el === content) {
              // Make sure top of modal is showing (if longer than the viewport)
              this.$nextTick(() => {
                modal.scrollTop = 0
              })
            }
          }
        })
      }
    },
    returnFocusTo() {
      // Prefer `returnFocus` prop over event specified
      // `return_focus` value
      let el = this.returnFocus || this.$_returnFocus || null
      this.$_returnFocus = null
      this.$nextTick(() => {
        // Is el a string CSS selector?
        el = isString(el) ? select(el) : el
        if (el) {
          // Possibly could be a component reference
          el = el.$el || el
          attemptFocus(el)
        }
      })
    },
    checkModalOverflow() {
      if (this.isVisible) {
        const modal = this.$refs.modal
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight
      }
    },
    makeModal(h) {
      // Modal header
      let $header = h()
      if (!this.hideHeader) {
        // TODO: Rename slot to `header` and deprecate `modal-header`
        let $modalHeader = this.normalizeSlot(SLOT_NAME_MODAL_HEADER, this.slotScope)
        if (!$modalHeader) {
          let $closeButton = h()
          if (!this.hideHeaderClose) {
            $closeButton = h(
              BButtonClose,
              {
                props: {
                  content: this.headerCloseContent,
                  disabled: this.isTransitioning,
                  ariaLabel: this.headerCloseLabel,
                  textVariant: this.headerCloseVariant || this.headerTextVariant
                },
                on: { click: this.onClose },
                ref: 'close-button'
              },
              // TODO: Rename slot to `header-close` and deprecate `modal-header-close`
              [this.normalizeSlot(SLOT_NAME_MODAL_HEADER_CLOSE)]
            )
          }

          $modalHeader = [
            h(
              this.titleTag,
              {
                staticClass: 'modal-title',
                class: this.titleClasses,
                attrs: { id: this.modalTitleId },
                // TODO: Rename slot to `title` and deprecate `modal-title`
                domProps: this.hasNormalizedSlot(SLOT_NAME_MODAL_TITLE)
                  ? {}
                  : htmlOrText(this.titleHtml, this.title)
              },
              // TODO: Rename slot to `title` and deprecate `modal-title`
              this.normalizeSlot(SLOT_NAME_MODAL_TITLE, this.slotScope)
            ),
            $closeButton
          ]
        }

        $header = h(
          this.headerTag,
          {
            staticClass: 'modal-header',
            class: this.headerClasses,
            attrs: { id: this.modalHeaderId },
            ref: 'header'
          },
          [$modalHeader]
        )
      }

      // Modal body
      const $body = h(
        'div',
        {
          staticClass: 'modal-body',
          class: this.bodyClasses,
          attrs: { id: this.modalBodyId },
          ref: 'body'
        },
        this.normalizeSlot(SLOT_NAME_DEFAULT, this.slotScope)
      )

      // Modal footer
      let $footer = h()
      if (!this.hideFooter) {
        // TODO: Rename slot to `footer` and deprecate `modal-footer`
        let $modalFooter = this.normalizeSlot(SLOT_NAME_MODAL_FOOTER, this.slotScope)
        if (!$modalFooter) {
          let $cancelButton = h()
          if (!this.okOnly) {
            $cancelButton = h(
              BButton,
              {
                props: {
                  variant: this.cancelVariant,
                  size: this.buttonSize,
                  disabled: this.cancelDisabled || this.busy || this.isTransitioning
                },
                // TODO: Rename slot to `cancel-button` and deprecate `modal-cancel`
                domProps: this.hasNormalizedSlot(SLOT_NAME_MODAL_CANCEL)
                  ? {}
                  : htmlOrText(this.cancelTitleHtml, this.cancelTitle),
                on: { click: this.onCancel },
                ref: 'cancel-button'
              },
              // TODO: Rename slot to `cancel-button` and deprecate `modal-cancel`
              this.normalizeSlot(SLOT_NAME_MODAL_CANCEL)
            )
          }

          const $okButton = h(
            BButton,
            {
              props: {
                variant: this.okVariant,
                size: this.buttonSize,
                disabled: this.okDisabled || this.busy || this.isTransitioning
              },
              // TODO: Rename slot to `ok-button` and deprecate `modal-ok`
              domProps: this.hasNormalizedSlot(SLOT_NAME_MODAL_OK)
                ? {}
                : htmlOrText(this.okTitleHtml, this.okTitle),
              on: { click: this.onOk },
              ref: 'ok-button'
            },
            // TODO: Rename slot to `ok-button` and deprecate `modal-ok`
            this.normalizeSlot(SLOT_NAME_MODAL_OK)
          )

          $modalFooter = [$cancelButton, $okButton]
        }

        $footer = h(
          this.footerTag,
          {
            staticClass: 'modal-footer',
            class: this.footerClasses,
            attrs: { id: this.modalFooterId },
            ref: 'footer'
          },
          [$modalFooter]
        )
      }

      // Assemble modal content
      const $modalContent = h(
        'div',
        {
          staticClass: 'modal-content',
          class: this.contentClass,
          attrs: {
            id: this.modalContentId,
            tabindex: '-1'
          },
          ref: 'content'
        },
        [$header, $body, $footer]
      )

      // Tab traps to prevent page from scrolling to next element in
      // tab index during enforce-focus tab cycle
      let $tabTrapTop = h()
      let $tabTrapBottom = h()
      if (this.isVisible && !this.noEnforceFocus) {
        $tabTrapTop = h('span', {
          attrs: { tabindex: '0' },
          ref: 'top-trap'
        })
        $tabTrapBottom = h('span', {
          attrs: { tabindex: '0' },
          ref: 'bottom-trap'
        })
      }

      // Modal dialog wrapper
      const $modalDialog = h(
        'div',
        {
          staticClass: 'modal-dialog',
          class: this.dialogClasses,
          on: { mousedown: this.onDialogMousedown },
          ref: 'dialog'
        },
        [$tabTrapTop, $modalContent, $tabTrapBottom]
      )

      // Modal
      let $modal = h(
        'div',
        {
          staticClass: 'modal',
          class: this.modalClasses,
          style: this.modalStyles,
          attrs: this.computedModalAttrs,
          on: { keydown: this.onEsc, click: this.onClickOut },
          directives: [{ name: 'show', value: this.isVisible }],
          ref: 'modal'
        },
        [$modalDialog]
      )

      // Wrap modal in transition
      // Sadly, we can't use `BVTransition` here due to the differences in
      // transition durations for `.modal` and `.modal-dialog`
      // At least until https://github.com/vuejs/vue/issues/9986 is resolved
      $modal = h(
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
        [$modal]
      )

      // Modal backdrop
      let $backdrop = h()
      if (!this.hideBackdrop && this.isVisible) {
        $backdrop = h(
          'div',
          {
            staticClass: 'modal-backdrop',
            attrs: { id: this.modalBackdropId }
          },
          // TODO: Rename slot to `backdrop` and deprecate `modal-backdrop`
          this.normalizeSlot(SLOT_NAME_MODAL_BACKDROP)
        )
      }
      $backdrop = h(BVTransition, { props: { noFade: this.noFade } }, [$backdrop])

      // Assemble modal and backdrop in an outer <div>
      return h(
        'div',
        {
          style: this.modalOuterStyle,
          attrs: this.computedAttrs,
          key: `modal-outer-${this[COMPONENT_UID_KEY]}`
        },
        [$modal, $backdrop]
      )
    }
  },
  render(h) {
    if (this.static) {
      return this.lazy && this.isHidden ? h() : this.makeModal(h)
    } else {
      return this.isHidden ? h() : h(BVTransporter, [this.makeModal(h)])
    }
  }
})
