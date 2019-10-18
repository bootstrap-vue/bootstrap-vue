import stableSort from '../../../utils/stable-sort'
import startCase from '../../../utils/startcase'
import looseEqual from '../../../utils/loose-equal'
import { arrayIncludes, concat } from '../../../utils/array'
import { isBoolean, isFunction, isNumber, isUndefined } from '../../../utils/inspect'
import defaultSortCompare from './default-sort-compare'

export default {
  props: {
    sortBy: {
      // Array for multi-sort (prop sort-multi must be set to true)
      type: [String, Array],
      default: ''
    },
    sortDesc: {
      // Array for multi-sort. Must be same length as sortBy
      // (prop sort-multi must be set to true)
      // TODO: Support tri-state: true, false, null
      type: [Boolean, Array],
      default: false
    },
    sortMulti: {
      // Enables multi-columns sorting When set, also implies tri-state sorting
      type: Boolean,
      default: false
    },
    sortDirection: {
      // This prop is named incorrectly
      // It should be `initialSortDirection` as it is misleading
      // (not to mention it screws up computing the ARIA label on the headers)
      // It (last) should probably be deprecated in favour of multi-sort, as
      // 'last' will make multi-sort very bloated!
      type: String,
      default: 'asc',
      validator: direction => arrayIncludes(['asc', 'desc', 'last'], direction)
    },
    sortCompare: {
      type: Function,
      default: null
    },
    sortCompareOptions: {
      // Supported localCompare options, see `options` section of:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
      type: Object,
      default: () => {
        return { numeric: true }
      }
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
  data() {
    return {
      // Array of sort Objects: [{ sortBy: 'field', sortDesc: false }, ... ]
      // Will be an empty array if no sorting
      localSortInfo: []
    }
  },
  computed: {
    localSorting() {
      return this.hasProvider ? !!this.noProviderSorting : !this.noLocalSorting
    },
    isSortable() {
      return this.computedFields.some(field => field.sortable)
    },
    computedSortBy() {
      return this.localSortInfo.map(info => info.sortBy)
    },
    computedSortDesc() {
      return this.localSortInfo.map(info => info.sortDesc)
    },
    sortedItems() {
      // Sorts the filtered items and returns a new array of the sorted items
      // or the original items array if not sorted.
      const items = (this.filteredItems || this.localItems || []).slice()
      const sortInfo = this.computedSortInfo
      const sortCompare = this.sortCompare
      const localSorting = this.localSorting
      const sortOptions = { ...this.sortCompareOptions, usage: 'sort' }
      const sortLocale = this.sortCompareLocale || undefined
      const nullLast = this.sortNullLast
      if (sortInfo && sortInfo.length > 0 && localSorting) {
        // `stableSort` returns a new array, and leaves the original array intact
        return stableSort(items, (a, b) => {
          let result = 0
          for (let idx = 0; idx < sortInfo.length && !result; idx++) {
            const formatter = sortInfo[idx].formatter
            const sortBy = sortInfo[idx].sortBy
            const sortDesc = sortInfo[idx].sortDesc
            let value = null
            if (isFunction(sortCompare)) {
              // Call user provided sortCompare routine
              value = sortCompare(a, b, sortBy, sortDesc, formatter, sortOptions, sortLocale)
            }
            if (!isNumber(value)) {
              // Fallback to built-in defaultSortCompare if sortCompare
              // is not defined or doesn't return a number
              value = defaultSortCompare(
                a,
                b,
                sortBy,
                sortDesc,
                formatter,
                sortOptions,
                sortLocale,
                nullLast
              )
            }
            // Negate result if sorting if descending order
            result = (value || 0) * (sortDesc ? -1 : 1)
          }
          return result
        })
      }
      return items
    }
  },
  watch: {
    isSortable(newVal, oldVal) /* istanbul ignore next: pain in the butt to test */ {
      if (newVal) {
        this.$on('head-clicked', this.handleSort)
      } else {
        this.$off('head-clicked', this.handleSort)
      }
    },
    sortBy(newVal) {
      // Update localSortInfo object
      if (!looseEqual(newVal, this.computedSortBy)) {
        // Update localSortInfo object
        this.updateLocalSortInfo(newVal, this.sortDesc)
      }
    },
    sortDesc(newVal) {
      // Update localSortInfo object
      if (!looseEqual(newVal, this.computedSortDesc)) {
        this.updateLocalSortInfo(this.sortBy, newVal)
      }
    },
    // Update .sync props
    computedSortBy(newSortBy = [], oldSortBy = []) {
      if (!looseEqual(newSortBy, oldSortBy)) {
        // Emit update to sort-by.sync
        this.$emit('update:sortBy', this.sortMulti ? newSortBy : newSortBy[0] || '')
      }
    },
    computedSortDesc(newSortDesc = [], oldSortDesc = []) {
      if (!looseEqual(newSortDesc, oldSortDesc)) {
        // Emit update to sort-desc.sync
        this.$emit('update:sortBy', this.sortMulti ? newSortDesc : newSortDesc[0] || '')
      }
    }
  },
  created() {
    if (this.isSortable) {
      this.$on('head-clicked', this.handleSort)
      // Update sortInfo object
      this.updateLocalSortInfo(this.sortBy, newVal)
    }
  },
  methods: {
    updateLocalSortInfo(sortBy, sortDesc) {
      if (this.isSortable) {
        // Updates localSortInfo array with the given values
        const sortByArr = concat(sortBy).filter(s => !isUndefinedOrNull(s))
        const sortDescArr = concat(sortDesc)
        const computedFieldsObj = this.computedFieldsObj
        this.localSortInfo = sortByArr.map((key, idx) => {
          const field = computedFieldsObj[key] || {}
          return {
            sortBy: String(key),
            sortDesc: Boolean(sortDescArr[idx]),
            formatter: isFunction(field.formatter)
              ? field.formatter
              : field.formatter
                ? this.getFieldFormatter(key)
                : undefined
          }
        })
      } else {
        // Not sortable so reset the localSortInfo array
        this.localSortInfo = []
      }
    },
    // Handlers
    handleSort(key, field, evt, isFoot) {
      if (!this.isSortable) {
        /* istanbul ignore next */
        return
      }
      if (isFoot && this.noFooterSorting) {
        return
      }
      // TODO in this PR:
      //   Make a sequence of sorting cycle based on this.sortDirection
      //   i.e. [true, false, null] vs [false, true, null]
      //   const sequence = this.sortDirection === 'desc' ? [true, false, null] : [false, true, null]
      // TODO in this PR:
      //   Handle this via lookup
      const sortMulti = this.sortMulti
      const sortInfo = this.localSortInfo
      const sortIndex = this.computedSortBy.indexOf(key)
      let sortChanged = false
      // Get the initial sort Direction
      const intialDirection = sortMulti
        ? this.sortDirection
        : field.sortDirection || this.sortDirection
      const intialSortDesc = intialDirection === 'asc'
        ? false
        : intialDirection === 'desc'
          ? true
          : sortMulti
            ? false
            : (sortInfo[0] || {}).sortDesc || false
      if (field.sortable) {
        if (sortIndex === -1) {
          // Field not sorted currently
          this.localSortInfo.push({
            sortBy: key,
            sortDesc: intialSortDesc
          })
        } else {
          // Field is currently sorted
          if (sortInfo[sortIndex].sortDesc === intialSortDesc) {
            // If transitioning from true<=>false, toggle the direction
            sortInfo[sortIndex].sortDesc = !sortInfo[sortIndex].sortDesc
          } else {
            // Else transitoning to unsorted, so remove from sort info
            this.localSortInfo.splice(sortIndex, 1)
          }
        }
        sortChanged = true
      } else if (this.computedSortInfo.length > 0 && !this.noSortReset) {
        this.localSortInfo = []
        sortChanged = true
      }
      if (sortChanged) {
        // Sorting parameters changed via user interaction
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
      const sortIndex = this.computedSortBy.indexOf(key)
      const sortOrder = sortIndex + 1
      const sortBy = this.computedSortBy[sortIndex]
      const sortDesc = this.computedSortDesc[sortIndex] || false
      // Now we get down to business determining the aria-label value
      let ariaLabel = ''
      if ((!field.label || !field.label.trim()) && !field.headerTitle) {
        // In case field's label and title are empty/blank, we need to
        // add a hint about what the column is about for non-sighted users.
        // This is duplicated code from tbody-row mixin, but we need it
        // here as well, since we overwrite the original aria-label.
        /* istanbul ignore next */
        ariaLabel = startCase(key)
      }
      // The correctness of these labels is very important for screen-reader users,
      // and should sync up with the aria-sort attributes
      let ariaLabelSorting = ''
      if (sortable) {
        if (key === sortBy) {
          // currently sorted sortable column.
          ariaLabelSorting = sortDesc ? this.labelSortAsc : this.labelSortDesc
        } else {
          // Not currently sorted sortable column.
          // Not using nested ternary's here for clarity/readability
          // Default for ariaLabel
          ariaLabelSorting = sortDesc ? this.labelSortDesc : this.labelSortAsc
          // Handle sortDirection setting
          const sortDirection = this.sortMulti
            ? this.sortDirection
            : this.sortDirection || field.sortDirection
          if (sortDirection === 'asc') {
            ariaLabelSorting = this.labelSortAsc
          } else if (sortDirection === 'desc') {
            ariaLabelSorting = this.labelSortDesc
          }
        }
      } else if (!this.noSortReset) {
        // Non sortable column
        ariaLabelSorting = sortInfo.length > 0 ? this.labelSortClear : ''
      }
      // Assemble the aria-label attribute value
      ariaLabel = [ariaLabel.trim(), ariaLabelSorting.trim()].filter(Boolean).join(': ')
      // Assemble the aria-sort attribute value
      const ariaSort =
        sortable && key === sortBy
          ? sortDesc
            ? 'descending'
            : 'ascending'
          : sortable
            ? 'none'
            : null
      // Return the attributes
      return {
        // All the above just to get these two values correct :(
        'aria-label': ariaLabel || null,
        'aria-sort': ariaSort,
        // Add indication as to which order the columns are sorted by (numeric)
        // This will be placed as a mini pill badge on the top of the field header
        // TODO in this PR:
        //   Add sort index (1-based) if multi sort.
        //   Also, add prop to disable showing the sort order
        //   And figure out how to set a variant for this badge
        //   May require additiona CSS generation. or we just make 2 options: dark and light
        //   Or use the column text variant (currentColor) to make an outline badge
        'data-sort-order': this.sortMulti && sortOrder ? String(sortOrder) : null
      }
    }
  }
}
