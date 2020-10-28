import Vue from '../../vue'
import { NAME_NAV_ITEM_DROPDOWN } from '../../constants/components'
import {
  SLOT_NAME_BUTTON_CONTENT,
  SLOT_NAME_DEFAULT,
  SLOT_NAME_TEXT
} from '../../constants/slot-names'
import { htmlOrText } from '../../utils/html'
import { pluckProps } from '../../utils/props'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { props as BDropdownProps } from '../dropdown/dropdown'
import { BLink } from '../link/link'

// --- Props ---
export const props = pluckProps(
  ['text', 'html', 'menuClass', 'toggleClass', 'noCaret', 'role', 'lazy'],
  BDropdownProps
)

// --- Main component ---
// @vue/component
export const BNavItemDropdown = /*#__PURE__*/ Vue.extend({
  name: NAME_NAV_ITEM_DROPDOWN,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    toggleId() {
      return this.safeId('_BV_toggle_')
    },
    dropdownClasses() {
      return [this.directionClass, this.boundaryClass, { show: this.visible }]
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
      return [this.toggleClass, { 'dropdown-toggle-no-caret': this.noCaret }]
    }
  },
  render(h) {
    const { toggleId, visible } = this

    const $toggle = h(
      BLink,
      {
        staticClass: 'nav-link dropdown-toggle',
        class: this.toggleClasses,
        props: {
          href: `#${this.id || ''}`,
          disabled: this.disabled
        },
        attrs: {
          id: toggleId,
          role: 'button',
          'aria-haspopup': 'true',
          'aria-expanded': visible ? 'true' : 'false'
        },
        on: {
          mousedown: this.onMousedown,
          click: this.toggle,
          keydown: this.toggle // Handle ENTER, SPACE and DOWN
        },
        ref: 'toggle'
      },
      [
        // TODO: The `text` slot is deprecated in favor of the `button-content` slot
        this.normalizeSlot([SLOT_NAME_BUTTON_CONTENT, SLOT_NAME_TEXT]) ||
          h('span', { domProps: htmlOrText(this.html, this.text) })
      ]
    )

    const $menu = h(
      'ul',
      {
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        attrs: {
          tabindex: '-1',
          'aria-labelledby': toggleId
        },
        on: {
          keydown: this.onKeydown // Handle UP, DOWN and ESC
        },
        ref: 'menu'
      },
      !this.lazy || visible ? this.normalizeSlot(SLOT_NAME_DEFAULT, { hide: this.hide }) : [h()]
    )

    return h(
      'li',
      {
        staticClass: 'nav-item b-nav-dropdown dropdown',
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [$toggle, $menu]
    )
  }
})
