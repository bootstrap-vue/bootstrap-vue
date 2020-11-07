import { NAME_TABLE } from '../../../constants/components'
import { makePropsConfigurable } from '../../../utils/config'
import { mathMax } from '../../../utils/math'
import { toInteger } from '../../../utils/number'

export default {
  props: makePropsConfigurable(
    {
      perPage: {
        type: [Number, String],
        default: 0
      },
      currentPage: {
        type: [Number, String],
        default: 1
      }
    },
    NAME_TABLE
  ),
  computed: {
    localPaging() {
      return this.hasProvider ? !!this.noProviderPaging : true
    },
    paginatedItems() {
      let items = this.sortedItems || this.filteredItems || this.localItems || []
      const currentPage = mathMax(toInteger(this.currentPage, 1), 1)
      const perPage = mathMax(toInteger(this.perPage, 0), 0)
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
