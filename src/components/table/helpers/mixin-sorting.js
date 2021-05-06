import { Vue } from '../../../vue'
import {
  EVENT_NAME_HEAD_CLICKED,
  EVENT_NAME_SORT_CHANGED,
  MODEL_EVENT_NAME_PREFIX
} from '../../../constants/events'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_FUNCTION,
  PROP_TYPE_OBJECT,
  PROP_TYPE_STRING
} from '../../../constants/props'
import { arrayIncludes } from '../../../utils/array'
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect'
import { makeProp } from '../../../utils/props'
import { stableSort } from '../../../utils/stable-sort'
import { trim } from '../../../utils/string'
import { defaultSortCompare } from './default-sort-compare'

// --- Constants ---

const MODEL_PROP_NAME_SORT_BY = 'sortBy'
const MODEL_EVENT_NAME_SORT_BY = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_SORT_BY

const MODEL_PROP_NAME_SORT_DESC = 'sortDesc'
const MODEL_EVENT_NAME_SORT_DESC = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_SORT_DESC

const SORT_DIRECTION_ASC = 'asc'
const SORT_DIRECTION_DESC = 'desc'
const SORT_DIRECTION_LAST = 'last'
const SORT_DIRECTIONS = [SORT_DIRECTION_ASC, SORT_DIRECTION_DESC, SORT_DIRECTION_LAST]

// --- Props ---

export const props = {
  labelSortAsc: makeProp(PROP_TYPE_STRING, 'Click to sort ascending'),
  labelSortClear: makeProp(PROP_TYPE_STRING, 'Click to clear sorting'),
  labelSortDesc: makeProp(PROP_TYPE_STRING, 'Click to sort descending'),
  noFooterSorting: makeProp(PROP_TYPE_BOOLEAN, false),
  noLocalSorting: makeProp(PROP_TYPE_BOOLEAN, false),
  // Another prop that should have had a better name
  // It should be `noSortClear` (on non-sortable headers)
  // We will need to make sure the documentation is clear on what
  // this prop does (as well as in the code for future reference)
  noSortReset: makeProp(PROP_TYPE_BOOLEAN, false),
  [MODEL_PROP_NAME_SORT_BY]: makeProp(PROP_TYPE_STRING),
  sortCompare: makeProp(PROP_TYPE_FUNCTION),
  // String: locale code
  // Array: array of Locale strings
  sortCompareLocale: makeProp(PROP_TYPE_ARRAY_STRING),
  // Supported localCompare options, see `options` section of:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  sortCompareOptions: makeProp(PROP_TYPE_OBJECT, { numeric: true }),
  // TODO: Make this tri-state: `true`, `false`, `null`
  [MODEL_PROP_NAME_SORT_DESC]: makeProp(PROP_TYPE_BOOLEAN, false),
  // This prop is named incorrectly
  // It should be `initialSortDirection` as it is a bit misleading
  // (not to mention it screws up the ARIA label on the headers)
  sortDirection: makeProp(PROP_TYPE_STRING, SORT_DIRECTION_ASC, value => {
    return arrayIncludes(SORT_DIRECTIONS, value)
  }),
  // Place the sorting icon on the left of the header cells
  sortIconLeft: makeProp(PROP_TYPE_BOOLEAN, false),
  // Sort null and undefined to appear last
  sortNullLast: makeProp(PROP_TYPE_BOOLEAN, false)
}

// --- Mixin ---

