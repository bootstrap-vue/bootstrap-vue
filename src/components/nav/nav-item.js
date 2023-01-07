import { extend, mergeData } from '../../vue'
import { NAME_NAV_ITEM } from '../../constants/components'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_OBJECT } from '../../constants/props'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])

export const props = makePropsConfigurable(
  sortKeys({
    ...linkProps,
    linkAttrs: makeProp(PROP_TYPE_OBJECT, {}),
    linkClasses: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING)
  }),
  NAME_NAV_ITEM
)

// --- Main component ---

// @vue/component
export const BNavItem = /*#__PURE__*/ extend({
  name: NAME_NAV_ITEM,
  functional: true,
  props,
  render(h, { props, data, listeners, children }) {
    return h(
      'li',
      mergeData(omit(data, ['on']), {
        staticClass: 'nav-item'
      }),
      [
        h(
          BLink,
          {
            staticClass: 'nav-link',
            class: props.linkClasses,
            attrs: props.linkAttrs,
            props: pluckProps(linkProps, props),
            on: listeners
          },
          children
        )
      ]
    )
  }
})
