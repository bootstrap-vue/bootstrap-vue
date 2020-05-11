import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { htmlOrText } from '../../utils/html'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { props as BDropdownProps } from '../dropdown/dropdown'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---
export const props = {
  ...pluckProps(
    ['text', 'html', 'menuClass', 'toggleClass', 'noCaret', 'role', 'lazy'],
    BDropdownProps
  ),
  ...pluckProps(['href'], BLinkProps)
}

// --- Main component ---
// @vue/component
export const BNavItemDropdown = /*#__PURE__*/ Vue.extend({
  name: 'BNavItemDropdown',
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    buttonId() {
      return this.safeId('_BV_button_')
    },
    isNav() {
      // Signal to dropdown mixin that we are in a navbar
      return true
    },
    dropdownClasses() {
      return [this.directionClass, { show: this.visible }]
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
    const { buttonId, visible } = this

    const $button = h(
      BLink,
      {
        staticClass: 'nav-link dropdown-toggle',
        class: this.toggleClasses,
        props: {
          href: this.href || `#${buttonId}`,
          disabled: this.disabled
        },
        attrs: {
          id: buttonId,
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
        this.$slots['button-content'] ||
          this.$slots.text ||
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
          'aria-labelledby': buttonId
        },
        on: {
          keydown: this.onKeydown // Handle UP, DOWN and ESC
        },
        ref: 'menu'
      },
      !this.lazy || visible ? this.normalizeSlot('default', { hide: this.hide }) : [h()]
    )

    return h(
      'li',
      {
        staticClass: 'nav-item b-nav-dropdown dropdown',
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [$button, $menu]
    )
  }
})
