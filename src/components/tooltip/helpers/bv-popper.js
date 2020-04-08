// Base on-demand component for tooltip / popover templates
//
// Currently:
//   Responsible for positioning and transitioning the template
//   Templates are only instantiated when shown, and destroyed when hidden
//

import Vue from '../../../utils/vue'
import * as Popper from '@popperjs/core'
import { getCS, select, removeNode } from '../../../utils/dom'
import { toFloat } from '../../../utils/number'
import { HTMLElement, SVGElement } from '../../../utils/safe-types'
import { BVTransition } from '../../../utils/bv-transition'

const NAME = 'BVPopper'

const AttachmentMap = {
  auto: 'auto',
  'auto-start': 'auto',
  'auto-end': 'auto',
  top: 'top',
  'top-start': 'top',
  'top-end': 'top',
  bottom: 'bottom',
  'bottom-start': 'bottom',
  'bottom-end': 'bottom',
  right: 'right',
  'right-start': 'right',
  'right-end': 'right',
  left: 'left',
  'left-start': 'left',
  'left-end': 'left'
}

const OffsetMap = {
  auto: 0,
  'auto-start': -1,
  'auto-end': 1,
  top: 0,
  'top-start': -1,
  'top-end': 1,
  bottom: 0,
  'bottom-start': -1,
  'bottom-end': 1,
  right: 0,
  'right-start': -1,
  'right-end': 1,
  left: 0,
  'left-start': -1,
  'left-end': 1
}

// @vue/component
export const BVPopper = /*#__PURE__*/ Vue.extend({
  name: NAME,
  props: {
    target: {
      // Element that the tooltip/popover is positioned relative to
      type: [HTMLElement, SVGElement]
      // default: null
    },
    placement: {
      type: String,
      default: 'top'
    },
    fallbackPlacements: {
      type: Array,
      default: undefined
    },
    offset: {
      type: Number,
      default: 0
    },
    boundary: {
      // 'scrollParent', 'viewport', 'window', or Element
      type: [String, HTMLElement],
      default: 'scrollParent'
    },
    boundaryPadding: {
      // Tooltip/popover will try and stay away from
      // boundary edge by this many pixels
      type: Number,
      default: 5
    },
    arrowPadding: {
      // The minimum distance (in `px`) from the edge of the
      // tooltip/popover that the arrow can be positioned
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      // reactive props set by parent
      noFade: false,
      // State related data
      localShow: true,
      attachment: this.getAttachment(this.placement)
    }
  },
  computed: {
    templateType() /* istanbul ignore next */ {
      // Overridden by template component
      return 'unknown'
    },
    popperConfig() {
      const placement = this.placement
      const updateHandler = {
        name: 'updateHandler',
        enabled: true,
        phase: 'afterWrite',
        fn: ({ state }) => {
          // Handle flipping arrow classes
          this.popperPlacementChange(state)
        }
      }
      return {
        placement: this.getAttachment(placement),
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.calculateOffset
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: this.fallbackPlacements
            }
          },
          {
            name: 'arrow',
            options: {
              element: this.getArrow(),
              padding: this.arrowPadding
            }
          },
          {
            name: 'preventOverflow',
            options: {
              padding: this.boundaryPadding,
              rootBoundary: this.boundary
            }
          },
          {
            name: 'computeStyles',
            options: {
              // Needs to be disabled when using transitions
              adaptive: false
            }
          },
          updateHandler
        ],
        onFirstUpdate: data => {
          // Handle flipping arrow classes
          if (data.originalPlacement !== data.placement) {
            /* istanbul ignore next: can't test in JSDOM */
            this.popperPlacementChange(data)
          }
        }
      }
    }
  },
  created() {
    // Note: We are created on-demand, and should be guaranteed that
    // DOM is rendered/ready by the time the created hook runs
    this.$_popper = null
    // Ensure we show as we mount
    this.localShow = true
    // Create popper instance before shown
    this.$on('show', el => {
      this.popperCreate(el)
    })
    // Self destruct once hidden
    this.$on('hidden', () => {
      this.$nextTick(this.$destroy)
    })
    // If parent is destroyed, ensure we are destroyed
    this.$parent.$once('hook:destroyed', this.$destroy)
  },
  beforeMount() {
    // Ensure that the attachment position is correct before mounting
    // as our propsData is added after `new Template({...})`
    this.attachment = this.getAttachment(this.placement)
  },
  updated() {
    // Update popper if needed
    // TODO: Should this be a watcher on `this.popperConfig` instead?
    this.popperUpdate()
  },
  beforeDestroy() {
    this.popperDestroy()
  },
  destroyed() {
    // Make sure template is removed from DOM
    removeNode(this.$el)
  },
  methods: {
    // "Public" method to trigger hide template
    hide() {
      this.localShow = false
    },
    // Private
    getAttachment(placement) {
      return AttachmentMap[placement] || 'auto'
    },
    getArrow() {
      return this.$refs.arrow || select('.arrow', this.$el)
    },
    calculateOffset({ placement, reference }) {
      const $arrow = this.getArrow()
      const arrowStyles = getCS($arrow)
      const arrowWidth = toFloat(arrowStyles.width) || 0
      const arrowHeight = toFloat(arrowStyles.height) || 0
      const arrowOffset = arrowWidth + this.arrowPadding

      let skidding = 0
      const offsetType = OffsetMap[placement] || 0
      if (offsetType === 1) {
        skidding = -(reference.width / 2) - arrowOffset
      } else if (offsetType === -1) {
        skidding = reference.width / 2 + arrowOffset
      }

      const distance = this.offset + arrowHeight

      return [skidding, distance]
    },
    popperCreate(el) {
      this.popperDestroy()
      // We use `el` rather than `this.$el` just in case the original
      // mountpoint root element type was changed by the template
      this.$_popper = Popper.createPopper(this.target, el, this.popperConfig)
    },
    popperDestroy() {
      if (this.$_popper) {
        this.$_popper.destroy()
      }
      this.$_popper = null
    },
    popperUpdate() {
      if (this.$_popper) {
        this.$_popper.update()
      }
    },
    // Callback used by Popper to adjust the arrow placement
    popperPlacementChange({ placement }) {
      this.attachment = this.getAttachment(placement)
    },
    renderTemplate(h) /* istanbul ignore next */ {
      // Will be overridden by templates
      return h()
    }
  },
  render(h) {
    // Note: `show` and 'fade' classes are only appled during transition
    return h(
      BVTransition,
      {
        // Transitions as soon as mounted
        props: { appear: true, noFade: this.noFade },
        on: {
          // Events used by parent component/instance
          beforeEnter: el => this.$emit('show', el),
          afterEnter: el => this.$emit('shown', el),
          beforeLeave: el => this.$emit('hide', el),
          afterLeave: el => this.$emit('hidden', el)
        }
      },
      [this.localShow ? this.renderTemplate(h) : h()]
    )
  }
})
