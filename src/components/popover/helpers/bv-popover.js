// Popover "Class" (Built as a renderless Vue instance)
// Inherits from BVTooltip
//
// Handles trigger events, etc.
// Instantiates template on demand

import Vue from '../../../utils/vue'
import { BVTooltip } from '../../tooltip/helpers/bv-tooltip'
import { BVPopoverTemplate } from './bv-popover-template'

const NAME = 'BVPopover'

// @vue/component
export const BVPopover = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVTooltip,
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
