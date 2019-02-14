import BButtonClose from '../button/button-close'

// @vue/component
export default {
  name: 'BAlert',
  components: { BButtonClose },
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
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
      dismissed: false
    }
  },
  computed: {
    classObject() {
      return ['alert', this.alertVariant, this.dismissible ? 'alert-dismissible' : '']
    },
    alertVariant() {
      const variant = this.variant
      return `alert-${variant}`
    },
    localShow() {
      return !this.dismissed && (this.countDownTimerId || this.show)
    }
  },
  watch: {
    show() {
      this.showChanged()
    }
  },
  mounted() {
    this.showChanged()
  },
  destroyed /* istanbul ignore next */() {
    this.clearCounter()
  },
  methods: {
    dismiss() {
      this.clearCounter()
      this.dismissed = true
      this.$emit('dismissed')
      this.$emit('input', false)
      if (typeof this.show === 'number') {
        this.$emit('dismiss-count-down', 0)
        this.$emit('input', 0)
      } else {
        this.$emit('input', false)
      }
    },
    clearCounter() {
      if (this.countDownTimerId) {
        clearInterval(this.countDownTimerId)
        this.countDownTimerId = null
      }
    },
    showChanged() {
      // Reset counter status
      this.clearCounter()
      // Reset dismiss status
      this.dismissed = false
      // No timer for boolean values
      if (this.show === true || this.show === false || this.show === null || this.show === 0) {
        return
      }
      // Start counter (ensure we have an integer value)
      let dismissCountDown = parseInt(this.show, 10) || 1
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
    if (!this.localShow) {
      // If not showing, render placeholder
      return h(false)
    }
    let dismissBtn = h(false)
    if (this.dismissible) {
      // Add dismiss button
      dismissBtn = h(
        'b-button-close',
        { attrs: { 'aria-label': this.dismissLabel }, on: { click: this.dismiss } },
        [this.$slots.dismiss]
      )
    }
    const alert = h(
      'div',
      {
        class: this.classObject,
        attrs: { role: 'alert', 'aria-live': 'polite', 'aria-atomic': true }
      },
      [dismissBtn, this.$slots.default]
    )
    return !this.fade ? alert : h('transition', { props: { name: 'fade', appear: true } }, [alert])
  }
}
