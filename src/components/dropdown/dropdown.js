import { ARIA_VALUE_FALSE, ARIA_VALUE_TRUE } from '../../constants/aria'
import {
  CLASS_NAME_BUTTON_GROUP,
  CLASS_NAME_BV_DROPDOWN,
  CLASS_NAME_DISPLAY_FLEX,
  CLASS_NAME_DROPDOWN,
  CLASS_NAME_DROPDOWN_MENU,
  CLASS_NAME_DROPDOWN_TOGGLE,
  CLASS_NAME_POSITION_STATIC,
  CLASS_NAME_SHOW,
  CLASS_NAME_SR_ONLY
} from '../../constants/class-names'
import { NAME_DROPDOWN } from '../../constants/components'
import { ROLE_MENU } from '../../constants/roles'
import Vue from '../../utils/vue'
import { arrayIncludes } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { suffixClass } from '../../utils/string'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'

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
    default: () => getComponentConfig(NAME_DROPDOWN, 'variant')
  },
  size: {
    type: String,
    default: () => getComponentConfig(NAME_DROPDOWN, 'size')
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
    // This really should be `toggleLabel`
    type: String,
    default: () => getComponentConfig(NAME_DROPDOWN, 'toggleText')
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
    default: () => getComponentConfig(NAME_DROPDOWN, 'splitVariant')
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
    default: ROLE_MENU
  }
}

// --- Main component ---
// @vue/component
export const BDropdown = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    dropdownClasses() {
      const { block, split, boundary } = this
      return [
        CLASS_NAME_BV_DROPDOWN,
        this.directionClass,
        {
          [CLASS_NAME_SHOW]: this.visible,
          // The 'btn-group' class is required in `split` mode for button alignment
          // It needs also to be applied when `block` is disabled to allow multiple
          // dropdowns to be aligned one line
          [CLASS_NAME_BUTTON_GROUP]: split || !block,
          // When `block` is enabled and we are in `split` mode the 'd-flex' class
          // needs to be applied to allow the buttons to stretch to full width
          [CLASS_NAME_DISPLAY_FLEX]: block && split,
          // Position `static` is needed to allow menu to "breakout" of the `scrollParent`
          // boundaries when boundary is anything other than `scrollParent`
          // See: https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
          [CLASS_NAME_POSITION_STATIC]: boundary !== 'scrollParent' || !boundary
        }
      ]
    },
    menuClasses() {
      return [
        this.menuClass,
        {
          [suffixClass(CLASS_NAME_DROPDOWN_MENU, 'right')]: this.right,
          [CLASS_NAME_SHOW]: this.visible
        }
      ]
    },
    toggleClasses() {
      const { split } = this
      return [
        this.toggleClass,
        {
          [suffixClass(CLASS_NAME_DROPDOWN_TOGGLE, 'split')]: split,
          [suffixClass(CLASS_NAME_DROPDOWN_TOGGLE, 'no-caret')]: this.noCaret && !split
        }
      ]
    }
  },
  render(h) {
    const { visible, variant, size, block, disabled, split, role } = this
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
        staticClass: CLASS_NAME_DROPDOWN_TOGGLE,
        class: this.toggleClasses,
        attrs: {
          id: this.safeId('_BV_toggle_'),
          'aria-haspopup': ARIA_VALUE_TRUE,
          'aria-expanded': visible ? ARIA_VALUE_TRUE : ARIA_VALUE_FALSE
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
      [split ? h('span', { class: CLASS_NAME_SR_ONLY }, [this.toggleText]) : $buttonContent]
    )

    const $menu = h(
      'ul',
      {
        staticClass: CLASS_NAME_DROPDOWN_MENU,
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
      !this.lazy || visible ? this.normalizeSlot('default', { hide: this.hide }) : [h()]
    )

    return h(
      'div',
      {
        staticClass: CLASS_NAME_DROPDOWN,
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [$split, $toggle, $menu]
    )
  }
})
