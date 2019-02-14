import { mergeData } from 'vue-functional-data-merge'
import BMediaBody from './media-body'
import BMediaAside from './media-aside'

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
export default {
  name: 'BMedia',
  functional: true,
  props,
  render(h, { props, data, slots, children }) {
    let childNodes = props.noBody ? children : []
    const $slots = slots()

    if (!props.noBody) {
      if ($slots.aside && !props.rightAlign) {
        childNodes.push(
          h(
            BMediaAside,
            { staticClass: 'mr-3', props: { verticalAlign: props.verticalAlign } },
            $slots.aside
          )
        )
      }

      childNodes.push(h(BMediaBody, $slots.default))

      if ($slots.aside && props.rightAlign) {
        childNodes.push(
          h(
            BMediaAside,
            { staticClass: 'ml-3', props: { verticalAlign: props.verticalAlign } },
            $slots.aside
          )
        )
      }
    }

    return h(props.tag, mergeData(data, { staticClass: 'media' }), childNodes)
  }
}
