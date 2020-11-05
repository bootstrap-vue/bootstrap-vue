import Vue, { mergeData } from '../../vue'
import { NAME_BUTTON_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { pick } from '../../utils/object'
import { props as buttonProps } from '../button/button'

export const props = makePropsConfigurable(
  {
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
      // default: null
    },
    tag: {
      type: String,
      default: 'div'
    },
    ariaRole: {
      type: String,
      default: 'group'
    },
    ...pick(buttonProps, ['size'])
  },
  NAME_BUTTON_GROUP
)

// @vue/component
export const BButtonGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          [`btn-group-${props.size}`]: props.size
        },
        attrs: { role: props.ariaRole }
      }),
      children
    )
  }
})
