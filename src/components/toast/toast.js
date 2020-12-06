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
      doRender: false,
      localShow: false,
      isTransitioning: false,
      isHiding: false,
      order: 0,
      dismissStarted: 0,
      resumeDismiss: 0
    }
  },
  computed: {
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
      const { hide } = this
      return { hide }
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
        id: this.safeId(),
        tabindex: '0'
      }
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue) {
      this[newValue ? 'show' : 'hide']()
    },
    localShow(newValue) {
      if (newValue !== this[MODEL_PROP_NAME]) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    },
    /* istanbul ignore next */
    toaster() {
      // If toaster target changed, make sure toaster exists
      this.$nextTick(this.ensureToaster)
    },
    /* istanbul ignore next */
    static(newValue) {
      // If static changes to true, and the toast is showing,
      // ensure the toaster target exists
      if (newValue && this.localShow) {
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
    this.$nextTick(() => {
      if (this[MODEL_PROP_NAME]) {
        requestAF(() => {
          this.show()
        })
      }
    })
    // Listen for global $root show events
    this.listenOnRoot(getRootActionEventName(NAME_TOAST, EVENT_NAME_SHOW), id => {
      if (id === this.safeId()) {
        this.show()
      }
    })
    // Listen for global $root hide events
    this.listenOnRoot(getRootActionEventName(NAME_TOAST, EVENT_NAME_HIDE), id => {
      if (!id || id === this.safeId()) {
        this.hide()
      }
    })
    // Make sure we hide when toaster is destroyed
    /* istanbul ignore next: difficult to test */
    this.listenOnRoot(getRootEventName(NAME_TOASTER, EVENT_NAME_DESTROYED), toaster => {
      /* istanbul ignore next */
      if (toaster === this.computedToaster) {
        this.hide()
      }
    })
  },
  beforeDestroy() {
    this.clearDismissTimer()
  },
  methods: {
    show() {
      if (!this.localShow) {
        this.ensureToaster()
        const showEvt = this.buildEvent(EVENT_NAME_SHOW)
        this.emitEvent(showEvt)
        this.dismissStarted = this.resumeDismiss = 0
        this.order = Date.now() * (this.appendToast ? 1 : -1)
        this.isHiding = false
        this.doRender = true
        this.$nextTick(() => {
          // We show the toast after we have rendered the portal and b-toast wrapper
          // so that screen readers will properly announce the toast
          requestAF(() => {
            this.localShow = true
          })
        })
      }
    },
    hide() {
      if (this.localShow) {
        const hideEvt = this.buildEvent(EVENT_NAME_HIDE)
        this.emitEvent(hideEvt)
        this.setHoverHandler(false)
        this.dismissStarted = this.resumeDismiss = 0
        this.clearDismissTimer()
        this.isHiding = true
        requestAF(() => {
          this.localShow = false
        })
      }
    },
    buildEvent(type, options = {}) {
      return new BvEvent(type, {
        cancelable: false,
        target: this.$el || null,
        relatedTarget: null,
        ...options,
        vueTarget: this,
        componentId: this.safeId()
      })
    },
    emitEvent(bvEvent) {
      const { type } = bvEvent
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
      const el = this.$refs['b-toast']
      eventOnOff(on, el, 'mouseenter', this.onPause, EVENT_OPTIONS_NO_CAPTURE)
      eventOnOff(on, el, 'mouseleave', this.onUnPause, EVENT_OPTIONS_NO_CAPTURE)
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
    onUnPause() {
      // Restart timer with max of time remaining or 1 second
      if (this.noAutoHide || this.noHoverPause || !this.resumeDismiss) {
        this.resumeDismiss = this.dismissStarted = 0
        return
      }
      this.startDismissTimer()
    },
    onLinkClick() {
      // We delay the close to allow time for the
      // browser to process the link click
      this.$nextTick(() => {
        requestAF(() => {
          this.hide()
        })
      })
    },
    onBeforeEnter() {
      this.isTransitioning = true
    },
    onAfterEnter() {
      this.isTransitioning = false
      const hiddenEvt = this.buildEvent(EVENT_NAME_SHOWN)
      this.emitEvent(hiddenEvt)
      this.startDismissTimer()
      this.setHoverHandler(true)
    },
    onBeforeLeave() {
      this.isTransitioning = true
    },
    onAfterLeave() {
      this.isTransitioning = false
      this.order = 0
      this.resumeDismiss = this.dismissStarted = 0
      const hiddenEvt = this.buildEvent(EVENT_NAME_HIDDEN)
      this.emitEvent(hiddenEvt)
      this.doRender = false
    },
    // Render helper for generating the toast
    makeToast(h) {
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
          { staticClass: 'toast-header', class: this.headerClass },
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
    if (!this.doRender || !this.isMounted) {
      return h()
    }

    const { order, static: isStatic, isHiding, isStatus } = this
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
          id: this.safeId('_toast_outer'),
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
            props: { noFade: this.noFade },
            on: this.transitionHandlers
          },
          [this.localShow ? this.makeToast(h) : h()]
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
