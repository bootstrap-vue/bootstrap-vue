import BButtonClose from '../button/button-close'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'

const NAME = 'BAlert'

// @vue/component
export default {
  name: NAME,
  components: { BButtonClose },
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
      dismissed: false,
      showClass: this.fade && this.show
    }
  },
  computed: {
    localShow() {
      return !this.dismissed && (this.countDownTimerId || this.show)
    }
  },
  watch: {
    show(newVal) {
      this.showChanged(newVal)
    },
    dismissed(newVal) {
      if (newVal) {
        this.$emit('dismissed')
      }
    }
  },
  mounted() {
    this.showChanged(this.show)
  },
  destroyed /* istanbul ignore next */() {
    this.clearCounter()
  },
  methods: {
    dismiss() {
      this.clearCounter()
      if (typeof this.show === 'number') {
        this.$emit('dismiss-count-down', 0)
        this.$emit('input', 0)
      } else {
        this.$emit('input', false)
      }
      this.dismissed = true
    },
    clearCounter() {
      if (this.countDownTimerId) {
        clearInterval(this.countDownTimerId)
        this.countDownTimerId = null
      }
    },
    showChanged(show) {
      // Reset counter status
      this.clearCounter()
      // Reset dismiss status
      this.dismissed = false
      // No timer for boolean values
      if (show === true || show === false || show === null || show === 0) {
        return
      }
      // Start counter (ensure we have an integer value)
      let dismissCountDown = parseInt(show, 10) || 1
      this.countDownTimerId = setInterval(() => {
        if (dismissCountDown < 1) {
          this.dismiss()
          return
        }
        dismissCountDown--
        this.$emit('dismiss-count-down', dismissCountDown)
        this.$emit('input', dismissCountDown)
      }, 1000)
    }
  },
  render(h) {
    const $slots = this.$slots
    let $alert = undefined
    if (this.localShow) {
      let $dismissBtn = h(false)
      if (this.dismissible) {
        // Add dismiss button
        $dismissBtn = h(
          'b-button-close',
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
          // Disable use of built-in transition classes
          'enter-class': '',
          'enter-active-class': '',
          'enter-to-class': '',
          'leave-class': '',
          'leave-active-class': '',
          'leave-to-class': ''
        },
        on: {
          beforeEnter: () => {
            if (this.fade) {
              requestAF(() => {
                this.showClass = true
              })
            }
          },
          beforeLeave: () => {
            this.showClass = false
          }
        }
      },
      $alert
    )
  }
}
