import { NAME_ALERT } from '../../constants/components'
import { EVENT_NAME_DISMISSED, EVENT_NAME_DISMISS_COUNT_DOWN } from '../../constants/events'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { SLOT_NAME_DISMISS } from '../../constants/slots'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { requestAF } from '../../utils/dom'
import { isBoolean, isNumeric } from '../../utils/inspect'
import { makeModelMixin } from '../../utils/model'
import { toInteger } from '../../utils/number'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { COMPONENT_UID_KEY, extend } from '../../vue'
import { BButtonClose } from '../button/button-close'
import { BVTransition } from '../transition/bv-transition'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('show', {
  type: PROP_TYPE_BOOLEAN_NUMBER_STRING,
  defaultValue: false
})

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

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...modelProps,
    dismissLabel: makeProp(PROP_TYPE_STRING, 'Close'),
    dismissible: makeProp(PROP_TYPE_BOOLEAN, false),
    fade: makeProp(PROP_TYPE_BOOLEAN, false),
    variant: makeProp(PROP_TYPE_STRING, 'info')
  }),
  NAME_ALERT
)

// --- Main component ---

// @vue/component
export const BAlert = /*#__PURE__*/ extend({
  name: NAME_ALERT,
  mixins: [modelMixin, normalizeSlotMixin],
  props,
  data() {
    return {
      countDown: 0,
      // If initially shown, we need to set these for SSR
      localShow: parseShow(this[MODEL_PROP_NAME])
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue) {
      this.countDown = parseCountDown(newValue)
      this.localShow = parseShow(newValue)
    },
    countDown(newValue) {
      this.clearCountDownInterval()
      const show = this[MODEL_PROP_NAME]
      // Ignore if `show` transitions to a boolean value
      if (isNumeric(show)) {
        this.$emit(EVENT_NAME_DISMISS_COUNT_DOWN, newValue)
        // Update the v-model if needed
        if (show !== newValue) {
          this.$emit(MODEL_EVENT_NAME, newValue)
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
      const show = this[MODEL_PROP_NAME]
      // Only emit dismissed events for dismissible or auto-dismissing alerts
      if (!newValue && (this.dismissible || isNumeric(show))) {
        this.$emit(EVENT_NAME_DISMISSED)
      }
      // Only emit booleans if we weren't passed a number via v-model
      if (!isNumeric(show) && show !== newValue) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    }
  },
  created() {
    // Create private non-reactive props
    this.$_filterTimer = null

    const show = this[MODEL_PROP_NAME]
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
  render(h) {
    let $alert = h()
    if (this.localShow) {
      const { dismissible, variant } = this

      let $dismissButton = h()
      if (dismissible) {
        // Add dismiss button
        $dismissButton = h(
          BButtonClose,
          {
            attrs: { 'aria-label': this.dismissLabel },
            on: { click: this.dismiss }
          },
          [this.normalizeSlot(SLOT_NAME_DISMISS)]
        )
      }

      $alert = h(
        'div',
        {
          staticClass: 'alert',
          class: {
            'alert-dismissible': dismissible,
            [`alert-${variant}`]: variant
          },
          attrs: {
            role: 'alert',
            'aria-live': 'polite',
            'aria-atomic': true
          },
          key: this[COMPONENT_UID_KEY]
        },
        [$dismissButton, this.normalizeSlot()]
      )
    }

    return h(BVTransition, { props: { noFade: !this.fade } }, [$alert])
  }
})
