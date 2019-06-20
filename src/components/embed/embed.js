import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { arrayIncludes } from '../../utils/array'

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

// @vue/component
export const BEmbed = /*#__PURE__*/ Vue.extend({
  name: 'BEmbed',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      {
        ref: data.ref,
        staticClass: 'embed-responsive',
        class: {
          [`embed-responsive-${props.aspect}`]: Boolean(props.aspect)
        }
      },
      [h(props.type, mergeData(data, { ref: '', staticClass: 'embed-responsive-item' }), children)]
    )
  }
})

export default BEmbed
