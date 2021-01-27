import { Portal, Wormhole } from 'portal-vue'
import { COMPONENT_UID_KEY, Vue } from '../../vue'
import { NAME_TOAST, NAME_TOASTER } from '../../constants/components'
import {
  EVENT_NAME_CHANGE,
  EVENT_NAME_DESTROYED,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  EVENT_NAME_TOGGLE,
  EVENT_OPTIONS_NO_CAPTURE
} from '../../constants/events'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { SLOT_NAME_DEFAULT, SLOT_NAME_TOAST_TITLE } from '../../constants/slots'
import { BvEvent } from '../../utils/bv-event.class'
import { requestAF } from '../../utils/dom'
import { getRootActionEventName, getRootEventName, eventOnOff } from '../../utils/events'
import { mathMax } from '../../utils/math'
import { makeModelMixin } from '../../utils/model'
import { toInteger } from '../../utils/number'
import { pick, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { attrsMixin } from '../../mixins/attrs'
import { idMixin, props as idProps } from '../../mixins/id'
import { listenOnRootMixin } from '../../mixins/listen-on-root'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { scopedStyleMixin } from '../../mixins/scoped-style'
import { BButtonClose } from '../button/button-close'
import { BLink, props as BLinkProps } from '../link/link'
import { BVTransition } from '../transition/bv-transition'
import { BToaster } from './toaster'

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

const MIN_DURATION = 1000

// --- Props ---

const linkProps = pick(BLinkProps, ['href', 'to'])

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...linkProps,
    appendToast: makeProp(PROP_TYPE_BOOLEAN, false),
    autoHideDelay: makeProp(PROP_TYPE_NUMBER_STRING, 5000),
    bodyClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    headerClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    // Switches role to 'status' and aria-live to 'polite'
    isStatus: makeProp(PROP_TYPE_BOOLEAN, false),
    noAutoHide: makeProp(PROP_TYPE_BOOLEAN, false),
    noCloseButton: makeProp(PROP_TYPE_BOOLEAN, false),
    noFade: makeProp(PROP_TYPE_BOOLEAN, false),
    noHoverPause: makeProp(PROP_TYPE_BOOLEAN, false),
    solid: makeProp(PROP_TYPE_BOOLEAN, false),
    // Render the toast in place, rather than in a portal-target
    static: makeProp(PROP_TYPE_BOOLEAN, false),
    title: makeProp(PROP_TYPE_STRING),
    toastClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    toaster: makeProp(PROP_TYPE_STRING, 'b-toaster-top-right'),
    variant: makeProp(PROP_TYPE_STRING)
  }),
  NAME_TOAST
)

// --- Main component ---

