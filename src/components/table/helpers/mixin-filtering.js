import cloneDeep from '../../../utils/clone-deep'
import looseEqual from '../../../utils/loose-equal'
import warn from '../../../utils/warn'
import { concat } from '../../../utils/array'
import { isFunction, isString, isRegExp } from '../../../utils/inspect'
import stringifyRecordValues from './stringify-record-values'

const DEPRECATION_MSG =
  'Supplying a function to prop "filter" is deprecated. Use "filter-function" instead.'

export default {
  props: {
    filter: {
      // Passing a function to filter is deprecated and should be avoided
      type: [String, RegExp, Object, Array, Function],
      default: null,
      // `deprecated` -> Don't use this prop
      // `deprecation` -> Refers to a change in prop usage
      deprecation: DEPRECATION_MSG
    },
    filterFunction: {
      type: Function,
      default: null
    },
    filterIgnoredFields: {
      type: Array
      // default: undefined
    },
    filterIncludedFields: {
      type: Array
      // default: undefined
    }
  },
  data() {
    return {
      // Flag for displaying which empty slot to show and some event triggering
      isFiltered: false
    }
  },
  computed: {
    computedFilterIgnored() {
      return this.filterIgnoredFields ? concat(this.filterIgnoredFields).filter(Boolean) : null
    },
    computedFilterIncluded() {
      return this.filterIncludedFields ? concat(this.filterIncludedFields).filter(Boolean) : null
    },
    localFiltering() {
      return this.hasProvider ? !!this.noProviderFiltering : true
    },
    // For watching changes to `filteredItems` vs `localItems`
    filteredCheck() {
      return {
        filteredItems: this.filteredItems,
        localItems: this.localItems,
        localFilter: this.localFilter
      }
    },
    // Sanitized/normalized version of filter prop
    localFilter() {
      // Deprecate setting prop filter to a function
      // `localFilterFn` will contain the correct function ref
      if (isFunction(this.filter)) {
        /* istanbul ignore next */
        return ''
      }

      // Using internal filter function, which only accepts string or RegExp
      if (
        this.localFiltering &&
        !isFunction(this.filterFunction) &&
        !(isString(this.filter) || isRegExp(this.filter))
      ) {
        return ''
      }

      // Could be a string, object or array, as needed by external filter function
      // We use `cloneDeep` to ensure we have a new copy of an object or array
      // without Vue reactive observers
      return cloneDeep(this.filter)
    },
    // Sanitized/normalize filter-function prop
    localFilterFn() {
      const filterFn = this.filterFunction
      const filter = this.filter

      // Prefer `filterFn` prop
      if (isFunction(filterFn)) {
        return filterFn
      }

      // Deprecate setting `filter` prop to a function
      if (isFunction(filter)) {
        /* istanbul ignore next */
        warn(`b-table: ${DEPRECATION_MSG}`)
        /* istanbul ignore next */
        return filter
      }

      // No `filterFunction`, so signal to use internal filter function
      return null
    },
    // Returns the records in `localItems` that match the filter criteria
    // Returns the original `localItems` array if not sorting
    filteredItems() {
      const items = this.localItems || []

      // Resolve the filtering function, when requested
      // We prefer the provided filtering function and fallback to the internal one
      // When no filtering criteria is specified the filtering factories will return `null`
      let filterFn = null
      if (this.localFiltering) {
        const criteria = this.localFilter
        filterFn =
          this.filterFnFactory(this.localFilterFn, criteria) ||
          this.defaultFilterFnFactory(criteria)
      }

      // We only do local filtering when requested and there are records to filter
      if (filterFn && items.length > 0) {
        return items.filter(filterFn)
      }

      // Otherwise return all items
      return items
    }
  },
  watch: {
    // Watch for changes to the filter criteria and filtered items vs localItems).
    // And set visual state and emit events as required
    filteredCheck({ filteredItems, localItems, localFilter }) {
      // Determine if the dataset is filtered or not
      let isFiltered = false
      if (!localFilter) {
        // If filter criteria is falsey
        isFiltered = false
      } else if (looseEqual(localFilter, []) || looseEqual(localFilter, {})) {
        // If filter criteria is an empty array or object
        isFiltered = false
      } else if (localFilter) {
        // If filter criteria is truthy
        isFiltered = true
      }
      if (isFiltered) {
        this.$emit('filtered', filteredItems, filteredItems.length)
      }
      this.isFiltered = isFiltered
    },
    isFiltered(newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        // We need to emit a filtered event if isFiltered transitions from true to
        // false so that users can update their pagination controls.
        this.$emit('filtered', this.localItems, this.localItems.length)
      }
    }
  },
  created() {
    // Set the initial filtered state.
    // In a nextTick so that we trigger a filtered event if needed
    this.$nextTick(() => {
      this.isFiltered = Boolean(this.localFilter)
    })
  },
  methods: {
    // Filter Function factories
    filterFnFactory(filterFn, criteria) {
      // Wrapper factory for external filter functions
      // Wrap the provided filter-function and return a new function
      // Returns `null` if no filter-function defined or if criteria is falsey
      // Rather than directly grabbing `this.computedLocalFilterFn` or `this.filterFunction`
      // we have it passed, so that the caller computed prop will be reactive to changes
      // in the original filter-function (as this routine is a method)
      if (
        !filterFn ||
        !isFunction(filterFn) ||
        !criteria ||
        looseEqual(criteria, []) ||
        looseEqual(criteria, {})
      ) {
        return null
      }

      // Build the wrapped filter test function, passing the criteria to the provided function
      const fn = item => {
        // Generated function returns true if the criteria matches part
        // of the serialized data, otherwise false
        return filterFn(item, criteria)
      }

      // Return the wrapped function
      return fn
    },
    defaultFilterFnFactory(criteria) {
      // Generates the default filter function, using the given filter criteria
      if (!criteria || !(isString(criteria) || isRegExp(criteria))) {
        // Built in filter can only support strings or RegExp criteria (at the moment)
        return null
      }

      // Build the regexp needed for filtering
      let regexp = criteria
      if (isString(regexp)) {
        // Escape special `RegExp` characters in the string and convert contiguous
        // whitespace to `\s+` matches
        const pattern = criteria
          .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          .replace(/[\s\uFEFF\xA0]+/g, '\\s+')
        // Build the `RegExp` (no need for global flag, as we only need
        // to find the value once in the string)
        regexp = new RegExp(`.*${pattern}.*`, 'i')
      }

      // Generate the wrapped filter test function to use
      const fn = item => {
        // This searches all row values (and sub property values) in the entire (excluding
        // special `_` prefixed keys), because we convert the record to a space-separated
        // string containing all the value properties (recursively), even ones that are
        // not visible (not specified in this.fields)
        // Users can ignore filtering on specific fields, or on only certain fields,
        // and can optionall specify searching results of fields with formatter
        //
        // TODO: Enable searching on scoped slots
        //
        // Generated function returns true if the criteria matches part of
        // the serialized data, otherwise false
        // We set `lastIndex = 0` on the `RegExp` in case someone specifies the `/g` global flag
        regexp.lastIndex = 0
        return regexp.test(
          stringifyRecordValues(
            item,
            this.computedFilterIgnored,
            this.computedFilterIncluded,
            this.computedFieldsObj
          )
        )
      }

      // Return the generated function
      return fn
    }
  }
}
