import Vue from '../../utils/vue'
import { BVFormBtnLabelControl, dropdownProps } from '../../utils/bv-form-btn-label-control'
import { getComponentConfig } from '../../utils/config'
import { isUndefinedOrNull } from '../../utils/inspect'
import idMixin from '../../mixins/id'
import { BButton } from '../button/button'
import { BTime } from '../time/time'
import { BIconClock, BIconClockFill } from '../../icons/icons'

const NAME = 'BFormTimepicker'

// Fallback to BTime/BFormSpinbutton prop if no value found
const getConfigFallback = prop => {
  return (
    getComponentConfig(NAME, prop) ||
    getComponentConfig('BTime', prop) ||
    getComponentConfig('BFormSpinbutton', prop)
  )
}

// We create our props as a mixin so that we can control
// where they appear in the props listing reference section
const propsMixin = {
  props: {
    value: {
      type: String,
      default: ''
    },
    resetValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
      // Defaults to `labelNoTime` from BTime context
      // default: null
    },
    size: {
      type: String
      // default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      // If true adds the `aria-required` attribute
      type: Boolean,
      default: false
    },
    name: {
      type: String
      // default: null
    },
    form: {
      type: String
      // default: null
    },
    state: {
      // Tri-state prop: `true`, `false` or `null`
      type: Boolean,
      default: null
    },
    hour12: {
      // Tri-state prop: `true` => 12 hour, `false` => 24 hour, `null` => auto
      type: Boolean,
      default: null
    },
    locale: {
      type: [String, Array]
      // default: null
    },
    showSeconds: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    secondsStep: {
      type: [Number, String],
      default: 1
    },
    minutesStep: {
      type: [Number, String],
      default: 1
    },
    buttonOnly: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Applicable in button only mode
      type: String,
      default: 'secondary'
    },
    nowButton: {
      type: Boolean,
      default: false
    },
    labelNowButton: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNowButton')
    },
    nowButtonVariant: {
      type: String,
      default: 'outline-primary'
    },
    resetButton: {
      type: Boolean,
      default: false
    },
    labelResetButton: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelResetButton')
    },
    resetButtonVariant: {
      type: String,
      default: 'outline-danger'
    },
    noCloseButton: {
      type: Boolean,
      default: false
    },
    labelCloseButton: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelCloseButton')
    },
    closeButtonVariant: {
      type: String,
      default: 'outline-secondary'
    },
    // Labels
    // These fallback to BTime values
    labelSelected: {
      type: String,
      default: () => getConfigFallback('labelSelected')
    },
    labelNoTimeSelected: {
      type: String,
      default: () => getConfigFallback('labelNoTimeSelected')
    },
    labelHours: {
      type: String,
      default: () => getConfigFallback('labelHours')
    },
    labelMinutes: {
      type: String,
      default: () => getConfigFallback('labelMinutes')
    },
    labelSeconds: {
      type: String,
      default: () => getConfigFallback('labelSeconds')
    },
    labelAmpm: {
      type: String,
      default: () => getConfigFallback('labelAmpm')
    },
    labelAm: {
      type: String,
      default: () => getConfigFallback('labelAm')
    },
    labelPm: {
      type: String,
      default: () => getConfigFallback('labelPm')
    },
    // These pick BTime or BFormSpinbutton global config if no BFormTimepicker global config
    labelIncrement: {
      type: String,
      default: () => getConfigFallback('labelIncrement')
    },
    labelDecrement: {
      type: String,
      default: () => getConfigFallback('labelDecrement')
    },
    // extra dropdown stuff
    menuClass: {
      type: [String, Array, Object]
      // default: null
    },
    ...dropdownProps
  }
}

// --- BFormDate component ---

