import Vue from '../../utils/vue'
import { stripTags } from '../../utils/html'
import { getComponentConfig } from '../../utils/config'
import { HTMLElement } from '../../utils/safe-types'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import BButton from '../button/button'

const NAME = 'BDropdown'

export const props = {
  toggleText: {
    // This really should be toggleLabel
    type: String,
    default: () => getComponentConfig(NAME, 'toggleText')
  },
  size: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME, 'variant')
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
    default: () => getComponentConfig(NAME, 'splitVariant')
  },
  role: {
    type: String,
    default: 'menu'
  },
  boundary: {
    // String: `scrollParent`, `window` or `viewport`
    // HTMLElement: HTML Element reference
    type: [String, HTMLElement],
    default: 'scrollParent'
  }
}

// @vue/component
export default Vue.extend({
  name: NAME,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    dropdownClasses() {
      return [
        this.directionClass,
        {
          show: this.visible,
          // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
          // when boundary is anything other than `scrollParent`
          // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
          'position-static': this.boundary !== 'scrollParent' || !this.boundary
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
      return [
        this.toggleClass,
        {
          'dropdown-toggle-split': this.split,
          'dropdown-toggle-no-caret': this.noCaret && !this.split
        }
      ]
    }
  },
  render(h) {
    let split = h(false)
    const buttonContent =
      this.normalizeSlot('button-content') ||
      this.normalizeSlot('text') ||
      this.html ||
      stripTags(this.text)
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
        [buttonContent]
      )
    }
    const toggle = h(
      BButton,
      {
        ref: 'toggle',
        staticClass: 'dropdown-toggle',
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
      [this.split ? h('span', { class: ['sr-only'] }, [this.toggleText]) : buttonContent]
    )
    const menu = h(
      'ul',
      {
        ref: 'menu',
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        attrs: {
          role: this.role,
          tabindex: '-1',
          'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
        },
        on: {
          keydown: this.onKeydown // up, down, esc
        }
      },
      this.normalizeSlot('default', { hide: this.hide })
    )
    return h(
      'div',
      {
        staticClass: 'dropdown btn-group b-dropdown',
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [split, toggle, menu]
    )
  }
})
