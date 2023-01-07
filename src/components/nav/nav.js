import { extend, mergeData } from '../../vue'
import { NAME_NAV } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Helper methods ---

const computeJustifyContent = value => {
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

// --- Props ---

export const props = makePropsConfigurable(
  {
    align: makeProp(PROP_TYPE_STRING),
    // Set to `true` if placing in a card header
    cardHeader: makeProp(PROP_TYPE_BOOLEAN, false),
    fill: makeProp(PROP_TYPE_BOOLEAN, false),
    justified: makeProp(PROP_TYPE_BOOLEAN, false),
    pills: makeProp(PROP_TYPE_BOOLEAN, false),
    small: makeProp(PROP_TYPE_BOOLEAN, false),
    tabs: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'ul'),
    vertical: makeProp(PROP_TYPE_BOOLEAN, false)
  },
  NAME_NAV
)

// --- Main component ---

// @vue/component
export const BNav = /*#__PURE__*/ extend({
  name: NAME_NAV,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tabs, pills, vertical, align, cardHeader } = props

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'nav',
        class: {
          'nav-tabs': tabs,
          'nav-pills': pills && !tabs,
          'card-header-tabs': !vertical && cardHeader && tabs,
          'card-header-pills': !vertical && cardHeader && pills && !tabs,
          'flex-column': vertical,
          'nav-fill': !vertical && props.fill,
          'nav-justified': !vertical && props.justified,
          [computeJustifyContent(align)]: !vertical && align,
          small: props.small
        }
      }),
      children
    )
  }
})
