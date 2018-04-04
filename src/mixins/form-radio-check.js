/*
 * form-radio & form-check mixin
 *
 */

export default {
  data () {
    return {
      localChecked: this.checked,
      hasFocus: false
    }
  },
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    value: {
    },
    checked: {
      // This is the model, except when in group mode
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: null
    }
  },
  computed: {
    computedLocalChecked: {
      get () {
        if (this.is_Child) {
          return this.$parent.localChecked
        } else {
          return this.localChecked
        }
      },
      set (val) {
        if (this.is_Child) {
          this.$parent.localChecked = val
        } else {
          this.localChecked = val
        }
      }
    },
    is_Child () {
      return Boolean(this.$parent && this.$parent.is_RadioCheckGroup)
    },
    is_Disabled () {
      // Child can be disabled while parent isn't
      return Boolean(this.is_Child ? (this.$parent.disabled || this.disabled) : this.disabled)
    },
    is_Required () {
      return Boolean(this.is_Child ? this.$parent.required : this.required)
    },
    is_Plain () {
      return Boolean(this.is_Child ? this.$parent.plain : this.plain)
    },
    is_Custom () {
      return !this.is_Plain
    },
    get_Size () {
      return this.is_Child ? this.$parent.size : this.size
    },
    get_State () {
      // This is a tri-state prop (true, false, null)
      if (this.is_Child && typeof this.$parent.get_State === 'boolean') {
        return this.$parent.get_State
      }
      return this.computedState
    },
    get_StateClass () {
      // This is a tri-state prop (true, false, null)
      return typeof this.get_State === 'boolean' ? (this.get_State ? 'is-valid' : 'is-invalid') : ''
    },
    is_Stacked () {
      return Boolean(this.is_Child && this.$parent.stacked)
    },
    is_Inline () {
      return !this.is_Stacked
    },
    is_ButtonMode () {
      return Boolean(this.is_Child && this.$parent.buttons)
    },
    get_ButtonVariant () {
      // Local variant trumps parent variant
      return this.buttonVariant || (this.is_Child ? this.$parent.buttonVariant : null) || 'secondary'
    },
    get_Name () {
      return (this.is_Child ? (this.$parent.name || this.$parent.safeId()) : this.name) || null
    },
    buttonClasses () {
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
  methods: {
    handleFocus (evt) {
      // When in buttons mode, we need to add 'focus' class to label when radio focused
      if (this.is_ButtonMode && evt.target) {
        if (evt.type === 'focus') {
          this.hasFocus = true
        } else if (evt.type === 'blur') {
          this.hasFocus = false
        }
      }
    }
  }
}