// @vue/component
export const BToast = /*#__PURE__*/ Vue.extend({
  name: NAME_TOAST,
  mixins: [
    attrsMixin,
    idMixin,
    modelMixin,
    listenOnRootMixin,
    normalizeSlotMixin,
    scopedStyleMixin
  ],
  inheritAttrs: false,
  props,
  data() {
    return {
      isMounted: false,
      isHidden: true, // If toast should not be in document
      isVisible: false, // Controls toast visible state
      isTransitioning: false, // Used for style control
      isShowing: false, // To signal that the toast is in the process of showing
      isHiding: false, // To signal that the toast is in the process of hiding
      order: 0,
      dismissStarted: 0,
      resumeDismiss: 0
    }
  },
  computed: {
    toastId() {
      return this.safeId()
    },
    toastClasses() {
      const { appendToast, variant } = this

      return {
        'b-toast-solid': this.solid,
        'b-toast-append': appendToast,
        'b-toast-prepend': !appendToast,
        [`b-toast-${variant}`]: variant
      }
    },
    slotScope() {
      const { hide, isVisible: visible } = this
      return { hide, visible }
    },
    computedDuration() {
      // Minimum supported duration is 1 second
      return mathMax(toInteger(this.autoHideDelay, 0), MIN_DURATION)
    },
    computedToaster() {
      return String(this.toaster)
    },
    transitionHandlers() {
      return {
        beforeEnter: this.onBeforeEnter,
        afterEnter: this.onAfterEnter,
        beforeLeave: this.onBeforeLeave,
        afterLeave: this.onAfterLeave
      }
    },
    computedAttrs() {
      return {
        ...this.bvAttrs,
        id: this.toastId,
        tabindex: '0'
      }
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue) {
        this[newValue ? 'show' : 'hide']()
      }
    },
    /* istanbul ignore next */
    toaster() {
      // If toaster target changed, make sure toaster exists
      this.$nextTick(this.ensureToaster)
    },
    /* istanbul ignore next */
    static(newValue) {
      // If static changes to `true`, and the toast is showing,
      // ensure the toaster target exists
      if (newValue && this.isVisible) {
        this.ensureToaster()
      }
    }
  },
  created() {
    // Create private non-reactive props
    this.$_dismissTimer = null
  },
  mounted() {
    this.isMounted = true
    // Listen for events from others to either show or hide ourselves
    this.listenOnRoot(getRootActionEventName(NAME_TOAST, EVENT_NAME_SHOW), this.showHandler)
    this.listenOnRoot(getRootActionEventName(NAME_TOAST, EVENT_NAME_HIDE), this.hideHandler)
    this.listenOnRoot(getRootActionEventName(NAME_TOAST, EVENT_NAME_TOGGLE), this.toggleHandler)
    // Make sure we hide when toaster is destroyed
    /* istanbul ignore next: difficult to test */
    this.listenOnRoot(
      getRootEventName(NAME_TOASTER, EVENT_NAME_DESTROYED),
      this.toasterDestroyedHandler
    )
    // Initially show toast
    if (this[MODEL_PROP_NAME]) {
      this.$nextTick(this.show)
    }
  },
  beforeDestroy() {
    this.clearDismissTimer()
    if (this.isVisible) {
      this.isVisible = false
      this.isTransitioning = false
    }
  },
  methods: {
    buildEvent(type, options = {}) {
      return new BvEvent(type, {
        // Default options
        cancelable: false,
        target: this.$el || null,
        relatedTarget: null,
        // Supplied options
        ...options,
        // Options that can't be overridden
        vueTarget: this,
        componentId: this.toastId
      })
    },
    emitEvent(bvEvent) {
      const { type } = bvEvent
      // We emit on `$root` first in case a global listener wants to cancel
      // the event first before the instance emits its event
      this.emitOnRoot(getRootEventName(NAME_TOAST, type), bvEvent)
      this.$emit(type, bvEvent)
    },
    ensureToaster() {
      if (this.static) {
        return
      }

      const { computedToaster } = this
      if (!Wormhole.hasTarget(computedToaster)) {
        const div = document.createElement('div')
        document.body.appendChild(div)

        const toaster = new BToaster({
          parent: this.$root,
          propsData: { name: computedToaster }
        })

        toaster.$mount(div)
      }
    },
    startDismissTimer() {
      this.clearDismissTimer()
      if (!this.noAutoHide) {
        this.$_dismissTimer = setTimeout(this.hide, this.resumeDismiss || this.computedDuration)
        this.dismissStarted = Date.now()
        this.resumeDismiss = 0
      }
    },
    clearDismissTimer() {
      clearTimeout(this.$_dismissTimer)
      this.$_dismissTimer = null
    },
    setHoverHandler(on) {
      const $el = this.$refs['b-toast']
      eventOnOff(on, $el, 'mouseenter', this.onPause, EVENT_OPTIONS_NO_CAPTURE)
      eventOnOff(on, $el, 'mouseleave', this.onUnpause, EVENT_OPTIONS_NO_CAPTURE)
    },
    // Private method to update the `v-model`
    updateModel(value) {
      if (value !== this[MODEL_PROP_NAME]) {
        this.$emit(MODEL_EVENT_NAME, value)
      }
    },
    show() {
      console.log('show', {
        id: this.toastId,
        isVisible: this.isVisible,
        isShowing: this.isShowing
      })
      // If already shown, or in the process of showing, do nothing
      /* istanbul ignore next */
      if (this.isVisible || this.isShowing) {
        return
      }
      // If we are in the process of hiding, wait until hidden before showing
      /* istanbul ignore next */
      if (this.isHiding) {
        this.$once(EVENT_NAME_HIDDEN, this.show)
        return
      }
      this.isShowing = true
      const showEvent = this.buildEvent(EVENT_NAME_SHOW, { cancelable: true })
      this.emitEvent(showEvent)
      // Don't show if canceled
      if (showEvent.defaultPrevented || this.isVisible) {
        this.isShowing = false
        // Ensure the `v-model` reflects the current state
        this.updateModel(false)
        return
      }
      this.ensureToaster()
      this.dismissStarted = this.resumeDismiss = 0
      this.order = Date.now() * (this.appendToast ? 1 : -1)
      // Place toast in DOM
      this.isHidden = false
      console.log('show', { id: this.toastId, isHidden: this.isHidden })
      // We do this in `$nextTick()` to ensure the toast is in DOM first,
      // before we show it
      this.$nextTick(() => {
        requestAF(() => {
          this.isVisible = true
          this.isShowing = false
          // Update the `v-model`
          this.updateModel(true)
        })
      })
    },
    hide() {
      // If already hidden, or in the process of hiding, do nothing
      /* istanbul ignore next */
      if (!this.isVisible || this.isHiding) {
        return
      }
      this.isHiding = true
      const hideEvent = this.buildEvent(EVENT_NAME_HIDE, { cancelable: true })
      this.emitEvent(hideEvent)
      // Hide if not canceled
      if (hideEvent.defaultPrevented || !this.isVisible) {
        this.isHiding = false
        // Ensure the `v-model` reflects the current state
        this.updateModel(true)
        return
      }
      this.setHoverHandler(false)
      this.dismissStarted = this.resumeDismiss = 0
      this.clearDismissTimer()
      // Trigger the hide transition
      this.isVisible = false
      // Update the v-model
      this.updateModel(false)
    },
    toggle() {
      if (this.isVisible) {
        this.hide()
      } else {
        this.show()
      }
    },
    // Transition handlers
    onBeforeEnter() {
      console.log('onBeforeEnter', { id: this.toastId, isVisible: this.isVisible })
      this.isTransitioning = true
    },
    onAfterEnter() {
      console.log('onAfterEnter', { id: this.toastId, isVisible: this.isVisible })
      this.isTransitioning = false
      // We use `requestAF()` to allow transition hooks to complete
      // before passing control over to the other handlers
      requestAF(() => {
        this.emitEvent(this.buildEvent(EVENT_NAME_SHOWN))

        this.startDismissTimer()
        this.setHoverHandler(true)
      })
    },
    onBeforeLeave() {
      console.log('onBeforeLeave', { id: this.toastId, isVisible: this.isVisible })
      this.isTransitioning = true
    },
    onAfterLeave() {
      console.log('onAfterLeave', { id: this.toastId, isVisible: this.isVisible })
      this.isTransitioning = false
      this.order = 0
      this.resumeDismiss = this.dismissStarted = 0
      this.isHidden = true
      this.$nextTick(() => {
        this.isHiding = false
        this.emitEvent(this.buildEvent(EVENT_NAME_HIDDEN))
      })
    },
    // Root listener handlers
    showHandler(id) {
      if (id === this.toastId) {
        this.show()
      }
    },
    hideHandler(id) {
      if (!id || id === this.toastId) {
        this.hide()
      }
    },
    toggleHandler(id) {
      if (id === this.toastId) {
        this.toggle()
      }
    },
    toasterDestroyedHandler(toaster) {
      if (toaster === this.computedToaster) {
        this.hide()
      }
    },
    onPause() {
      // Determine time remaining, and then pause timer
      if (this.noAutoHide || this.noHoverPause || !this.$_dismissTimer || this.resumeDismiss) {
        return
      }
      const passed = Date.now() - this.dismissStarted
      if (passed > 0) {
        this.clearDismissTimer()
        this.resumeDismiss = mathMax(this.computedDuration - passed, MIN_DURATION)
      }
    },
    onUnpause() {
      // Restart timer with max of time remaining or 1 second
      if (this.noAutoHide || this.noHoverPause || !this.resumeDismiss) {
        this.resumeDismiss = this.dismissStarted = 0
        return
      }
      this.startDismissTimer()
    },
    onLinkClick() {
      // We delay hiding to give the browser time to process the link click
      this.$nextTick(() => {
        requestAF(() => {
          this.hide()
        })
      })
    },
    // Render helper for generating the toast
    makeToast(h) {
      console.log('makeToast', { id: this.toastId })
      const { title, slotScope } = this
      const link = isLink(this)
      const $headerContent = []

      const $title = this.normalizeSlot(SLOT_NAME_TOAST_TITLE, slotScope)
      if ($title) {
        $headerContent.push($title)
      } else if (title) {
        $headerContent.push(h('strong', { staticClass: 'mr-2' }, title))
      }

      if (!this.noCloseButton) {
        $headerContent.push(
          h(BButtonClose, {
            staticClass: 'ml-auto mb-1',
            props: { disabled: this.isTransitioning },
            on: {
              click: () => {
                this.hide()
              }
            }
          })
        )
      }

      let $header = h()
      if ($headerContent.length > 0) {
        $header = h(
          'header',
          {
            staticClass: 'toast-header',
            class: this.headerClass
          },
          $headerContent
        )
      }

      const $body = h(
        link ? BLink : 'div',
        {
          staticClass: 'toast-body',
          class: this.bodyClass,
          props: link ? pluckProps(linkProps, this) : {},
          on: link ? { click: this.onLinkClick } : {}
        },
        this.normalizeSlot(SLOT_NAME_DEFAULT, slotScope)
      )

      return h(
        'div',
        {
          staticClass: 'toast',
          class: this.toastClass,
          attrs: this.computedAttrs,
          key: `toast-${this[COMPONENT_UID_KEY]}`,
          ref: 'toast'
        },
        [$header, $body]
      )
    }
  },
  render(h) {
    console.log('render', { id: this.toastId, isMounted: this.isMounted, isHidden: this.isHidden })
    if (!this.isMounted || this.isHidden) {
      return h()
    }

    const { order, noFade, static: isStatic, isHiding, isStatus } = this
    const name = `b-toast-${this[COMPONENT_UID_KEY]}`

    const $toast = h(
      'div',
      {
        staticClass: 'b-toast',
        class: this.toastClasses,
        attrs: {
          // If scoped styles are applied and the toast is not static,
          // make sure the scoped style data attribute is applied
          ...(isStatic ? {} : this.scopedStyleAttrs),
          id: this.safeId('__BV_toast_outer_'),
          role: isHiding ? null : isStatus ? 'status' : 'alert',
          'aria-live': isHiding ? null : isStatus ? 'polite' : 'assertive',
          'aria-atomic': isHiding ? null : 'true'
        },
        key: name,
        ref: 'b-toast'
      },
      [
        h(
          BVTransition,
          {
            props: { noFade },
            on: this.transitionHandlers
          },
          [this.isVisible ? this.makeToast(h) : h()]
        )
      ]
    )

    return h(
      Portal,
      {
        props: {
          name,
          to: this.computedToaster,
          order,
          slim: true,
          disabled: isStatic
        }
      },
      [$toast]
    )
  }
})
