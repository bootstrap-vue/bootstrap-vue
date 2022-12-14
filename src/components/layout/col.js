import { mergeData } from '../../vue'
import { NAME_COL } from '../../constants/components'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_NUMBER_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { RX_COL_CLASS } from '../../constants/regex'
import { arrayIncludes } from '../../utils/array'
import { getBreakpointsUpCached } from '../../utils/config'
import { identity } from '../../utils/identity'
import { isUndefinedOrNull } from '../../utils/inspect'
import { memoize } from '../../utils/memoize'
import { assign, create, keys, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, suffixPropName } from '../../utils/props'
import { lowerCase } from '../../utils/string'

// --- Constants ---

const ALIGN_SELF_VALUES = ['auto', 'start', 'end', 'center', 'baseline', 'stretch']

// --- Helper methods ---

// Compute a breakpoint class name
const computeBreakpoint = (type, breakpoint, value) => {
  let className = type
  if (isUndefinedOrNull(value) || value === false) {
    return undefined
  }
  if (breakpoint) {
    className += `-${breakpoint}`
  }
  // Handling the boolean style prop when accepting `[Boolean, String, Number]`
  // means Vue will not convert `<b-col sm></b-col>` to `sm: true` for us
  // Since the default is `false`, '' indicates the prop's presence
  if (type === 'col' && (value === '' || value === true)) {
    // .col-md
    return lowerCase(className)
  }
  // .order-md-6
  className += `-${value}`
  return lowerCase(className)
}

// Memoized function for better performance on generating class names
const computeBreakpointClass = memoize(computeBreakpoint)

// Cached copy of the breakpoint prop names
let breakpointPropMap = create(null)

// --- Props ---

// Prop generator for lazy generation of props
export const generateProps = () => {
  // Grab the breakpoints from the cached config (exclude the '' (xs) breakpoint)
  const breakpoints = getBreakpointsUpCached().filter(identity)

  // i.e. 'col-sm', 'col-md-6', 'col-lg-auto', ...
  const breakpointCol = breakpoints.reduce((props, breakpoint) => {
    props[breakpoint] = makeProp(PROP_TYPE_BOOLEAN_NUMBER_STRING)
    return props
  }, create(null))

  // i.e. 'offset-md-1', 'offset-lg-12', ...
  const breakpointOffset = breakpoints.reduce((props, breakpoint) => {
    props[suffixPropName(breakpoint, 'offset')] = makeProp(PROP_TYPE_NUMBER_STRING)
    return props
  }, create(null))

  // i.e. 'order-md-1', 'order-lg-12', ...
  const breakpointOrder = breakpoints.reduce((props, breakpoint) => {
    props[suffixPropName(breakpoint, 'order')] = makeProp(PROP_TYPE_NUMBER_STRING)
    return props
  }, create(null))

  // For loop doesn't need to check `.hasOwnProperty()`
  // when using an object created from `null`
  breakpointPropMap = assign(create(null), {
    col: keys(breakpointCol),
    offset: keys(breakpointOffset),
    order: keys(breakpointOrder)
  })

  // Return the generated props
  return makePropsConfigurable(
    sortKeys({
      ...breakpointCol,
      ...breakpointOffset,
      ...breakpointOrder,
      // Flex alignment
      alignSelf: makeProp(PROP_TYPE_STRING, null, value => {
        return arrayIncludes(ALIGN_SELF_VALUES, value)
      }),
      // Generic flexbox 'col' (xs)
      col: makeProp(PROP_TYPE_BOOLEAN, false),
      // i.e. 'col-1', 'col-2', 'col-auto', ...
      cols: makeProp(PROP_TYPE_NUMBER_STRING),
      offset: makeProp(PROP_TYPE_NUMBER_STRING),
      order: makeProp(PROP_TYPE_NUMBER_STRING),
      tag: makeProp(PROP_TYPE_STRING, 'div')
    }),
    NAME_COL
  )
}

// --- Main component ---

// We do not use extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component
export const BCol = {
  name: NAME_COL,
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
    const { cols, offset, order, alignSelf } = props

    const classList = []
    // Loop through `col`, `offset`, `order` breakpoint props
    for (const type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      const keys = breakpointPropMap[type]
      for (let i = 0; i < keys.length; i++) {
        // computeBreakpoint(col, colSm => Sm, value=[String, Number, Boolean])
        const c = computeBreakpointClass(type, keys[i].replace(type, ''), props[keys[i]])
        // If a class is returned, push it onto the array.
        if (c) {
          classList.push(c)
        }
      }
    }

    const hasColClasses = classList.some(className => RX_COL_CLASS.test(className))

    classList.push({
      // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
      col: props.col || (!hasColClasses && !cols),
      [`col-${cols}`]: cols,
      [`offset-${offset}`]: offset,
      [`order-${order}`]: order,
      [`align-self-${alignSelf}`]: alignSelf
    })

    return h(props.tag, mergeData(data, { class: classList }), children)
  }
}
