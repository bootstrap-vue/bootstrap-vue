import { toInteger } from '../../../utils/number'

export default {
  props: {
    perPage: {
      type: [Number, String],
      default: 0
    },
    currentPage: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    localPaging() {
      return this.hasProvider ? !!this.noProviderPaging : true
    },
    paginatedItems() {
      let items = this.sortedItems || this.filteredItems || this.localItems || []
      const currentPage = Math.max(toInteger(this.currentPage, 1), 1)
      const perPage = Math.max(toInteger(this.perPage, 0), 0)
      // Apply local pagination
      if (this.localPaging && !!perPage) {
        // Grab the current page of data (which may be past filtered items limit)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage)
      }
      // Return the items to display in the table
      return items
    }
  }
}
