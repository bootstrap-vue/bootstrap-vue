import Vue from '../../vue'
import { NAME_FORM_TIMEPICKER } from '../../constants/components'
import {
  BVFormBtnLabelControl,
  props as BVFormBtnLabelControlProps
} from '../../utils/bv-form-btn-label-control'
import { makePropsConfigurable } from '../../utils/config'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { isUndefinedOrNull } from '../../utils/inspect'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import idMixin from '../../mixins/id'
import { BButton } from '../button/button'
import { BTime, props as BTimeProps } from '../time/time'
import { BIconClock, BIconClockFill } from '../../icons/icons'

// --- Main component ---
// @vue/component
export const BFormTimepicker = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_TIMEPICKER,
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: makePropsConfigurable(
    {
      ...BTimeProps,
      ...omit(BVFormBtnLabelControlProps, ['id', 'value', 'formattedValue', 'rtl', 'lang']),
      resetValue: {
        type: String,
        default: ''
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
        default: 'Select now'
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
        default: 'Reset'
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
        default: 'Close'
      },
      closeButtonVariant: {
        type: String,
        default: 'outline-secondary'
      }
    },
    NAME_FORM_TIMEPICKER
  ),
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
        attemptFocus(this.$refs.control)
      }
    },
    blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.control)
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
        attemptFocus(this.$refs.time)
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
    const { localHMS, disabled, readonly, $props } = this
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
            key: 'now-btn',
            props: { size: 'sm', disabled: disabled || readonly, variant: this.nowButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onNowButton }
          },
          label
        )
      )
    }

    if (this.resetButton) {
      if ($footer.length > 0) {
        // Add a "spacer" between buttons ('&nbsp;')
        $footer.push(h('span', '\u00a0'))
      }
      const label = this.labelResetButton
      $footer.push(
        h(
          BButton,
          {
            key: 'reset-btn',
            props: { size: 'sm', disabled: disabled || readonly, variant: this.resetButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onResetButton }
          },
          label
        )
      )
    }

    if (!this.noCloseButton) {
      if ($footer.length > 0) {
        // Add a "spacer" between buttons ('&nbsp;')
        $footer.push(h('span', '\u00a0'))
      }
      const label = this.labelCloseButton
      $footer.push(
        h(
          BButton,
          {
            key: 'close-btn',
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
            staticClass: 'b-form-date-controls d-flex flex-wrap',
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
        props: {
          ...pluckProps(BTimeProps, $props),
          value: localHMS,
          hidden: !this.isVisible
        },
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
          ...pluckProps(BVFormBtnLabelControlProps, $props),
          id: this.safeId(),
          value: localHMS,
          formattedValue: localHMS ? this.formattedValue : '',
          placeholder,
          rtl: this.isRTL,
          lang: this.computedLang
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
