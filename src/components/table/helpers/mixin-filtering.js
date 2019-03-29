import stringifyRecordValues from './stringify-record-values'
import looseEqual from '../../../utils/loose-equal'
import warn from '../../../utils/warn'

const DEPRECATION_MSG =
  'Supplying a function to prop "filter" is deprecated. Use "filter-function" instead.'

export default {
  props: {
    filter: {
      // Pasing a function to filter is deprecated and should be avoided
      type: [String, RegExp, Object, Array, Function],
      default: null,
      // depreaction: refers to a change in prop's usage
      // deprecated: means don't use prop any more
      deprecation: DEPRECATION_MSG
    },
    filterFunction: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      // Flag for displaying which empty slot to show, and for some event triggering.
      isFiltered: false
    }
  },
  computed: {
    localFiltering() {
      return this.hasProvider ? !!this.noProviderFiltering : true
    },
    filteredCheck() {
      // For watching changes to filteredItems vs localItems
      return {
        filteredItems: this.filteredItems,
        localItems: this.localItems,
        localFilter: this.localFilter
      }
    },
    localFilter() {
      // Returns a sanitized/normalized version of filter prop
      if (typeof this.filter === 'function') {
        // this.localFilterFn will contain the correct function ref.
        // Deprecate setting prop filter to a function
        /* istanbul ignore next */
        return ''
      } else if (
        typeof this.filterFunction !== 'function' &&
        !(typeof this.filter === 'string' || this.filter instanceof RegExp)
      ) {
        // Using internal filter function, which only accepts string or regexp at the moment
        return ''
      } else {
        // Could be a string, object or array, as needed by external filter function
        return this.filter
      }
    },
    localFilterFn() {
      let filter = this.filter
      let filterFn = this.filterFunction
      // Sanitized/normalize filter-function prop
      if (typeof filterFn === 'function') {
        return filterFn
      } else if (typeof filter === 'function') {
        // Deprecate setting prop filter to a function
        /* istanbul ignore next */
        warn(`b-table: ${DEPRECATION_MSG}`)
        /* istanbul ignore next */
        return filter
      } else {
        // no filterFunction, so signal to use internal filter function
        return null
      }
    },
    filteredItems() {
      // Returns the records in localItems that match the filter criteria.
      // Returns the original localItems array if not sorting
      let items = this.localItems || []
      const criteria = this.localFilter
      const filterFn =
        this.filterFnFactory(this.localFilterFn, criteria) || this.defaultFilterFnFactory(criteria)

      // We only do local filtering if requested, and if the are records to filter and
      // if a filter criteria was specified
      if (this.localFiltering && filterFn && items.length > 0) {
        items = items.filter(filterFn)
      }
      return items
    }
  },
  watch: {
    // Watch for changes to the filter criteria and filtered items vs localItems).
    // And set visual state and emit events as required
    filteredCheck({ filteredItems, localItems, localFilter }) {
      // Determine if the dataset is filtered or not
      let isFiltered
      if (!localFilter) {
        // If filter criteria is falsey
        isFiltered = false
      } else if (looseEqual(localFilter, []) || looseEqual(localFilter, {})) {
        // If filter criteria is an empty array or object
        isFiltered = false
      } else if (localFilter) {
        // if Filter criteria is truthy
        isFiltered = true
      } else {
        /* istanbul ignore next: rare chance of reaching this else */
        isFiltered = false
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
      // Wrapper factory for external filter functions.
      // Wrap the provided filter-function and return a new function.
      // Returns null if no filter-function defined or if criteria is falsey.
      // Rather than directly grabbing this.computedLocalFilterFn or this.filterFunction
      // we have it passed, so that the caller computed prop will be reactive to changes
      // in the original filter-function (as this routine is a method)
      if (
        !filterFn ||
        typeof filterFn !== 'function' ||
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
      if (!criteria || !(typeof criteria === 'string' || criteria instanceof RegExp)) {
        // Built in filter can only support strings or RegExp criteria (at the moment)
        return null
      }

      // Build the regexp needed for filtering
      let regexp = criteria
      if (typeof regexp === 'string') {
        // Escape special RegExp characters in the string and convert contiguous
        // whitespace to \s+ matches
        const pattern = criteria
          .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          .replace(/[\s\uFEFF\xA0]+/g, '\\s+')
        // Build the RegExp (no need for global flag, as we only need
        // to find the value once in the string)
        regexp = new RegExp(`.*${pattern}.*`, 'i')
      }

      // Generate the wrapped filter test function to use
      const fn = item => {
        // This searches all row values (and sub property values) in the entire (excluding
        // special _ prefixed keys), because we convert the record to a space-separated
        // string containing all the value properties (recursively), even ones that are
        // not visible (not specified in this.fields).
        //
        // TODO: Enable searching on formatted fields and scoped slots
        // TODO: Should we filter only on visible fields (i.e. ones in this.fields) by default?
        // TODO: Allow for searching on specific fields/key, this could be combined with the previous TODO
        // TODO: Give stringifyRecordValues extra options for filtering (i.e. passing the
        //       fields definition and a reference to $scopedSlots)
        //
        // Generated function returns true if the criteria matches part of
        // the serialized data, otherwise false
        // We set lastIndex = 0 on regex in case someone uses the /g global flag
        regexp.lastIndex = 0
        return regexp.test(stringifyRecordValues(item))
      }

      // Return the generated function
      return fn
    }
  }
}
