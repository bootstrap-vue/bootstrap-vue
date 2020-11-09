import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_NAV } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Helper methods ---

const computeJustifyContent = value => {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'ul'
    },
    fill: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    },
    align: {
      type: String
      // default: null
    },
    tabs: {
      type: Boolean,
      default: false
    },
    pills: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    cardHeader: {
      // Set to true if placing in a card header
      type: Boolean,
      default: false
    }
  },
  NAME_NAV
)

// --- Main component ---
// @vue/component
export const BNav = /*#__PURE__*/ defineComponent({
  name: NAME_NAV,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
        staticClass: 'nav',
        class: {
          'nav-tabs': props.tabs,
          'nav-pills': props.pills && !props.tabs,
          'card-header-tabs': !props.vertical && props.cardHeader && props.tabs,
          'card-header-pills': !props.vertical && props.cardHeader && props.pills && !props.tabs,
          'flex-column': props.vertical,
          'nav-fill': !props.vertical && props.fill,
          'nav-justified': !props.vertical && props.justified,
          [computeJustifyContent(props.align)]: !props.vertical && props.align,
          small: props.small
        }
      }),
      children
    )
  }
})
