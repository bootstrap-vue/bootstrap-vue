// @vue/component
export default {
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
    }
  },
  data() {
    return {
      localChecked: this.is_Group ? this.bvGroup.checked : this.checked,
      hasFocus: false
    }
  },
  computed: {
    computedLocalChecked: {
      get() {
        return this.is_Group ? this.bvGroup.localChecked : this.localChecked
      },
      set(val) {
        if (this.is_Group) {
          this.bvGroup.localChecked = val
        } else {
          this.localChecked = val
        }
      }
    },
    is_Group() {
      // Is this check/radio a child of check-group or radio-group?
      return Boolean(this.bvGroup)
    },
    is_BtnMode() {
      // Support button style in single input mode
      return this.is_Group ? this.bvGroup.buttons : this.button
    },
    is_Plain() {
      return this.is_BtnMode ? false : this.is_Group ? this.bvGroup.plain : this.plain
    },
    is_Custom() {
      return this.is_BtnMode ? false : !this.is_Plain
    },
    is_Switch() {
      // Custom switch styling (checkboxes only)
      return this.is_BtnMode || this.is_Radio || this.is_Plain
        ? false
        : this.is_Group
          ? this.bvGroup.switches
          : this.switch
    },
    is_Inline() {
      return this.is_Group ? this.bvGroup.inline : this.inline
    },
    is_Disabled() {
      // Child can be disabled while parent isn't, but is always disabled if group is
      return this.is_Group ? this.bvGroup.disabled || this.disabled : this.disabled
    },
    is_Required() {
      // Required only works when a name is provided for the input(s)
      // Child can only be required when parent is
      // Groups will always have a name (either user supplied or auto generated)
      return Boolean(this.get_Name && (this.is_Group ? this.bvGroup.required : this.required))
    },
    get_Name() {
      // Group name preferred over local name
      return (this.is_Group ? this.bvGroup.groupName : this.name) || null
    },
    get_Form() {
      return (this.is_Group ? this.bvGroup.form : this.form) || null
    },
    get_Size() {
      return (this.is_Group ? this.bvGroup.size : this.size) || ''
    },
    get_State() {
      return this.is_Group ? this.bvGroup.computedState : this.computedState
    },
    get_ButtonVariant() {
      // Local variant preferred over group variant
      if (this.buttonVariant) {
        return this.buttonVariant
      } else if (this.is_Group && this.bvGroup.buttonVariant) {
        return this.bvGroup.buttonVariant
      }
      // default variant
      return 'secondary'
    },
    buttonClasses() {
      // Same for radio & check
      return [
        'btn',
        `btn-${this.get_ButtonVariant}`,
        this.get_Size ? `btn-${this.get_Size}` : '',
        // 'disabled' class makes "button" look disabled
        this.is_Disabled ? 'disabled' : '',
        // 'active' class makes "button" look pressed
        this.is_Checked ? 'active' : '',
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
      if (!this.is_Disabled && this.$refs.input && this.$refs.input.focus) {
        this.$refs.input.focus()
      }
    },
    blur() {
      if (!this.is_Disabled && this.$refs.input && this.$refs.input.blur) {
        this.$refs.input.blur()
      }
    }
  },
  render(h) {
    const defaultSlot = this.$slots.default

    // Generate the input element
    const on = { change: this.handleChange }
    if (this.is_BtnMode) {
      // Handlers for focus styling when in button mode
      on.focus = on.blur = this.handleFocus
    }
    const input = h('input', {
      ref: 'input',
      key: 'input',
      on,
      class: {
        'form-check-input': this.is_Plain,
        'custom-control-input': this.is_Custom,
        'is-valid': this.get_State === true && !this.is_BtnMode,
        'is-invalid': this.get_State === false && !this.is_BtnMode,
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911
        'position-static': this.is_Plain && !defaultSlot
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
        type: this.is_Radio ? 'radio' : 'checkbox',
        name: this.get_Name,
        form: this.get_Form,
        disabled: this.is_Disabled,
        required: this.is_Required,
        autocomplete: 'off',
        'aria-required': this.is_Required || null,
        'aria-label': this.ariaLabel || null
      },
      domProps: {
        value: this.value,
        checked: this.is_Checked
      }
    })

    if (this.is_BtnMode) {
      // Button mode
      let button = h('label', { class: this.buttonClasses }, [input, defaultSlot])
      if (!this.is_Group) {
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
      if (!(this.is_Plain && !defaultSlot)) {
        label = h(
          'label',
          {
            class: {
              'form-check-label': this.is_Plain,
              'custom-control-label': this.is_Custom
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
            'form-check': this.is_Plain,
            'form-check-inline': this.is_Plain && this.is_Inline,
            'custom-control': this.is_Custom,
            'custom-control-inline': this.is_Custom && this.is_Inline,
            'custom-checkbox': this.is_Custom && this.is_Check && !this.is_Switch,
            'custom-switch': this.is_Switch,
            'custom-radio': this.is_Custom && this.is_Radio,
            // Temporary until BS V4 supports sizing (most likely in V5)
            [`form-control-${this.get_Size}`]: Boolean(this.get_Size && !this.is_BtnMode)
          }
        },
        [input, label]
      )
    }
  }
}
