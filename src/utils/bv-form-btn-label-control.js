//
// Private component used by `b-form-datepicker` and `b-form-timepicker`
//
import Vue from './vue'
import { toString } from './string'
import dropdownMixin, { commonProps } from '../mixins/dropdown'
import idMixin from '../mixins/id'
import normalizeSlotMixin from '../mixins/normalize-slot'
import { VBHover } from '../directives/hover/hover'
import { BIconChevronDown } from '../icons/icons'

// Re-export common dropdown props used for convenience
export const dropdownProps = commonProps

// @vue/component
export const BVFormBtnLabelControl = /*#__PURE__*/ Vue.extend({
  name: 'BVFormBtnLabelControl',
  directives: {
    BHover: VBHover
  },
  mixins: [idMixin, normalizeSlotMixin, dropdownMixin],
  props: {
    value: {
      // This is the value placed on the hidden input
      type: String,
      default: ''
    },
    formattedValue: {
      // This is the value shown in the label
      // Defaults back to `value`
      type: String
      // default: null
    },
    placeholder: {
      // This is the value placed on the hidden input when no value selected
      type: String
      // default: null
    },
    labelSelected: {
      // Value placed in sr-only span inside label when value is present
      type: String
      // default: null
    },
    state: {
      // Tri-state prop: `true`, `false`, or `null`
      type: Boolean,
      // We must explicitly default to `null` here otherwise
      // Vue coerces `undefined` into Boolean `false`
      default: null
    },
    size: {
      type: String
      // default: null
    },
    name: {
      type: String
      // default: null
    },
    form: {
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
      type: Boolean,
      default: false
    },
    lang: {
      type: String
      // default: null
    },
    rtl: {
      // Tri-state prop: `true`, `false` or `null`
      type: Boolean,
      // We must explicitly default to `null` here otherwise
      // Vue coerces `undefined` into Boolean `false`
      default: null
    },
    buttonOnly: {
      // When true, renders a btn-group wrapper and visually hides the label
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Applicable in button mode only
      type: String,
      default: 'secondary'
    },
    menuClass: {
      // Extra classes to apply to the `dropdown-menu` div
      type: [String, Array, Object]
      // default: null
    }
  },
  data() {
    return {
      isHovered: false,
      hasFocus: false
    }
  },
  computed: {
    idButton() {
      return this.safeId()
    },
    idLabel() {
      return this.safeId('_value_')
    },
    idMenu() {
      return this.safeId('_dialog_')
    },
    idWrapper() {
      return this.safeId('_outer_')
    },
    computedDir() {
      return this.rtl === true ? 'rtl' : this.rtl === false ? 'ltr' : null
    }
  },
  methods: {
    focus() {
      if (!this.disabled) {
        try {
          this.$refs.toggle.focus()
        } catch {}
      }
    },
    blur() {
      if (!this.disabled) {
        try {
          this.$refs.toggle.blur()
        } catch {}
      }
    },
    setFocus(evt) {
      this.hasFocus = evt.type === 'focus'
    },
    handleHover(hovered) {
      this.isHovered = hovered
    },
    /* istanbul ignore next */
    stopEvent(evt) /* istanbul ignore next */ {
      evt.stopPropagation()
    }
  },
  render(h) {
    const idButton = this.idButton
    const idLabel = this.idLabel
    const idMenu = this.idMenu
    const idWrapper = this.idWrapper
    const disabled = this.disabled
    const readonly = this.readonly
    const required = this.required
    const isHovered = this.isHovered
    const hasFocus = this.hasFocus
    const state = this.state
    const visible = this.visible
    const size = this.size
    const value = toString(this.value) || ''
    const labelSelected = this.labelSelected
    const buttonOnly = !!this.buttonOnly
    const buttonVariant = this.buttonVariant

    const btnScope = { isHovered, hasFocus, state, opened: visible }
    const $button = h(
      'button',
      {
        ref: 'toggle',
        staticClass: 'btn',
        class: {
          [`btn-${buttonVariant}`]: buttonOnly,
          [`btn-${size}`]: !!size,
          'h-auto': !buttonOnly,
          // `dropdown-toggle` is needed for proper
          // corner rounding in button only mode
          'dropdown-toggle': buttonOnly,
          'dropdown-toggle-no-caret': buttonOnly
        },
        attrs: {
          id: idButton,
          type: 'button',
          disabled: disabled,
          'aria-haspopup': 'dialog',
          'aria-expanded': visible ? 'true' : 'false',
          'aria-invalid': state === false || (required && !value) ? 'true' : null,
          'aria-required': required ? 'true' : null
        },
        directives: [{ name: 'b-hover', value: this.handleHover }],
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
          : /* istanbul ignore next */ h(BIconChevronDown, { props: { scale: 1.25 } })
      ]
    )

    // Hidden input
    let $hidden = h()
    if (this.name && !disabled) {
      $hidden = h('input', {
        attrs: {
          type: 'hidden',
          name: this.name || null,
          form: this.form || null,
          value: value
        }
      })
    }

    // Dropdown content
    const $menu = h(
      'div',
      {
        ref: 'menu',
        staticClass: 'dropdown-menu',
        class: [
          this.menuClass,
          {
            show: visible,
            'dropdown-menu-right': this.right
          }
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
      [this.normalizeSlot('default', { opened: visible })]
    )

    // Value label
    const $label = h(
      'label',
      {
        staticClass: 'form-control text-break text-wrap bg-transparent h-auto',
        class: {
          // Hidden in button only mode
          'sr-only': buttonOnly,
          // Mute the text if showing the placeholder
          'text-muted': !value,
          [`form-control-${size}`]: !!size,
          'is-invalid': state === false,
          'is-valid': state === true
        },
        attrs: {
          id: idLabel,
          for: idButton,
          'aria-invalid': state === false || (required && !value) ? 'true' : null,
          'aria-required': required ? 'true' : null
        },
        directives: [{ name: 'b-hover', value: this.handleHover }],
        on: {
          // Disable bubbling of the click event to
          // prevent menu from closing and re-opening
          '!click': this.stopEvent
        }
      },
      [
        value ? this.formattedValue || value : this.placeholder || '',
        // Add the selected label for screen readers when a value is provided
        value && labelSelected ? h('bdi', { staticClass: 'sr-only' }, labelSelected) : ''
      ]
    )

    // Return the custom form control wrapper
    return h(
      'div',
      {
        staticClass: 'dropdown',
        class: [
          this.directionClass,
          {
            'btn-group': buttonOnly,
            'b-form-btn-label-control': !buttonOnly,
            'form-control': !buttonOnly,
            [`form-control-${size}`]: !!size && !buttonOnly,
            'd-flex': !buttonOnly,
            'h-auto': !buttonOnly,
            'align-items-stretch': !buttonOnly,
            focus: hasFocus && !buttonOnly,
            show: visible,
            'is-valid': state === true,
            'is-invalid': state === false
          }
        ],
        attrs: {
          id: idWrapper,
          role: buttonOnly ? null : 'group',
          lang: this.lang || null,
          dir: this.computedDir,
          'aria-disabled': disabled,
          'aria-readonly': readonly && !disabled,
          'aria-labelledby': idLabel,
          'aria-invalid': state === false || (required && !value) ? 'true' : null,
          'aria-required': required ? 'true' : null
        }
      },
      [$button, $hidden, $menu, $label]
    )
  }
})
