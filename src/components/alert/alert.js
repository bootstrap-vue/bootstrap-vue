import BButtonClose from '../button/button-close'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'

const NAME = 'BAlert'

// Helper function
const parseCountDown = value => typeof value === 'number' && value > 0 ? value : 0

// @vue/component
export default {
  name: NAME,
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    variant: {
      type: String,
      default: () => getComponentConfig(NAME, 'variant')
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissLabel: {
      type: String,
      default: () => getComponentConfig(NAME, 'dismissLabel')
    },
    show: {
      type: [Boolean, Number],
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      countDownTimerId: null,
      countDown: 0,
      // If initially shown, we need to set these for SSR
      localShow: Boolean(this.show),
      showClass: this.fade && this.show
    }
  },
  watch: {
    show(newVal) {
      this.countDown = parseCountDown(newVal)
      this.localShow = Boolean(newVal)
    },
    countDown(newVal) {
      this.clearTimer()
      this.$emit('dismiss-count-down', newVal)
      if (this.show !== newVal) {
        // Update the v-model if needed
        this.$emit('input', newVal)
      }
      if (newVal > 0) {
        this.localShow = true
        this.countDownTimerId = setTimeout(() => {
          this.countDown--
        }, 1000)
      } else {
        this.localShow = false
      }
    },
    localShow(newVal) {
      if (!newVal && this.dismissible) {
        this.$emit('dismissed')
      }
      if (typeof this.show !== 'number' && this.show !== newVal) {
        this.$emit('input', newVal)
      }
    }
  },
  created() {
    this.countDown = parseCountDown(newVal)
    this.localShow = Boolean(this.show)
  },
  mounted() {
    this.countDown = parseCountDown(newVal)
    this.localShow = Boolean(this.show)
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    dismiss() {
      this.clearTimer()
      this.countDown = 0
      this.localShow = false
    },
    clearTimer() {
      if (this.countDownTimerId) {
        clearInterval(this.countDownTimerId)
        this.countDownTimerId = null
      }
    },
    onBeforeEnter() {
      if (this.fade) {
        requestAF(() => {
          this.showClass = true
        })
      }
    },
    onBeforeLeave() /* istanbul ignore next: does not appear to be called in vue-test-utils */ {
      this.showClass = false
    }
  },
  render(h) {
    const $slots = this.$slots
    let $alert // undefined
    if (this.localShow) {
      let $dismissBtn = h(false)
      if (this.dismissible) {
        // Add dismiss button
        $dismissBtn = h(
          BButtonClose,
          { attrs: { 'aria-label': this.dismissLabel }, on: { click: this.dismiss } },
          [$slots.dismiss]
        )
      }
      $alert = h(
        'div',
        {
          staticClass: 'alert',
          class: {
            fade: this.fade,
            show: this.showClass,
            'alert-dismissible': this.dismissible,
            [`alert-${this.variant}`]: this.variant
          },
          attrs: { role: 'alert', 'aria-live': 'polite', 'aria-atomic': true }
        },
        [$dismissBtn, $slots.default]
      )
      $alert = [$alert]
    }
    return h(
      'transition',
      {
        props: {
          'enter-class': '',
          'enter-active-class': '',
          'enter-to-class': '',
          'leave-class': 'show',
          'leave-active-class': '',
          'leave-to-class': ''
        },
        on: {
          beforeEnter: this.onBeforeEnter,
          beforeLeave: this.onBeforeLeave
        }
      },
      $alert
    )
  }
}
