// Popover "Class" (Built as a renderless Vue instance)
// Inherits from BVTooltip
//
// Handles trigger events, etc.
// Instantiates template on demand

import Vue from './vue'
import { BVTooltip } from './bv-tooltip'
import { BVPopoverTemplate } from './bv-popover-template'

const NAME = 'BVPopover'

// @vue/component
export const BVPopover = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVTooltip,
  props: {
    trigger: {
      type: [String, Array],
      default: 'click focus'
    },
    placement: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    Tempalte() {
      return BVPopoverTemplate
    },
    templateType() {
      return 'popover'
    }
  }
})
