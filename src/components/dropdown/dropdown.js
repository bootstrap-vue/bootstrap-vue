import { Vue } from '../../vue'
import { NAME_DROPDOWN } from '../../constants/components'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_OBJECT,
  PROP_TYPE_OBJECT_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { SLOT_NAME_BUTTON_CONTENT, SLOT_NAME_DEFAULT } from '../../constants/slots'
import { arrayIncludes } from '../../utils/array'
import { htmlOrText } from '../../utils/html'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'
import { dropdownMixin, props as dropdownProps } from '../../mixins/dropdown'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BButton } from '../button/button'
import { sortKeys } from '../../utils/object'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...dropdownProps,
    block: makeProp(PROP_TYPE_BOOLEAN, false),
    html: makeProp(PROP_TYPE_STRING),
    // If `true`, only render menu contents when open
    lazy: makeProp(PROP_TYPE_BOOLEAN, false),
    menuClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    noCaret: makeProp(PROP_TYPE_BOOLEAN, false),
    role: makeProp(PROP_TYPE_STRING, 'menu'),
    size: makeProp(PROP_TYPE_STRING),
    split: makeProp(PROP_TYPE_BOOLEAN, false),
    splitButtonType: makeProp(PROP_TYPE_STRING, 'button', value => {
      return arrayIncludes(['button', 'submit', 'reset'], value)
    }),
    splitClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    splitHref: makeProp(PROP_TYPE_STRING),
    splitTo: makeProp(PROP_TYPE_OBJECT_STRING),
    splitVariant: makeProp(PROP_TYPE_STRING),
    text: makeProp(PROP_TYPE_STRING),
    toggleAttrs: makeProp(PROP_TYPE_OBJECT, {}),
    toggleClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    toggleTag: makeProp(PROP_TYPE_STRING, 'button'),
    // TODO: This really should be `toggleLabel`
    toggleText: makeProp(PROP_TYPE_STRING, 'Toggle dropdown'),
    variant: makeProp(PROP_TYPE_STRING, 'secondary')
  }),
  NAME_DROPDOWN
)

// --- Main component ---

// @vue/component
export const BDropdown = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props,
  computed: {
    dropdownClasses() {
      const { block, split } = this
      return [
        this.directionClass,
        this.boundaryClass,
        {
          show: this.visible,
          // The 'btn-group' class is required in `split` mode for button alignment
          // It needs also to be applied when `block` is disabled to allow multiple
          // dropdowns to be aligned one line
          'btn-group': split || !block,
          // When `block` is enabled and we are in `split` mode the 'd-flex' class
          // needs to be applied to allow the buttons to stretch to full width
          'd-flex': block && split
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
      const { split } = this
      return [
        this.toggleClass,
        {
          'dropdown-toggle-split': split,
          'dropdown-toggle-no-caret': this.noCaret && !split
        }
      ]
    }
  },
  render(h) {
    const { visible, variant, size, block, disabled, split, role, hide, toggle } = this
    const commonProps = { variant, size, block, disabled }

    let $buttonChildren = this.normalizeSlot(SLOT_NAME_BUTTON_CONTENT)
    let buttonContentDomProps = this.hasNormalizedSlot(SLOT_NAME_BUTTON_CONTENT)
      ? {}
      : htmlOrText(this.html, this.text)

    let $split = h()
    if (split) {
      const { splitTo, splitHref, splitButtonType } = this
      const btnProps = {
        ...commonProps,
        variant: this.splitVariant || variant
      }

      // We add these as needed due to <router-link> issues with
      // defined property with `undefined`/`null` values
      if (splitTo) {
        btnProps.to = splitTo
      } else if (splitHref) {
        btnProps.href = splitHref
      } else if (splitButtonType) {
        btnProps.type = splitButtonType
      }

      $split = h(
        BButton,
        {
          class: this.splitClass,
          attrs: { id: this.safeId('_BV_button_') },
          props: btnProps,
          domProps: buttonContentDomProps,
          on: { click: this.onSplitClick },
          ref: 'button'
        },
        $buttonChildren
      )

      // Overwrite button content for the toggle when in `split` mode
      $buttonChildren = [h('span', { class: ['sr-only'] }, [this.toggleText])]
      buttonContentDomProps = {}
    }
    const ariaHasPopupRoles = ['menu', 'listbox', 'tree', 'grid', 'dialog']

    const $toggle = h(
      BButton,
      {
        staticClass: 'dropdown-toggle',
        class: this.toggleClasses,
        attrs: {
          // Merge in user supplied attributes
          ...this.toggleAttrs,
          // Must have attributes
          id: this.safeId('_BV_toggle_'),
          'aria-haspopup': ariaHasPopupRoles.includes(role) ? role : 'false',
          'aria-expanded': toString(visible)
        },
        props: {
          ...commonProps,
          tag: this.toggleTag,
          block: block && !split
        },
        domProps: buttonContentDomProps,
        on: {
          mousedown: this.onMousedown,
          click: toggle,
          keydown: toggle // Handle ENTER, SPACE and DOWN
        },
        ref: 'toggle'
      },
      $buttonChildren
    )

    const $menu = h(
      'ul',
      {
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        attrs: {
          role,
          tabindex: '-1',
          'aria-labelledby': this.safeId(split ? '_BV_button_' : '_BV_toggle_')
        },
        on: {
          keydown: this.onKeydown // Handle UP, DOWN and ESC
        },
        ref: 'menu'
      },
      [!this.lazy || visible ? this.normalizeSlot(SLOT_NAME_DEFAULT, { hide }) : h()]
    )

    return h(
      'div',
      {
        staticClass: 'dropdown b-dropdown',
        class: this.dropdownClasses,
        attrs: { id: this.safeId() }
      },
      [$split, $toggle, $menu]
    )
  }
})
