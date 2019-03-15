import paginationMixin from '../../mixins/pagination'
import { isVisible } from '../../utils/dom'

const DEFAULT_PER_PAGE = 20
const DEFAULT_TOTAL_ROWS = 0

function sanitizePerPage(value) {
  const perPage = parseInt(value, 10) || DEFAULT_PER_PAGE
  return perPage < 1 ? 1 : perPage
}

function sanitizeTotalRows(value) {
  const totalRows = parseInt(value, 10) || DEFAULT_TOTAL_ROWS
  return totalRows < 0 ? 0 : totalRows
}

const props = {
  perPage: {
    type: [Number, String],
    default: DEFAULT_PER_PAGE
  },
  totalRows: {
    type: [Number, String],
    default: DEFAULT_TOTAL_ROWS
  },
  ariaControls: {
    type: String,
    default: null
  }
}

// Our render function is brought in from the pagination mixin
// @vue/component
export default {
  name: 'BPagination',
  mixins: [paginationMixin],
  props,
  computed: {
    numberOfPages() {
      const result = Math.ceil(sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage))
      return result < 1 ? 1 : result
    }
  },
  created() {
    this.$nextTick(() => {
      // Set the initial page if not set (i.e. null). Defaults to page 1
      /* istanbul ignore else */
      if (!(parseInt(this.value, 10) > 0)) {
        this.computedPage = 1
      }
    })
  },
  methods: {
    // These methods are used by the render function
    onClick(num, evt) {
      // Handle edge cases where number of pages has changed (i.e. if perPage changes)
      // This should normally not happen, but just in case.
      if (num > this.numberOfPages) {
        /* istanbul ignore next */
        num = this.numberOfPages
      } else if (num < 1) {
        /* istanbul ignore next */
        num = 1
      }
      // Update the v-model
      this.currentPage = num
      // Emit event triggered by user interaction
      this.$emit('change', this.currentPage)
      this.$nextTick(() => {
        // Keep the current button focused if possible
        const target = evt.target
        if (isVisible(target) && this.$el.contains(target) && target.focus) {
          target.focus()
        } else {
          this.focusCurrent()
        }
      })
    },
    makePage(pageNum) {
      return pageNum
    },
    linkProps(pageNum) {
      // Always '#' for pagination component
      return { href: '#' }
    }
  }
}
