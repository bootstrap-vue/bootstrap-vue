import { extend, mergeData } from '../../vue'
import { NAME_MEDIA_BODY } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: makeProp(PROP_TYPE_STRING, 'div')
  },
  NAME_MEDIA_BODY
)

// --- Main component ---

// @vue/component
export const BMediaBody = /*#__PURE__*/ extend({
  name: NAME_MEDIA_BODY,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(props.tag, mergeData(data, { staticClass: 'media-body' }), children)
  }
})
