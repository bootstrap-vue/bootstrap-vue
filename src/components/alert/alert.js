import { ARIA_LIVE_POLITE, ARIA_VALUE_TRUE } from '../../constants/aria'
import { ATTR_ARIA_ATOMIC, ATTR_ARIA_LABEL, ATTR_ARIA_LIVE, ATTR_ROLE } from '../../constants/attrs'
import { CLASS_NAME_ALERT } from '../../constants/class-names'
import { NAME_ALERT } from '../../constants/components'
import { EVENT_NAME_CLICK, EVENT_NAME_INPUT } from '../../constants/events'
import { ROLE_ALERT } from '../../constants/roles'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import { TAG_DIV } from '../../constants/tags'
import BVTransition from '../../utils/bv-transition'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { requestAF } from '../../utils/dom'
import { isBoolean, isNumeric } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { buildObject } from '../../utils/object'
import { suffixClass } from '../../utils/string'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButtonClose } from '../button/button-close'

// --- Utility methods ---

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
export const BAlert = /*#__PURE__*/ Vue.extend({
  name: NAME_ALERT,
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'show',
    event: EVENT_NAME_INPUT
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
          this.$emit(EVENT_NAME_INPUT, newVal)
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
        this.$emit(EVENT_NAME_INPUT, newVal)
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
    let $alert = h()
    if (this.localShow) {
      const { dismissible, variant } = this

      let $dismissBtn = h()
      if (dismissible) {
        $dismissBtn = h(
          BButtonClose,
          {
            attrs: buildObject([[ATTR_ARIA_LABEL, this.dismissLabel]]),
            on: buildObject([[EVENT_NAME_CLICK, this.dismiss]])
          },
          [this.normalizeSlot('dismiss')]
        )
      }

      $alert = h(
        TAG_DIV,
        {
          staticClass: CLASS_NAME_ALERT,
          class: buildObject([
            [suffixClass(CLASS_NAME_ALERT, 'dismissible'), dismissible],
            [suffixClass(CLASS_NAME_ALERT, variant), variant]
          ]),
          attrs: buildObject([
            [ATTR_ROLE, ROLE_ALERT],
            [ATTR_ARIA_LIVE, ARIA_LIVE_POLITE],
            [ATTR_ARIA_ATOMIC, ARIA_VALUE_TRUE]
          ]),
          key: this._uid
        },
        [$dismissBtn, this.normalizeSlot(SLOT_NAME_DEFAULT)]
      )
    }

    return h(BVTransition, { props: { noFade: !this.fade } }, [$alert])
  }
})
