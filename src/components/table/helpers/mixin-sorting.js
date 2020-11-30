import { NAME_TABLE } from '../../../constants/components'
import stableSort from '../../../utils/stable-sort'
import { arrayIncludes } from '../../../utils/array'
import { makePropsConfigurable } from '../../../utils/config'
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect'
import { trim } from '../../../utils/string'
import defaultSortCompare from './default-sort-compare'

const SORT_DIRECTIONS = ['asc', 'desc', 'last']

export default {
  props: makePropsConfigurable(
    {
      sortBy: {
        type: String,
        default: ''
      },
      sortDesc: {
        // TODO: Make this tri-state: true, false, null
        type: Boolean,
        default: false
      },
      sortDirection: {
        // This prop is named incorrectly
        // It should be `initialSortDirection` as it is a bit misleading
        // (not to mention it screws up the ARIA label on the headers)
        type: String,
        default: 'asc',
        validator(value) {
          return arrayIncludes(SORT_DIRECTIONS, value)
        }
      },
      sortCompare: {
        type: Function
        // default: null
      },
      sortCompareOptions: {
        // Supported localCompare options, see `options` section of:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
        type: Object,
        default: () => ({ numeric: true })
      },
      sortCompareLocale: {
        // String: locale code
        // Array: array of Locale strings
        type: [String, Array]
        // default: undefined
      },
      sortNullLast: {
        // Sort null and undefined to appear last
        type: Boolean,
        default: false
      },
      noSortReset: {
        // Another prop that should have had a better name.
        // It should be noSortClear (on non-sortable headers).
        // We will need to make sure the documentation is clear on what
        // this prop does (as well as in the code for future reference)
        type: Boolean,
        default: false
      },
      labelSortAsc: {
        type: String,
        default: 'Click to sort Ascending'
      },
      labelSortDesc: {
        type: String,
        default: 'Click to sort Descending'
      },
      labelSortClear: {
        type: String,
        default: 'Click to clear sorting'
      },
      noLocalSorting: {
        type: Boolean,
        default: false
      },
      noFooterSorting: {
        type: Boolean,
        default: false
      },
      sortIconLeft: {
        // Place the sorting icon on the left of the header cells
        type: Boolean,
        default: false
      }
    },
    NAME_TABLE
  ),
  data() {
    return {
      localSortBy: this.sortBy || '',
      localSortDesc: this.sortDesc || false
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
    isSortable(newVal) {
      if (newVal) {
        if (this.isSortable) {
          this.$on('head-clicked', this.handleSort)
        }
      } else {
        this.$off('head-clicked', this.handleSort)
      }
    },
    sortDesc(newVal) {
      if (newVal === this.localSortDesc) {
        /* istanbul ignore next */
        return
      }
      this.localSortDesc = newVal || false
    },
    sortBy(newVal) {
      if (newVal === this.localSortBy) {
        /* istanbul ignore next */
        return
      }
      this.localSortBy = newVal || ''
    },
    // Update .sync props
    localSortDesc(newVal, oldVal) {
      // Emit update to sort-desc.sync
      if (newVal !== oldVal) {
        this.$emit('update:sortDesc', newVal)
      }
    },
    localSortBy(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:sortBy', newVal)
      }
    }
  },
  created() {
    if (this.isSortable) {
      this.$on('head-clicked', this.handleSort)
    }
  },
  methods: {
    // Handlers
    // Need to move from thead-mixin
    handleSort(key, field, evt, isFoot) {
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
        if (sortDirection === 'asc') {
          this.localSortDesc = false
        } else if (sortDirection === 'desc') {
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
        this.$emit('sort-changed', this.context)
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
      if (!this.isSortable || (isFoot && this.noFooterSorting)) {
        // No attributes if not a sortable table
        return {}
      }
      const sortable = field.sortable
      // Assemble the aria-sort attribute value
      const ariaSort =
        sortable && this.localSortBy === key
          ? this.localSortDesc
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
    sortTheadThLabel(key, field, isFoot) {
      // A label to be placed in an `.sr-only` element in the header cell
      if (!this.isSortable || (isFoot && this.noFooterSorting)) {
        // No label if not a sortable table
        return null
      }
      const sortable = field.sortable
      // The correctness of these labels is very important for screen-reader users.
      let labelSorting = ''
      if (sortable) {
        if (this.localSortBy === key) {
          // currently sorted sortable column.
          labelSorting = this.localSortDesc ? this.labelSortAsc : this.labelSortDesc
        } else {
          // Not currently sorted sortable column.
          // Not using nested ternary's here for clarity/readability
          // Default for ariaLabel
          labelSorting = this.localSortDesc ? this.labelSortDesc : this.labelSortAsc
          // Handle sortDirection setting
          const sortDirection = this.sortDirection || field.sortDirection
          if (sortDirection === 'asc') {
            labelSorting = this.labelSortAsc
          } else if (sortDirection === 'desc') {
            labelSorting = this.labelSortDesc
          }
        }
      } else if (!this.noSortReset) {
        // Non sortable column
        labelSorting = this.localSortBy ? this.labelSortClear : ''
      }
      // Return the sr-only sort label or null if no label
      return trim(labelSorting) || null
    }
  }
}
