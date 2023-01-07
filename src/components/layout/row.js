import { mergeData } from '../../vue'
import { NAME_ROW } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { arrayIncludes, concat } from '../../utils/array'
import { getBreakpointsUpCached } from '../../utils/config'
import { identity } from '../../utils/identity'
import { memoize } from '../../utils/memoize'
import { create, keys, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, suffixPropName } from '../../utils/props'
import { lowerCase, toString, trim } from '../../utils/string'

// --- Constants ---

const COMMON_ALIGNMENT = ['start', 'end', 'center']

// --- Helper methods ---

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

// --- Props ---

// Prop generator for lazy generation of props
export const generateProps = () => {
  // i.e. 'row-cols-2', 'row-cols-md-4', 'row-cols-xl-6', ...
  const rowColsProps = getBreakpointsUpCached().reduce((props, breakpoint) => {
    props[suffixPropName(breakpoint, 'cols')] = makeProp(PROP_TYPE_NUMBER_STRING)
    return props
  }, create(null))

  // Cache the row-cols prop names
  rowColsPropList = keys(rowColsProps)

  // Return the generated props
  return makePropsConfigurable(
    sortKeys({
      ...rowColsProps,
      alignContent: makeProp(PROP_TYPE_STRING, null, value => {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around', 'stretch'), value)
      }),
      alignH: makeProp(PROP_TYPE_STRING, null, value => {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around'), value)
      }),
      alignV: makeProp(PROP_TYPE_STRING, null, value => {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'baseline', 'stretch'), value)
      }),
      noGutters: makeProp(PROP_TYPE_BOOLEAN, false),
      tag: makeProp(PROP_TYPE_STRING, 'div')
    }),
    NAME_ROW
  )
}

// --- Main component ---

// We do not use `extend()` here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component
export const BRow = {
  name: NAME_ROW,
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
    const { alignV, alignH, alignContent } = props

    // Loop through row-cols breakpoint props and generate the classes
    const classList = []
    rowColsPropList.forEach(prop => {
      const c = computeRowColsClass(computeRowColsBreakpoint(prop), props[prop])
      // If a class is returned, push it onto the array
      if (c) {
        classList.push(c)
      }
    })

    classList.push({
      'no-gutters': props.noGutters,
      [`align-items-${alignV}`]: alignV,
      [`justify-content-${alignH}`]: alignH,
      [`align-content-${alignContent}`]: alignContent
    })

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'row',
        class: classList
      }),
      children
    )
  }
}
