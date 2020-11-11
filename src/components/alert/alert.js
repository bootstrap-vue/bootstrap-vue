import { COMPONENT_UID_KEY, defineComponent, h } from '../../vue'
import { NAME_ALERT } from '../../constants/components'
import BVTransition from '../../utils/bv-transition'
import { makePropsConfigurable } from '../../utils/config'
import { requestAF } from '../../utils/dom'
import { isBoolean, isNumeric } from '../../utils/inspect'
import { makeModelMixin } from '../../utils/model'
import { toInteger } from '../../utils/number'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButtonClose } from '../button/button-close'

// --- Constants ---

const PROP_NAME_SHOW = 'show'

const EVENT_NAME_DISMISSED = 'dismissed'
const EVENT_NAME_DISMISS_COUNT_DOWN = 'dismiss-count-down'

const { mixin: modelMixin, event: EVENT_NAME_UPDATE_SHOW } = makeModelMixin(PROP_NAME_SHOW)

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
  props: makePropsConfigurable(
    {
      [PROP_NAME_SHOW]: {
        type: [Boolean, Number, String],
        default: false
      },
      variant: {
        type: String,
        default: 'info'
      },
      dismissible: {
        type: Boolean,
        default: false
      },
      dismissLabel: {
        type: String,
        default: 'Close'
      },
      fade: {
        type: Boolean,
        default: false
      }
    },
    NAME_ALERT
  ),
  emits: [EVENT_NAME_DISMISSED, EVENT_NAME_DISMISS_COUNT_DOWN],
  data() {
    return {
      countDown: 0,
      // If initially shown, we need to set these for SSR
      localShow: parseShow(this[PROP_NAME_SHOW])
    }
  },
  watch: {
    [PROP_NAME_SHOW](newValue) {
      this.countDown = parseCountDown(newValue)
      this.localShow = parseShow(newValue)
    },
    countDown(newValue) {
      this.clearCountDownInterval()
      const show = this[PROP_NAME_SHOW]
      if (isNumeric(show)) {
        // Ignore if this.show transitions to a boolean value.
        this.$emit(EVENT_NAME_DISMISS_COUNT_DOWN, newValue)
        if (show !== newValue) {
          // Update the v-model if needed
          this.$emit(EVENT_NAME_UPDATE_SHOW, newValue)
        }
        if (newValue > 0) {
          this.localShow = true
          this.$_countDownTimeout = setTimeout(() => {
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
      const show = this[PROP_NAME_SHOW]
      // Only emit dismissed events for dismissible or auto-dismissing alerts
      if (!newValue && (this.dismissible || isNumeric(show))) {
        this.$emit(EVENT_NAME_DISMISSED)
      }
      // Only emit booleans if we weren't passed a number via v-model
      if (!isNumeric(show) && show !== newValue) {
        this.$emit(EVENT_NAME_UPDATE_SHOW, newValue)
      }
    }
  },
  created() {
    // Create private non-reactive props
    this.$_filterTimer = null

    const show = this[PROP_NAME_SHOW]
    this.countDown = parseCountDown(show)
    this.localShow = parseShow(show)
  },
  mounted() {
    const show = this[PROP_NAME_SHOW]
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
      clearTimeout(this.$_countDownTimeout)
      this.$_countDownTimeout = null
    }
  },
  render() {
    let $alert = h()
    if (this.localShow) {
      const { dismissible, variant } = this

      let $dismissButton = h()
      if (dismissible) {
        // Add dismiss button
        $dismissButton = h(
          BButtonClose,
          { attrs: { 'aria-label': this.dismissLabel }, on: { click: this.dismiss } },
          [this.normalizeSlot('dismiss')]
        )
      }

      $alert = h(
        'div',
        {
          staticClass: 'alert',
          class: {
            'alert-dismissible': dismissible,
            [`alert-${variant}`]: !!variant
          },
          attrs: { role: 'alert', 'aria-live': 'polite', 'aria-atomic': true },
          key: this[COMPONENT_UID_KEY]
        },
        [$dismissButton, this.normalizeSlot()]
      )
    }

    return h(BVTransition, { props: { noFade: !this.fade } }, $alert)
  }
})
