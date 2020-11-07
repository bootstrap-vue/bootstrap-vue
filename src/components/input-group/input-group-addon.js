import Vue, { mergeData } from '../../vue'
import { NAME_INPUT_GROUP_ADDON } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { BInputGroupText } from './input-group-text'

export const commonProps = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  isText: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BInputGroupAddon = /*#__PURE__*/ Vue.extend({
  name: NAME_INPUT_GROUP_ADDON,
  functional: true,
  props: makePropsConfigurable(
    {
      ...commonProps,
      append: {
        type: Boolean,
        default: false
      }
    },
    NAME_INPUT_GROUP_ADDON
  ),
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'input-group-append': props.append,
          'input-group-prepend': !props.append
        },
        attrs: {
          id: props.id
        }
      }),
      props.isText ? [h(BInputGroupText, children)] : children
    )
  }
})
