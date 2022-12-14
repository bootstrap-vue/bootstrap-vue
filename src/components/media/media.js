import { extend, mergeData } from '../../vue'
import { NAME_MEDIA } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_ASIDE, SLOT_NAME_DEFAULT } from '../../constants/slots'
import { normalizeSlot } from '../../utils/normalize-slot'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BMediaAside } from './media-aside'
import { BMediaBody } from './media-body'

// --- Props ---

export const props = makePropsConfigurable(
  {
    noBody: makeProp(PROP_TYPE_BOOLEAN, false),
    rightAlign: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'div'),
    verticalAlign: makeProp(PROP_TYPE_STRING, 'top')
  },
  NAME_MEDIA
)

// --- Main component ---

// @vue/component
export const BMedia = /*#__PURE__*/ extend({
  name: NAME_MEDIA,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots, children }) {
    const { noBody, rightAlign, verticalAlign } = props
    const $children = noBody ? children : []

    if (!noBody) {
      const slotScope = {}
      const $slots = slots()
      const $scopedSlots = scopedSlots || {}

      $children.push(
        h(BMediaBody, normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots))
      )

      const $aside = normalizeSlot(SLOT_NAME_ASIDE, slotScope, $scopedSlots, $slots)
      if ($aside) {
        $children[rightAlign ? 'push' : 'unshift'](
          h(BMediaAside, { props: { right: rightAlign, verticalAlign } }, $aside)
        )
      }
    }

    return h(props.tag, mergeData(data, { staticClass: 'media' }), $children)
  }
})
