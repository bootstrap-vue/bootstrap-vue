import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import identity from '../../utils/identity'
import { isUndefinedOrNull } from '../../utils/inspect'
import { toFloat } from '../../utils/number'

// Common icon props (should be cloned/spread before using)
export const commonIconProps = {
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
  }
}

// Base attributes needed on all icons
const baseAttrs = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 20 20',
  focusable: 'false',
  role: 'img',
  alt: 'icon'
}

// Shared private base component to reduce bundle/runtime size
// @vue/component
export const BVIconBase = /*#__PURE__*/ Vue.extend({
  name: 'BVIconBase',
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
    const fontScale = Math.max(toFloat(props.fontScale) || 1, 0) || 1
    const scale = Math.max(toFloat(props.scale) || 1, 0) || 1
    const rotate = toFloat(props.rotate) || 0
    const shiftH = toFloat(props.shiftH) || 0
    const shiftV = toFloat(props.shiftV) || 0
    const flipH = props.flipH
    const flipV = props.flipV
    // Compute the transforms
    // Note that order is important as SVG transforms are applied in order from
    // left to right and we want flipping/scale to occur before rotation
    // Note shifting is applied separately
    // Assumes that the viewbox is `0 0 20 20` (`10 10` is the center)
    const hasScale = flipH || flipV || scale !== 1
    const hasTransforms = hasScale || rotate
    const hasShift = shiftH || shiftV
    const transforms = [
      hasTransforms ? 'translate(10 10)' : null,
      hasScale ? `scale(${(flipH ? -1 : 1) * scale} ${(flipV ? -1 : 1) * scale})` : null,
      rotate ? `rotate(${rotate})` : null,
      hasTransforms ? 'translate(-10 -10)' : null
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
        { attrs: { transform: `translate(${(20 * shiftH) / 16} ${(-20 * shiftV) / 16})` } },
        [$inner]
      )
    }

    return h(
      'svg',
      mergeData(
        {
          staticClass: 'b-icon bi',
          class: { [`text-${props.variant}`]: !!props.variant },
          attrs: baseAttrs,
          style: isStacked ? {} : { fontSize: fontScale === 1 ? null : `${fontScale * 100}%` }
        },
        // Merge in user supplied data
        data,
        // If icon is stacked, null out some attrs
        isStacked ? { attrs: { width: null, height: null, role: null, alt: null } } : {},
        // These cannot be overridden by users
        {
          attrs: {
            xmlns: isStacked ? null : 'http://www.w3.org/2000/svg',
            fill: 'currentColor'
          }
        }
      ),
      [$inner]
    )
  }
})
