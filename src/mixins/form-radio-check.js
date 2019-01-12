// @vue/component
export default {
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    value: {
      // value when checked
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
      // only aplicable in standalone mode (non group)
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: null
    }
  },
  data() {
    return {
      localChecked: this.bvGroup.checked,
      hasFocus: false,
      // Surrogate value when not a childe of group
      buttons: false
    }
  },
  computed: {
    computedLocalChecked: {
      get() {
        return this.bvGroup.localChecked
      },
      set(val) {
        this.bvGroup.localChecked = val
      }
    },
    is_Group() {
      // Is this check/radio a child of check-group or radio-group?
      return this.bvGroup !== this
    },
    is_BtnMode() {
      // Support button style in single input mode
      return this.is_Group ? this.bvGroup.buttons : this.button
    },
    is_Plain() {
      return this.is_BtnMode ? false : this.bvGroup.plain
    },
    is_Custom() {
      return this.is_BtnMode ? false : !this.bvGroup.plain
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
      return this.bvGroup.inline
    },
    is_Disabled() {
      // Child can be disabled while parent isn't, but is always disabled if group is
      return this.bvGroup.disabled || this.disabled
    },
    is_Required() {
      // Required only works when a name is provided for the input(s)
      return Boolean(this.get_Name && this.bvGroup.required)
    },
    get_Name() {
      // Group name preferred over local name
      return this.bvGroup.groupName || this.name || null
    },
    get_Form() {
      return this.bvGroup.form || null
    },
    get_Size() {
      return this.bvGroup.size || ''
    },
    get_State() {
      // local state preferred over group state (except when null)
      if (typeof this.computedState === 'boolean') {
        return this.computedState
      } else if (typeof this.bvGroup.computedState === 'boolean') {
        return this.bvGroup.computedState
      } else {
        return null
      }
    },
    get_ButtonVariant() {
      // Local variant preferred over group variant
      return this.buttonVariant || this.bvGroup.buttonVariant || 'secondary'
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
      if (evt.target) {
        if (evt.type === 'focus') {
          this.hasFocus = true
        } else if (evt.type === 'blur') {
          this.hasFocus = false
        }
      }
    }
  },
  render(h) {
    const defaultSlot = this.$slots.default

    // Generate the input element
    const on = { change: this.handleChange }
    if (this.is_BtnMode) {
      // handlers for focus styling when in button mode
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
        'is-invalid': this.get_State === false && !this.is_BtnMode
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
        'aria-required': this.is_Required || null
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
      const label = h(
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
            // Temprary until BS V4 supports sizing
            [`form-control-${this.get_Size}`]: Boolean(this.get_Size && !this.is_BtnMode)
          }
        },
        [input, label]
      )
    }
  }
}
