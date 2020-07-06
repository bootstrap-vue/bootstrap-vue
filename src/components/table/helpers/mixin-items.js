import looseEqual from '../../../utils/loose-equal'
import { isArray, isFunction, isString, isUndefinedOrNull } from '../../../utils/inspect'
import { mathMax } from '../../../utils/math'
import { toInteger } from '../../../utils/number'
import { clone } from '../../../utils/object'
import normalizeFields from './normalize-fields'

export default {
  props: {
    items: {
      // Provider mixin adds in `Function` type
      type: Array,
      /* istanbul ignore next */
      default() /* istanbul ignore next */ {
        return []
      }
    },
    fields: {
      type: Array,
      default: null
    },
    primaryKey: {
      // Primary key for record
      // If provided the value in each row must be unique!
      type: String
      // default: null
    },
    value: {
      // `v-model` for retrieving the current displayed rows
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // Our local copy of the items
      // Must be an array
      localItems: isArray(this.items) ? this.items.slice() : []
    }
  },
  computed: {
    computedFields() {
      // We normalize fields into an array of objects
      // `[ { key:..., label:..., ...}, {...}, ..., {..}]`
      return normalizeFields(this.fields, this.localItems)
    },
    computedFieldsObj() {
      // Fields as a simple lookup hash object
      // Mainly for formatter lookup and use in `scopedSlots` for convenience
      // If the field has a formatter, it normalizes formatter to a
      // function ref or `undefined` if no formatter
      const parent = this.$parent
      return this.computedFields.reduce((obj, f) => {
        // We use object spread here so we don't mutate the original field object
        obj[f.key] = clone(f)
        if (f.formatter) {
          // Normalize formatter to a function ref or `undefined`
          let formatter = f.formatter
          if (isString(formatter) && isFunction(parent[formatter])) {
            formatter = parent[formatter]
          } else if (!isFunction(formatter)) {
            /* istanbul ignore next */
            formatter = undefined
          }
          // Return formatter function or `undefined` if none
          obj[f.key].formatter = formatter
        }
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
        /* istanbul ignore next */
        []
      ).slice()
    },
    context() {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: mathMax(toInteger(this.perPage, 0), 0),
        currentPage: mathMax(toInteger(this.currentPage, 0), 1),
        apiUrl: this.apiUrl
      }
    }
  },
  watch: {
    items(newItems) {
      /* istanbul ignore else */
      if (isArray(newItems)) {
        // Set `localItems`/`filteredItems` to a copy of the provided array
        this.localItems = newItems.slice()
      } else if (isUndefinedOrNull(newItems)) {
        /* istanbul ignore next */
        this.localItems = []
      }
    },
    // Watch for changes on `computedItems` and update the `v-model`
    computedItems(newVal, oldVal) {
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('input', newVal)
      }
    },
    // Watch for context changes
    context(newVal, oldVal) {
      // Emit context information for external paging/filtering/sorting handling
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context-changed', newVal)
      }
    }
  },
  mounted() {
    // Initially update the `v-model` of displayed items
    this.$emit('input', this.computedItems)
  },
  methods: {
    // Method to get the formatter method for a given field key
    getFieldFormatter(key) {
      const field = this.computedFieldsObj[key]
      // `this.computedFieldsObj` has pre-normalized the formatter to a
      // function ref if present, otherwise `undefined`
      return field ? field.formatter : undefined
    }
  }
}
