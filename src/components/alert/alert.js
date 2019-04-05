import Vue from 'vue'
import BButtonClose from '../button/button-close'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'

const NAME = 'BAlert'

// Convert `show` value to a number
const parseCountDown = show => {
  if (show === '' || typeof show === 'boolean') {
    return 0
  }
  show = parseInt(show, 10)
  return show > 0 ? show : 0
}

// Convert `show` value to a boolean
const parseShow = show => {
  if (show === '' || show === true) {
    return true
  }
  if (parseInt(show, 10) < 1) {
    // Boolean will always return false for the above comparison
    return false
  }
  return Boolean(show)
}

// Is a value number like (i.e. a number or a number as string)
const isNumericLike = value => !isNaN(parseInt(value, 10))

// @vue/component
export default Vue.extend({
  name: NAME,
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    variant: {
      type: String,
      default: () => String(getComponentConfig(NAME, 'variant'))
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissLabel: {
      type: String,
      default: () => String(getComponentConfig(NAME, 'dismissLabel'))
    },
    show: {
      type: [Boolean, Number, String],
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
      localShow: parseShow(this.show),
      showClass: this.fade && this.show
    }
  },
  watch: {
    show(newVal) {
      this.countDown = parseCountDown(newVal)
      this.localShow = parseShow(newVal)
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
        // Slightly delay the hide to allow any UI updates
        this.$nextTick(() => {
          requestAF(() => {
            this.localShow = false
          })
        })
      }
    },
    localShow(newVal) {
      if (!newVal && (this.dismissible || isNumericLike(this.show))) {
        // Only emit dismissed events for dismissible or auto dismissing alerts
        this.$emit('dismissed')
      }
      if (!isNumericLike(this.show) && this.show !== newVal) {
        // Only emit booleans if we weren't passed a number via `this.show`
        this.$emit('input', newVal)
      }
    }
  },
  created() {
    this.countDown = parseCountDown(this.show)
    this.localShow = parseShow(this.show)
  },
  mounted() {
    this.countDown = parseCountDown(this.show)
    this.localShow = parseShow(this.show)
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
})
