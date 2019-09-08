import Vue from '../../utils/vue'
import { Portal, Wormhole } from 'portal-vue'
import BVTransition from '../../utils/bv-transition'
import { BvEvent } from '../../utils/bv-event.class'
import { getComponentConfig } from '../../utils/config'
import { requestAF, eventOn, eventOff } from '../../utils/dom'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import scopedStyleAttrsMixin from '../../mixins/scoped-style-attrs'
import { BToaster } from './toaster'
import { BButtonClose } from '../button/button-close'
import { BLink } from '../link/link'

// --- Constants ---

const NAME = 'BToast'

const MIN_DURATION = 1000

const EVENT_OPTIONS = { passive: true, capture: false }

// --- Props ---

export const props = {
  id: {
    // Even though the ID prop is provided by idMixin, we
    // add it here for $bvToast props filtering
    type: String,
    default: null
  },
  title: {
    type: String,
    default: null
  },
  toaster: {
    type: String,
    default: () => getComponentConfig(NAME, 'toaster')
  },
  visible: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME, 'variant')
  },
  isStatus: {
    // Switches role to 'status' and aria-live to 'polite'
    type: Boolean,
    default: false
  },
  appendToast: {
    type: Boolean,
    default: false
  },
  noAutoHide: {
    type: Boolean,
    default: false
  },
  autoHideDelay: {
    type: [Number, String],
    default: () => getComponentConfig(NAME, 'autoHideDelay')
  },
  noCloseButton: {
    type: Boolean,
    default: false
  },
  noFade: {
    type: Boolean,
    default: false
  },
  noHoverPause: {
    type: Boolean,
    default: false
  },
  solid: {
    type: Boolean,
    default: false
  },
  toastClass: {
    type: [String, Object, Array],
    default: () => getComponentConfig(NAME, 'toastClass')
  },
  headerClass: {
    type: [String, Object, Array],
    default: () => getComponentConfig(NAME, 'headerClass')
  },
  bodyClass: {
    type: [String, Object, Array],
    default: () => getComponentConfig(NAME, 'bodyClass')
  },
  href: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  static: {
    // Render the toast in place, rather than in a portal-target
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BToast = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin, scopedStyleAttrsMixin],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props,
  data() {
    return {
      isMounted: false,
      doRender: false,
      localShow: false,
      isTransitioning: false,
      isHiding: false,
      order: 0,
      timer: null,
      dismissStarted: 0,
      resumeDismiss: 0
    }
  },
  computed: {
    bToastClasses() {
      return {
        'b-toast-solid': this.solid,
        'b-toast-append': this.appendToast,
        'b-toast-prepend': !this.appendToast,
        [`b-toast-${this.variant}`]: this.variant
      }
    },
    slotScope() {
      return {
        hide: this.hide
      }
    },
    computedDuration() {
      // Minimum supported duration is 1 second
      return Math.max(parseInt(this.autoHideDelay, 10) || 0, MIN_DURATION)
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
    }
  },
  watch: {
    visible(newVal) {
      newVal ? this.show() : this.hide()
    },
    localShow(newVal) {
      if (newVal !== this.visible) {
        this.$emit('change', newVal)
      }
    },
    toaster(newVal) /* istanbul ignore next */ {
      // If toaster target changed, make sure toaster exists
      this.$nextTick(() => this.ensureToaster)
    },
    static(newVal) /* istanbul ignore next */ {
      // If static changes to true, and the toast is showing,
      // ensure the toaster target exists
      if (newVal && this.localShow) {
        this.ensureToaster()
      }
    }
  },
  mounted() {
    this.isMounted = true
    this.$nextTick(() => {
      if (this.visible) {
        requestAF(() => {
          this.show()
        })
      }
    })
    // Listen for global $root show events
    this.listenOnRoot('bv::show::toast', id => {
      if (id === this.safeId()) {
        this.show()
      }
    })
    // Listen for global $root hide events
    this.listenOnRoot('bv::hide::toast', id => {
      if (!id || id === this.safeId()) {
        this.hide()
      }
    })
    // Make sure we hide when toaster is destroyed
    /* istanbul ignore next: difficult to test */
    this.listenOnRoot('bv::toaster::destroyed', toaster => {
      /* istanbul ignore next */
      if (toaster === this.computedToaster) {
        /* istanbul ignore next */
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
        const showEvt = this.buildEvent('show')
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
        const hideEvt = this.buildEvent('hide')
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
    buildEvent(type, opts = {}) {
      return new BvEvent(type, {
        cancelable: false,
        target: this.$el || null,
        relatedTarget: null,
        ...opts,
        vueTarget: this,
        componentId: this.safeId()
      })
    },
    emitEvent(bvEvt) {
      const type = bvEvt.type
      this.$root.$emit(`bv::toast:${type}`, bvEvt)
      this.$emit(type, bvEvt)
    },
    ensureToaster() {
      if (this.static) {
        return
      }
      if (!Wormhole.hasTarget(this.computedToaster)) {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const toaster = new BToaster({
          parent: this.$root,
          propsData: {
            name: this.computedToaster
          }
        })
        toaster.$mount(div)
      }
    },
    startDismissTimer() {
      this.clearDismissTimer()
      if (!this.noAutoHide) {
        this.timer = setTimeout(this.hide, this.resumeDismiss || this.computedDuration)
        this.dismissStarted = Date.now()
        this.resumeDismiss = 0
      }
    },
    clearDismissTimer() {
      clearTimeout(this.timer)
      this.timer = null
    },
    setHoverHandler(on) {
      const method = on ? eventOn : eventOff
      const el = this.$refs['b-toast']
      method(el, 'mouseenter', this.onPause, EVENT_OPTIONS)
      method(el, 'mouseleave', this.onUnPause, EVENT_OPTIONS)
    },
    onPause(evt) {
      // Determine time remaining, and then pause timer
      if (this.noAutoHide || this.noHoverPause || !this.timer || this.resumeDismiss) {
        return
      }
      const passed = Date.now() - this.dismissStarted
      if (passed > 0) {
        this.clearDismissTimer()
        this.resumeDismiss = Math.max(this.computedDuration - passed, MIN_DURATION)
      }
    },
    onUnPause(evt) {
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
      const hiddenEvt = this.buildEvent('shown')
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
      const hiddenEvt = this.buildEvent('hidden')
      this.emitEvent(hiddenEvt)
      this.doRender = false
    },
    makeToast(h) {
      // Render helper for generating the toast
      // Assemble the header content
      const $headerContent = []
      const $title = this.normalizeSlot('toast-title', this.slotScope)
      if ($title) {
        $headerContent.push($title)
      } else if (this.title) {
        $headerContent.push(h('strong', { staticClass: 'mr-2' }, this.title))
      }
      if (!this.noCloseButton) {
        $headerContent.push(
          h(BButtonClose, {
            staticClass: 'ml-auto mb-1',
            on: {
              click: evt => {
                this.hide()
              }
            }
          })
        )
      }
      // Assemble the header (if needed)
      let $header = h()
      if ($headerContent.length > 0) {
        $header = h(
          'header',
          { staticClass: 'toast-header', class: this.headerClass },
          $headerContent
        )
      }
      // Toast body
      const isLink = this.href || this.to
      const $body = h(
        isLink ? BLink : 'div',
        {
          staticClass: 'toast-body',
          class: this.bodyClass,
          props: isLink ? { to: this.to, href: this.href } : {},
          on: isLink ? { click: this.onLinkClick } : {}
        },
        [this.normalizeSlot('default', this.slotScope) || h()]
      )
      // Build the toast
      const $toast = h(
        'div',
        {
          key: `toast-${this._uid}`,
          ref: 'toast',
          staticClass: 'toast',
          class: this.toastClass,
          attrs: {
            ...this.$attrs,
            tabindex: '0',
            id: this.safeId()
          }
        },
        [$header, $body]
      )
      return $toast
    }
  },
  render(h) {
    if (!this.doRender || !this.isMounted) {
      return h()
    }
    const name = `b-toast-${this._uid}`
    // If scoped styles are applied and the toast is not static,
    // make sure the scoped style data attribute is applied
    const scopedStyleAttrs = !this.static ? this.scopedStyleAttrs : {}

    return h(
      Portal,
      {
        props: {
          name: name,
          to: this.computedToaster,
          order: this.order,
          slim: true,
          disabled: this.static
        }
      },
      [
        h(
          'div',
          {
            key: name,
            ref: 'b-toast',
            staticClass: 'b-toast',
            class: this.bToastClasses,
            attrs: {
              ...scopedStyleAttrs,
              id: this.safeId('_toast_outer'),
              role: this.isHiding ? null : this.isStatus ? 'status' : 'alert',
              'aria-live': this.isHiding ? null : this.isStatus ? 'polite' : 'assertive',
              'aria-atomic': this.isHiding ? null : 'true'
            }
          },
          [
            h(BVTransition, { props: { noFade: this.noFade }, on: this.transitionHandlers }, [
              this.localShow ? this.makeToast(h) : h()
            ])
          ]
        )
      ]
    )
  }
})
