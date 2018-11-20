import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import stripScripts from '../../utils/strip-scripts'
import bButton from '../button/button'

import './dropdown.css'
// Needed when dropdowns are inside an input group
import '../input-group/input-group.css'

export default {
  mixins: [idMixin, dropdownMixin],
  components: { bButton },
  render (h) {
    let split = h(false)
    if (this.split) {
      split = h(
        'b-button',
        {
          ref: 'button',
          props: {
            disabled: this.disabled,
            variant: this.variant,
            size: this.size
          },
          attrs: {
            id: this.safeId('_BV_button_')
          },
          on: {
            click: this.click
          }
        },
        [this.$slots['button-content'] || this.$slots.text || stripScripts(this.text)]
      )
    }
    const toggle = h(
      'b-button',
      {
        ref: 'toggle',
        class: this.toggleClasses,
        props: {
          variant: this.variant,
          size: this.size,
          disabled: this.disabled,
          tag: this.toggleTag
        },
        attrs: {
          id: this.safeId('_BV_toggle_'),
          'aria-haspopup': 'true',
          'aria-expanded': this.visible ? 'true' : 'false'
        },
        on: {
          click: this.toggle, // click
          keydown: this.toggle // enter, space, down
        }
      },
      [
        this.split
          ? h('span', { class: ['sr-only'] }, [this.toggleText])
          : this.$slots['button-content'] || this.$slots.text || stripScripts(this.text)
      ]
    )
    const menu = h(
      'div',
      {
        ref: 'menu',
        class: this.menuClasses,
        attrs: {
          role: this.role,
          'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
        },
        on: {
          mouseover: this.onMouseOver,
          focusout: this.onFocusOut, // focus out of menu
          keydown: this.onKeydown // tab, up, down, esc
        }
      },
      [this.$slots.default]
    )
    return h('div', { attrs: { id: this.safeId() }, class: this.dropdownClasses }, [
      split,
      toggle,
      menu
    ])
  },
  props: {
    split: {
      type: Boolean,
      default: false
    },
    toggleText: {
      type: String,
      default: 'Toggle Dropdown'
    },
    size: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    menuClass: {
      type: [String, Array],
      default: null
    },
    toggleTag: {
      type: String,
      default: 'button'
    },
    toggleClass: {
      type: [String, Array],
      default: null
    },
    noCaret: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'menu'
    },
    boundary: {
      // String: `scrollParent`, `window` or `viewport`
      // Object: HTML Element reference
      type: [String, Object],
      default: 'scrollParent'
    }
  },
  computed: {
    dropdownClasses () {
      // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
      // when boundary is anything other than `scrollParent`
      // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
      const positionStatic = this.boundary !== 'scrollParent' || !this.boundary

      let direction = ''
      if (this.dropup) {
        direction = 'dropup'
      } else if (this.dropright) {
        direction = 'dropright'
      } else if (this.dropleft) {
        direction = 'dropleft'
      }

      return [
        'btn-group',
        'b-dropdown',
        'dropdown',
        direction,
        {
          show: this.visible,
          'position-static': positionStatic
        }
      ]
    },
    menuClasses () {
      return [
        'dropdown-menu',
        {
          'dropdown-menu-right': this.right,
          'show': this.visible
        },
        this.menuClass
      ]
    },
    toggleClasses () {
      return [
        'dropdown-toggle',
        {
          'dropdown-toggle-split': this.split,
          'dropdown-toggle-no-caret': this.noCaret && !this.split
        },
        this.toggleClass
      ]
    }
  }
}
