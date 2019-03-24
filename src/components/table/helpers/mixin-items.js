import normalizeFields from './normalize-fields'
import { isArray } from '../../../utils/array'

export default {
  props: {
    items: {
      type: [Array, Function],
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
    }
  },
  watch: {
    items(newItems) {
      /* istanbul ignore else */
      if (isArray(newItems)) {
        // Set localItems/filteredItems to a copy of the provided array
        this.localItems = newItems.slice()
      } else if (newItems === null || newItems === undefined) {
        /* istanbul ignore next */
        this.localItems = []
      }
    }
  }
}
