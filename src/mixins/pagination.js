import { extend } from '../vue'
import { NAME_PAGINATION } from '../constants/components'
import { CODE_DOWN, CODE_LEFT, CODE_RIGHT, CODE_SPACE, CODE_UP } from '../constants/key-codes'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_NUMBER_STRING,
  PROP_TYPE_FUNCTION_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../constants/props'
import {
  SLOT_NAME_ELLIPSIS_TEXT,
  SLOT_NAME_FIRST_TEXT,
  SLOT_NAME_LAST_TEXT,
  SLOT_NAME_NEXT_TEXT,
  SLOT_NAME_PAGE,
  SLOT_NAME_PREV_TEXT
} from '../constants/slots'
import { createArray } from '../utils/array'
import {
  attemptFocus,
  getActiveElement,
  getAttr,
  isDisabled,
  isVisible,
  selectAll
} from '../utils/dom'
import { stopEvent } from '../utils/events'
import { isFunction, isNull } from '../utils/inspect'
import { mathFloor, mathMax, mathMin } from '../utils/math'
import { makeModelMixin } from '../utils/model'
import { toInteger } from '../utils/number'
import { sortKeys } from '../utils/object'
import { hasPropFunction, makeProp, makePropsConfigurable } from '../utils/props'
import { safeVueInstance } from '../utils/safe-vue-instance'
import { toString } from '../utils/string'
import { warn } from '../utils/warn'
import { normalizeSlotMixin } from '../mixins/normalize-slot'
import { BLink } from '../components/link/link'

// Common props, computed, data, render function, and methods
// for `<b-pagination>` and `<b-pagination-nav>`

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', {
  type: PROP_TYPE_BOOLEAN_NUMBER_STRING,
  defaultValue: null,
  /* istanbul ignore next */
  validator(value) {
    if (!isNull(value) && toInteger(value, 0) < 1) {
      warn('"v-model" value must be a number greater than "0"', NAME_PAGINATION)
      return false
    }
    return true
  }
})

export { MODEL_PROP_NAME, MODEL_EVENT_NAME }

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3

// Default # of buttons limit
const DEFAULT_LIMIT = 5

// --- Helper methods ---

// Make an array of N to N+X
const makePageArray = (startNumber, numberOfPages) =>
  createArray(numberOfPages, (_, i) => ({ number: startNumber + i, classes: null }))

// Sanitize the provided limit value (converting to a number)
const sanitizeLimit = value => {
  const limit = toInteger(value) || 1
  return limit < 1 ? DEFAULT_LIMIT : limit
}

// Sanitize the provided current page number (converting to a number)
const sanitizeCurrentPage = (val, numberOfPages) => {
  const page = toInteger(val) || 1
  return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page
}

// Links don't normally respond to SPACE, so we add that
// functionality via this handler
const onSpaceKey = event => {
  if (event.keyCode === CODE_SPACE) {
    // Stop page from scrolling
    stopEvent(event, { immediatePropagation: true })
    // Trigger the click event on the link
    event.currentTarget.click()
    return false
  }
}

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...modelProps,
    align: makeProp(PROP_TYPE_STRING, 'left'),
    ariaLabel: makeProp(PROP_TYPE_STRING, 'Pagination'),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    ellipsisClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    ellipsisText: makeProp(PROP_TYPE_STRING, '\u2026'), // '…'
    firstClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    firstNumber: makeProp(PROP_TYPE_BOOLEAN, false),
    firstText: makeProp(PROP_TYPE_STRING, '\u00AB'), // '«'
    hideEllipsis: makeProp(PROP_TYPE_BOOLEAN, false),
    hideGotoEndButtons: makeProp(PROP_TYPE_BOOLEAN, false),
    labelFirstPage: makeProp(PROP_TYPE_STRING, 'Go to first page'),
    labelLastPage: makeProp(PROP_TYPE_STRING, 'Go to last page'),
    labelNextPage: makeProp(PROP_TYPE_STRING, 'Go to next page'),
    labelPage: makeProp(PROP_TYPE_FUNCTION_STRING, 'Go to page'),
    labelPrevPage: makeProp(PROP_TYPE_STRING, 'Go to previous page'),
    lastClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    lastNumber: makeProp(PROP_TYPE_BOOLEAN, false),
    lastText: makeProp(PROP_TYPE_STRING, '\u00BB'), // '»'
    limit: makeProp(
      PROP_TYPE_NUMBER_STRING,
      DEFAULT_LIMIT,
      /* istanbul ignore next */ value => {
        if (toInteger(value, 0) < 1) {
          warn('Prop "limit" must be a number greater than "0"', NAME_PAGINATION)
          return false
        }
        return true
      }
    ),
    nextClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    nextText: makeProp(PROP_TYPE_STRING, '\u203A'), // '›'
    pageClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    pills: makeProp(PROP_TYPE_BOOLEAN, false),
    prevClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    prevText: makeProp(PROP_TYPE_STRING, '\u2039'), // '‹'
    size: makeProp(PROP_TYPE_STRING)
  }),
  'pagination'
)

