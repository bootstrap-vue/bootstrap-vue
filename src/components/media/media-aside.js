import Vue, { mergeData } from '../../vue'
import { NAME_MEDIA_ASIDE } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    },
    right: {
      type: Boolean,
      default: false
    },
    verticalAlign: {
      type: String,
      default: 'top'
    }
  },
  NAME_MEDIA_ASIDE
)

// --- Main component ---
// @vue/component
export const BMediaAside = /*#__PURE__*/ Vue.extend({
  name: NAME_MEDIA_ASIDE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { verticalAlign } = props
    const align =
      verticalAlign === 'top'
        ? 'start'
        : verticalAlign === 'bottom'
          ? 'end'
          : /* istanbul ignore next */ verticalAlign

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'media-aside',
        class: {
          'media-aside-right': props.right,
          [`align-self-${align}`]: align
        }
      }),
      children
    )
  }
})
