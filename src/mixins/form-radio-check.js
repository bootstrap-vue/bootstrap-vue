import normalizeSlotMixin from './normalize-slot'

// @vue/component
export default {
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    value: {
      // Value when checked
      // type: Object,
      // default: undefined
    },
    checked: {
      // This is the v-model
      // type: Object,
      // default: undefined
    },
    inline: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    button: {
      // Only applicable in standalone mode (non group)
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: null
    },
    ariaLabel: {
      // Placed on the input if present.
      type: String,
      default: null
    },
    ariaLabelledby: {
      // Placed on the input if present.
      type: String,
      default: null
    }
  },
  data() {
    return {
      localChecked: this.isGroup ? this.bvGroup.checked : this.checked,
      hasFocus: false
    }
  },
  computed: {
    computedLocalChecked: {
      get() {
        return this.isGroup ? this.bvGroup.localChecked : this.localChecked
      },
      set(val) {
        if (this.isGroup) {
          this.bvGroup.localChecked = val
        } else {
          this.localChecked = val
        }
      }
    },
    isGroup() {
      // Is this check/radio a child of check-group or radio-group?
      return Boolean(this.bvGroup)
    },
    isBtnMode() {
      // Support button style in single input mode
      return this.isGroup ? this.bvGroup.buttons : this.button
    },
    isPlain() {
      return this.isBtnMode ? false : this.isGroup ? this.bvGroup.plain : this.plain
    },
    isCustom() {
      return this.isBtnMode ? false : !this.isPlain
    },
    isSwitch() {
      // Custom switch styling (checkboxes only)
      return this.isBtnMode || this.isRadio || this.isPlain
        ? false
        : this.isGroup
          ? this.bvGroup.switches
          : this.switch
    },
    isInline() {
      return this.isGroup ? this.bvGroup.inline : this.inline
    },
    isDisabled() {
      // Child can be disabled while parent isn't, but is always disabled if group is
      return this.isGroup ? this.bvGroup.disabled || this.disabled : this.disabled
    },
    isRequired() {
      // Required only works when a name is provided for the input(s)
      // Child can only be required when parent is
      // Groups will always have a name (either user supplied or auto generated)
      return Boolean(this.getName && (this.isGroup ? this.bvGroup.required : this.required))
    },
    getName() {
      // Group name preferred over local name
      return (this.isGroup ? this.bvGroup.groupName : this.name) || null
    },
    getForm() {
      return (this.isGroup ? this.bvGroup.form : this.form) || null
    },
    getSize() {
      return (this.isGroup ? this.bvGroup.size : this.size) || ''
    },
    getState() {
      return this.isGroup ? this.bvGroup.computedState : this.computedState
    },
    getButtonVariant() {
      // Local variant preferred over group variant
      if (this.buttonVariant) {
        return this.buttonVariant
      } else if (this.isGroup && this.bvGroup.buttonVariant) {
        return this.bvGroup.buttonVariant
      }
      // default variant
      return 'secondary'
    },
    buttonClasses() {
      // Same for radio & check
      return [
        'btn',
        `btn-${this.getButtonVariant}`,
        this.getSize ? `btn-${this.getSize}` : '',
        // 'disabled' class makes "button" look disabled
        this.isDisabled ? 'disabled' : '',
        // 'active' class makes "button" look pressed
        this.isChecked ? 'active' : '',
        // Focus class makes button look focused
        this.hasFocus ? 'focus' : ''
      ]
    }
  },
  watch: {
    checked(newVal, oldVal) {
      this.computedLocalChecked = newVal
    }
  },
  methods: {
    handleFocus(evt) {
      // When in buttons mode, we need to add 'focus' class to label when input focused
      // As it is the hidden input which has actual focus
      if (evt.target) {
        if (evt.type === 'focus') {
          this.hasFocus = true
        } else if (evt.type === 'blur') {
          this.hasFocus = false
        }
      }
    },
    // Convenience methods for focusing the input
    focus() {
      if (!this.isDisabled && this.$refs.input && this.$refs.input.focus) {
        this.$refs.input.focus()
      }
    },
    blur() {
      if (!this.isDisabled && this.$refs.input && this.$refs.input.blur) {
        this.$refs.input.blur()
      }
    }
  },
  render(h) {
    const defaultSlot = this.normalizeSlot('default')

    // Generate the input element
    const on = { change: this.handleChange }
    if (this.isBtnMode) {
      // Handlers for focus styling when in button mode
      on.focus = on.blur = this.handleFocus
    }
    const input = h('input', {
      ref: 'input',
      key: 'input',
      on,
      class: {
        'form-check-input': this.isPlain,
        'custom-control-input': this.isCustom,
        'is-valid': this.getState === true && !this.isBtnMode,
        'is-invalid': this.getState === false && !this.isBtnMode,
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911
        'position-static': this.isPlain && !defaultSlot
      },
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: this.computedLocalChecked,
          expression: 'computedLocalChecked'
        }
      ],
      attrs: {
        id: this.safeId(),
        type: this.isRadio ? 'radio' : 'checkbox',
        name: this.getName,
        form: this.getForm,
        disabled: this.isDisabled,
        required: this.isRequired,
        autocomplete: 'off',
        'aria-required': this.isRequired || null,
        'aria-label': this.ariaLabel || null,
        'aria-labelledby': this.ariaLabelledby || null
      },
      domProps: {
        value: this.value,
        checked: this.isChecked
      }
    })

    if (this.isBtnMode) {
      // Button mode
      let button = h('label', { class: this.buttonClasses }, [input, defaultSlot])
      if (!this.isGroup) {
        // Standalone button mode, so wrap in 'btn-group-toggle'
        // and flag it as inline-block to mimic regular buttons
        button = h('div', { class: ['btn-group-toggle', 'd-inline-block'] }, [button])
      }
      return button
    } else {
      // Not button mode
      let label = h(false)
      // If no label content in plain mode we dont render the label
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911
      if (!(this.isPlain && !defaultSlot)) {
        label = h(
          'label',
          {
            class: {
              'form-check-label': this.isPlain,
              'custom-control-label': this.isCustom
            },
            attrs: { for: this.safeId() }
          },
          defaultSlot
        )
      }
      // Wrap it in a div
      return h(
        'div',
        {
          class: {
            'form-check': this.isPlain,
            'form-check-inline': this.isPlain && this.isInline,
            'custom-control': this.isCustom,
            'custom-control-inline': this.isCustom && this.isInline,
            'custom-checkbox': this.isCustom && this.isCheck && !this.isSwitch,
            'custom-switch': this.isSwitch,
            'custom-radio': this.isCustom && this.isRadio,
            // Temporary until Bootstrap v4 supports sizing (most likely in V5)
            [`form-control-${this.getSize}`]: Boolean(this.getSize && !this.isBtnMode)
          }
        },
        [input, label]
      )
    }
  }
}
