import { Vue } from '../../vue'
import { NAME_PROGRESS_BAR } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { htmlOrText } from '../../utils/html'
import { isBoolean } from '../../utils/inspect'
import { mathMax, mathPow } from '../../utils/math'
import { toFixed, toFloat, toInteger } from '../../utils/number'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    animated: makeProp(PROP_TYPE_BOOLEAN, null),
    label: makeProp(PROP_TYPE_STRING),
    labelHtml: makeProp(PROP_TYPE_STRING),
    max: makeProp(PROP_TYPE_NUMBER_STRING, null),
    precision: makeProp(PROP_TYPE_NUMBER_STRING, null),
    showProgress: makeProp(PROP_TYPE_BOOLEAN, null),
    showValue: makeProp(PROP_TYPE_BOOLEAN, null),
    striped: makeProp(PROP_TYPE_BOOLEAN, null),
    value: makeProp(PROP_TYPE_NUMBER_STRING, 0),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_PROGRESS_BAR
)

// --- Main component ---

// @vue/component
export const BProgressBar = /*#__PURE__*/ Vue.extend({
  name: NAME_PROGRESS_BAR,
  mixins: [normalizeSlotMixin],
  inject: {
    bvProgress: {
      default: /* istanbul ignore next */ () => ({})
    }
  },
  props,
  computed: {
    progressBarClasses() {
      const { computedAnimated, computedVariant } = this
      return [
        computedVariant ? `bg-${computedVariant}` : '',
        this.computedStriped || computedAnimated ? 'progress-bar-striped' : '',
        computedAnimated ? 'progress-bar-animated' : ''
      ]
    },
    progressBarStyles() {
      return {
        width: 100 * (this.computedValue / this.computedMax) + '%'
      }
    },
    computedValue() {
      return toFloat(this.value, 0)
    },
    computedMax() {
      // Prefer our max over parent setting
      // Default to `100` for invalid values (`-x`, `0`, `NaN`)
      const max = toFloat(this.max) || toFloat(this.bvProgress.max, 0)
      return max > 0 ? max : 100
    },
    computedPrecision() {
      // Prefer our precision over parent setting
      // Default to `0` for invalid values (`-x`, `NaN`)
      return mathMax(toInteger(this.precision, toInteger(this.bvProgress.precision, 0)), 0)
    },
    computedProgress() {
      const precision = this.computedPrecision
      const p = mathPow(10, precision)
      return toFixed((100 * p * this.computedValue) / this.computedMax / p, precision)
    },
    computedVariant() {
      // Prefer our variant over parent setting
      return this.variant || this.bvProgress.variant
    },
    computedStriped() {
      // Prefer our striped over parent setting
      return isBoolean(this.striped) ? this.striped : this.bvProgress.striped || false
    },
    computedAnimated() {
      // Prefer our animated over parent setting
      return isBoolean(this.animated) ? this.animated : this.bvProgress.animated || false
    },
    computedShowProgress() {
      // Prefer our showProgress over parent setting
      return isBoolean(this.showProgress)
        ? this.showProgress
        : this.bvProgress.showProgress || false
    },
    computedShowValue() {
      // Prefer our showValue over parent setting
      return isBoolean(this.showValue) ? this.showValue : this.bvProgress.showValue || false
    }
  },
  render(h) {
    const { label, labelHtml, computedValue, computedPrecision } = this

    let $children
    let domProps = {}
    if (this.hasNormalizedSlot()) {
      $children = this.normalizeSlot()
    } else if (label || labelHtml) {
      domProps = htmlOrText(labelHtml, label)
    } else if (this.computedShowProgress) {
      $children = this.computedProgress
    } else if (this.computedShowValue) {
      $children = toFixed(computedValue, computedPrecision)
    }

    return h(
      'div',
      {
        staticClass: 'progress-bar',
        class: this.progressBarClasses,
        style: this.progressBarStyles,
        attrs: {
          role: 'progressbar',
          'aria-valuemin': '0',
          'aria-valuemax': toString(this.computedMax),
          'aria-valuenow': toFixed(computedValue, computedPrecision)
        },
        domProps
      },
      $children
    )
  }
})
