import Vue, { mergeData } from '../../vue'
import { NAME_NAV_ITEM } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { omit } from '../../utils/object'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...omit(BLinkProps, ['event', 'routerTag']),
    linkAttrs: {
      type: Object,
      default: () => {}
    },
    linkClasses: {
      type: [String, Object, Array],
      default: null
    }
  },
  NAME_NAV_ITEM
)

// --- Main component ---
// @vue/component
export const BNavItem = /*#__PURE__*/ Vue.extend({
  name: NAME_NAV_ITEM,
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    // We transfer the listeners to the link
    delete data.on
    return h(
      'li',
      mergeData(data, {
        staticClass: 'nav-item'
      }),
      [
        h(
          BLink,
          {
            staticClass: 'nav-link',
            class: props.linkClasses,
            attrs: props.linkAttrs,
            props,
            on: listeners
          },
          children
        )
      ]
    )
  }
})