// @vue/component
export const BFormTimepicker = /*#__PURE__*/ Vue.extend({
  name: NAME,
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin, propsMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      // We always use `HH:mm:ss` value internally
      localHMS: this.value || '',
      // Context data from BTime
      localLocale: null,
      isRTL: false,
      formattedValue: '',
      // If the menu is opened
      isVisible: false
    }
  },
  computed: {
    computedLang() {
      return (this.localLocale || '').replace(/-u-.*$/i, '') || null
    },
    timeProps() {
      // Props we pass to BTime
      // Use self for better minification, as `this` won't
      // minimize and we reference it many times below
      const self = this
      return {
        hidden: !self.isVisible,
        value: self.localHMS,
        // Passthrough props
        readonly: self.readonly,
        disabled: self.disabled,
        locale: self.locale,
        hour12: self.hour12,
        hideHeader: self.hideHeader,
        showSeconds: self.showSeconds,
        secondsStep: self.secondsStep,
        minutesStep: self.minutesStep,
        labelNoTimeSelected: self.labelNoTimeSelected,
        labelSelected: self.labelSelected,
        labelHours: self.labelHours,
        labelMinutes: self.labelMinutes,
        labelSeconds: self.labelSeconds,
        labelAmpm: self.labelAmpm,
        labelAm: self.labelAm,
        labelPm: self.labelPm,
        labelIncrement: self.labelIncrement,
        labelDecrement: self.labelDecrement
      }
    }
  },
  watch: {
    value(newVal) {
      this.localHMS = newVal || ''
    },
    localHMS(newVal) {
      // We only update the v-model value when the timepicker
      // is open, to prevent cursor jumps when bound to a
      // text input in button only mode
      if (this.isVisible) {
        this.$emit('input', newVal || '')
      }
    }
  },
  methods: {
    // Public methods
    focus() {
      if (!this.disabled) {
        try {
          this.$refs.control.focus()
        } catch {}
      }
    },
    blur() {
      if (!this.disabled) {
        try {
          this.$refs.control.blur()
        } catch {}
      }
    },
    // Private methods
    setAndClose(value) {
      this.localHMS = value
      this.$nextTick(() => {
        this.$refs.control.hide(true)
      })
    },
    onInput(hms) {
      if (this.localHMS !== hms) {
        this.localHMS = hms
      }
    },
    onContext(ctx) {
      const { isRTL, locale, value, formatted } = ctx
      this.isRTL = isRTL
      this.localLocale = locale
      this.formattedValue = formatted
      this.localHMS = value || ''
      // Re-emit the context event
      this.$emit('context', ctx)
    },
    onNowButton() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = this.showSeconds ? now.getSeconds() : 0
      const value = [hours, minutes, seconds].map(v => `00${v || ''}`.slice(-2)).join(':')
      this.setAndClose(value)
    },
    onResetButton() {
      this.setAndClose(this.resetValue)
    },
    onCloseButton() {
      this.$refs.control.hide(true)
    },
    onShow() {
      this.isVisible = true
    },
    onShown() {
      this.$nextTick(() => {
        try {
          this.$refs.time.focus()
        } catch {}
        this.$emit('shown')
      })
    },
    onHidden() {
      this.isVisible = false
      this.$emit('hidden')
    },
    // Render function helpers
    defaultButtonFn({ isHovered, hasFocus }) {
      return this.$createElement(isHovered || hasFocus ? BIconClockFill : BIconClock, {
        attrs: { 'aria-hidden': 'true' }
      })
    }
  },
  render(h) {
    const localHMS = this.localHMS
    const disabled = this.disabled
    const readonly = this.readonly
    const placeholder = isUndefinedOrNull(this.placeholder)
      ? this.labelNoTimeSelected
      : this.placeholder

    // Footer buttons
    let $footer = []

    if (this.nowButton) {
      const label = this.labelNowButton
      $footer.push(
        h(
          BButton,
          {
            staticClass: 'mx-1',
            props: { size: 'sm', disabled: disabled || readonly, variant: this.nowButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onNowButton }
          },
          label
        )
      )
    }

    if (this.resetButton) {
      const label = this.labelResetButton
      $footer.push(
        h(
          BButton,
          {
            staticClass: 'mx-1',
            props: { size: 'sm', disabled: disabled || readonly, variant: this.resetButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onResetButton }
          },
          label
        )
      )
    }

    if (!this.noCloseButton) {
      const label = this.labelCloseButton
      $footer.push(
        h(
          BButton,
          {
            staticClass: 'mx-1',
            props: { size: 'sm', disabled, variant: this.closeButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onCloseButton }
          },
          label
        )
      )
    }

    if ($footer.length > 0) {
      $footer = [
        h(
          'div',
          {
            staticClass: 'b-form-date-controls d-flex flex-wrap mx-n1',
            class: {
              'justify-content-between': $footer.length > 1,
              'justify-content-end': $footer.length < 2
            }
          },
          $footer
        )
      ]
    }

    const $time = h(
      BTime,
      {
        ref: 'time',
        staticClass: 'b-form-time-control',
        props: this.timeProps,
        on: {
          input: this.onInput,
          context: this.onContext
        }
      },
      $footer
    )

    return h(
      BVFormBtnLabelControl,
      {
        ref: 'control',
        staticClass: 'b-form-timepicker',
        props: {
          // This adds unneeded props, but reduces code size:
          ...this.$props,
          // Overridden / computed props
          id: this.safeId(),
          rtl: this.isRTL,
          lang: this.computedLang,
          value: localHMS || '',
          formattedValue: localHMS ? this.formattedValue : '',
          placeholder: placeholder || ''
        },
        on: {
          show: this.onShow,
          shown: this.onShown,
          hidden: this.onHidden
        },
        scopedSlots: {
          'button-content': this.$scopedSlots['button-content'] || this.defaultButtonFn
        }
      },
      [$time]
    )
  }
})
