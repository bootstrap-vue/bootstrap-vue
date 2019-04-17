import Vue from '../../utils/vue'
import { Portal } from 'portal-vue'
import BvEvent from '../../utils/bv-event.class'
import { getComponentConfig } from '../../utils/config'
import { getById, requestAF } from '../../utils/dom'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BButtonClose from '../button/button-close'
import BToaster from './toaster'
import BLink from '../link/link'

/* istanbul ignore file: for now until ready for testing */

// --- Constants ---

const NAME = 'BToast'

export const props = {
  id: {
    type: String,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: null
  },
  toaster: {
    type: String,
    default: () => getComponentConfig(NAME, 'toaster') || 'b-toaster-top-right'
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
    default: 5000
  },
  noCloseButton: {
    type: Boolean,
    default: false
  },
  noFade: {
    type: Boolean,
    default: false
  },
  /*
  noHoverPause: {
    type: Boolean,
    default: false
  },
  */
  solid: {
    type: Boolean,
    default: false
  },
  toastClass: {
    type: [String, Object, Array],
    default: ''
  },
  headerClass: {
    type: [String, Object, Array],
    default: ''
  },
  bodyClass: {
    type: [String, Object, Array],
    default: ''
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

// Transition props defaults
const DEFAULT_TRANSITION_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: '',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: ''
}

// @vue/component
export default Vue.extend({
  name: NAME,
  mixins: [listenOnRootMixin, normalizeSlotMixin],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props,
  data() {
    return {
      doRender: false,
      localShow: false,
      showClass: false,
      isTransitioning: false,
      order: 0,
      timer: null,
      dismissStarted: 0,
      resumeDismiss: 0
    }
  },
  computed: {
    toastClasses() {
      return [
        this.toastClass,
        {
          show: this.showClass,
          fade: !this.noFade
        }
      ]
    },
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
      return parseInt(this.autoHideDelay, 10) || 5000
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
      if (newVal !== this.show) {
        this.$emit('change', newVal)
      }
    }
  },
  mounted() {
    this.doRender = true
    this.$nextTick(() => {
      if (this.visible) {
        requestAF(() => {
          this.show()
        })
      }
    })
    this.listenOnRoot('bv::show:toast', id => {
      if (id === this.id) {
        this.show()
      }
    })
    this.listenOnRoot('bv::hide:toast', id => {
      if (!id || id === this.id) {
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
        this.order = Date.now() * (this.appendToast ? 1 : -1)
        this.localShow = true
      }
    },
    hide() {
      if (this.localShow) {
        const hideEvt = this.buildEvent('hide')
        this.emitEvent(hideEvt)
        this.clearDismissTimer()
        this.localShow = false
      }
    },
    buildEvent(type, opts = {}) {
      return new BvEvent(type, {
        cancelable: false,
        target: this.$el,
        relatedTarget: null,
        ...opts,
        vueTarget: this,
        componentId: this.id || null,
        toastId: this.id || null
      })
    },
    emitEvent(bvEvt) {
      const type = bvEvt.type
      this.$root.$emit(`bv::toast:${type}`, bvEvt)
      this.$emit(type, bvEvt)
    },
    ensureToaster() {
      if (!getById(this.toaster)) {
        const div = document.createElement('div')
        document.body.append(div)
        const toaster = new BToaster({
          parent: this.$root,
          propsData: {
            name: this.toaster
          }
        })
        toaster.$mount(div)
      }
    },
    startDismissTimer() {
      this.clearDismissTimer()
      if (!this.noAutoHide) {
        this.dismissStarted = Date.now()
        this.timer = setTimeout(this.hide, this.resumeDismiss || this.computedDuration)
        this.resumeDismiss = 0
      }
    },
    clearDismissTimer() {
      clearTimeout(this.timer)
      this.timer = null
      this.dismissStarted = 0
      this.resumeDismiss = 0
    },
    onPause(evt) {
      // TODO: Pause auto-hide on hover/focus
      // Determine time remaining, and then pause timer
      if (this.noAutoHide || this.noHoverPause || !this.timer || this.resumeDismiss) {
        return
      }
      if (evt.target !== this.$el) {
        return
      }
      const now = Date.now()
      const passed = now - this.dismissStarted
      if (passed > 0 && passed < this.computedDuration) {
        this.clearDismissTimer()
        this.resumeDismiss = Math.max(passed, 1000)
      }
    },
    onUnpause(evt) {
      // TODO: Un-pause auto-hide on un-hover/blur
      // Restart with max of time remaining or 1 second
      if (this.noAutoHide || this.noHoverPause || this.resumeDismiss === 0) {
        this.resumeDismiss = this.dismissStarted = 0
        return
      }
      if (evt.target !== this.$el) {
        return
      }
      this.startDismissTimer()
    },
    onBeforeEnter() {
      this.isTransitioning = true
      requestAF(() => {
        this.showClass = true
      })
    },
    onAfterEnter() {
      this.isTransitioning = false
      const hiddenEvt = this.buildEvent('shown')
      this.emitEvent(hiddenEvt)
      this.startDismissTimer()
    },
    onBeforeLeave() {
      this.isTransitioning = true
      this.clearDismissTimer()
      requestAF(() => {
        this.showClass = false
      })
    },
    onAfterLeave() {
      this.isTransitioning = false
      this.order = 0
      this.resumeDismiss = this.dismissStarted = 0
      const hiddenEvt = this.buildEvent('hidden')
      this.emitEvent(hiddenEvt)
    },
    makeToast(h) {
      // Render helper for generating the toast
      // Assemble the header content
      const $headerContent = []
      let $title = this.normalizeSlot('toast-title', this.slotScope)
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
      let $header = h(false)
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
          props: isLink ? { to: this.to, href: this.href } : {}
        },
        [this.normalizeSlot('default', this.slotScope) || h(false)]
      )
      // Build the toast
      const $toast = h(
        'div',
        {
          key: 'b-toast',
          staticClass: 'toast',
          class: this.toastClasses,
          attrs: {
            ...this.$attrs,
            id: this.id || null,
            tabindex: '-1',
            role: this.isStatus ? 'status' : 'alert',
            'aria-live': this.isStatus ? 'polite' : 'assertive',
            'aria-atomic': 'true'
          }
          /*
          on: {
            '&mouseenter': this.onPause,
            '&mouseleave': this.onUnPause,
            '&focusin': this.onPause,
            '&focusout': this.onUnPause
          }
          */
        },
        [$header, $body]
      )
      return $toast
    }
  },
  render(h) {
    if (!this.doRender) {
      return h(false)
    }
    const name = this.id || `b-toast-${this._uid}`
    return h(
      Portal,
      {
        props: {
          name: name,
          to: this.toaster,
          order: this.order,
          slim: true,
          disabled: this.static
        }
      },
      [
        h('div', { key: name, staticClass: 'b-toast', class: this.bToastClasses }, [
          h('transition', { props: DEFAULT_TRANSITION_PROPS, on: this.transitionHandlers }, [
            this.localShow ? this.makeToast(h) : null
          ])
        ])
      ]
    )
  }
})
