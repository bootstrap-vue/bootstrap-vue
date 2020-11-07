import Vue, { mergeData } from '../../vue'
import { NAME_LIST_GROUP_ITEM } from '../../constants/components'
import { arrayIncludes } from '../../utils/array'
import { makePropsConfigurable } from '../../utils/config'
import { isTag } from '../../utils/dom'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { BLink, props as BLinkProps } from '../link/link'

// --- Constants ---

const actionTags = ['a', 'router-link', 'button', 'b-link']

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
delete linkProps.href.default
delete linkProps.to.default

export const props = makePropsConfigurable(
  {
    ...linkProps,
    tag: {
      type: String,
      default: 'div'
    },
    action: {
      type: Boolean,
      default: null
    },
    button: {
      type: Boolean,
      default: null
    },
    variant: {
      type: String
      // default: undefined
    }
  },
  NAME_LIST_GROUP_ITEM
)

// --- Main component ---
// @vue/component
export const BListGroupItem = /*#__PURE__*/ Vue.extend({
  name: NAME_LIST_GROUP_ITEM,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { button, variant, active, disabled } = props
    const link = isLink(props)
    const tag = button ? 'button' : !link ? props.tag : BLink
    const action = !!(props.action || link || button || arrayIncludes(actionTags, props.tag))

    const attrs = {}
    let itemProps = {}
    if (isTag(tag, 'button')) {
      if (!data.attrs || !data.attrs.type) {
        // Add a type for button is one not provided in passed attributes
        attrs.type = 'button'
      }
      if (props.disabled) {
        // Set disabled attribute if button and disabled
        attrs.disabled = true
      }
    } else {
      itemProps = pluckProps(linkProps, props)
    }

    return h(
      tag,
      mergeData(data, {
        attrs,
        props: itemProps,
        staticClass: 'list-group-item',
        class: {
          [`list-group-item-${variant}`]: variant,
          'list-group-item-action': action,
          active,
          disabled
        }
      }),
      children
    )
  }
})
