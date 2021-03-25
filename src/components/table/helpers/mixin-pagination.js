import { Vue } from '../../../vue'
import { PROP_TYPE_NUMBER_STRING } from '../../../constants/props'
import { mathMax } from '../../../utils/math'
import { toInteger } from '../../../utils/number'
import { makeProp } from '../../../utils/props'

// --- Props ---

export const props = {
  currentPage: makeProp(PROP_TYPE_NUMBER_STRING, 1),
  perPage: makeProp(PROP_TYPE_NUMBER_STRING, 0)
}

// --- Mixin ---

// @vue/component
export const paginationMixin = Vue.extend({
  props,
  computed: {
    localPaging() {
      return this.hasProvider ? !!this.noProviderPaging : true
    },
    paginatedItems() {
      let items = this.sortedItems || this.filteredItems || this.localItems || []
      const currentPage = mathMax(toInteger(this.currentPage, 1), 1)
      const perPage = mathMax(toInteger(this.perPage, 0), 0)
      // Apply local pagination
      if (this.localPaging && perPage) {
        // Grab the current page of data (which may be past filtered items limit)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage)
      }
      // Return the items to display in the table
      return items
    }
  }
})