// @vue/component
export const sortingMixin = Vue.extend({
  props,
  data() {
    return {
      localSortBy: this[MODEL_PROP_NAME_SORT_BY] || '',
      localSortDesc: this[MODEL_PROP_NAME_SORT_DESC] || false
    }
  },
  computed: {
    localSorting() {
      return this.hasProvider ? !!this.noProviderSorting : !this.noLocalSorting
    },
    isSortable() {
      return this.computedFields.some(f => f.sortable)
    },
    // Sorts the filtered items and returns a new array of the sorted items
    // When not sorted, the original items array will be returned
    sortedItems() {
      const {
        localSortBy: sortBy,
        localSortDesc: sortDesc,
        sortCompareLocale: locale,
        sortNullLast: nullLast,
        sortCompare,
        localSorting
      } = this
      const items = (this.filteredItems || this.localItems || []).slice()
      const localeOptions = { ...this.sortCompareOptions, usage: 'sort' }

      if (sortBy && localSorting) {
        const field = this.computedFieldsObj[sortBy] || {}
        const sortByFormatted = field.sortByFormatted
        const formatter = isFunction(sortByFormatted)
          ? /* istanbul ignore next */ sortByFormatted
          : sortByFormatted
            ? this.getFieldFormatter(sortBy)
            : undefined

        // `stableSort` returns a new array, and leaves the original array intact
        return stableSort(items, (a, b) => {
          let result = null
          // Call user provided `sortCompare` routine first
          if (isFunction(sortCompare)) {
            // TODO:
            //   Change the `sortCompare` signature to the one of `defaultSortCompare`
            //   with the next major version bump
            result = sortCompare(a, b, sortBy, sortDesc, formatter, localeOptions, locale)
          }
          // Fallback to built-in `defaultSortCompare` if `sortCompare`
          // is not defined or returns `null`/`false`
          if (isUndefinedOrNull(result) || result === false) {
            result = defaultSortCompare(a, b, {
              sortBy,
              formatter,
              locale,
              localeOptions,
              nullLast
            })
          }
          // Negate result if sorting in descending order
          return (result || 0) * (sortDesc ? -1 : 1)
        })
      }

      return items
    }
  },
  watch: {
    /* istanbul ignore next: pain in the butt to test */
    isSortable(newValue) {
      if (newValue) {
        if (this.isSortable) {
          this.$on(EVENT_NAME_HEAD_CLICKED, this.handleSort)
        }
      } else {
        this.$off(EVENT_NAME_HEAD_CLICKED, this.handleSort)
      }
    },
    [MODEL_PROP_NAME_SORT_DESC](newValue) {
      /* istanbul ignore next */
      if (newValue === this.localSortDesc) {
        return
      }
      this.localSortDesc = newValue || false
    },
    [MODEL_PROP_NAME_SORT_BY](newValue) {
      /* istanbul ignore next */
      if (newValue === this.localSortBy) {
        return
      }
      this.localSortBy = newValue || ''
    },
    // Update .sync props
    localSortDesc(newValue, oldValue) {
      // Emit update to sort-desc.sync
      if (newValue !== oldValue) {
        this.$emit(MODEL_EVENT_NAME_SORT_DESC, newValue)
      }
    },
    localSortBy(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit(MODEL_EVENT_NAME_SORT_BY, newValue)
      }
    }
  },
  created() {
    if (this.isSortable) {
      this.$on(EVENT_NAME_HEAD_CLICKED, this.handleSort)
    }
  },
  methods: {
    // Handlers
    // Need to move from thead-mixin
    handleSort(key, field, event, isFoot) {
      if (!this.isSortable) {
        /* istanbul ignore next */
        return
      }
      if (isFoot && this.noFooterSorting) {
        return
      }
      // TODO: make this tri-state sorting
      // cycle desc => asc => none => desc => ...
      let sortChanged = false
      const toggleLocalSortDesc = () => {
        const sortDirection = field.sortDirection || this.sortDirection
        if (sortDirection === SORT_DIRECTION_ASC) {
          this.localSortDesc = false
        } else if (sortDirection === SORT_DIRECTION_DESC) {
          this.localSortDesc = true
        } else {
          // sortDirection === 'last'
          // Leave at last sort direction from previous column
        }
      }
      if (field.sortable) {
        const sortKey = !this.localSorting && field.sortKey ? field.sortKey : key
        if (this.localSortBy === sortKey) {
          // Change sorting direction on current column
          this.localSortDesc = !this.localSortDesc
        } else {
          // Start sorting this column ascending
          this.localSortBy = sortKey
          // this.localSortDesc = false
          toggleLocalSortDesc()
        }
        sortChanged = true
      } else if (this.localSortBy && !this.noSortReset) {
        this.localSortBy = ''
        toggleLocalSortDesc()
        sortChanged = true
      }
      if (sortChanged) {
        // Sorting parameters changed
        this.$emit(EVENT_NAME_SORT_CHANGED, this.context)
      }
    },
    // methods to compute classes and attrs for thead>th cells
    sortTheadThClasses(key, field, isFoot) {
      return {
        // If sortable and sortIconLeft are true, then place sort icon on the left
        'b-table-sort-icon-left':
          field.sortable && this.sortIconLeft && !(isFoot && this.noFooterSorting)
      }
    },
    sortTheadThAttrs(key, field, isFoot) {
      const { isSortable, noFooterSorting, localSortDesc, localSortBy, localSorting } = this
      if (!isSortable || (isFoot && noFooterSorting)) {
        // No attributes if not a sortable table
        return {}
      }

      const sortable = field.sortable
      const sortKey = !localSorting ? field.sortKey ?? key : key

      // Assemble the aria-sort attribute value
      const ariaSort =
        sortable && localSortBy === sortKey
          ? localSortDesc
            ? 'descending'
            : 'ascending'
          : sortable
            ? 'none'
            : null
      // Return the attribute
      return {
        'aria-sort': ariaSort
      }
    },
    // A label to be placed in an `.sr-only` element in the header cell
    sortTheadThLabel(key, field, isFoot) {
      // No label if not a sortable table
      if (!this.isSortable || (isFoot && this.noFooterSorting)) {
        return null
      }
      const { localSortBy, localSortDesc, labelSortAsc, labelSortDesc } = this
      const { sortable } = field
      // The correctness of these labels is very important for screen reader users
      let labelSorting = ''
      if (sortable) {
        if (localSortBy === key) {
          // Currently sorted sortable column
          labelSorting = localSortDesc ? labelSortAsc : labelSortDesc
        } else {
          // Not currently sorted sortable column
          // Not using nested ternary's here for clarity/readability
          // Default for `aria-label`
          labelSorting = localSortDesc ? labelSortDesc : labelSortAsc
          // Handle `sortDirection` setting
          const sortDirection = this.sortDirection || field.sortDirection
          if (sortDirection === SORT_DIRECTION_ASC) {
            labelSorting = labelSortAsc
          } else if (sortDirection === SORT_DIRECTION_DESC) {
            labelSorting = labelSortDesc
          }
        }
      } else if (!this.noSortReset) {
        // Non sortable column
        labelSorting = localSortBy ? this.labelSortClear : ''
      }
      // Return the `.sr-only` sort label or `null` if no label
      return trim(labelSorting) || null
    }
  }
})
