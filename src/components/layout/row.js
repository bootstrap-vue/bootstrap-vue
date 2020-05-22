import { mergeData } from 'vue-functional-data-merge'
import identity from '../../utils/identity'
import memoize from '../../utils/memoize'
import { arrayIncludes, concat } from '../../utils/array'
import { getBreakpointsUpCached } from '../../utils/config'
import { create, keys } from '../../utils/object'
import { suffixPropName } from '../../utils/props'
import { lowerCase, toString, trim } from '../../utils/string'

const COMMON_ALIGNMENT = ['start', 'end', 'center']

// Generates a prop object with a type of `[String, Number]`
const strNum = () => ({
  type: [String, Number],
  default: null
})

// Compute a `row-cols-{breakpoint}-{cols}` class name
// Memoized function for better performance on generating class names
const computeRowColsClass = memoize((breakpoint, cols) => {
  cols = trim(toString(cols))
  return cols ? lowerCase(['row-cols', breakpoint, cols].filter(identity).join('-')) : null
})

// Get the breakpoint name from the `rowCols` prop name
// Memoized function for better performance on extracting breakpoint names
const computeRowColsBreakpoint = memoize(prop => lowerCase(prop.replace('cols', '')))

// Cached copy of the `row-cols` breakpoint prop names
// Will be populated when the props are generated
let rowColsPropList = []

// Lazy evaled props factory for <b-row> (called only once,
// the first time the component is used)
const generateProps = () => {
  // Grab the breakpoints from the cached config (including the '' (xs) breakpoint)
  const breakpoints = getBreakpointsUpCached()

  // Supports classes like: `row-cols-2`, `row-cols-md-4`, `row-cols-xl-6`
  const rowColsProps = breakpoints.reduce((props, breakpoint) => {
    props[suffixPropName(breakpoint, 'cols')] = strNum()
    return props
  }, create(null))

  // Cache the row-cols prop names
  rowColsPropList = keys(rowColsProps)

  // Return the generated props
  return {
    tag: {
      type: String,
      default: 'div'
    },
    noGutters: {
      type: Boolean,
      default: false
    },
    alignV: {
      type: String,
      default: null,
      validator: str => arrayIncludes(concat(COMMON_ALIGNMENT, 'baseline', 'stretch'), str)
    },
    alignH: {
      type: String,
      default: null,
      validator: str => arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around'), str)
    },
    alignContent: {
      type: String,
      default: null,
      validator: str => arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around', 'stretch'), str)
    },
    ...rowColsProps
  }
}

// We do not use `Vue.extend()` here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component
export const BRow = {
  name: 'BRow',
  functional: true,
  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props
    this.props = generateProps()
    return this.props
  },
  render(h, { props, data, children }) {
    const classList = []
    // Loop through row-cols breakpoint props and generate the classes
    rowColsPropList.forEach(prop => {
      const c = computeRowColsClass(computeRowColsBreakpoint(prop), props[prop])
      // If a class is returned, push it onto the array
      if (c) {
        classList.push(c)
      }
    })
    classList.push({
      'no-gutters': props.noGutters,
      [`align-items-${props.alignV}`]: props.alignV,
      [`justify-content-${props.alignH}`]: props.alignH,
      [`align-content-${props.alignContent}`]: props.alignContent
    })
    return h(props.tag, mergeData(data, { staticClass: 'row', class: classList }), children)
  }
}
