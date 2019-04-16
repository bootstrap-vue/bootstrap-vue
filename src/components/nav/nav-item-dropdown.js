import Vue from '../../utils/vue'
import { props as BDropdownProps } from '../dropdown/dropdown'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
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
  mixins: [idMixin, dropdownMixin],
  props,
  computed: {
    isNav() {
      // Signal to dropdown mixin that we are in a navbar
      return true
    },
    dropdownClasses() {
      return [
        'nav-item',
        'b-nav-dropdown',
        'dropdown',
        this.directionClass,
        {
          show: this.visible
        }
      ]
    },
    menuClasses() {
      return [
        'dropdown-menu',
        {
          'dropdown-menu-right': this.right,
          show: this.visible
        },
        this.extraMenuClasses, // Deprecated
        this.menuClass
      ]
    },
    toggleClasses() {
      return [
        'nav-link',
        'dropdown-toggle',
        {
          'dropdown-toggle-no-caret': this.noCaret
        },
        this.extraToggleClasses, // Deprecated
        this.toggleClass
      ]
    }
  },
  render(h) {
    const button = h(
      'a',
      {
        class: this.toggleClasses,
        ref: 'toggle',
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
      [this.$slots.default]
    )
    return h('li', { attrs: { id: this.safeId() }, class: this.dropdownClasses }, [button, menu])
  }
})
