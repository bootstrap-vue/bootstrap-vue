import Vue, { mergeData } from '../../vue'
import { NAME_MEDIA_BODY } from '../../constants/components'

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export const BMediaBody = /*#__PURE__*/ Vue.extend({
  name: NAME_MEDIA_BODY,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'media-body'
      }),
      children
    )
  }
})
