import cloneDeep from '../../../utils/clone-deep'
import identity from '../../../utils/identity'
import looseEqual from '../../../utils/loose-equal'
import { concat } from '../../../utils/array'
import { toBoolean } from '../../../utils/boolean'
import { isFunction, isRegExp, isString } from '../../../utils/inspect'
import { toInteger } from '../../../utils/number'
import { escapeRegExp, trim } from '../../../utils/string'
import { warn } from '../../../utils/warn'
import stringifyRecordValues from './stringify-record-values'

const DEBOUNCE_DEPRECATED_MSG =
  'Prop "filter-debounce" is deprecated. Use the debounce feature of "<b-form-input>" instead.'

const RX_SPACES = /[\s\uFEFF\xA0]+/g

export default {
  props: {
    filter: {
      type: [String, RegExp, Object, Array],
      default: null
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
    },
    filterDebounce: {
      type: [Number, String],
      deprecated: DEBOUNCE_DEPRECATED_MSG,
      default: 0,
      validator: val => /^\d+/.test(String(val))
    }
  },
  data() {
    return {
      // Flag for displaying which empty slot to show and `filtered` event triggering
      isFiltered: false,
      // Flag to trigger the filter check on mount
      isMountedFiltering: false,
      // Where we store the copy of the filter criteria
      // after sanitization and debouncing
      localFilter: isFunction(this.items) ? this.filterSanitize(this.filter) : ''
    }
  },
  computed: {
    computedFilterIgnored() {
      return this.filterIgnoredFields ? concat(this.filterIgnoredFields).filter(identity) : null
    },
    computedFilterIncluded() {
      return this.filterIncludedFields ? concat(this.filterIncludedFields).filter(identity) : null
    },
    computedFilterDebounce() {
      const ms = toInteger(this.filterDebounce) || 0
      /* istanbul ignore next */
      if (ms > 0) {
        warn(DEBOUNCE_DEPRECATED_MSG, 'BTable')
      }
      return ms
    },
    localFiltering() {
      return this.hasProvider ? toBoolean(this.noProviderFiltering) : true
    },
    // Sanitized/normalize filter-function prop
    localFilterFn() {
      // Return `null` to signal to use internal filter function
      return isFunction(this.filterFunction) ? this.filterFunction : null
    },
    // Returns the filter function to be used when filtering the items
    // A new function is returned whenever the criteria is changed
    computedFilterFn() {
      const criteria = this.localFilter
      const localFilterFn = this.localFilterFn
      // Grab some values ahead of time (to trigger reactive changes)
      const filterIgnored = this.computedFilterIgnored
      const filterIncluded = this.computedFilterIncluded
      const fieldsObj = this.computedFieldsObj
      // Resolve the filtering function, when requested. We prefer the provided
      // filtering function and fallback to the internal one. When no filtering
      // criteria is specified the filtering factories will return `null`. We
      // return `false` if not local filtering
      return this.localFiltering
        ? localFilterFn
          ? this.filterFnFactory(localFilterFn, criteria)
          : this.defaultFilterFnFactory(criteria, filterIgnored, filterIncluded, fieldsObj)
        : false
    },
    // Returns the records in `localItems` that match the filter criteria
    // Returns the original `localItems` array if not sorting
    filteredItems() {
      const items = this.localItems || []

      // Resolve the filtering function, when requested. Will be
      // be `null` if no criteria and not using local filtering,
      // will we `false` is not using local filtering (i.e. provider filtering)
      const filterFn = this.computedFilterFn

      // We only do local filtering when requested and there are records to filter.
      // If not local filtering, we return the original local items array
      // NOTE:
      //   For some reason, Vue is not chaching this result when neither items or filterFn
      //   changes. It is always returning a new array reference (when filtered), which
      //   is causing filtered events to be emitted when pagination occurs
      return filterFn ? items.filter(filterFn) : items
    }
  },
  watch: {
    // Watch for debounce being set to 0
    computedFilterDebounce(newVal, oldVal) {
      if (newVal !== oldVal && !newVal && this.$_filterTimer) {
        clearTimeout(this.$_filterTimer)
        this.$_filterTimer = null
        const criteria = this.filterSanitize(this.filter)
        if (this.localFilter !== criteria) {
          this.localFilter = criteria
        }
      }
    },
    // Watch for changes to the filter criteria, and debounce if necessary
    filter: {
      // We need a deep watcher in case the user passes
      // an object when using `filter-function`
      deep: true,
      handler(newCriteria, oldCriteria) {
        newCriteria = this.filterSanitize(newCriteria)
        // We can't compare newCriteria and oldCriteria, as they
        // could point to the same object reference. But `localFilter`
        // will be a deep clone if the filter is an object.
        if (!looseEqual(newCriteria, this.localFilter)) {
          const timeout = this.computedFilterDebounce
          clearTimeout(this.$_filterTimer)
          this.$_filterTimer = null
          if (timeout && timeout > 0) {
            // If we have a debounce time, delay the update of `localFilter`
            this.$_filterTimer = setTimeout(() => {
              this.localFilter = newCriteria
            }, timeout)
          } else {
            // Otherwise, immediately update `localFilter` with `newFilter` value
            this.localFilter = newCriteria
          }
        }
      }
    },
    // Watch for changes to the filter criteria and filtered items
    // Set visual state and emit events as required
    filteredItems: {
      immediate: true,
      handler(newFilteredItems, oldFilteredItems = this.localItems) {
        // Determine if the dataset is filtered or not
        // This may not be the greatest appproach, but we can't compare previous
        // filtered items to current, because it is possible the user has changed
        // one of the field's values (i.e. _showdetails, etc)  which would trigger a
        // false filtered event. We also have to handle when server filtering is
        // employed, in which case `localItems` is always equal to `filteredItems`
        if (newFilteredItems === oldFilteredItems) {
          // Same array ref, so definitely no filtering has occured.
          // The filtered items array will only change if localItems has
          // changed or filter criteria has changed (anything that triggers
          // localItems filteredItems computed prop to change)
          return
        }
        // Filter function will be `false` if not local filtering
        // and will be `null` when no criteria with localFiltering
        const filterFn = this.computedFilterFn
        const criteria = this.localFilter
        let isFiltered = false
        if (filterFn === false) {
          // Not performing local filtering
          // Check to see if the criteria is truthy
          // We consider an empty array/object as falsey
          isFiltered = criteria && !(looseEqual(criteria, []) || looseEqual(criteria, {}))
        } else {
          // Local filtering is occuring
          // Check to see if computedFilterFn is truthy
          isFiltered = filterFn
        }
        isFiltered = toBoolean(isFiltered)
        this.isFiltered = isFiltered
        this.$emit('filtered', newFilteredItems, newFilteredItems.length, isFiltered)
      }
    }
  },
  created() {
    // Create non-reactive prop where we store the debounce timer id
    this.$_filterTimer = null
    // If filter is "pre-set", set the criteria
    // This will trigger any watchers/dependents
    // this.localFilter = this.filterSanitize(this.filter)
    // Set the initial filtered state in a `$nextTick()` so that
    // we show the `empty-filtered` slot instead of the `empty` slot
    this.$nextTick(() => {
      const localFilter = this.filterSanitize(this.filter)
      this.localFilter = localFilter
      this.isFiltered = toBoolean(
        localFilter && !(looseEqual(localFilter, []) || looseEqual(localFilter, {}))
      )
      // Trigger a `filtered` event if needed
      this.isMountedFiltering = true
    })
  },
  beforeDestroy() /* istanbul ignore next */ {
    clearTimeout(this.$_filterTimer)
    this.$_filterTimer = null
  },
  methods: {
    filterSanitize(criteria) {
      // Sanitizes filter criteria based on internal or external filtering
      if (this.localFiltering && !this.localFilterFn) {
        if (!(isString(criteria) || isRegExp(criteria))) {
          // If using internal filter function, which only accepts string or RegExp,
          // return '' to signify no filter
          return ''
        }
      }
      if (isString(criteria) && trim(criteria) === '') {
        // Ignore criteria that is just whitespace
        return ''
      }

      // Could be a string, object or array, as needed by external filter function
      // We use `cloneDeep` to ensure we have a new copy of an object or array
      // without Vue's reactive observers
      return cloneDeep(criteria)
    },
    // Filter Function factories
    filterFnFactory(filterFn, criteria) {
      // Wrapper factory for external filter functions
      // Wrap the provided filter-function and return a new function
      // Returns `null` if no filter-function defined or if criteria is falsey
      // Rather than directly grabbing `this.computedLocalFilterFn` or `this.filterFunction`
      // we have it passed, so that the caller computed prop will be reactive to changes
      // in the original filter-function (as this routine is a method)
      if (!isFunction(filterFn) || !criteria || looseEqual(criteria, []) || looseEqual(criteria, {})) {
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
    defaultFilterFnFactory(criteria, filterIgnored, filterIncluded, fieldsObj) {
      // Generates the default filter function, using the given filter criteria
      // Returns `null` if no criteria or criteria format not supported

      // Built in filter can only support strings or RegExp criteria (at the moment)
      if (!criteria || !(isString(criteria) || isRegExp(criteria))) {
        return null
      }

      // Build the RegExp needed for filtering. We do this outside of
      // the returned function for performance reasons
      let regExp = criteria
      if (isString(regExp)) {
        // Escape special RegExp characters in the string and convert contiguous
        // whitespace to \s+ matches
        const pattern = escapeRegExp(criteria).replace(RX_SPACES, '\\s+')
        // Build the RegExp (no need for global flag, as we only need
        // to find the value once in the string)
        regExp = new RegExp(`.*${pattern}.*`, 'i')
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
        // TODO: Enable searching on scoped slots (optional, as it will be SLOW)
        //
        // Generated function returns true if the criteria matches part of
        // the serialized data, otherwise false
        //
        // We set `lastIndex = 0` on the `RegExp` in case someone specifies the `/g` global flag
        regExp.lastIndex = 0
        return regExp.test(stringifyRecordValues(item, filterIgnored, filterIncluded, fieldsObj))
      }

      // Return the generated function
      return fn
    }
  }
}
