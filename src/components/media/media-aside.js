import { NAME_MEDIA_ASIDE } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
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
        staticClass: 'd-flex',
        class: {
          [`align-self-${align}`]: align
        }
      }),
      children
    )
  }
})
