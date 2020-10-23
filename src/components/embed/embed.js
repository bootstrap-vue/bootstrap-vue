import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_EMBED } from '../../constants/components'
import { arrayIncludes } from '../../utils/array'

// --- Props ---

export const props = {
  type: {
    type: String,
    default: 'iframe',
    validator: str =>
      arrayIncludes(['iframe', 'embed', 'video', 'object', 'img', 'b-img', 'b-img-lazy'], str)
  },
  tag: {
    type: String,
    default: 'div'
  },
  aspect: {
    type: String,
    default: '16by9'
  }
}

// --- Main component ---
// @vue/component
export const BEmbed = /*#__PURE__*/ defineComponent({
  name: NAME_EMBED,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      {
        ref: data.ref,
        staticClass: 'embed-responsive',
        class: {
          [`embed-responsive-${props.aspect}`]: props.aspect
        }
      },
      [h(props.type, mergeProps(data, { ref: '', staticClass: 'embed-responsive-item' }), children)]
    )
  }
})
