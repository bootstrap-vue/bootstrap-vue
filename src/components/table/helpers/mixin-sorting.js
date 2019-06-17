import stableSort from '../../../utils/stable-sort'
import startCase from '../../../utils/startcase'
import { arrayIncludes } from '../../../utils/array'
import { isFunction, isNull, isUndefined } from '../../../utils/inspect'
import defaultSortCompare from './default-sort-compare'

export default {
  props: {
    sortBy: {
      type: String,
      default: ''
    },
    sortDesc: {
      // To Do: Make this tri-state: true, false, null
      type: Boolean,
      default: false
    },
    sortDirection: {
      // This prop is named incorrectly.
      // It should be initialSortDirection
      // As it is a bit misleading (not to mention screws up
      // the Aria Label on the headers)
      type: String,
      default: 'asc',
      validator: direction => arrayIncludes(['asc', 'desc', 'last'], direction)
    },
    sortCompare: {
      type: Function,
      default: null
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
    }
  },
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
    sortedItems() {
      // Sorts the filtered items and returns a new array of the sorted items
      // or the original items array if not sorted.
      let items = (this.filteredItems || this.localItems || []).slice()
      const sortBy = this.localSortBy
      const sortDesc = this.localSortDesc
      const sortCompare = this.sortCompare
      const localSorting = this.localSorting
      if (sortBy && localSorting) {
        // stableSort returns a new array, and leaves the original array intact
        return stableSort(items, (a, b) => {
          let result = null
          if (isFunction(sortCompare)) {
            // Call user provided sortCompare routine
            result = sortCompare(a, b, sortBy, sortDesc)
          }
          if (isUndefined(result) || isNull(result) || result === false) {
            // Fallback to built-in defaultSortCompare if sortCompare
            // is not defined or returns null/false
            result = defaultSortCompare(a, b, sortBy)
          }
          // Negate result if sorting in descending order
          return (result || 0) * (sortDesc ? -1 : 1)
        })
      }
      return items
    }
  },
  watch: {
    isSortable(newVal, oldVal) /* istanbul ignore next: pain in the butt to test */ {
      if (newVal) {
        if (this.isSortable) {
          this.$on('head-clicked', this.handleSort)
        }
      } else {
        this.$off('head-clicked', this.handleSort)
      }
    },
    sortDesc(newVal, oldVal) {
      if (newVal === this.localSortDesc) {
        /* istanbul ignore next */
        return
      }
      this.localSortDesc = newVal || false
    },
    sortBy(newVal, oldVal) {
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
        if (key === this.localSortBy) {
          // Change sorting direction on current column
          this.localSortDesc = !this.localSortDesc
        } else {
          // Start sorting this column ascending
          this.localSortBy = key
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
        // No Classes for sorting currently...
        // All styles targeted using aria-* attrs
      }
    },
    sortTheadThAttrs(key, field, isFoot) {
      if (!this.isSortable || (isFoot && this.noFooterSorting)) {
        // No attributes if not a sortable table
        return {}
      }
      const sortable = field.sortable
      let ariaLabel = ''
      if ((!field.label || !field.label.trim()) && !field.headerTitle) {
        // In case field's label and title are empty/blank, we need to
        // add a hint about what the column is about for non-sighted users.
        // This is duplicated code from tbody-row mixin, but we need it
        // here as well, since we overwrite the original aria-label.
        /* istanbul ignore next */
        ariaLabel = startCase(key)
      }
      // The correctness of these labels is very important for screen-reader users.
      let ariaLabelSorting = ''
      if (sortable) {
        if (this.localSortBy === key) {
          // currently sorted sortable column.
          ariaLabelSorting = this.localSortDesc ? this.labelSortAsc : this.labelSortDesc
        } else {
          // Not currently sorted sortable column.
          // Not using nested ternary's here for clarity/readability
          // Default for ariaLabel
          ariaLabelSorting = this.localSortDesc ? this.labelSortDesc : this.labelSortAsc
          // Handle sortDirection setting
          const sortDirection = this.sortDirection || field.sortDirection
          if (sortDirection === 'asc') {
            ariaLabelSorting = this.labelSortAsc
          } else if (sortDirection === 'desc') {
            ariaLabelSorting = this.labelSortDesc
          }
        }
      } else if (!this.noSortReset) {
        // Non sortable column
        ariaLabelSorting = this.localSortBy ? this.labelSortClear : ''
      }
      // Assemble the aria-label attribute value
      ariaLabel = [ariaLabel.trim(), ariaLabelSorting.trim()].filter(Boolean).join(': ')
      // Assemble the aria-sort attribute value
      const ariaSort =
        sortable && this.localSortBy === key
          ? this.localSortDesc
            ? 'descending'
            : 'ascending'
          : sortable
            ? 'none'
            : null
      // Return the attributes
      // (All the above just to get these two values)
      return {
        'aria-label': ariaLabel || null,
        'aria-sort': ariaSort
      }
    }
  }
}
