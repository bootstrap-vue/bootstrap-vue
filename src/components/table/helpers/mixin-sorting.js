import stableSort from '../../../utils/stable-sort'
import startCase from '../../../utils/startcase'
import { arrayIncludes } from '../../../utils/array'
import defaultSortCompare from './default-sort-compare'

export default {
  props: {
    sortBy: {
      type: String,
      default: null
    },
    sortDesc: {
      // To Do: Make this tri-state: true, false, null
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'asc',
      validator: direction => arrayIncludes(['asc', 'desc', 'last'], direction)
    },
    sortCompare: {
      type: Function,
      default: null
    },
    noSortReset: {
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
      let items = (this.filteredItems || []).slice()
      const sortBy = this.localSortBy
      const sortDesc = this.localSortDesc
      const sortCompare = this.sortCompare
      const localSorting = this.localSorting
      if (sortBy && localSorting) {
        // stableSort returns a new array, and leaves the original array intact
        return stableSort(items, (a, b) => {
          let result = null
          if (typeof sortCompare === 'function') {
            // Call user provided sortCompare routine
            result = sortCompare(a, b, sortBy, sortDesc)
          }
          if (result === null || result === undefined || result === false) {
            // Fallback to built-in defaultSortCompare if sortCompare
            // is not defined or returns null/false
            result = defaultSortCompare(a, b, sortBy)
          }
          // Negate result if sorting in descending order
          return (result || 0) * (sortDesc ? -1 : 1)
        })
      }
      return items
    },
    // Classes and Attributes to add to the <table>
    // Here for possible future use
    sortingTableClasses() {
      return {}
    },
    sortingTableAttrs() {
      return {}
    }
  },
  watch: {
    isSortable(newVal, oldVal) {
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
      this.localSortBy = newVal || null
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
      if (isFoot && this.noFoooterSorting) {
        return
      }
      if (!this.isSortable) {
        /* istanbul ignore next */
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
        }
      }
      if (field.sortable) {
        if (key === this.localSortBy) {
          // Change sorting direction on current column
          this.localSortDesc = !this.localSortDesc
        } else {
          // Start sorting this column ascending
          this.localSortBy = key
          toggleLocalSortDesc()
        }
        sortChanged = true
      } else if (this.localSortBy && !this.noSortReset) {
        this.localSortBy = null
        toggleLocalSortDesc()
        sortChanged = true
      }
      if (sortChanged) {
        // Sorting parameters changed
        this.$emit('sort-changed', this.context)
      }
    },
    // methods to compute classes and attrs for thead>th cells
    sortTheadThClasses(key, field, idx) {
      return {
        // No Classes for sorting currently...
        // All styles targeted using aria-* attrs
      }
    },
    sortTheadThAttrs(key, field, isFoot) {
      if (!this.isSortable || (isFoot && this.noFooterSorting)) {
        // No atributes if not a sortable table
        return {}
      }
      const sortable = field.sortable
      let ariaLabel = ''
      if (!field.label.trim() && !field.headerTitle) {
        // In case field's label and title are empty/blank, we need to
        // add a hint about what the column is about for non-sighted users
        /* istanbul ignore next */
        ariaLabel = startCase(key)
      }
      const ariaLabelSorting = sortable
        ? this.localSortDesc && this.localSortBy === key
          ? this.labelSortAsc
          : this.labelSortDesc
        : this.labelSortClear
      // Assemble the aria-label
      ariaLabel = [ariaLabel, ariaLabelSorting].filter(Boolean).join(': ')
      // Assemble the aria-sort
      const ariaSort =
        sortable && this.localSortBy === key
          ? this.localSortDesc
            ? 'descending'
            : 'ascending'
          : sortable
            ? 'none'
            : null
      // Return the attributes
      return {
        'aria-label': ariaLabel || null,
        'aria-sort': ariaSort
      }
    }
  }
}
