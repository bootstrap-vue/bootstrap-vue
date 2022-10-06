import { extend } from '../../../vue'
import { EVENT_NAME_CONTEXT_CHANGED } from '../../../constants/events'
import { PROP_TYPE_ARRAY, PROP_TYPE_STRING } from '../../../constants/props'
import { useParentMixin } from '../../../mixins/use-parent'
import { isArray, isFunction, isString } from '../../../utils/inspect'
import { looseEqual } from '../../../utils/loose-equal'
import { mathMax } from '../../../utils/math'
import { makeModelMixin } from '../../../utils/model'

import { toInteger } from '../../../utils/number'
import { clone, sortKeys } from '../../../utils/object'
import { makeProp } from '../../../utils/props'
import { safeVueInstance } from '../../../utils/safe-vue-instance'
import { normalizeFields } from './normalize-fields'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', {
  type: PROP_TYPE_ARRAY,
  defaultValue: []
})

export { MODEL_PROP_NAME, MODEL_EVENT_NAME }

// --- Props ---

export const props = sortKeys({
  ...modelProps,
  fields: makeProp(PROP_TYPE_ARRAY, null),
  // Provider mixin adds in `Function` type
  items: makeProp(PROP_TYPE_ARRAY, []),
  // Primary key for record
  // If provided the value in each row must be unique!
  primaryKey: makeProp(PROP_TYPE_STRING),
  // `v-model` for retrieving the current displayed rows
  [MODEL_PROP_NAME]: makeProp(PROP_TYPE_ARRAY, [])
})

// --- Mixin ---

// @vue/component
export const itemsMixin = extend({
  mixins: [modelMixin, useParentMixin],
  props,
  data() {
    const { items } = this

    return {
      // Our local copy of the items
      // Must be an array
      localItems: isArray(items) ? items.slice() : []
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
      const { bvParent } = this
      return this.computedFields.reduce((obj, f) => {
        // We use object spread here so we don't mutate the original field object
        obj[f.key] = clone(f)
        if (f.formatter) {
          // Normalize formatter to a function ref or `undefined`
          let formatter = f.formatter
          if (isString(formatter) && isFunction(bvParent[formatter])) {
            formatter = bvParent[formatter]
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
      const { paginatedItems, sortedItems, filteredItems, localItems } = safeVueInstance(this)
      // Fallback if various mixins not provided
      return (
        paginatedItems ||
        sortedItems ||
        filteredItems ||
        localItems ||
        /* istanbul ignore next */
        []
      ).slice()
    },
    context() {
      const { perPage, currentPage } = safeVueInstance(this)
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: mathMax(toInteger(perPage, 0), 0),
        currentPage: mathMax(toInteger(currentPage, 0), 1),
        apiUrl: this.apiUrl
      }
    }
  },
  watch: {
    items(newValue) {
      // Set `localItems`/`filteredItems` to a copy of the provided array
      this.localItems = isArray(newValue) ? newValue.slice() : []
    },
    // Watch for changes on `computedItems` and update the `v-model`
    computedItems(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    },
    // Watch for context changes
    context(newValue, oldValue) {
      // Emit context information for external paging/filtering/sorting handling
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(EVENT_NAME_CONTEXT_CHANGED, newValue)
      }
    }
  },
  mounted() {
    // Initially update the `v-model` of displayed items
    this.$emit(MODEL_EVENT_NAME, this.computedItems)
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
})
