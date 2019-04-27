import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { stripTags } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import Container from '../layout/container'

const NAME = 'BJumbotron'

export const props = {
  fluid: {
    type: Boolean,
    default: false
  },
  containerFluid: {
    type: Boolean,
    default: false
  },
  header: {
    type: String,
    default: null
  },
  headerHtml: {
    type: String,
    default: null
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
    type: String,
    default: null
  },
  leadHtml: {
    type: String,
    default: null
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

// @vue/component
export default Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    // The order of the conditionals matter.
    // We are building the component markup in order.
    let childNodes = []
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}

    // Header
    if (props.header || hasNormalizedSlot('header', $scopedSlots, $slots) || props.headerHtml) {
      childNodes.push(
        h(
          props.headerTag,
          {
            class: {
              [`display-${props.headerLevel}`]: Boolean(props.headerLevel)
            }
          },
          normalizeSlot('header', {}, $scopedSlots, $slots) ||
            props.headerHtml ||
            stripTags(props.header)
        )
      )
    }

    // Lead
    if (props.lead || hasNormalizedSlot('lead', $scopedSlots, $slots) || props.leadHtml) {
      childNodes.push(
        h(
          props.leadTag,
          { staticClass: 'lead' },
          normalizeSlot('lead', {}, $scopedSlots, $slots) || props.leadHtml || stripTags(props.lead)
        )
      )
    }

    // Default slot
    if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
      childNodes.push(normalizeSlot('default', {}, $scopedSlots, $slots))
    }

    // If fluid, wrap content in a container/container-fluid
    if (props.fluid) {
      // Children become a child of a container
      childNodes = [h(Container, { props: { fluid: props.containerFluid } }, childNodes)]
    }
    // Return the jumbotron
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'jumbotron',
        class: {
          'jumbotron-fluid': props.fluid,
          [`text-${props.textVariant}`]: Boolean(props.textVariant),
          [`bg-${props.bgVariant}`]: Boolean(props.bgVariant),
          [`border-${props.borderVariant}`]: Boolean(props.borderVariant),
          border: Boolean(props.borderVariant)
        }
      }),
      childNodes
    )
  }
})
