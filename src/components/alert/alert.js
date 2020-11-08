import { defineComponent, h } from '../../vue'
import { NAME_ALERT } from '../../constants/components'
import { EVENT_NAME_MODEL_VALUE } from '../../constants/events'
import { PROP_NAME_MODEL_VALUE } from '../../constants/props'
import BVTransition from '../../utils/bv-transition'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'
import { isBoolean, isNumeric } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import modelMixin from '../../mixins/model'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButtonClose } from '../button/button-close'

// --- Constants ---

const EVENT_NAME_DISMISSED = 'dismissed'
const EVENT_NAME_DISMISS_COUNT_DOWN = 'dismiss-count-down'

// --- Helper methods ---

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

// --- Main component ---
// @vue/component
export const BAlert = /*#__PURE__*/ defineComponent({
  name: NAME_ALERT,
  mixins: [modelMixin, normalizeSlotMixin],
  props: {
    [PROP_NAME_MODEL_VALUE]: {
      type: [Boolean, Number, String],
      default: false
    },
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
    fade: {
      type: Boolean,
      default: false
    }
  },
  emits: [EVENT_NAME_DISMISSED, EVENT_NAME_DISMISS_COUNT_DOWN],
  data() {
    return {
      countDown: 0,
      countDownTimeout: null,
      // If initially shown, we need to set these for SSR
      localShow: parseShow(this[PROP_NAME_MODEL_VALUE])
    }
  },
  watch: {
    [PROP_NAME_MODEL_VALUE](newVal) {
      this.countDown = parseCountDown(newVal)
      this.localShow = parseShow(newVal)
    },
    countDown(newValue) {
      this.clearCountDownInterval()
      const show = this[PROP_NAME_MODEL_VALUE]
      if (isNumeric(show)) {
        // Ignore if this.show transitions to a boolean value.
        this.$emit(EVENT_NAME_DISMISS_COUNT_DOWN, newValue)
        if (show !== newValue) {
          // Update the v-model if needed
          this.$emit(EVENT_NAME_MODEL_VALUE, newValue)
        }
        if (newValue > 0) {
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
    localShow(newValue) {
      const show = this[PROP_NAME_MODEL_VALUE]
      // Only emit dismissed events for dismissible or auto-dismissing alerts
      if (!newValue && (this.dismissible || isNumeric(show))) {
        this.$emit(EVENT_NAME_DISMISSED)
      }
      // Only emit booleans if we weren't passed a number via v-model
      if (!isNumeric(show) && show !== newValue) {
        this.$emit(EVENT_NAME_MODEL_VALUE, newValue)
      }
    }
  },
  created() {
    const show = this[PROP_NAME_MODEL_VALUE]
    this.countDown = parseCountDown(show)
    this.localShow = parseShow(show)
  },
  mounted() {
    const show = this[PROP_NAME_MODEL_VALUE]
    this.countDown = parseCountDown(show)
    this.localShow = parseShow(show)
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
  render() {
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
