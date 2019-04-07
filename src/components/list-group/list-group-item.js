import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import pluckProps from '../../utils/pluck-props'
import { arrayIncludes } from '../../utils/array'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

const actionTags = ['a', 'router-link', 'button', 'b-link']
let linkProps = linkPropsFactory()
delete linkProps.href.default
delete linkProps.to.default

export const props = {
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
    type: String,
    default: null
  },
  ...linkProps
}
// @vue/component
export default Vue.extend({
  name: 'BListGroupItem',
  functional: true,
  props,
  render(h, { props, data, children }) {
    const tag = props.button ? 'button' : !props.href && !props.to ? props.tag : Link
    const isAction = Boolean(
      props.href || props.to || props.action || props.button || arrayIncludes(actionTags, props.tag)
    )
    const attrs = {}
    let itemProps = {}
    if (tag === 'button') {
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
    const componentData = {
      attrs,
      props: itemProps,
      staticClass: 'list-group-item',
      class: {
        [`list-group-item-${props.variant}`]: Boolean(props.variant),
        'list-group-item-action': isAction,
        active: props.active,
        disabled: props.disabled
      }
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
