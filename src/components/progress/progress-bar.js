export default {
  render (h) {
    let childNodes = h(false)
    if (this.$slots.default) {
      childNodes = this.$slots.default
    } else if (this.label) {
      childNodes = h('span', { domProps: { innerHTML: this.label } })
    } else if (this.computedShowProgress) {
      childNodes = this.progress.toFixed(this.computedPrecision)
    } else if (this.computedShowValue) {
      childNodes = this.value.toFixed(this.computedPrecision)
    }
    return h(
      'div',
      {
        class: this.progressBarClasses,
        style: this.progressBarStyles,
        attrs: {
          role: 'progressbar',
          'aria-valuemin': '0',
          'aria-valuemax': this.computedMax.toString(),
          'aria-valuenow': this.value.toFixed(this.computedPrecision)
        }
      },
      [ childNodes ]
    )
  },
  computed: {
    progressBarClasses () {
      return [
        'progress-bar',
        this.computedVariant ? `bg-${this.computedVariant}` : '',
        (this.computedStriped || this.computedAnimated) ? 'progress-bar-striped' : '',
        this.computedAnimated ? 'progress-bar-animated' : ''
      ]
    },
    progressBarStyles () {
      return {
        width: (100 * (this.value / this.computedMax)) + '%'
      }
    },
    progress () {
      const p = Math.pow(10, this.computedPrecision)
      return Math.round((100 * p * this.value) / this.computedMax) / p
    },
    computedMax () {
      // Prefer our max over parent setting
      return typeof this.max === 'number' ? this.max : (this.$parent.max || 100)
    },
    computedVariant () {
      // Prefer our variant over parent setting
      return this.variant || this.$parent.variant
    },
    computedPrecision () {
      // Prefer our precision over parent setting
      return typeof this.precision === 'number' ? this.precision : (this.$parent.precision || 0)
    },
    computedStriped () {
      // Prefer our striped over parent setting
      return typeof this.striped === 'boolean' ? this.striped : (this.$parent.striped || false)
    },
    computedAnimated () {
      // Prefer our animated over parent setting
      return typeof this.animated === 'boolean' ? this.animated : (this.$parent.animated || false)
    },
    computedShowProgress () {
      // Prefer our showProgress over parent setting
      return typeof this.showProgress === 'boolean' ? this.showProgress : (this.$parent.showProgress || false)
    },
    computedShowValue () {
      // Prefer our showValue over parent setting
      return typeof this.showValue === 'boolean' ? this.showValue : (this.$parent.showValue || false)
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: null
    },
    // $parent prop values take precedence over the following props
    // Which is why they are defaulted to null
    max: {
      type: Number,
      default: null
    },
    precision: {
      type: Number,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: null
    },
    animated: {
      type: Boolean,
      default: null
    },
    showProgress: {
      type: Boolean,
      default: null
    },
    showValue: {
      type: Boolean,
      default: null
    }
  }
}
