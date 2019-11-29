import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { BInputGroupPrepend } from './input-group-prepend'
import { BInputGroupAppend } from './input-group-append'
import { BInputGroupText } from './input-group-text'

const NAME = 'BInputGroup'

export const props = {
  id: {
    type: String
  },
  size: {
    type: String,
    default: () => getComponentConfig(NAME, 'size')
  },
  prepend: {
    type: String
  },
  prependHtml: {
    type: String
  },
  append: {
    type: String
  },
  appendHtml: {
    type: String
  },
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export const BInputGroup = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}

    const childNodes = []

    // Prepend prop/slot
    if (props.prepend || props.prependHtml || hasNormalizedSlot('prepend', $scopedSlots, $slots)) {
      childNodes.push(
        h(BInputGroupPrepend, [
          // Prop
          props.prepend || props.prependHtml
            ? h(BInputGroupText, { domProps: htmlOrText(props.prependHtml, props.prepend) })
            : h(),
          // Slot
          normalizeSlot('prepend', {}, $scopedSlots, $slots) || h()
        ])
      )
    } else {
      childNodes.push(h())
    }

    // Default slot
    if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
      childNodes.push(...normalizeSlot('default', {}, $scopedSlots, $slots))
    } else {
      childNodes.push(h())
    }

    // Append prop
    if (props.append || props.appendHtml || hasNormalizedSlot('append', $scopedSlots, $slots)) {
      childNodes.push(
        h(BInputGroupAppend, [
          // prop
          props.append || props.appendHtml
            ? h(BInputGroupText, { domProps: htmlOrText(props.appendHtml, props.append) })
            : h(),
          // Slot
          normalizeSlot('append', {}, $scopedSlots, $slots) || h()
        ])
      )
    } else {
      childNodes.push(h())
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group',
        class: { [`input-group-${props.size}`]: props.size },
        attrs: {
          id: props.id || null,
          role: 'group'
        }
      }),
      childNodes
    )
  }
})
