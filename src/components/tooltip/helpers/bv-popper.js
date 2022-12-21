// Base on-demand component for tooltip / popover templates
//
// Currently:
//   Responsible for positioning and transitioning the template
//   Templates are only instantiated when shown, and destroyed when hidden
//

import Popper from 'popper.js'
import { extend } from '../../../vue'
import { NAME_POPPER } from '../../../constants/components'
import {
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  HOOK_EVENT_NAME_DESTROYED
} from '../../../constants/events'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../../constants/props'
import { HTMLElement, SVGElement } from '../../../constants/safe-types'
import { useParentMixin } from '../../../mixins/use-parent'
import { getCS, requestAF, select } from '../../../utils/dom'
import { toFloat } from '../../../utils/number'
import { makeProp } from '../../../utils/props'
import { BVTransition } from '../../transition/bv-transition'

// --- Constants ---

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

// --- Props ---

export const props = {
  // The minimum distance (in `px`) from the edge of the
  // tooltip/popover that the arrow can be positioned
  arrowPadding: makeProp(PROP_TYPE_NUMBER_STRING, 6),
  // 'scrollParent', 'viewport', 'window', or `Element`
  boundary: makeProp([HTMLElement, PROP_TYPE_STRING], 'scrollParent'),
  // Tooltip/popover will try and stay away from
  // boundary edge by this many pixels
  boundaryPadding: makeProp(PROP_TYPE_NUMBER_STRING, 5),
  fallbackPlacement: makeProp(PROP_TYPE_ARRAY_STRING, 'flip'),
  offset: makeProp(PROP_TYPE_NUMBER_STRING, 0),
  placement: makeProp(PROP_TYPE_STRING, 'top'),
  // Element that the tooltip/popover is positioned relative to
  target: makeProp([HTMLElement, SVGElement])
}

// --- Main component ---

// @vue/component
export const BVPopper = /*#__PURE__*/ extend({
  name: NAME_POPPER,
  mixins: [useParentMixin],
  props,
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
    templateType() {
      // Overridden by template component
      return 'unknown'
    },
    popperConfig() {
      const { placement } = this
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
    this.$on(EVENT_NAME_SHOW, el => {
      this.popperCreate(el)
    })
    // Self destruct handler
    const handleDestroy = () => {
      this.$nextTick(() => {
        // In a `requestAF()` to release control back to application
        requestAF(() => {
          this.$destroy()
        })
      })
    }
    // Self destruct if parent destroyed
    this.bvParent.$once(HOOK_EVENT_NAME_DESTROYED, handleDestroy)
    // Self destruct after hidden
    this.$once(EVENT_NAME_HIDDEN, handleDestroy)
  },
  beforeMount() {
    // Ensure that the attachment position is correct before mounting
    // as our propsData is added after `new Template({...})`
    this.attachment = this.getAttachment(this.placement)
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
    renderTemplate(h) {
      // Will be overridden by templates
      return h('div')
    }
  },
  render(h) {
    const { noFade } = this

    // Note: 'show' and 'fade' classes are only appled during transition
    return h(
      BVTransition,
      {
        // Transitions as soon as mounted
        props: { appear: true, noFade },
        on: {
          // Events used by parent component/instance
          beforeEnter: el => this.$emit(EVENT_NAME_SHOW, el),
          afterEnter: el => this.$emit(EVENT_NAME_SHOWN, el),
          beforeLeave: el => this.$emit(EVENT_NAME_HIDE, el),
          afterLeave: el => this.$emit(EVENT_NAME_HIDDEN, el)
        }
      },
      [this.localShow ? this.renderTemplate(h) : h()]
    )
  }
})
