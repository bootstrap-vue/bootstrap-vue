import Vue from '../../vue'
import { NAME_POPOVER } from '../../constants/components'
import { getComponentConfig } from '../../utils/config'
import { HTMLElement } from '../../utils/safe-types'
import { BTooltip } from '../tooltip/tooltip'
import { BVPopover } from './helpers/bv-popover'

export const BPopover = /*#__PURE__*/ Vue.extend({
  name: NAME_POPOVER,
  extends: BTooltip,
  inheritAttrs: false,
  props: {
    title: {
      type: String
      // default: undefined
    },
    content: {
      type: String
      // default: undefined
    },
    triggers: {
      type: [String, Array],
      default: 'click'
    },
    placement: {
      type: String,
      default: 'right'
    },
    variant: {
      type: String,
      default: () => getComponentConfig(NAME_POPOVER, 'variant')
    },
    customClass: {
      type: String,
      default: () => getComponentConfig(NAME_POPOVER, 'customClass')
    },
    delay: {
      type: [Number, Object, String],
      default: () => getComponentConfig(NAME_POPOVER, 'delay')
    },
    boundary: {
      // String: scrollParent, window, or viewport
      // Element: element reference
      // Object: Vue component
      type: [String, HTMLElement, Object],
      default: () => getComponentConfig(NAME_POPOVER, 'boundary')
    },
    boundaryPadding: {
      type: [Number, String],
      default: () => getComponentConfig(NAME_POPOVER, 'boundaryPadding')
    }
  },
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
      this.setContent(this.$scopedSlots.default || this.content)
      this.setTitle(this.$scopedSlots.title || this.title)
    }
  }
  // Render function provided by BTooltip
})
