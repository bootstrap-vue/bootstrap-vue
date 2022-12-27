import { extend } from '../../vue'
import { NAME_NAV_ITEM_DROPDOWN } from '../../constants/components'
import { SLOT_NAME_BUTTON_CONTENT, SLOT_NAME_DEFAULT, SLOT_NAME_TEXT } from '../../constants/slots'
import { htmlOrText } from '../../utils/html'
import { keys, pick, sortKeys } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { dropdownMixin, props as dropdownProps } from '../../mixins/dropdown'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { props as BDropdownProps } from '../dropdown/dropdown'
import { BLink } from '../link/link'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...pick(BDropdownProps, [
      ...keys(dropdownProps),
      'html',
      'lazy',
      'menuClass',
      'noCaret',
      'role',
      'text',
      'toggleClass'
    ])
  }),
  NAME_NAV_ITEM_DROPDOWN
)

// --- Main component ---

// @vue/component
export const BNavItemDropdown = /*#__PURE__*/ extend({
  name: NAME_NAV_ITEM_DROPDOWN,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    toggleId() {
      return this.safeId('_BV_toggle_')
    },
    menuId() {
      return this.safeId('_BV_toggle_menu_')
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
    const { toggleId, menuId, visible, hide } = this

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
          'aria-expanded': visible ? 'true' : 'false',
          'aria-controls': menuId
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
          'aria-labelledby': toggleId,
          id: menuId
        },
        on: {
          keydown: this.onKeydown // Handle UP, DOWN and ESC
        },
        ref: 'menu'
      },
      !this.lazy || visible ? this.normalizeSlot(SLOT_NAME_DEFAULT, { hide }) : [h()]
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
