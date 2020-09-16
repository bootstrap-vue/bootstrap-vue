import { NAME_NAV_ITEM } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { omit } from '../../utils/object'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

export const props = omit(BLinkProps, ['event', 'routerTag'])

// --- Main component ---
// @vue/component
export const BNavItem = /*#__PURE__*/ Vue.extend({
  name: NAME_NAV_ITEM,
  functional: true,
  props: {
    ...props,
    linkAttrs: {
      type: Object,
      default: () => {}
    },
    linkClasses: {
      type: [String, Object, Array],
      default: null
    }
  },
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
