import Vue, { mergeData } from '../../vue'
import { NAME_JUMBOTRON } from '../../constants/components'
import { SLOT_NAME_DEFAULT, SLOT_NAME_HEADER, SLOT_NAME_LEAD } from '../../constants/slot-names'
import { makePropsConfigurable } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { BContainer } from '../layout/container'

// --- Props ---

export const props = makePropsConfigurable(
  {
    fluid: {
      type: Boolean,
      default: false
    },
    containerFluid: {
      type: [Boolean, String],
      default: false
    },
    header: {
      type: String
      // default: null
    },
    headerHtml: {
      type: String
      // default: null
    },
    headerTag: {
      type: String,
      default: 'h1'
    },
    headerLevel: {
      type: [Number, String],
      default: '3'
    },
    lead: {
      type: String
      // default: null
    },
    leadHtml: {
      type: String
      // default: null
    },
    leadTag: {
      type: String,
      default: 'p'
    },
    tag: {
      type: String,
      default: 'div'
    },
    bgVariant: {
      type: String
      // default: undefined
    },
    borderVariant: {
      type: String
      // default: undefined
    },
    textVariant: {
      type: String
      // default: undefined
    }
  },
  NAME_JUMBOTRON
)

// --- Main component ---
// @vue/component
export const BJumbotron = /*#__PURE__*/ Vue.extend({
  name: NAME_JUMBOTRON,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const { header, headerHtml, lead, leadHtml, textVariant, bgVariant, borderVariant } = props
    const $scopedSlots = scopedSlots || {}
    const $slots = slots()
    const slotScope = {}

    let $header = h()
    const hasHeaderSlot = hasNormalizedSlot(SLOT_NAME_HEADER, $scopedSlots, $slots)
    if (hasHeaderSlot || header || headerHtml) {
      const { headerLevel } = props

      $header = h(
        props.headerTag,
        {
          class: { [`display-${headerLevel}`]: headerLevel },
          domProps: hasHeaderSlot ? {} : htmlOrText(headerHtml, header)
        },
        normalizeSlot(SLOT_NAME_HEADER, slotScope, $scopedSlots, $slots)
      )
    }

    let $lead = h()
    const hasLeadSlot = hasNormalizedSlot(SLOT_NAME_LEAD, $scopedSlots, $slots)
    if (hasLeadSlot || lead || leadHtml) {
      $lead = h(
        props.leadTag,
        {
          staticClass: 'lead',
          domProps: hasLeadSlot ? {} : htmlOrText(leadHtml, lead)
        },
        normalizeSlot(SLOT_NAME_LEAD, slotScope, $scopedSlots, $slots)
      )
    }

    let $children = [
      $header,
      $lead,
      normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots)
    ]

    // If fluid, wrap content in a container
    if (props.fluid) {
      $children = [h(BContainer, { props: { fluid: props.containerFluid } }, $children)]
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'jumbotron',
        class: {
          'jumbotron-fluid': props.fluid,
          [`text-${textVariant}`]: textVariant,
          [`bg-${bgVariant}`]: bgVariant,
          [`border-${borderVariant}`]: borderVariant,
          border: borderVariant
        }
      }),
      $children
    )
  }
})
