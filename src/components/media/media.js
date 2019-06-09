import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { normalizeSlot } from '../../utils/normalize-slot'
import { BMediaBody } from './media-body'
import { BMediaAside } from './media-aside'

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  rightAlign: {
    type: Boolean,
    default: false
  },
  verticalAlign: {
    type: String,
    default: 'top'
  },
  noBody: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BMedia = /*#__PURE__*/ Vue.extend({
  name: 'BMedia',
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots, children }) {
    let childNodes = props.noBody ? children : []

    if (!props.noBody) {
      const $slots = slots()
      const $scopedSlots = scopedSlots || {}
      const $aside = normalizeSlot('aside', {}, $scopedSlots, $slots)
      const $default = normalizeSlot('default', {}, $scopedSlots, $slots)

      if ($aside && !props.rightAlign) {
        childNodes.push(
          h(
            BMediaAside,
            { staticClass: 'mr-3', props: { verticalAlign: props.verticalAlign } },
            $aside
          )
        )
      }

      childNodes.push(h(BMediaBody, {}, $default))

      if ($aside && props.rightAlign) {
        childNodes.push(
          h(
            BMediaAside,
            { staticClass: 'ml-3', props: { verticalAlign: props.verticalAlign } },
            $aside
          )
        )
      }
    }

    return h(props.tag, mergeData(data, { staticClass: 'media' }), childNodes)
  }
})

export default BMedia
