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
      // Overwrites BVTooltip
      type: [String, Array],
      default: 'click focus'
    },
    placement: {
      // Overwrites BVTooltip
      type: String,
      default: 'right'
    }
  },
  computed: {
    // Overwrites BVTooltip
    templateType() {
      return 'popover'
    }
  },
  methods: {
    getTemplate() {
      // Overwrites BVTooltip
      return BVPopoverTemplate
    }
  }
})
