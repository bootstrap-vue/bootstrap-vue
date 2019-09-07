import Vue from '../../utils/vue'
import { props as BDropdownProps } from '../dropdown/dropdown'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import pluckProps from '../../utils/pluck-props'
import { htmlOrText } from '../../utils/html'
import { BLink } from '../link/link'

// -- Constants --

export const props = pluckProps(['menuClass', 'toggleClass', 'noCaret', 'role'], BDropdownProps)

// @vue/component
export const BNavItemDropdown = /*#__PURE__*/ Vue.extend({
  name: 'BNavItemDropdown',
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
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
    const button = h(
      BLink,
      {
        ref: 'toggle',
        staticClass: 'nav-link dropdown-toggle',
        class: this.toggleClasses,
        props: {
          href: '#',
          disabled: this.disabled
        },
        attrs: {
          id: this.safeId('_BV_button_'),
          'aria-haspopup': 'true',
          'aria-expanded': this.visible ? 'true' : 'false'
        },
        on: {
          click: this.toggle,
          keydown: this.toggle // space, enter, down
        }
      },
      [
        this.$slots['button-content'] ||
          this.$slots.text ||
          h('span', { domProps: htmlOrText(this.html, this.text) })
      ]
    )
    const menu = h(
      'ul',
      {
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        ref: 'menu',
        attrs: {
          tabindex: '-1',
          'aria-labelledby': this.safeId('_BV_button_')
        },
        on: {
          keydown: this.onKeydown // up, down, esc
        }
      },
      !this.lazy || this.visible ? this.normalizeSlot('default', { hide: this.hide }) : [h()]
    )
    return h(
      'li',
      {
        staticClass: 'nav-item b-nav-dropdown dropdown',
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [button, menu]
    )
  }
})
