import Vue from '../../vue'
import { NAME_DROPDOWN } from '../../constants/components'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import { arrayIncludes } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { toString } from '../../utils/string'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BButton } from '../button/button'

// --- Props ---

export const props = {
  text: {
    type: String
    // default: null
  },
  html: {
    type: String
    // default: null
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
    // This really should be toggleLabel
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
    default: 'menu'
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
      const { block, split } = this
      return [
        this.directionClass,
        this.boundaryClass,
        {
          show: this.visible,
          // The 'btn-group' class is required in `split` mode for button alignment
          // It needs also to be applied when `block` is disabled to allow multiple
          // dropdowns to be aligned one line
          'btn-group': split || !block,
          // When `block` is enabled and we are in `split` mode the 'd-flex' class
          // needs to be applied to allow the buttons to stretch to full width
          'd-flex': block && split
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
    const { visible, variant, size, block, disabled, split, role, hide, toggle } = this
    const commonProps = { variant, size, block, disabled }

    const buttonContentSlotName = 'button-content'
    let $buttonChildren = this.normalizeSlot(buttonContentSlotName)
    let buttonContentDomProps = this.hasNormalizedSlot(buttonContentSlotName)
      ? {}
      : htmlOrText(this.html, this.text)

    let $split = h()
    if (split) {
      const { splitTo, splitHref, splitButtonType } = this
      const btnProps = {
        ...commonProps,
        variant: this.splitVariant || variant
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
          domProps: buttonContentDomProps,
          on: { click: this.onSplitClick },
          ref: 'button'
        },
        $buttonChildren
      )

      // Overwrite button content for the toggle when in `split` mode
      $buttonChildren = [h('span', { class: ['sr-only'] }, [this.toggleText])]
      buttonContentDomProps = {}
    }

    const $toggle = h(
      BButton,
      {
        staticClass: 'dropdown-toggle',
        class: this.toggleClasses,
        attrs: {
          id: this.safeId('_BV_toggle_'),
          'aria-haspopup': 'true',
          'aria-expanded': toString(visible)
        },
        props: {
          ...commonProps,
          tag: this.toggleTag,
          block: block && !split
        },
        domProps: buttonContentDomProps,
        on: {
          mousedown: this.onMousedown,
          click: toggle,
          keydown: toggle // Handle ENTER, SPACE and DOWN
        },
        ref: 'toggle'
      },
      $buttonChildren
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
      [!this.lazy || visible ? this.normalizeSlot(SLOT_NAME_DEFAULT, { hide }) : h()]
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