// --- Mixin ---

// @vue/component
export const paginationMixin = extend({
  mixins: [modelMixin, normalizeSlotMixin],
  props,
  data() {
    // `-1` signifies no page initially selected
    let currentPage = toInteger(this[MODEL_PROP_NAME], 0)
    currentPage = currentPage > 0 ? currentPage : -1

    return {
      currentPage,
      localNumberOfPages: 1,
      localLimit: DEFAULT_LIMIT
    }
  },
  computed: {
    btnSize() {
      const { size } = this
      return size ? `pagination-${size}` : ''
    },
    alignment() {
      const { align } = this
      if (align === 'center') {
        return 'justify-content-center'
      } else if (align === 'end' || align === 'right') {
        return 'justify-content-end'
      } else if (align === 'fill') {
        // The page-items will also have 'flex-fill' added
        // We add text centering to make the button appearance better in fill mode
        return 'text-center'
      }
      return ''
    },
    styleClass() {
      return this.pills ? 'b-pagination-pills' : ''
    },
    computedCurrentPage() {
      return sanitizeCurrentPage(this.currentPage, this.localNumberOfPages)
    },
    paginationParams() {
      // Determine if we should show the the ellipsis
      const {
        localLimit: limit,
        localNumberOfPages: numberOfPages,
        computedCurrentPage: currentPage,
        hideEllipsis,
        firstNumber,
        lastNumber
      } = this
      let showFirstDots = false
      let showLastDots = false
      let numberOfLinks = limit
      let startNumber = 1

      if (numberOfPages <= limit) {
        // Special case: Less pages available than the limit of displayed pages
        numberOfLinks = numberOfPages
      } else if (currentPage < limit - 1 && limit > ELLIPSIS_THRESHOLD) {
        if (!hideEllipsis || lastNumber) {
          showLastDots = true
          numberOfLinks = limit - (firstNumber ? 0 : 1)
        }
        numberOfLinks = mathMin(numberOfLinks, limit)
      } else if (numberOfPages - currentPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
        if (!hideEllipsis || firstNumber) {
          showFirstDots = true
          numberOfLinks = limit - (lastNumber ? 0 : 1)
        }
        startNumber = numberOfPages - numberOfLinks + 1
      } else {
        // We are somewhere in the middle of the page list
        if (limit > ELLIPSIS_THRESHOLD) {
          numberOfLinks = limit - (hideEllipsis ? 0 : 2)
          showFirstDots = !!(!hideEllipsis || firstNumber)
          showLastDots = !!(!hideEllipsis || lastNumber)
        }
        startNumber = currentPage - mathFloor(numberOfLinks / 2)
      }
      // Sanity checks
      /* istanbul ignore if */
      if (startNumber < 1) {
        startNumber = 1
        showFirstDots = false
      } else if (startNumber > numberOfPages - numberOfLinks) {
        startNumber = numberOfPages - numberOfLinks + 1
        showLastDots = false
      }
      if (showFirstDots && firstNumber && startNumber < 4) {
        numberOfLinks = numberOfLinks + 2
        startNumber = 1
        showFirstDots = false
      }
      const lastPageNumber = startNumber + numberOfLinks - 1
      if (showLastDots && lastNumber && lastPageNumber > numberOfPages - 3) {
        numberOfLinks = numberOfLinks + (lastPageNumber === numberOfPages - 2 ? 2 : 3)
        showLastDots = false
      }
      // Special handling for lower limits (where ellipsis are never shown)
      if (limit <= ELLIPSIS_THRESHOLD) {
        if (firstNumber && startNumber === 1) {
          numberOfLinks = mathMin(numberOfLinks + 1, numberOfPages, limit + 1)
        } else if (lastNumber && numberOfPages === startNumber + numberOfLinks - 1) {
          startNumber = mathMax(startNumber - 1, 1)
          numberOfLinks = mathMin(numberOfPages - startNumber + 1, numberOfPages, limit + 1)
        }
      }
      numberOfLinks = mathMin(numberOfLinks, numberOfPages - startNumber + 1)
      return { showFirstDots, showLastDots, numberOfLinks, startNumber }
    },
    pageList() {
      // Generates the pageList array
      const { numberOfLinks, startNumber } = this.paginationParams
      const currentPage = this.computedCurrentPage
      // Generate list of page numbers
      const pages = makePageArray(startNumber, numberOfLinks)
      // We limit to a total of 3 page buttons on XS screens
      // So add classes to page links to hide them for XS breakpoint
      // Note: Ellipsis will also be hidden on XS screens
      // TODO: Make this visual limit configurable based on breakpoint(s)
      if (pages.length > 3) {
        const idx = currentPage - startNumber
        // THe following is a bootstrap-vue custom utility class
        const classes = 'bv-d-xs-down-none'
        if (idx === 0) {
          // Keep leftmost 3 buttons visible when current page is first page
          for (let i = 3; i < pages.length; i++) {
            pages[i].classes = classes
          }
        } else if (idx === pages.length - 1) {
          // Keep rightmost 3 buttons visible when current page is last page
          for (let i = 0; i < pages.length - 3; i++) {
            pages[i].classes = classes
          }
        } else {
          // Hide all except current page, current page - 1 and current page + 1
          for (let i = 0; i < idx - 1; i++) {
            // hide some left button(s)
            pages[i].classes = classes
          }
          for (let i = pages.length - 1; i > idx + 1; i--) {
            // hide some right button(s)
            pages[i].classes = classes
          }
        }
      }
      return pages
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentPage = sanitizeCurrentPage(newValue, this.localNumberOfPages)
      }
    },
    currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        // Emit `null` if no page selected
        this.$emit(MODEL_EVENT_NAME, newValue > 0 ? newValue : null)
      }
    },
    limit(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localLimit = sanitizeLimit(newValue)
      }
    }
  },
  created() {
    // Set our default values in data
    this.localLimit = sanitizeLimit(this.limit)
    this.$nextTick(() => {
      // Sanity check
      this.currentPage =
        this.currentPage > this.localNumberOfPages ? this.localNumberOfPages : this.currentPage
    })
  },
  methods: {
    handleKeyNav(event) {
      const { keyCode, shiftKey } = event
      /* istanbul ignore if */
      if (this.isNav) {
        // We disable left/right keyboard navigation in `<b-pagination-nav>`
        return
      }
      if (keyCode === CODE_LEFT || keyCode === CODE_UP) {
        stopEvent(event, { propagation: false })
        shiftKey ? this.focusFirst() : this.focusPrev()
      } else if (keyCode === CODE_RIGHT || keyCode === CODE_DOWN) {
        stopEvent(event, { propagation: false })
        shiftKey ? this.focusLast() : this.focusNext()
      }
    },
    getButtons() {
      // Return only buttons that are visible
      return selectAll('button.page-link, a.page-link', this.$el).filter(btn => isVisible(btn))
    },
    focusCurrent() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons().find(
          el => toInteger(getAttr(el, 'aria-posinset'), 0) === this.computedCurrentPage
        )
        if (!attemptFocus(btn)) {
          // Fallback if current page is not in button list
          this.focusFirst()
        }
      })
    },
    focusFirst() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons().find(el => !isDisabled(el))
        attemptFocus(btn)
      })
    },
    focusLast() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons()
          .reverse()
          .find(el => !isDisabled(el))
        attemptFocus(btn)
      })
    },
    focusPrev() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const buttons = this.getButtons()
        const index = buttons.indexOf(getActiveElement())
        if (index > 0 && !isDisabled(buttons[index - 1])) {
          attemptFocus(buttons[index - 1])
        }
      })
    },
    focusNext() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const buttons = this.getButtons()
        const index = buttons.indexOf(getActiveElement())
        if (index < buttons.length - 1 && !isDisabled(buttons[index + 1])) {
          attemptFocus(buttons[index + 1])
        }
      })
    }
  },
  render(h) {
    const {
      disabled,
      labelPage,
      ariaLabel,
      isNav,
      localNumberOfPages: numberOfPages,
      computedCurrentPage: currentPage
    } = safeVueInstance(this)
    const pageNumbers = this.pageList.map(p => p.number)
    const { showFirstDots, showLastDots } = this.paginationParams
    const fill = this.align === 'fill'
    const $buttons = []

    // Helper function and flag
    const isActivePage = pageNumber => pageNumber === currentPage
    const noCurrentPage = this.currentPage < 1

    // Factory function for prev/next/first/last buttons
    const makeEndBtn = (linkTo, ariaLabel, btnSlot, btnText, btnClass, pageTest, key) => {
      const isDisabled =
        disabled || isActivePage(pageTest) || noCurrentPage || linkTo < 1 || linkTo > numberOfPages
      const pageNumber = linkTo < 1 ? 1 : linkTo > numberOfPages ? numberOfPages : linkTo
      const scope = { disabled: isDisabled, page: pageNumber, index: pageNumber - 1 }
      const $btnContent = this.normalizeSlot(btnSlot, scope) || toString(btnText) || h()
      const $inner = h(
        isDisabled ? 'span' : isNav ? BLink : 'button',
        {
          staticClass: 'page-link',
          class: { 'flex-grow-1': !isNav && !isDisabled && fill },
          props: isDisabled || !isNav ? {} : this.linkProps(linkTo),
          attrs: {
            role: isNav ? null : 'menuitem',
            type: isNav || isDisabled ? null : 'button',
            tabindex: isDisabled || isNav ? null : '-1',
            'aria-label': ariaLabel,
            'aria-controls': safeVueInstance(this).ariaControls || null,
            'aria-disabled': isDisabled ? 'true' : null
          },
          on: isDisabled
            ? {}
            : {
                '!click': event => {
                  this.onClick(event, linkTo)
                },
                keydown: onSpaceKey
              }
        },
        [$btnContent]
      )
      return h(
        'li',
        {
          key,
          staticClass: 'page-item',
          class: [
            {
              disabled: isDisabled,
              'flex-fill': fill,
              'd-flex': fill && !isNav && !isDisabled
            },
            btnClass
          ],
          attrs: {
            role: isNav ? null : 'presentation',
            'aria-hidden': isDisabled ? 'true' : null
          }
        },
        [$inner]
      )
    }

    // Ellipsis factory
    const makeEllipsis = isLast => {
      return h(
        'li',
        {
          staticClass: 'page-item',
          class: ['disabled', 'bv-d-xs-down-none', fill ? 'flex-fill' : '', this.ellipsisClass],
          attrs: { role: 'separator' },
          key: `ellipsis-${isLast ? 'last' : 'first'}`
        },
        [
          h('span', { staticClass: 'page-link' }, [
            this.normalizeSlot(SLOT_NAME_ELLIPSIS_TEXT) || toString(this.ellipsisText) || h()
          ])
        ]
      )
    }

    // Page button factory
    const makePageButton = (page, idx) => {
      const { number: pageNumber } = page
      const active = isActivePage(pageNumber) && !noCurrentPage
      // Active page will have tabindex of 0, or if no current page and first page button
      const tabIndex = disabled ? null : active || (noCurrentPage && idx === 0) ? '0' : '-1'

      const attrs = {
        role: isNav ? null : 'menuitemradio',
        type: isNav || disabled ? null : 'button',
        'aria-disabled': disabled ? 'true' : null,
        'aria-controls': safeVueInstance(this).ariaControls || null,
        'aria-label': hasPropFunction(labelPage)
          ? /* istanbul ignore next */ labelPage(pageNumber)
          : `${isFunction(labelPage) ? labelPage() : labelPage} ${pageNumber}`,
        'aria-checked': isNav ? null : active ? 'true' : 'false',
        'aria-current': isNav && active ? 'page' : null,
        'aria-posinset': isNav ? null : pageNumber,
        'aria-setsize': isNav ? null : numberOfPages,
        // ARIA "roving tabindex" method (except in `isNav` mode)
        tabindex: isNav ? null : tabIndex
      }
      const btnContent = toString(this.makePage(pageNumber))
      const scope = {
        page: pageNumber,
        index: pageNumber - 1,
        content: btnContent,
        active,
        disabled
      }

      const $inner = h(
        disabled ? 'span' : isNav ? BLink : 'button',
        {
          props: disabled || !isNav ? {} : this.linkProps(pageNumber),
          staticClass: 'page-link',
          class: { 'flex-grow-1': !isNav && !disabled && fill },
          attrs,
          on: disabled
            ? {}
            : {
                '!click': event => {
                  this.onClick(event, pageNumber)
                },
                keydown: onSpaceKey
              }
        },
        [this.normalizeSlot(SLOT_NAME_PAGE, scope) || btnContent]
      )

      return h(
        'li',
        {
          staticClass: 'page-item',
          class: [
            {
              disabled,
              active,
              'flex-fill': fill,
              'd-flex': fill && !isNav && !disabled
            },
            page.classes,
            this.pageClass
          ],
          attrs: { role: isNav ? null : 'presentation' },
          key: `page-${pageNumber}`
        },
        [$inner]
      )
    }

    // Goto first page button
    // Don't render button when `hideGotoEndButtons` or `firstNumber` is set
    let $firstPageBtn = h()
    if (!this.firstNumber && !this.hideGotoEndButtons) {
      $firstPageBtn = makeEndBtn(
        1,
        this.labelFirstPage,
        SLOT_NAME_FIRST_TEXT,
        this.firstText,
        this.firstClass,
        1,
        'pagination-goto-first'
      )
    }
    $buttons.push($firstPageBtn)

    // Goto previous page button
    $buttons.push(
      makeEndBtn(
        currentPage - 1,
        this.labelPrevPage,
        SLOT_NAME_PREV_TEXT,
        this.prevText,
        this.prevClass,
        1,
        'pagination-goto-prev'
      )
    )

    // Show first (1) button?
    $buttons.push(this.firstNumber && pageNumbers[0] !== 1 ? makePageButton({ number: 1 }, 0) : h())

    // First ellipsis
    $buttons.push(showFirstDots ? makeEllipsis(false) : h())

    // Individual page links
    this.pageList.forEach((page, idx) => {
      const offset = showFirstDots && this.firstNumber && pageNumbers[0] !== 1 ? 1 : 0
      $buttons.push(makePageButton(page, idx + offset))
    })

    // Last ellipsis
    $buttons.push(showLastDots ? makeEllipsis(true) : h())

    // Show last page button?
    $buttons.push(
      this.lastNumber && pageNumbers[pageNumbers.length - 1] !== numberOfPages
        ? makePageButton({ number: numberOfPages }, -1)
        : h()
    )

    // Goto next page button
    $buttons.push(
      makeEndBtn(
        currentPage + 1,
        this.labelNextPage,
        SLOT_NAME_NEXT_TEXT,
        this.nextText,
        this.nextClass,
        numberOfPages,
        'pagination-goto-next'
      )
    )

    // Goto last page button
    // Don't render button when `hideGotoEndButtons` or `lastNumber` is set
    let $lastPageBtn = h()
    if (!this.lastNumber && !this.hideGotoEndButtons) {
      $lastPageBtn = makeEndBtn(
        numberOfPages,
        this.labelLastPage,
        SLOT_NAME_LAST_TEXT,
        this.lastText,
        this.lastClass,
        numberOfPages,
        'pagination-goto-last'
      )
    }
    $buttons.push($lastPageBtn)

    // Assemble the pagination buttons
    const $pagination = h(
      'ul',
      {
        staticClass: 'pagination',
        class: ['b-pagination', this.btnSize, this.alignment, this.styleClass],
        attrs: {
          role: isNav ? null : 'menubar',
          'aria-disabled': disabled ? 'true' : 'false',
          'aria-label': isNav ? null : ariaLabel || null
        },
        // We disable keyboard left/right nav when `<b-pagination-nav>`
        on: isNav ? {} : { keydown: this.handleKeyNav },
        ref: 'ul'
      },
      $buttons
    )

    // If we are `<b-pagination-nav>`, wrap in `<nav>` wrapper
    if (isNav) {
      return h(
        'nav',
        {
          attrs: {
            'aria-disabled': disabled ? 'true' : null,
            'aria-hidden': disabled ? 'true' : 'false',
            'aria-label': isNav ? ariaLabel || null : null
          }
        },
        [$pagination]
      )
    }

    return $pagination
  }
})
