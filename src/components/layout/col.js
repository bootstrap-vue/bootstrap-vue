import { mergeData } from 'vue-functional-data-merge'
import memoize from '../../utils/memoize'
import suffixPropName from '../../utils/suffix-prop-name'
import { arrayIncludes } from '../../utils/array'
import { isUndefined, isNull } from '../../utils/inspect'
import { keys, assign, create, defineProperty } from '../../utils/object'
import { getBreakpointsUp } from '../../utils/config'

// --- Constants ---

// Globals used for caching
let BREAKPOINTS
let PROP_MAP

// --- Helper methods ---

// Generates a prop object with a type of [Boolean, String, Number]
const boolStrNum = () => ({
  type: [Boolean, String, Number],
  default: false
})

// Generates a prop object with a type of [String, Number]
const strNum = () => ({
  type: [String, Number],
  default: null
})

// Get breakpoints for generating props (cached on first call)
const getBreakpoints = () => {
  if (isUndefined(BREAKPOINTS)) {
    BREAKPOINTS = getBreakpointsUp().filter(Boolean)
  }
  // Grab the breakpoints from the config (exclude the '' (xs) breakpoint)
  return BREAKPOINTS
}

const computeBkPt = (type, breakpoint, val) => {
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
}

// Memoize `computeBkPt()` for better performance on generating class names
const computeBkPtClass = memoize(computeBkPt)

// Supports classes like: .col-sm, .col-md-6, .col-lg-auto
const breakpointCol = () => {
  return getBreakpoints().reduce((propMap, breakpoint) => {
    if (breakpoint) {
      // We filter out the '' breakpoint (xs), as making a prop name ''
      // would not work. The `cols` prop is used for `xs`
      propMap[breakpoint] = boolStrNum()
    }
    return propMap
  }, create(null))
}

// Supports classes like: .offset-md-1, .offset-lg-12
const breakpointOffset = () => {
  return getBreakpoints().reduce((propMap, breakpoint) => {
    propMap[suffixPropName(breakpoint, 'offset')] = strNum()
    return propMap
  }, create(null))
}

// Supports classes like: .order-md-1, .order-lg-12
const breakpointOrder = () => {
  return getBreakpoints().reduce((propMap, breakpoint) => {
    propMap[suffixPropName(breakpoint, 'order')] = strNum()
    return propMap
  }, create(null))
}

// For loop doesn't need to check hasOwnProperty
// when using an object created from `null`
const breakpointPropMap = () => {
  if (isUndefined(PROP_MAP)) {
    PROP_MAP = assign(create(null), {
      col: keys(breakpointCol()),
      offset: keys(breakpointOffset()),
      order: keys(breakpointOrder())
    })
  }
  return PROP_MAP
}

// We do not use `Vue.extend()` here as we need the prop's getters
// to be evaluated by vue on first use
// @vue/component
const BCol = {
  name: 'BCol',
  functional: true,
  // We define the props as a getter further down
  // props: {},
  render(h, { props, data, children }) {
    const classList = []
    const propsMap = breakpointPropMap()
    // Loop through `col`, `offset`, `order` breakpoint props
    for (const type in propsMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      const keys = propsMap[type]
      for (let i = 0; i < keys.length; i++) {
        // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
        const c = computeBkPtClass(type, keys[i].replace(type, ''), props[keys[i]])
        // If a class is returned, push it onto the array
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

// Add our props getter, for lazy loading breakpoint props based on config
// When Vue extends this component, it will then evaluate the props, which
// will trigger our getter to compute the props
defineProperty(BCol, 'props', {
  configurable: true,
  enumerable: true,
  writable: true,
  get() {
    return {
      // Generic flexbox .col (xs)
      col: {
        type: Boolean,
        default: false
      },
      // .col-[1-12]|auto (xs)
      cols: strNum(),
      // Breakpoint Specific props
      ...breakpointCol(),
      offset: strNum(), // (xs)
      ...breakpointOffset(),
      order: strNum(), // (xs)
      ...breakpointOrder(),
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
})

export default BCol
