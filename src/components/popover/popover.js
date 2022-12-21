import { extend } from '../../vue'
import { NAME_POPOVER } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { PROP_TYPE_ARRAY_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_TITLE } from '../../constants/slots'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BTooltip, props as BTooltipProps } from '../tooltip/tooltip'
import { BVPopover } from './helpers/bv-popover'
import { sortKeys } from '../../utils/object'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...BTooltipProps,
    content: makeProp(PROP_TYPE_STRING),
    placement: makeProp(PROP_TYPE_STRING, 'right'),
    triggers: makeProp(PROP_TYPE_ARRAY_STRING, EVENT_NAME_CLICK)
  }),
  NAME_POPOVER
)

// --- Main component ---

// @vue/component
export const BPopover = /*#__PURE__*/ extend({
  name: NAME_POPOVER,
  extends: BTooltip,
  inheritAttrs: false,
  props,
  methods: {
    getComponent() {
      // Overridden by BPopover
      return BVPopover
    },
    updateContent() {
      // Tooltip: Default slot is `title`
      // Popover: Default slot is `content`, `title` slot is title
      // We pass a scoped slot function references by default (Vue v2.6x)
      // And pass the title prop as a fallback
      this.setContent(this.normalizeSlot() || this.content)
      this.setTitle(this.normalizeSlot(SLOT_NAME_TITLE) || this.title)
    }
  }
  // Render function provided by BTooltip
})
