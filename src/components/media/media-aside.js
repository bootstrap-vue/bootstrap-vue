import Vue, { mergeData } from '../../vue'
import { NAME_MEDIA_ASIDE } from '../../constants/components'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
  },
  right: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BMediaAside = /*#__PURE__*/ Vue.extend({
  name: NAME_MEDIA_ASIDE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const align =
      props.verticalAlign === 'top'
        ? 'start'
        : props.verticalAlign === 'bottom'
          ? 'end'
          : /* istanbul ignore next */ props.verticalAlign
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'd-flex media-aside',
        class: {
          [`align-self-${align}`]: align,
          'media-aside-right': props.right
        }
      }),
      children
    )
  }
})
