import { Vue } from '../../vue'
import { NAME_PAGINATION } from '../../constants/components'
import { EVENT_NAME_CHANGE, EVENT_NAME_PAGE_CLICK } from '../../constants/events'
import { PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { BvEvent } from '../../utils/bv-event.class'
import { attemptFocus, isVisible } from '../../utils/dom'
import { isUndefinedOrNull } from '../../utils/inspect'
import { mathCeil, mathMax } from '../../utils/math'
import { toInteger } from '../../utils/number'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { MODEL_PROP_NAME, paginationMixin, props as paginationProps } from '../../mixins/pagination'

// --- Constants ---

const DEFAULT_PER_PAGE = 20
const DEFAULT_TOTAL_ROWS = 0

// --- Helper methods ---

// Sanitize the provided per page number (converting to a number)
const sanitizePerPage = value => mathMax(toInteger(value) || DEFAULT_PER_PAGE, 1)

// Sanitize the provided total rows number (converting to a number)
const sanitizeTotalRows = value => mathMax(toInteger(value) || DEFAULT_TOTAL_ROWS, 0)

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...paginationProps,
    ariaControls: makeProp(PROP_TYPE_STRING),
    perPage: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_PER_PAGE),
    totalRows: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_TOTAL_ROWS)
  }),
  NAME_PAGINATION
)

// --- Main component ---

// @vue/component
export const BPagination = /*#__PURE__*/ Vue.extend({
  name: NAME_PAGINATION,
  // The render function is brought in via the `paginationMixin`
  mixins: [paginationMixin],
  props,
  computed: {
    numberOfPages() {
      const result = mathCeil(sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage))
      return result < 1 ? 1 : result
    },
    // Used for watching changes to `perPage` and `numberOfPages`
    pageSizeNumberOfPages() {
      return {
        perPage: sanitizePerPage(this.perPage),
        totalRows: sanitizeTotalRows(this.totalRows),
        numberOfPages: this.numberOfPages
      }
    }
  },
  watch: {
    pageSizeNumberOfPages(newValue, oldValue) {
      if (!isUndefinedOrNull(oldValue)) {
        if (newValue.perPage !== oldValue.perPage && newValue.totalRows === oldValue.totalRows) {
          // If the page size changes, reset to page 1
          this.currentPage = 1
        } else if (
          newValue.numberOfPages !== oldValue.numberOfPages &&
          this.currentPage > newValue.numberOfPages
        ) {
          // If `numberOfPages` changes and is less than
          // the `currentPage` number, reset to page 1
          this.currentPage = 1
        }
      }
      this.localNumberOfPages = newValue.numberOfPages
    }
  },
  created() {
    // Set the initial page count
    this.localNumberOfPages = this.numberOfPages
    // Set the initial page value
    const currentPage = toInteger(this[MODEL_PROP_NAME], 0)
    if (currentPage > 0) {
      this.currentPage = currentPage
    } else {
      this.$nextTick(() => {
        // If this value parses to `NaN` or a value less than `1`
        // trigger an initial emit of `null` if no page specified
        this.currentPage = 0
      })
    }
  },
  methods: {
    // These methods are used by the render function
    onClick(event, pageNumber) {
      // Dont do anything if clicking the current active page
      if (pageNumber === this.currentPage) {
        return
      }

      const { target } = event

      // Emit a user-cancelable `page-click` event
      const clickEvent = new BvEvent(EVENT_NAME_PAGE_CLICK, {
        cancelable: true,
        vueTarget: this,
        target
      })
      this.$emit(clickEvent.type, clickEvent, pageNumber)
      if (clickEvent.defaultPrevented) {
        return
      }

      // Update the `v-model`
      this.currentPage = pageNumber
      // Emit event triggered by user interaction
      this.$emit(EVENT_NAME_CHANGE, this.currentPage)

      // Keep the current button focused if possible
      this.$nextTick(() => {
        if (isVisible(target) && this.$el.contains(target)) {
          attemptFocus(target)
        } else {
          this.focusCurrent()
        }
      })
    },
    makePage(pageNum) {
      return pageNum
    },
    /* istanbul ignore next */
    linkProps() {
      // No props, since we render a plain button
      return {}
    }
  }
})
