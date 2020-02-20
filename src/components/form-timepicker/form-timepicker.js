import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import { getComponentConfig } from '../../utils/config'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'
import { BTime } from '../time/time'
import { BIconClock, BIconClockFill } from '../../icons/icons'
import { VBHover } from '../../directives/hover/hover'

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
      type: String,
      // Defaults to `labelNoTime` from BTime context
      default: null
    },
    size: {
      type: String,
      default: null
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
      type: String,
      default: null
    },
    form: {
      type: String,
      default: null
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
      type: [String, Array],
      default: null
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
    labelNoTime: {
      type: String,
      default: () => getConfigFallback('labelNoTime')
    },
    labelSelected: {
      type: String,
      default: () => getConfigFallback('labelSelected')
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
      type: [String, Object, Array],
      default: null
    },
  }
}

// --- BFormDate component ---

// @vue/component
export const BFormTimepicker = /*#__PURE__*/ Vue.extend({
  name: NAME,
  directives: {
    BHover: VBHover
  },
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin, normalizeSlotMixin, propsMixin, dropdownMixin],
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
      formatedValue: '',
      // Flag to add focus ring to outer wrapper
      hasFocus: false,
      // If the control is hovered
      isHovered: false
    }
  },
  computed: {
    timeProps() {
      // Props we pass to BTime
      // Use self for better minification, as `this` won't
      // minimize and we reference it a lot below
      const self = this
      // TODO: Make the ID's computed props
      const idLabel = self.safeId('_value_')
      const idWrapper = self.safeId('_b-form-time_')
      return {
        hidden: !self.visible,
        ariaControls: [idLabel, idWrapper].filter(identity).join(' ') || null,
        value: self.localHMS,
        readonly: self.readonly,
        disabled: self.disabled,
        locale: self.locale,
        hour12: self.hour12,
        hideHeader: self.hideHeader,
        showSeconds: self.showSeconds,
        secondsStep: self.secondsStep,
        minutesStep: self.minutesStep,
        labelNoTime: self.labelNoTime,
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
      this.$emit('input', newVal || '')
    }
  },
  mounted() /* istanbul ignore next: until tests written */ {
    this.$on('shown', () => {
      this.$nextTick(() => {
        try {
          this.$refs.time.focus()
        } catch {}
      })
    })
  },
  methods: {
    // Public methods
    focus() /* istanbul ignore next: until tests written */ {
      if (!this.disabled) {
        try {
          // This assumes the toggle is an element and not a component
          this.$refs.toggle.focus()
        } catch {}
      }
    },
    blur() /* istanbul ignore next: until tests written */ {
      if (!this.disabled) {
        try {
          // This assumes the toggle is an element and not a component
          this.$refs.toggle.blur()
        } catch {}
      }
    },
    // Private methods
    setAndClose(value) /* istanbul ignore next: until tests written */ {
      this.localHMS = value
      this.$nextTick(() => {
        this.hide(true)
      })
    },
    onInput(hms) /* istanbul ignore next: until tests written */ {
      if (this.localHMS !== hms) {
        this.localHMS = hms
      }
    },
    onContext(ctx) {
      const { isRTL, locale, value, formatted } = ctx
      this.isRTL = isRTL
      this.localLocale = locale
      this.formattedValue = formatted
      this.localHMS = value
      // Re-emit the context event
      this.$emit('context', ctx)
    },
    onNowButton() /* istanbul ignore next: until tests written */ {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = this.showSeconds ? now.getSeconds() : 0
      const value = [hours, minutes, seconds].map(v => `00${v}`.slice(-2)).join(':')
      this.setAndClose(value)
    },
    onResetButton() /* istanbul ignore next: until tests written */ {
      this.setAndClose(this.resetValue)
    },
    onCloseButton() /* istanbul ignore next: until tests written */ {
      this.hide(true)
    },
    setFocus(evt) /* istanbul ignore next: until tests written */ {
      this.hasFocus = evt.type === 'focus'
    },
    handleHover(hovered) /* istanbul ignore next: until tests written */ {
      this.isHovered = hovered
    },
    // Render funtion helpers
    defaultButtonFn(scope) {
      return this.$createElement(
        scope.isHovered || scope.hasFocus ? BIconClockFill : BIconClock,
        {
          props: { scale: 1.25 },
          attrs: { 'aria-hidden': 'true' }
        }
      )
    }
  },
  render(h) {
    const size = this.size
    const state = this.state
    const visible = this.visible
    const localHMS = this.localHMS
    const disabled = this.disabled
    const readonly = this.readonly
    const required = this.required
    const hasFocus = this.hasFocus
    const isHovered = this.isHovered
    // These should be computed props?
    const idButton = this.safeId()
    const idLabel = this.safeId('_value_')
    const idMenu = this.safeId('_dialog_')
    const idWrapper = this.safeId('_b-form-time_')

    const btnScope = { isHovered, hasFocus, state, opened: visible }
    const $button = h(
      'button',
      {
        ref: 'toggle',
        staticClass: 'btn border-0 h-auto py-0',
        class: { [`btn-${size}`]: !!size },
        attrs: {
          id: idButton,
          type: 'button',
          disabled: disabled,
          'aria-haspopup': 'dialog',
          'aria-expanded': visible ? 'true' : 'false',
          'aria-invalid': state === false ? 'true' : null,
          'aria-required': required ? 'true' : null
        },
        on: {
          mousedown: this.onMousedown,
          click: this.toggle,
          keydown: this.toggle, // Handle ENTER, SPACE and DOWN
          '!focus': this.setFocus,
          '!blur': this.setFocus
        }
      },
      [
        this.hasNormalizedSlot('button-content')
          ? this.normalizeSlot('button-content', btnScope)
          : this.defaultButtonFn(btnScope)
      ]
    )

    // Label as a "fake" input
    // This label will be read by screen readers when the button is focused
    const $input = h(
      'label',
      {
        staticClass: 'form-control text-break text-wrap border-0 bg-transparent h-auto pl-1 m-0',
        class: {
          // Mute the text if showing the placeholder
          'text-muted': !localHMS,
          [`form-control-${size}`]: !!size,
          'is-invalid': state === false,
          'is-valid': state === true
        },
        attrs: {
          id: idLabel,
          for: idButton,
          dir: this.isRTL ? 'rtl' : 'ltr',
          lang: this.localLocale || null,
          'aria-invalid': state === false ? 'true' : null,
          'aria-required': required ? 'true' : null
        },
        on: {
          // Disable bubbling of the click event to
          // prevent menu from closing and re-opening
          click: evt => /* istanbul ignore next */ {
            evt.stopPropagation()
          }
        }
      },
      [
        // Add the formatted value or placeholder
        localHMS ? this.formattedValue : this.placeholder || this.labelNoTime || '\u00A0',
        // Add an sr-only 'selected date' label if a date is selected
        localHMS ? h('span', { staticClass: 'sr-only' }, ` (${this.labelSelected}) `) : h()
      ]
    )

    // Footer buttons
    let $controls = []

    if (this.nowButton) {
      const label = this.labelNowButton
      $controls.push(
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
      $controls.push(
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
      const closeLabel = this.labelCloseButton
      $controls.push(
        h(
          BButton,
          {
            staticClass: 'mx-1',
            props: { size: 'sm', disabled: disabled, variant: this.closeButtonVariant },
            attrs: { 'aria-label': closeLabel || null },
            on: { click: this.onCloseButton }
          },
          closeLabel
        )
      )
    }

    if ($controls.length > 0) {
      $controls = [
        h(
          'div',
          {
            staticClass: 'b-form-date-controls d-flex flex-wrap mx-n1',
            class: {
              'justify-content-between': $controls.length > 1,
              'justify-content-end': $controls.length < 2
            }
          },
          $controls
        )
      ]
    }

    const $time = h(
      BTime,
      {
        key: 'time',
        ref: 'time',
        staticClass: 'b-form-time-control',
        props: this.timeProps,
        on: {
          input: this.onInput,
          context: this.onContext
        }
      },
      $controls
    )

    const $menu = h(
      'div',
      {
        ref: 'menu',
        staticClass: 'dropdown-menu p-2',
        class: [
          // User supplied classes
          this.menuClass,
          // Classes we add/override
          {
            show: this.visible,
            'dropdown-menu-right': this.right
          },
        ],
        attrs: {
          id: idMenu,
          role: 'dialog',
          tabindex: '-1',
          'aria-modal': 'false',
          'aria-labelledby': idLabel
        },
        on: {
          keydown: this.onKeydown // Handle ESC
        }
      },
      [$time]
    )

    let $hidden = h()
    if (this.name && !disabled) {
      $hidden = h('input', {
        attrs: {
          type: 'hidden',
          name: this.name,
          form: this.form,
          value: localHMS || ''
        }
      })
    }

    return h(
      'div',
      {
        staticClass: 'b-form-timepicker form-control dropdown h-auto p-0 d-flex',
        class: [
          this.directionClass,
          {
            show: visible,
            focus: hasFocus,
            [`form-control-${size}`]: !!size,
            'is-invalid': state === false,
            'is-valid': state === true
          }
        ],
        attrs: {
          id: idWrapper,
          role: 'group',
          'aria-disabled': disabled,
          'aria-readonly': readonly && !disabled,
          'aria-labelledby': idLabel,
          'aria-invalid': state === false ? 'true' : null,
          'aria-required': this.required ? 'true' : null,
          // We don't want the flex order to change here
          // So we always use 'ltr'
          dir: 'ltr'
        },
        directives: [{ name: 'b-hover', value: this.handleHover }]
      },
      [$button, $hidden, $menu, $input]
    )
  }
})
