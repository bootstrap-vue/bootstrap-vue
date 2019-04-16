import Vue from '../../utils/vue'
import { stripTags } from '../../utils/html'
import { getComponentConfig } from '../../utils/config'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import BButton from '../button/button'

const NAME = 'BDropdown'

export const props = {
  toggleText: {
    // This really should be toggleLabel
    type: String,
    default: () => String(getComponentConfig(NAME, 'toggleText'))
  },
  size: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: () => String(getComponentConfig(NAME, 'variant') || '') || null
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
    default: null
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
}

// @vue/component
export default Vue.extend({
  name: NAME,
  mixins: [idMixin, dropdownMixin],
  props,
  computed: {
    dropdownClasses() {
      // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
      // when boundary is anything other than `scrollParent`
      // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
      const positionStatic = this.boundary !== 'scrollParent' || !this.boundary

      return [
        'btn-group',
        'b-dropdown',
        'dropdown',
        this.directionClass,
        {
          show: this.visible,
          'position-static': positionStatic
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
        this.menuClass
      ]
    },
    toggleClasses() {
      return [
        'dropdown-toggle',
        {
          'dropdown-toggle-split': this.split,
          'dropdown-toggle-no-caret': this.noCaret && !this.split
        },
        this.toggleClass
      ]
    }
  },
  render(h) {
    let split = h(false)
    if (this.split) {
      const btnProps = {
        disabled: this.disabled,
        variant: this.splitVariant || this.variant,
        size: this.size
      }
      // We add these as needed due to router-link issues with defined property with undefined/null values
      if (this.splitTo) {
        btnProps.to = this.splitTo
      }
      if (this.splitHref) {
        btnProps.href = this.splitHref
      }
      split = h(
        BButton,
        {
          ref: 'button',
          props: btnProps,
          attrs: {
            id: this.safeId('_BV_button_')
          },
          on: {
            click: this.click
          }
        },
        [this.$slots['button-content'] || this.$slots.text || this.html || stripTags(this.text)]
      )
    }
    const toggle = h(
      BButton,
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
          : this.$slots['button-content'] || this.$slots.text || this.html || stripTags(this.text)
      ]
    )
    const menu = h(
      'ul',
      {
        ref: 'menu',
        class: this.menuClasses,
        attrs: {
          role: this.role,
          tabindex: '-1',
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
  }
})
