import { extend, mergeData } from '../../vue'
import { NAME_INPUT_GROUP } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_APPEND, SLOT_NAME_DEFAULT, SLOT_NAME_PREPEND } from '../../constants/slots'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BInputGroupAppend } from './input-group-append'
import { BInputGroupPrepend } from './input-group-prepend'
import { BInputGroupText } from './input-group-text'

// --- Props ---

export const props = makePropsConfigurable(
  {
    append: makeProp(PROP_TYPE_STRING),
    appendHtml: makeProp(PROP_TYPE_STRING),
    id: makeProp(PROP_TYPE_STRING),
    prepend: makeProp(PROP_TYPE_STRING),
    prependHtml: makeProp(PROP_TYPE_STRING),
    size: makeProp(PROP_TYPE_STRING),
    tag: makeProp(PROP_TYPE_STRING, 'div')
  },
  NAME_INPUT_GROUP
)

// --- Main component ---

// @vue/component
export const BInputGroup = /*#__PURE__*/ extend({
  name: NAME_INPUT_GROUP,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const { prepend, prependHtml, append, appendHtml, size } = props
    const $scopedSlots = scopedSlots || {}
    const $slots = slots()
    const slotScope = {}

    let $prepend = h()
    const hasPrependSlot = hasNormalizedSlot(SLOT_NAME_PREPEND, $scopedSlots, $slots)
    if (hasPrependSlot || prepend || prependHtml) {
      $prepend = h(BInputGroupPrepend, [
        hasPrependSlot
          ? normalizeSlot(SLOT_NAME_PREPEND, slotScope, $scopedSlots, $slots)
          : h(BInputGroupText, { domProps: htmlOrText(prependHtml, prepend) })
      ])
    }

    let $append = h()
    const hasAppendSlot = hasNormalizedSlot(SLOT_NAME_APPEND, $scopedSlots, $slots)
    if (hasAppendSlot || append || appendHtml) {
      $append = h(BInputGroupAppend, [
        hasAppendSlot
          ? normalizeSlot(SLOT_NAME_APPEND, slotScope, $scopedSlots, $slots)
          : h(BInputGroupText, { domProps: htmlOrText(appendHtml, append) })
      ])
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group',
        class: { [`input-group-${size}`]: size },
        attrs: {
          id: props.id || null,
          role: 'group'
        }
      }),
      [$prepend, normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots), $append]
    )
  }
})
