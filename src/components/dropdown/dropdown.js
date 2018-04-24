import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import bButton from '../button/button'

import './dropdown.css'

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
        [this.$slots['button-content'] || this.$slots.text || this.text]
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
          disabled: this.disabled
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
          : this.$slots['button-content'] || this.$slots.text || this.text
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
      let position = ''
      // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
      // when boundary is anything other than `scrollParent`
      // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
      if (this.boundary !== 'scrollParent' || !this.boundary) {
        position = 'position-static'
      }
      return [
        'btn-group',
        'b-dropdown',
        'dropdown',
        this.dropup ? 'dropup' : '',
        this.visible ? 'show' : '',
        position
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
        {
          'dropdown-toggle': !this.noCaret || this.split,
          'dropdown-toggle-split': this.split
        },
        this.toggleClass
      ]
    }
  }
}
