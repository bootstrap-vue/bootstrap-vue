import Vue from '../../vue'
import { NAME_ALERT } from '../../constants/components'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'
import { isBoolean, isNumeric } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import BVTransition from '../../utils/bv-transition'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButtonClose } from '../button/button-close'

// Convert `show` value to a number
const parseCountDown = show => {
  if (show === '' || isBoolean(show)) {
    return 0
  }
  show = toInteger(show, 0)
  return show > 0 ? show : 0
}

// Convert `show` value to a boolean
const parseShow = show => {
  if (show === '' || show === true) {
    return true
  }
  if (toInteger(show, 0) < 1) {
    // Boolean will always return false for the above comparison
    return false
  }
  return !!show
}

// @vue/component
export const BAlert = /*#__PURE__*/ Vue.extend({
  name: NAME_ALERT,
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    variant: {
      type: String,
      default: () => getComponentConfig(NAME_ALERT, 'variant')
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissLabel: {
      type: String,
      default: () => getComponentConfig(NAME_ALERT, 'dismissLabel')
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
      countDown: 0,
      countDownTimeout: null,
      // If initially shown, we need to set these for SSR
      localShow: parseShow(this.show)
    }
  },
  watch: {
    show(newVal) {
      this.countDown = parseCountDown(newVal)
      this.localShow = parseShow(newVal)
    },
    countDown(newVal) {
      this.clearCountDownInterval()
      if (isNumeric(this.show)) {
        // Ignore if this.show transitions to a boolean value.
        this.$emit('dismiss-count-down', newVal)
        if (this.show !== newVal) {
          // Update the v-model if needed
          this.$emit('input', newVal)
        }
        if (newVal > 0) {
          this.localShow = true
          this.countDownTimeout = setTimeout(() => {
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
      }
    },
    localShow(newVal) {
      if (!newVal && (this.dismissible || isNumeric(this.show))) {
        // Only emit dismissed events for dismissible or auto dismissing alerts
        this.$emit('dismissed')
      }
      if (!isNumeric(this.show) && this.show !== newVal) {
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
    this.clearCountDownInterval()
  },
  methods: {
    dismiss() {
      this.clearCountDownInterval()
      this.countDown = 0
      this.localShow = false
    },
    clearCountDownInterval() {
      if (this.countDownTimeout) {
        clearTimeout(this.countDownTimeout)
        this.countDownTimeout = null
      }
    }
  },
  render(h) {
    let $alert // undefined
    if (this.localShow) {
      let $dismissBtn = h()
      if (this.dismissible) {
        // Add dismiss button
        $dismissBtn = h(
          BButtonClose,
          { attrs: { 'aria-label': this.dismissLabel }, on: { click: this.dismiss } },
          [this.normalizeSlot('dismiss')]
        )
      }
      $alert = h(
        'div',
        {
          key: this._uid,
          staticClass: 'alert',
          class: {
            'alert-dismissible': this.dismissible,
            [`alert-${this.variant}`]: this.variant
          },
          attrs: { role: 'alert', 'aria-live': 'polite', 'aria-atomic': true }
        },
        [$dismissBtn, this.normalizeSlot()]
      )
      $alert = [$alert]
    }
    return h(BVTransition, { props: { noFade: !this.fade } }, $alert)
  }
})
