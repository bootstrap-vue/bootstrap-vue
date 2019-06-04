import looseEqual from '../../../utils/loose-equal'
import { isArray, isNull, isUndefined } from '../../../utils/inspect'
import normalizeFields from './normalize-fields'

export default {
  props: {
    items: {
      // Provider mixin adds in `Function` type
      type: Array,
      default() /* istanbul ignore next */ {
        return []
      }
    },
    fields: {
      // Object format is deprecated and should be avoided
      type: [Array, Object],
      default: null
    },
    primaryKey: {
      // Primary key for record.
      // If provided the value in each row must be unique!!!
      type: String,
      default: null
    },
    value: {
      // v-model for retrieving the current displayed rows
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // Our local copy of the items. Must be an array
      localItems: isArray(this.items) ? this.items.slice() : []
    }
  },
  computed: {
    computedFields() {
      // We normalize fields into an array of objects
      // [ { key:..., label:..., ...}, {...}, ..., {..}]
      return normalizeFields(this.fields, this.localItems)
    },
    computedFieldsObj() /* istanbul ignore next: not using at the moment */ {
      // Fields as a simple lookup hash object
      // Mainly for scopedSlots for convenience
      return this.computedFields.reduce((f, obj) => {
        obj[f.key] = f
        return obj
      }, {})
    },
    computedItems() {
      // Fallback if various mixins not provided
      return (
        this.paginatedItems ||
        this.sortedItems ||
        this.filteredItems ||
        this.localItems ||
        []
      ).slice()
    },
    context() {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: parseInt(this.perPage, 10) || 0,
        currentPage: parseInt(this.currentPage, 10) || 1,
        apiUrl: this.apiUrl
      }
    }
  },
  watch: {
    items(newItems) {
      /* istanbul ignore else */
      if (isArray(newItems)) {
        // Set localItems/filteredItems to a copy of the provided array
        this.localItems = newItems.slice()
      } else if (isUndefined(newItems) || isNull(newItems)) {
        /* istanbul ignore next */
        this.localItems = []
      }
    },
    // Watch for changes on computedItems and update the v-model
    computedItems(newVal) {
      this.$emit('input', newVal)
    },
    // Watch for context changes
    context(newVal, oldVal) {
      // Emit context info for external paging/filtering/sorting handling
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context-changed', newVal)
      }
    }
  },
  mounted() {
    // Initially update the v-model of displayed items
    this.$emit('input', this.computedItems)
  }
}
