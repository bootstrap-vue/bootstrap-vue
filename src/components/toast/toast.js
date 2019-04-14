import Vue from 'vue'
import { Portal } from 'portal-vue'
import BToaster from './toaster'
import BButtonClose from '../button/button-close'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BvEvent from '../../utils/bv-event.class'
import { getById, requestAF } from '../../utils/dom'
import { getComponentConfig } from '../../utils/config'

/* istanbul ignore file: for now until ready for testing */

const NAME = 'BToast'

export const props = {
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  titleHtml: {
    type: String,
    default: null
  },
  toaster: {
    type: String,
    default: () => getComponentConfig(NAME, 'toaster') // 'b-toaster-bottom-right'
  },
  prepend: {
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
  isStatus: {
    // Switches role to 'status' and aria-live to 'polite'
    type: Boolean,
    default: false
  },
  static: {
    // Render the toast in place, rather than in a portal-taget
    type: Boolean,
    default: false
  }
}

// Transition Props defaults:
const DEFAULT_TRANSITION_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: '',
  leaveClass: '',
  leaveActiveClass: '',
  leaveToClass: ''
}

// @vue/component
export default Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
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
      dismissStarted: null
    }
  },
  computed: {
    toastClasses() {
      return {
        // TODO
        show: this.showClass,
        fade: !this.noFade
      }
    },
    slotScope() {
      return {
        // TODO
        hide: this.hide
      }
    },
    computedDuration() {
      return parseInt(this.autoHideDelay, 10) || 5000
    }
  },
  watch: {
    visible(newVal, oldVal) {
      newVal ? this.show() : this.hide()
    },
    localShow(newVal, oldVal) {
      if (newVal !== this.show) {
        this.$emit('change', newVal)
      }
    }
  },
  beforeMount() {
    // Make sure our destination toaster exists in DOM
    this.ensureToaster()
  },
  mounted() {
    this.doRender = true
    this.$nextTick(() => {
      if (this.visible) {
        this.show()
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
        this.order = Date.now() * (this.prepend ? -1 : 1)
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
        componentId: this.safeId(),
        toastId: this.safeId()
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
    startDismissTimer(duration = 0) {
      this.clearDismissTimer()
      if (!this.noAutoHide) {
        this.dismissStarted = Date.now()
        duration = duration || this.computedDuration
        this.timer = setTimeout(() => {}, duration)
      }
    },
    clearDismissTimer() {
      clearTimeout(this.timer)
      this.timer = null
      this.dismissStarted = null
    },
    onPause(evt) {
      // TODO: pause auto-hide on hover/focus
      // Determine time remaining, and then pause timer
    },
    onUnpause(evt) {
      // TODO: un-pause auto-hide on un-hover/blur
      // restart with max of time remaining or 1 second
    },
    onBeforeEnter() {
      this.isTransitining = true
      requestAF(() => {
        this.showClass = true
      })
    },
    onAfterEnter() {
      // TODO
      this.isTransitining = false
      const hiddenEvt = this.buildEvent('shown')
      this.emitEvent(hiddenEvt)
      this.startDismissTimer()
    },
    onBeforeLeave() {
      this.isTransitining = true
      this.clearDismissTimer()
      requestAF(() => {
        this.showClass = false
      })
    },
    onAfterLeave() {
      // TODO
      this.isTransitining = false
      this.order = 0
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
      } else if (this.titleHtml) {
        $headerContent.push(
          h('strong', {
            staticClass: 'mr-auto',
            domProps: { innerHtml: this.titleHtml }
          })
        )
      }
      if (!this.noCloseButton) {
        $headerContent.push(
          h(BButtonClose, {
            staticClass: 'ml-auto mb-1',
            on: { click: evt => this.hide }
          })
        )
      }
      // Assemble the header (if needed)
      let $header = h(false)
      if ($headerContent.length > 0) {
        $header = h('header', { staticClass: 'toast-header' }, $headerContent)
      }
      // Toast body
      const $body = h('div', { staticClass: 'toast-body' }, [
        this.normalizeSlot('default', this.slotScope) || h(false)
      ])
      // Build the toast
      const $toast = h(
        'div',
        {
          staticClass: 'toast',
          key: 'b-toast',
          class: this.toastClasses,
          attrs: {
            id: this.safeId(),
            tabindex: '-1',
            role: this.isStatus ? 'status' : 'alert',
            'aria-live': this.isStatus ? 'polite' : 'assertive',
            'aria-atomic': 'true'
          }
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
    return h(
      Portal,
      {
        props: {
          name: this.safeId(),
          to: this.toaster,
          slim: true,
          disabled: this.static
        }
      },
      [
        h(
          'transition',
          {
            props: DEFAULT_TRANSITION_PROPS,
            on: {
              beforeEnter: this.onBeforeEnter,
              afterEnter: this.onAfterEnter,
              beforeLeave: this.onBeforeLeave,
              afterLeave: this.onAfterLeave
            }
          },
          [this.localShow ? this.makeToast(h) : null]
        )
      ]
    )
  }
})
