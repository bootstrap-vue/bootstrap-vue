import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { BContainer } from '../layout/container'

// --- Constants ---

const NAME = 'BJumbotron'

// --- Props ---

export const props = {
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
    type: String,
    default: () => getComponentConfig(NAME, 'bgVariant')
  },
  borderVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'borderVariant')
  },
  textVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'textVariant')
  }
}

// --- Main component ---
// @vue/component
export const BJumbotron = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const { header, headerHtml, lead, leadHtml, textVariant, bgVariant, borderVariant } = props
    const $scopedSlots = scopedSlots || {}
    const $slots = slots()
    const slotScope = {}

    let $header = h()
    const hasHeaderSlot = hasNormalizedSlot('header', $scopedSlots, $slots)
    if (hasHeaderSlot || header || headerHtml) {
      const { headerLevel } = props

      $header = h(
        props.headerTag,
        {
          class: { [`display-${headerLevel}`]: headerLevel },
          domProps: hasHeaderSlot ? {} : htmlOrText(headerHtml, header)
        },
        normalizeSlot('header', slotScope, $scopedSlots, $slots)
      )
    }

    let $lead = h()
    const hasLeadSlot = hasNormalizedSlot('lead', $scopedSlots, $slots)
    if (hasLeadSlot || lead || leadHtml) {
      $lead = h(
        props.leadTag,
        {
          staticClass: 'lead',
          domProps: hasLeadSlot ? {} : htmlOrText(leadHtml, lead)
        },
        normalizeSlot('lead', slotScope, $scopedSlots, $slots)
      )
    }

    let $children = [$header, $lead, normalizeSlot('default', slotScope, $scopedSlots, $slots)]

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
