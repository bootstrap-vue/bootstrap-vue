import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import memoize from '../../utils/memoize'
import suffixPropName from '../../utils/suffix-prop-name'
import { arrayIncludes } from '../../utils/array'
import { isUndefined, isNull } from '../../utils/inspect'
import { keys, assign, create } from '../../utils/object'
import { getBreakpointsUp } from '../../utils/config'

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

// Generate a class name based on type, breakpoint name and value
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

// Async Component:
//   So that we can generate breakpoint specific
//   props once the config has been updated.
export default new Promise(resolve => {
  // Get breakpoints for generating props (cached on first call)
  const breakpoints = getBreakpointsUp().filter(Boolean)

  // Supports classes like: .col-sm, .col-md-6, .col-lg-auto
  const breakpointCol = breakpoints.reduce((propMap, breakpoint) => {
    if (breakpoint) {
      // We filter out the '' breakpoint (xs), as making a prop name ''
      // would not work. The `cols` prop is used for `xs`
      propMap[breakpoint] = boolStrNum()
    }
    return propMap
  }, create(null))

  // Supports classes like: .order-md-1, .order-lg-12
  const breakpointOrder = breakpoints.reduce((propMap, breakpoint) => {
    propMap[suffixPropName(breakpoint, 'order')] = strNum()
    return propMap
  }, create(null))

  // Supports classes like: .offset-md-1, .offset-lg-12
  cont breakpointOffset = breakpoints.reduce((propMap, breakpoint) => {
    propMap[suffixPropName(breakpoint, 'offset')] = strNum()
    return propMap
  }, create(null))

  // For loop doesn't need to check hasOwnProperty
  // when using an object created from `null`
  const breakpointPropMap = assign(create(null), {
    col: keys(breakpointCol),
    offset: keys(breakpointOffset),
    order: keys(breakpointOrder)
  })

  // @vue/component
  const BCol = {
    name: 'BCol',
    fuctional: true,
    props: {
      // Generic flexbox .col (xs)
      col: {
        type: Boolean,
        default: false
      },
      // Breakpoint Specific props
      // .col-[1-12]|auto (xs)
      cols: strNum(),
      // .col-[sm[xl]-[1-12]|auto
      ...breakpointCol,
      // .offet-[1-12] (xs)
      offset: strNum(),
      // .offset-[sm-xl]-[1-12]
      ...breakpointOffset,
      // .order-[1-12] (xs)
      order: strNum(),
      // .order-[sm-xl]-[1-12]
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
    },
    render(h, { props, data, children }) {
      const classList = []
      const propsMap = breakpointPropMap
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

  // Return a resolved promise
  return Promise.resolve(Vue.extend(BCol))
})
