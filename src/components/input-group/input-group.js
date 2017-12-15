import { mergeData } from '../../utils'
import InputGroupAddon from './input-group-addon'

export const props = {
  id: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  left: {
    type: String,
    default: null
  },
  right: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  }
}

export default {
  functional: true,
  props: props,
  render (h, { props, data, slots }) {
    let childNodes = []
    const $slots = slots()

    // Left Slot / Prop
    if ($slots.left) {
      childNodes.push(slots().left)
    } else if (props.left) {
      childNodes.push(h(InputGroupAddon, { domProps: { innerHTML: props.left } }))
    }

    // Default slot
    childNodes.push($slots.default)

    // Right slot / prop
    if ($slots.right) {
      childNodes.push($slots.right)
    } else if (props.right) {
      childNodes.push(h(InputGroupAddon, { domProps: { innerHTML: props.right } }))
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group',
        class: {
          [`input-group-${props.size}`]: Boolean(props.size)
        },
        attrs: {
          id: props.id || null,
          role: 'group'
        }
      }),
      childNodes
    )
  }
}
