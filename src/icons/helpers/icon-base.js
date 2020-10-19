import Vue, { mergeData } from '../../vue'
import { NAME_ICON_BASE } from '../../constants/components'
import identity from '../../utils/identity'
import { isUndefinedOrNull } from '../../utils/inspect'
import { mathMax } from '../../utils/math'
import { toFloat } from '../../utils/number'

// Common icon props (should be cloned/spread before using)
export const commonIconProps = {
  title: {
    type: String
    // default: null
  },
  variant: {
    type: String,
    default: null
  },
  fontScale: {
    type: [Number, String],
    default: 1
  },
  scale: {
    type: [Number, String],
    default: 1
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  flipH: {
    type: Boolean,
    default: false
  },
  flipV: {
    type: Boolean,
    default: false
  },
  shiftH: {
    type: [Number, String],
    default: 0
  },
  shiftV: {
    type: [Number, String],
    default: 0
  },
  animation: {
    type: String,
    default: null
  }
}

// Base attributes needed on all icons
const baseAttrs = {
  viewBox: '0 0 16 16',
  width: '1em',
  height: '1em',
  focusable: 'false',
  role: 'img',
  'aria-label': 'icon'
}

// Attributes that are nulled out when stacked
const stackedAttrs = {
  width: null,
  height: null,
  focusable: null,
  role: null,
  'aria-label': null
}

// Shared private base component to reduce bundle/runtime size
// @vue/component
export const BVIconBase = /*#__PURE__*/ Vue.extend({
  name: NAME_ICON_BASE,
  functional: true,
  props: {
    content: {
      type: String
    },
    stacked: {
      type: Boolean,
      default: false
    },
    ...commonIconProps
  },
  render(h, { data, props, children }) {
    const fontScale = mathMax(toFloat(props.fontScale, 1), 0) || 1
    const scale = mathMax(toFloat(props.scale, 1), 0) || 1
    const rotate = toFloat(props.rotate, 0)
    const shiftH = toFloat(props.shiftH, 0)
    const shiftV = toFloat(props.shiftV, 0)
    const flipH = props.flipH
    const flipV = props.flipV
    const animation = props.animation
    // Compute the transforms
    // Note that order is important as SVG transforms are applied in order from
    // left to right and we want flipping/scale to occur before rotation
    // Note shifting is applied separately
    // Assumes that the viewbox is `0 0 16 16` (`8 8` is the center)
    const hasScale = flipH || flipV || scale !== 1
    const hasTransforms = hasScale || rotate
    const hasShift = shiftH || shiftV
    const transforms = [
      hasTransforms ? 'translate(8 8)' : null,
      hasScale ? `scale(${(flipH ? -1 : 1) * scale} ${(flipV ? -1 : 1) * scale})` : null,
      rotate ? `rotate(${rotate})` : null,
      hasTransforms ? 'translate(-8 -8)' : null
    ].filter(identity)

    // Handling stacked icons
    const isStacked = props.stacked
    const hasContent = !isUndefinedOrNull(props.content)

    // We wrap the content in a `<g>` for handling the transforms (except shift)
    let $inner = h(
      'g',
      {
        attrs: { transform: transforms.join(' ') || null },
        domProps: hasContent ? { innerHTML: props.content || '' } : {}
      },
      children
    )

    // If needed, we wrap in an additional `<g>` in order to handle the shifting
    if (hasShift) {
      $inner = h(
        'g',
        { attrs: { transform: `translate(${(16 * shiftH) / 16} ${(-16 * shiftV) / 16})` } },
        [$inner]
      )
    }

    if (isStacked) {
      // Wrap in an additional `<g>` for proper
      // animation handling if stacked
      $inner = h('g', {}, [$inner])
    }

    const $title = props.title ? h('title', props.title) : null

    return h(
      'svg',
      mergeData(
        {
          staticClass: 'b-icon bi',
          class: {
            [`text-${props.variant}`]: !!props.variant,
            [`b-icon-animation-${animation}`]: !!animation
          },
          attrs: baseAttrs,
          style: isStacked ? {} : { fontSize: fontScale === 1 ? null : `${fontScale * 100}%` }
        },
        // Merge in user supplied data
        data,
        // If icon is stacked, null out some attrs
        isStacked ? { attrs: stackedAttrs } : {},
        // These cannot be overridden by users
        {
          attrs: {
            xmlns: isStacked ? null : 'http://www.w3.org/2000/svg',
            fill: 'currentColor'
          }
        }
      ),
      [$title, $inner]
    )
  }
})
