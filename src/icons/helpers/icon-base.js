import { extend, mergeData } from '../../vue'
import { NAME_ICON_BASE } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { identity } from '../../utils/identity'
import { isUndefinedOrNull } from '../../utils/inspect'
import { mathMax } from '../../utils/math'
import { toFloat } from '../../utils/number'
import { makeProp } from '../../utils/props'

// --- Constants ---

// Base attributes needed on all icons
const BASE_ATTRS = {
  viewBox: '0 0 16 16',
  width: '1em',
  height: '1em',
  focusable: 'false',
  role: 'img',
  'aria-label': 'icon'
}

// Attributes that are nulled out when stacked
const STACKED_ATTRS = {
  width: null,
  height: null,
  focusable: null,
  role: null,
  'aria-label': null
}

// --- Props ---

export const props = {
  animation: makeProp(PROP_TYPE_STRING),
  content: makeProp(PROP_TYPE_STRING),
  flipH: makeProp(PROP_TYPE_BOOLEAN, false),
  flipV: makeProp(PROP_TYPE_BOOLEAN, false),
  fontScale: makeProp(PROP_TYPE_NUMBER_STRING, 1),
  rotate: makeProp(PROP_TYPE_NUMBER_STRING, 0),
  scale: makeProp(PROP_TYPE_NUMBER_STRING, 1),
  shiftH: makeProp(PROP_TYPE_NUMBER_STRING, 0),
  shiftV: makeProp(PROP_TYPE_NUMBER_STRING, 0),
  stacked: makeProp(PROP_TYPE_BOOLEAN, false),
  title: makeProp(PROP_TYPE_STRING),
  variant: makeProp(PROP_TYPE_STRING)
}

// --- Main component ---

// Shared private base component to reduce bundle/runtime size
// @vue/component
export const BVIconBase = /*#__PURE__*/ extend({
  name: NAME_ICON_BASE,
  functional: true,
  props,
  render(h, { data, props, children }) {
    const { animation, content, flipH, flipV, stacked, title, variant } = props
    const fontScale = mathMax(toFloat(props.fontScale, 1), 0) || 1
    const scale = mathMax(toFloat(props.scale, 1), 0) || 1
    const rotate = toFloat(props.rotate, 0)
    const shiftH = toFloat(props.shiftH, 0)
    const shiftV = toFloat(props.shiftV, 0)
    // Compute the transforms
    // Note that order is important as SVG transforms are applied in order from
    // left to right and we want flipping/scale to occur before rotation
    // Note shifting is applied separately
    // Assumes that the viewbox is `0 0 16 16` (`8 8` is the center)
    const hasScale = flipH || flipV || scale !== 1
    const hasTransforms = hasScale || rotate
    const hasShift = shiftH || shiftV
    const hasContent = !isUndefinedOrNull(content)
    const transforms = [
      hasTransforms ? 'translate(8 8)' : null,
      hasScale ? `scale(${(flipH ? -1 : 1) * scale} ${(flipV ? -1 : 1) * scale})` : null,
      rotate ? `rotate(${rotate})` : null,
      hasTransforms ? 'translate(-8 -8)' : null
    ].filter(identity)

    // We wrap the content in a `<g>` for handling the transforms (except shift)
    let $inner = h(
      'g',
      {
        attrs: { transform: transforms.join(' ') || null },
        domProps: hasContent ? { innerHTML: content || '' } : {}
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

    // Wrap in an additional `<g>` for proper animation handling if stacked
    if (stacked) {
      $inner = h('g', [$inner])
    }

    const $title = title ? h('title', title) : null

    const $content = [$title, $inner].filter(identity)

    return h(
      'svg',
      mergeData(
        {
          staticClass: 'b-icon bi',
          class: {
            [`text-${variant}`]: variant,
            [`b-icon-animation-${animation}`]: animation
          },
          attrs: BASE_ATTRS,
          style: stacked ? {} : { fontSize: fontScale === 1 ? null : `${fontScale * 100}%` }
        },
        // Merge in user supplied data
        data,
        // If icon is stacked, null-out some attrs
        stacked ? { attrs: STACKED_ATTRS } : {},
        // These cannot be overridden by users
        {
          attrs: {
            xmlns: stacked ? null : 'http://www.w3.org/2000/svg',
            fill: 'currentColor'
          }
        }
      ),
      $content
    )
  }
})
