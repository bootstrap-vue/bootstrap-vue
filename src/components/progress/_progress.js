import bProgressBar from './progress-bar'

export default {
  components: { bProgressBar },
  render (h) {
    const t = this
    let childNodes = t.$slots.default
    if (!childNodes) {
      childNodes = h(
        'b-progress-bar',
        {
          props: {
            value: t.value,
            max: t.max,
            precision: t.precision,
            variant: t.variant,
            animated: t.animated,
            striped: t.striped,
            showProgress: t.showProgress,
            showValue: t.showValue
          }
        }
      )
    }
    return h('div', { class: [ 'progress' ], style: t.progressHeight }, [ childNodes ])
  },
  props: {
    // These props can be inherited via the child b-progress-bar(s)
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    precision: {
      type: Number,
      default: 0
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    // This prop is not inherited by child b-progress-bar(s)
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progressHeight () {
      return { height: this.height || null }
    }
  }
}
