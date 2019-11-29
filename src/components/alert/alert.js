import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'
import { isBoolean } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import BVTransition from '../../utils/bv-transition'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButtonClose } from '../button/button-close'

const NAME = 'BAlert'

// Convert `show` value to a number
const parseCountDown = show => {
  if (show === '' || isBoolean(show)) {
    return 0
  }
  show = toInteger(show)
  return show > 0 ? show : 0
}

// Convert `show` value to a boolean
const parseShow = show => {
  if (show === '' || show === true) {
    return true
  }
  if (toInteger(show) < 1) {
    // Boolean will always return false for the above comparison
    return false
  }
  return !!show
}

// Is a value number like (i.e. a number or a number as string)
const isNumericLike = value => !isNaN(toInteger(value))

// @vue/component
export const BAlert = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [normalizeSlotMixin],
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
      localShow: parseShow(this.show)
    }
  },
  watch: {
    show(newVal) {
      this.countDown = parseCountDown(newVal)
      this.localShow = parseShow(newVal)
    },
    countDown(newVal) {
      this.clearTimer()
      if (isNumericLike(this.show)) {
        // Ignore if this.show transitions to a boolean value.
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
        [$dismissBtn, this.normalizeSlot('default')]
      )
      $alert = [$alert]
    }
    return h(BVTransition, { props: { noFade: !this.fade } }, $alert)
  }
})
