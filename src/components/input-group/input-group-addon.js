import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_INPUT_GROUP_ADDON } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { BInputGroupText } from './input-group-text'

// --- Props ---

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

// --- Main component ---
// @vue/component
export const BInputGroupAddon = /*#__PURE__*/ defineComponent({
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
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
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
