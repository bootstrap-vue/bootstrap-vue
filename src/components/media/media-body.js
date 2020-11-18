import { defineComponent, h, mergeData } from '../../vue'
import { NAME_MEDIA_BODY } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    }
  },
  NAME_MEDIA_BODY
)

// --- Main component ---

// @vue/component
export const BMediaBody = /*#__PURE__*/ defineComponent({
  name: NAME_MEDIA_BODY,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(props.tag, mergeData(data, { staticClass: 'media-body' }), children)
  }
})
