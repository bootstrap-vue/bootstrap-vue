// Base on-demand component for tooltip / popover templates
//
// Currently:
//   Responsible for positioning and transitioning the template
//   Templates are only instantiated when shown, and destroyed when hidden
//

import Vue from '../../../utils/vue'
import Popper from 'popper.js'
import { getCS, select } from '../../../utils/dom'
import { toFloat } from '../../../utils/number'
import { HTMLElement, SVGElement } from '../../../utils/safe-types'
import { BVTransition } from '../../../utils/bv-transition'

const NAME = 'BVPopper'

const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOPLEFT: 'top',
  TOPRIGHT: 'top',
  RIGHTTOP: 'right',
  RIGHTBOTTOM: 'right',
  BOTTOMLEFT: 'bottom',
  BOTTOMRIGHT: 'bottom',
  LEFTTOP: 'left',
  LEFTBOTTOM: 'left'
}

const OffsetMap = {
  AUTO: 0,
  TOPLEFT: -1,
  TOP: 0,
  TOPRIGHT: +1,
  RIGHTTOP: -1,
  RIGHT: 0,
  RIGHTBOTTOM: +1,
  BOTTOMLEFT: -1,
  BOTTOM: 0,
  BOTTOMRIGHT: +1,
  LEFTTOP: -1,
  LEFT: 0,
  LEFTBOTTOM: +1
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
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip'
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
    /* istanbul ignore next */
    templateType() /* istanbul ignore next */ {
      // Overridden by template component
      return 'unknown'
    },
    popperConfig() {
      const placement = this.placement
      return {
        placement: this.getAttachment(placement),
        modifiers: {
          offset: { offset: this.getOffset(placement) },
          flip: { behavior: this.fallbackPlacement },
          // `arrow.element` can also be a reference to an HTML Element
          // maybe we should make this a `$ref` in the templates?
          arrow: { element: '.arrow' },
          preventOverflow: {
            padding: this.boundaryPadding,
            boundariesElement: this.boundary
          }
        },
        onCreate: data => {
          // Handle flipping arrow classes
          if (data.originalPlacement !== data.placement) {
            /* istanbul ignore next: can't test in JSDOM */
            this.popperPlacementChange(data)
          }
        },
        onUpdate: data => {
          // Handle flipping arrow classes
          this.popperPlacementChange(data)
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
  mounted() {
    // TBD
  },
  updated() {
    // Update popper if needed
    // TODO: Should this be a watcher on `this.popperConfig` instead?
    this.updatePopper()
  },
  beforeDestroy() {
    this.destroyPopper()
  },
  destroyed() {
    // Make sure template is removed from DOM
    const el = this.$el
    el && el.parentNode && el.parentNode.removeChild(el)
  },
  methods: {
    // "Public" method to trigger hide template
    hide() {
      this.localShow = false
    },
    // Private
    getAttachment(placement) {
      return AttachmentMap[String(placement).toUpperCase()] || 'auto'
    },
    getOffset(placement) {
      if (!this.offset) {
        // Could set a ref for the arrow element
        const arrow = this.$refs.arrow || select('.arrow', this.$el)
        const arrowOffset = toFloat(getCS(arrow).width, 0) + toFloat(this.arrowPadding, 0)
        switch (OffsetMap[String(placement).toUpperCase()] || 0) {
          /* istanbul ignore next: can't test in JSDOM */
          case +1:
            /* istanbul ignore next: can't test in JSDOM */
            return `+50%p - ${arrowOffset}px`
          /* istanbul ignore next: can't test in JSDOM */
          case -1:
            /* istanbul ignore next: can't test in JSDOM */
            return `-50%p + ${arrowOffset}px`
          default:
            return 0
        }
      }
      /* istanbul ignore next */
      return this.offset
    },
    popperCreate(el) {
      this.destroyPopper()
      // We use `el` rather than `this.$el` just in case the original
      // mountpoint root element type was changed by the template
      this.$_popper = new Popper(this.target, el, this.popperConfig)
    },
    destroyPopper() {
      this.$_popper && this.$_popper.destroy()
      this.$_popper = null
    },
    updatePopper() {
      this.$_popper && this.$_popper.scheduleUpdate()
    },
    popperPlacementChange(data) {
      // Callback used by popper to adjust the arrow placement
      this.attachment = this.getAttachment(data.placement)
    },
    /* istanbul ignore next */
    renderTemplate(h) /* istanbul ignore next */ {
      // Will be overridden by templates
      return h('div')
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
