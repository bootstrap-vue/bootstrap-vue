import { mergeData } from 'vue-functional-data-merge'
import memoize from '../../utils/memoize'
import suffixPropName from '../../utils/suffix-prop-name'
import { arrayIncludes } from '../../utils/array'
import { isUndefined, isNull } from '../../utils/inspect'
import { keys, assign, create } from '../../utils/object'
import { getBreakpointsUpCached } from '../../utils/config'

/**
 * Generates a prop object with a type of
 * [Boolean, String, Number]
 */
function boolStrNum() {
  return {
    type: [Boolean, String, Number],
    default: false
  }
}

/**
 * Generates a prop object with a type of
 * [String, Number]
 */
function strNum() {
  return {
    type: [String, Number],
    default: null
  }
}

// Memoized function for better performance on generating class names
const computeBkPtClass = memoize(function computeBkPt(type, breakpoint, val) {
  let className = type
  if (isUndefined(val) || isNull(val) || val === false) {
    return undefined
  }
  if (breakpoint) {
    className += `-${breakpoint}`
  }
  // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <b-col sm></b-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.
  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase()
  }
  // .order-md-6
  className += `-${val}`
  return className.toLowerCase()
})

// Cached copy of the breakpoint prop names
let breakpointPropMap = create(null)

// Lazy evaled props factory for BCol
const generateProps = () => {
  // Grab the breakpoints from the cached config (exclude the '' (xs) breakpoint)
  const breakpoints = getBreakpointsUpCached().filter(Boolean)

  // Supports classes like: .col-sm, .col-md-6, .col-lg-auto
  const breakpointCol = breakpoints.reduce((propMap, breakpoint) => {
    if (breakpoint) {
      // We filter out the '' breakpoint (xs), as making a prop name ''
      // would not work. The `cols` prop is used for `xs`
      propMap[breakpoint] = boolStrNum()
    }
    return propMap
  }, create(null))

  // Supports classes like: .offset-md-1, .offset-lg-12
  const breakpointOffset = breakpoints.reduce((propMap, breakpoint) => {
    propMap[suffixPropName(breakpoint, 'offset')] = strNum()
    return propMap
  }, create(null))

  // Supports classes like: .order-md-1, .order-lg-12
  const breakpointOrder = breakpoints.reduce((propMap, breakpoint) => {
    propMap[suffixPropName(breakpoint, 'order')] = strNum()
    return propMap
  }, create(null))

  // For loop doesn't need to check hasOwnProperty
  // when using an object created from null
  breakpointPropMap = assign(create(null), {
    col: keys(breakpointCol),
    offset: keys(breakpointOffset),
    order: keys(breakpointOrder)
  })

  // Return the generated props
  return {
    // Generic flexbox .col (xs)
    col: {
      type: Boolean,
      default: false
    },
    // .col-[1-12]|auto  (xs)
    cols: strNum(),
    // Breakpoint Specific props
    ...breakpointCol,
    offset: strNum(),
    ...breakpointOffset,
    order: strNum(),
    ...breakpointOrder,
    // Flex alignment
    alignSelf: {
      type: String,
      default: null,
      validator: str =>
        arrayIncludes(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str)
    },
    tag: {
      type: String,
      default: 'div'
    }
  }
}

// We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component
export default {
  name: 'BCol',
  functional: true,
  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props
    // eslint-disable-next-line no-return-assign
    return (this.props = generateProps())
  },
  render(h, { props, data, children }) {
    const classList = []
    // Loop through `col`, `offset`, `order` breakpoint props
    for (const type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      const keys = breakpointPropMap[type]
      for (let i = 0; i < keys.length; i++) {
        // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
        const c = computeBkPtClass(type, keys[i].replace(type, ''), props[keys[i]])
        // If a class is returned, push it onto the array.
        if (c) {
          classList.push(c)
        }
      }
    }

    const hasColClasses = classList.some(className => /^col-/.test(className))

    classList.push({
      // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
      col: props.col || (!hasColClasses && !props.cols),
      [`col-${props.cols}`]: props.cols,
      [`offset-${props.offset}`]: props.offset,
      [`order-${props.order}`]: props.order,
      [`align-self-${props.alignSelf}`]: props.alignSelf
    })

    return h(props.tag, mergeData(data, { class: classList }), children)
  }
}
