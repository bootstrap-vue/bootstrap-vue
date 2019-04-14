import Vue from 'vue'
import BButtonClose from '../button/button-close'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BvEvent from '../../utils/bv-event.class'
import { requestAF } from '../../utils/dom'
import { getComponentConfig } from '../../utils/config'

/* istanbul ignore file: for now until ready for testing */

const NAME = 'BToast'

export const props = {
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  toaster: {
    type: String,
    default: () => getComponentConfig(NAME, 'toaster') // 'b-toaster-bottom-right'
  },
  append: {
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

// @vue/component
export default Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  model: {
    props: 'show',
    event: 'change'
  },
  props,
  data() {
    return {
      localShow: false,
      showClass: false,
      isTransitioning: false,
      timer: null
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
    transitionProps() {
      return {
        name: '',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: 'show',
        leaveActiveClass: '',
        leaveToClass: ''
      }
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
    show(newVal, oldVal) {
      newVal ? this.show() : this.hide()
    }
  },
  mounted() {
    // TODO
    if (this.show) {
      this.localShow = true
    }
  },
  methods: {
    show() {
      if (!this.localShow) {
        const showEvt = this.buildEvent('show')
        this.emitEvent(showEvt)
        this.localShow = true
        // TODO
      }
    },
    hide() {
      this.doHide()
    },
    doHide(relatedTarget = null) {
      if (this.localShow) {
        const hideEvt = this.buildEvent('hide', { relatedTarget })
        this.emitEvent(hideEvt)
        this.localShow = false
        // TODO
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
    onPause(evt) {
      // TODO: pause auto-hide on hover/focus
      // Determine time remaining, and then pause timer
    },
    onUnpause(evt) {
      // TODO: un-pause auto-hide on un-hover/blur
      // restart with max of time remaining or 1 second
    },
    onBeforeEnter() {
      requestAF(() => {
        this.showClass = true
      })
    },
    onAfterEnter() {
      // TODO
      const hiddenEvt = this.buildEvent('shown')
      this.emitEvent(hiddenEvt)
    },
    onBeforeLeave() {
      requestAF(() => {
        this.showClass = false
      })
    },
    onAfterLeave() {
      // TODO
      const hiddenEvt = this.buildEvent('hidden')
      this.emitEvent(hiddenEvt)
    }
  },
  render(h) {
    // Assemble the header content
    const $headerContent = []
    let $title = this.normalizeSlot('toast-title', this.slotScope)
    if ($title) {
      $headerContent.push($title)
    } else if (this.title) {
      $headerContent.push(h('strong', { staticClass: 'mr-auto' }, this.title))
    }
    if (!this.noCloseButton) {
      $headerContent.push(
        h(BButtonClose, { staticClass: 'ml-2 mb-1', on: { click: evt => this.doHide(evt.target) } })
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
        class: this.toastClasses,
        directives: [
          { name: 'show', rawName: 'v-show', value: this.localShow, expression: 'localShow' }
        ],
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
    // TODO: Wrap in a <portal> with specified target
    //       once initial testing is complete
    return h('transition', { props: this.transitionProps, on: this.transitionHandlers }, [$toast])
  }
})
