import Vue from '../../utils/vue'
import { props as BDropdownProps } from '../dropdown/dropdown'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import pluckProps from '../../utils/pluck-props'
import { htmlOrText } from '../../utils/html'

// -- Constants --

export const props = {
  ...pluckProps(['menuClass', 'toggleClass', 'noCaret', 'role'], BDropdownProps),
  extraMenuClasses: {
    type: String,
    default: '',
    // `deprecated` -> Don't use this prop
    // `deprecation` -> Refers to a change in prop usage
    deprecated: 'Setting prop "extra-menu-classes" is deprecated. Use "menu-class" prop instead.'
  },
  extraToggleClasses: {
    type: String,
    default: '',
    // `deprecated` -> Don't use this prop
    // `deprecation` -> Refers to a change in prop usage
    deprecated:
      'Setting prop "extra-toggle-classes" is deprecated. Use "toggle-class" prop instead.'
  }
}

// @vue/component
export default Vue.extend({
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
        this.extraMenuClasses, // Deprecated
        this.menuClass,
        {
          'dropdown-menu-right': this.right,
          show: this.visible
        }
      ]
    },
    toggleClasses() {
      return [
        this.extraToggleClasses, // Deprecated
        this.toggleClass,
        { 'dropdown-toggle-no-caret': this.noCaret }
      ]
    }
  },
  render(h) {
    const button = h(
      'a',
      {
        ref: 'toggle',
        staticClass: 'nav-link dropdown-toggle',
        class: this.toggleClasses,
        attrs: {
          href: '#',
          id: this.safeId('_BV_button_'),
          disabled: this.disabled,
          'aria-haspopup': 'true',
          'aria-expanded': String(this.visible)
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
          mouseover: this.onMouseOver,
          keydown: this.onKeydown // tab, up, down, esc
        }
      },
      [this.normalizeSlot('default', { hide: this.hide })]
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
