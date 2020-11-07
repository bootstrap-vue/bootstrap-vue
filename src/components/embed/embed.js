import Vue, { mergeData } from '../../vue'
import { NAME_EMBED } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { arrayIncludes } from '../../utils/array'

// --- Constants ---

const TYPES = ['iframe', 'embed', 'video', 'object', 'img', 'b-img', 'b-img-lazy']

// --- Props ---

export const props = makePropsConfigurable(
  {
    type: {
      type: String,
      default: 'iframe',
      validator(value) {
        return arrayIncludes(TYPES, value)
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    aspect: {
      type: String,
      default: '16by9'
    }
  },
  NAME_EMBED
)

// --- Main component ---
// @vue/component
export const BEmbed = /*#__PURE__*/ Vue.extend({
  name: NAME_EMBED,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      {
        ref: data.ref,
        staticClass: 'embed-responsive',
        class: {
          [`embed-responsive-${props.aspect}`]: props.aspect
        }
      },
      [h(props.type, mergeData(data, { ref: '', staticClass: 'embed-responsive-item' }), children)]
    )
  }
})
