import { extend, mergeData } from '../../vue'
import { NAME_BUTTON_GROUP } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { pick, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { props as buttonProps } from '../button/button'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...pick(buttonProps, ['size']),
    ariaRole: makeProp(PROP_TYPE_STRING, 'group'),
    size: makeProp(PROP_TYPE_STRING),
    tag: makeProp(PROP_TYPE_STRING, 'div'),
    vertical: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_BUTTON_GROUP
)

// --- Main component ---

// @vue/component
export const BButtonGroup = /*#__PURE__*/ extend({
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
