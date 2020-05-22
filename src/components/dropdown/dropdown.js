import Vue from '../../utils/vue'
import { arrayIncludes } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'

// --- Constants ---

const NAME = 'BDropdown'

// --- Props ---

export const props = {
  text: {
    // Button label
    type: String,
    default: ''
  },
  html: {
    // Button label
    type: String
    // default: undefined
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME, 'variant')
  },
  size: {
    type: String,
    default: () => getComponentConfig(NAME, 'size')
  },
  block: {
    type: Boolean,
    default: false
  },
  menuClass: {
    type: [String, Array, Object]
    // default: null
  },
  toggleTag: {
    type: String,
    default: 'button'
  },
  toggleText: {
    // This really should be toggleLabel
    type: String,
    default: () => getComponentConfig(NAME, 'toggleText')
  },
  toggleClass: {
    type: [String, Array, Object]
    // default: null
  },
  noCaret: {
    type: Boolean,
    default: false
  },
  split: {
    type: Boolean,
    default: false
  },
  splitHref: {
    type: String
    // default: undefined
  },
  splitTo: {
    type: [String, Object]
    // default: undefined
  },
  splitVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'splitVariant')
  },
  splitClass: {
    type: [String, Array, Object]
    // default: null
  },
  splitButtonType: {
    type: String,
    default: 'button',
    validator: value => arrayIncludes(['button', 'submit', 'reset'], value)
  },
  lazy: {
    // If true, only render menu contents when open
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'menu'
  }
}

// --- Main component ---
// @vue/component
export const BDropdown = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    dropdownClasses() {
      const { block, split, boundary } = this
      return [
        this.directionClass,
        {
          show: this.visible,
          // The 'btn-group' class is required in `split` mode for button alignment
          // It needs also to be applied when `block` is disabled to allow multiple
          // dropdowns to be aligned one line
          'btn-group': split || !block,
          // When `block` is enabled and we are in `split` mode the 'd-flex' class
          // needs to be applied to allow the buttons to stretch to full width
          'd-flex': block && split,
          // Position `static` is needed to allow menu to "breakout" of the `scrollParent`
          // boundaries when boundary is anything other than `scrollParent`
          // See: https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
          'position-static': boundary !== 'scrollParent' || !boundary
        }
      ]
    },
    menuClasses() {
      return [
        this.menuClass,
        {
          'dropdown-menu-right': this.right,
          show: this.visible
        }
      ]
    },
    toggleClasses() {
      const { split } = this
      return [
        this.toggleClass,
        {
          'dropdown-toggle-split': split,
          'dropdown-toggle-no-caret': this.noCaret && !split
        }
      ]
    }
  },
  render(h) {
    const { variant, size, block, disabled, split, role } = this
    const commonProps = { variant, size, block, disabled }

    const $buttonContent = this.normalizeSlot('button-content')
    const buttonContentProps = this.hasNormalizedSlot('button-content')
      ? {}
      : htmlOrText(this.html, this.text)

    let $split = h()
    if (split) {
      const { splitTo, splitHref, splitButtonType } = this
      const btnProps = {
        ...commonProps,
        variant: this.splitVariant || this.variant
      }
      // We add these as needed due to <router-link> issues with
      // defined property with `undefined`/`null` values
      if (splitTo) {
        btnProps.to = splitTo
      } else if (splitHref) {
        btnProps.href = splitHref
      } else if (splitButtonType) {
        btnProps.type = splitButtonType
      }
      $split = h(
        BButton,
        {
          class: this.splitClass,
          attrs: { id: this.safeId('_BV_button_') },
          props: btnProps,
          domProps: buttonContentProps,
          on: { click: this.onSplitClick },
          ref: 'button'
        },
        [$buttonContent]
      )
    }

    const $toggle = h(
      BButton,
      {
        staticClass: 'dropdown-toggle',
        class: this.toggleClasses,
        attrs: {
          id: this.safeId('_BV_toggle_'),
          'aria-haspopup': 'true',
          'aria-expanded': this.visible ? 'true' : 'false'
        },
        props: {
          ...commonProps,
          tag: this.toggleTag,
          block: block && !split
        },
        domProps: split ? {} : buttonContentProps,
        on: {
          mousedown: this.onMousedown,
          click: this.toggle,
          keydown: this.toggle // Handle ENTER, SPACE and DOWN
        },
        ref: 'toggle'
      },
      [split ? h('span', { class: ['sr-only'] }, [this.toggleText]) : $buttonContent]
    )

    const $menu = h(
      'ul',
      {
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        attrs: {
          role,
          tabindex: '-1',
          'aria-labelledby': this.safeId(split ? '_BV_button_' : '_BV_toggle_')
        },
        on: {
          keydown: this.onKeydown // Handle UP, DOWN and ESC
        },
        ref: 'menu'
      },
      !this.lazy || this.visible ? this.normalizeSlot('default', { hide: this.hide }) : [h()]
    )

    return h(
      'div',
      {
        staticClass: 'dropdown b-dropdown',
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [$split, $toggle, $menu]
    )
  }
})
