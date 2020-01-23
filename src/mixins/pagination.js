import KeyCodes from '../utils/key-codes'
import range from '../utils/range'
import { isVisible, isDisabled, selectAll, getAttr } from '../utils/dom'
import { isFunction, isNull } from '../utils/inspect'
import { toInteger } from '../utils/number'
import { toString } from '../utils/string'
import { warn } from '../utils/warn'
import normalizeSlotMixin from '../mixins/normalize-slot'
import { BLink } from '../components/link/link'

// Common props, computed, data, render function, and methods
// for `<b-pagination>` and `<b-pagination-nav>`

// --- Constants ---

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3

// Default # of buttons limit
const DEFAULT_LIMIT = 5

// --- Helper methods ---

// Make an array of N to N+X
const makePageArray = (startNumber, numberOfPages) =>
  range(numberOfPages).map((val, i) => ({ number: startNumber + i, classes: null }))

// Sanitize the provided limit value (converting to a number)
const sanitizeLimit = val => {
  const limit = toInteger(val) || 1
  return limit < 1 ? DEFAULT_LIMIT : limit
}

// Sanitize the provided current page number (converting to a number)
const sanitizeCurrentPage = (val, numberOfPages) => {
  const page = toInteger(val) || 1
  return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page
}

// Links don't normally respond to SPACE, so we add that
// functionality via this handler
const onSpaceKey = evt => {
  if (evt.keyCode === KeyCodes.SPACE) {
    evt.preventDefault() // Stop page from scrolling
    evt.stopImmediatePropagation()
    evt.stopPropagation()
    // Trigger the click event on the link
    evt.currentTarget.click()
    return false
  }
}

// --- Props ---
export const props = {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String],
    default: null,
    validator(value) /* istanbul ignore next */ {
      const number = toInteger(value)
      if (!isNull(value) && (isNaN(number) || number < 1)) {
        warn('"v-model" value must be a number greater than "0"', 'BPagination')
        return false
      }
      return true
    }
  },
  limit: {
    type: [Number, String],
    default: DEFAULT_LIMIT,
    validator(value) /* istanbul ignore next */ {
      const number = toInteger(value)
      if (isNaN(number) || number < 1) {
        warn('Prop "limit" must be a number greater than "0"', 'BPagination')
        return false
      }
      return true
    }
  },
  align: {
    type: String,
    default: 'left'
  },
  pills: {
    type: Boolean,
    default: false
  },
  hideGotoEndButtons: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Pagination'
  },
  labelFirstPage: {
    type: String,
    default: 'Go to first page'
  },
  firstText: {
    type: String,
    default: '\u00AB' // '«'
  },
  firstNumber: {
    type: Boolean,
    default: false
  },
  firstClass: {
    type: [String, Array, Object],
    default: null
  },
  labelPrevPage: {
    type: String,
    default: 'Go to previous page'
  },
  prevText: {
    type: String,
    default: '\u2039' // '‹'
  },
  prevClass: {
    type: [String, Array, Object],
    default: null
  },
  labelNextPage: {
    type: String,
    default: 'Go to next page'
  },
  nextText: {
    type: String,
    default: '\u203A' // '›'
  },
  nextClass: {
    type: [String, Array, Object],
    default: null
  },
  labelLastPage: {
    type: String,
    default: 'Go to last page'
  },
  lastText: {
    type: String,
    default: '\u00BB' // '»'
  },
  lastNumber: {
    type: Boolean,
    default: false
  },
  lastClass: {
    type: [String, Array, Object],
    default: null
  },
  labelPage: {
    type: [String, Function],
    default: 'Go to page'
  },
  pageClass: {
    type: [String, Array, Object],
    default: null
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: '\u2026' // '…'
  },
  ellipsisClass: {
    type: [String, Array, Object],
    default: null
  }
}

// @vue/component
export default {
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props,
  data() {
    const curr = toInteger(this.value)
    return {
      // -1 signifies no page initially selected
      currentPage: curr > 0 ? curr : -1,
      localNumberOfPages: 1,
      localLimit: DEFAULT_LIMIT
    }
  },
  computed: {
    btnSize() {
      return this.size ? `pagination-${this.size}` : ''
    },
    alignment() {
      const align = this.align
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
      const limit = this.localLimit
      const numberOfPages = this.localNumberOfPages
      const currentPage = this.computedCurrentPage
      const hideEllipsis = this.hideEllipsis
      const firstNumber = this.firstNumber
      const lastNumber = this.lastNumber
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
        numberOfLinks = Math.min(numberOfLinks, limit)
      } else if (numberOfPages - currentPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
        if (!hideEllipsis || firstNumber) {
          showFirstDots = true
          numberOfLinks = limit - (lastNumber ? 0 : 1)
        }
        startNumber = numberOfPages - numberOfLinks + 1
      } else {
        // We are somewhere in the middle of the page list
        if (limit > ELLIPSIS_THRESHOLD) {
          numberOfLinks = limit - 2
          showFirstDots = !!(!hideEllipsis || firstNumber)
          showLastDots = !!(!hideEllipsis || lastNumber)
        }
        startNumber = currentPage - Math.floor(numberOfLinks / 2)
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
          numberOfLinks = Math.min(numberOfLinks + 1, numberOfPages, limit + 1)
        } else if (lastNumber && numberOfPages === startNumber + numberOfLinks - 1) {
          startNumber = Math.max(startNumber - 1, 1)
          numberOfLinks = Math.min(numberOfPages - startNumber + 1, numberOfPages, limit + 1)
        }
      }
      numberOfLinks = Math.min(numberOfLinks, numberOfPages - startNumber + 1)
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
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentPage = sanitizeCurrentPage(newValue, this.localNumberOfPages)
      }
    },
    currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        // Emit null if no page selected
        this.$emit('input', newValue > 0 ? newValue : null)
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
    handleKeyNav(evt) {
      const { keyCode, shiftKey } = evt
      if (keyCode === KeyCodes.LEFT || keyCode === KeyCodes.UP) {
        evt.preventDefault()
        shiftKey ? this.focusFirst() : this.focusPrev()
      } else if (keyCode === KeyCodes.RIGHT || keyCode === KeyCodes.DOWN) {
        evt.preventDefault()
        shiftKey ? this.focusLast() : this.focusNext()
      }
    },
    getButtons() {
      // Return only buttons that are visible
      return selectAll('a.page-link', this.$el).filter(btn => isVisible(btn))
    },
    setBtnFocus(btn) {
      btn.focus()
    },
    focusCurrent() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons().find(
          el => toInteger(getAttr(el, 'aria-posinset')) === this.computedCurrentPage
        )
        if (btn && btn.focus) {
          this.setBtnFocus(btn)
        } else {
          // Fallback if current page is not in button list
          this.focusFirst()
        }
      })
    },
    focusFirst() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons().find(el => !isDisabled(el))
        if (btn && btn.focus && btn !== document.activeElement) {
          this.setBtnFocus(btn)
        }
      })
    },
    focusLast() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons()
          .reverse()
          .find(el => !isDisabled(el))
        if (btn && btn.focus && btn !== document.activeElement) {
          this.setBtnFocus(btn)
        }
      })
    },
    focusPrev() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const buttons = this.getButtons()
        const idx = buttons.indexOf(document.activeElement)
        if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
          this.setBtnFocus(buttons[idx - 1])
        }
      })
    },
    focusNext() {
      // We do this in `$nextTick()` to ensure buttons have finished rendering
      this.$nextTick(() => {
        const buttons = this.getButtons()
        const idx = buttons.indexOf(document.activeElement)
        const cnt = buttons.length - 1
        if (idx < cnt && !isDisabled(buttons[idx + 1]) && buttons[idx + 1].focus) {
          this.setBtnFocus(buttons[idx + 1])
        }
      })
    }
  },
  render(h) {
    const buttons = []
    const numberOfPages = this.localNumberOfPages
    const pageNumbers = this.pageList.map(p => p.number)
    const disabled = this.disabled
    const { showFirstDots, showLastDots } = this.paginationParams
    const currentPage = this.computedCurrentPage
    const fill = this.align === 'fill'

    // Helper function and flag
    const isActivePage = pageNum => pageNum === currentPage
    const noCurrentPage = this.currentPage < 1

    // Factory function for prev/next/first/last buttons
    const makeEndBtn = (linkTo, ariaLabel, btnSlot, btnText, btnClass, pageTest, key) => {
      const isDisabled =
        disabled || isActivePage(pageTest) || noCurrentPage || linkTo < 1 || linkTo > numberOfPages
      const pageNum = linkTo < 1 ? 1 : linkTo > numberOfPages ? numberOfPages : linkTo
      const scope = { disabled: isDisabled, page: pageNum, index: pageNum - 1 }
      const btnContent = this.normalizeSlot(btnSlot, scope) || toString(btnText) || h()
      const inner = h(
        isDisabled ? 'span' : BLink,
        {
          staticClass: 'page-link',
          props: isDisabled ? {} : this.linkProps(linkTo),
          attrs: {
            role: 'menuitem',
            tabindex: isDisabled ? null : '-1',
            'aria-label': ariaLabel,
            'aria-controls': this.ariaControls || null,
            'aria-disabled': isDisabled ? 'true' : null
          },
          on: isDisabled
            ? {}
            : {
                click: evt => {
                  this.onClick(linkTo, evt)
                },
                keydown: onSpaceKey
              }
        },
        [btnContent]
      )
      return h(
        'li',
        {
          key,
          staticClass: 'page-item',
          class: [{ disabled: isDisabled, 'flex-fill': fill }, btnClass],
          attrs: {
            role: 'presentation',
            'aria-hidden': isDisabled ? 'true' : null
          }
        },
        [inner]
      )
    }

    // Ellipsis factory
    const makeEllipsis = isLast => {
      return h(
        'li',
        {
          key: `ellipsis-${isLast ? 'last' : 'first'}`,
          staticClass: 'page-item',
          class: ['disabled', 'bv-d-xs-down-none', fill ? 'flex-fill' : '', this.ellipsisClass],
          attrs: { role: 'separator' }
        },
        [
          h('span', { staticClass: 'page-link' }, [
            this.normalizeSlot('ellipsis-text') || toString(this.ellipsisText) || h()
          ])
        ]
      )
    }

    // Page button factory
    const makePageButton = (page, idx) => {
      const active = isActivePage(page.number) && !noCurrentPage
      // Active page will have tabindex of 0, or if no current page and first page button
      const tabIndex = disabled ? null : active || (noCurrentPage && idx === 0) ? '0' : '-1'
      const attrs = {
        role: 'menuitemradio',
        'aria-disabled': disabled ? 'true' : null,
        'aria-controls': this.ariaControls || null,
        'aria-label': isFunction(this.labelPage)
          ? this.labelPage(page.number)
          : `${this.labelPage} ${page.number}`,
        'aria-checked': active ? 'true' : 'false',
        'aria-posinset': page.number,
        'aria-setsize': numberOfPages,
        // ARIA "roving tabindex" method
        tabindex: tabIndex
      }
      const btnContent = toString(this.makePage(page.number))
      const scope = {
        page: page.number,
        index: page.number - 1,
        content: btnContent,
        active,
        disabled
      }
      const inner = h(
        disabled ? 'span' : BLink,
        {
          props: disabled ? {} : this.linkProps(page.number),
          staticClass: 'page-link',
          attrs,
          on: disabled
            ? {}
            : {
                click: evt => {
                  this.onClick(page.number, evt)
                },
                keydown: onSpaceKey
              }
        },
        [this.normalizeSlot('page', scope) || btnContent]
      )
      return h(
        'li',
        {
          key: `page-${page.number}`,
          staticClass: 'page-item',
          class: [{ disabled, active, 'flex-fill': fill }, page.classes, this.pageClass],
          attrs: { role: 'presentation' }
        },
        [inner]
      )
    }

    // Goto first page button
    // Don't render button when `hideGotoEndButtons` or `firstNumber` is set
    let $firstPageBtn = h()
    if (!this.firstNumber && !this.hideGotoEndButtons) {
      $firstPageBtn = makeEndBtn(
        1,
        this.labelFirstPage,
        'first-text',
        this.firstText,
        this.firstClass,
        1,
        'pagination-goto-first'
      )
    }
    buttons.push($firstPageBtn)

    // Goto previous page button
    buttons.push(
      makeEndBtn(
        currentPage - 1,
        this.labelPrevPage,
        'prev-text',
        this.prevText,
        this.prevClass,
        1,
        'pagination-goto-prev'
      )
    )

    // Show first (1) button?
    buttons.push(this.firstNumber && pageNumbers[0] !== 1 ? makePageButton({ number: 1 }, 0) : h())

    // First ellipsis
    buttons.push(showFirstDots ? makeEllipsis(false) : h())

    // Individual page links
    this.pageList.forEach((page, idx) => {
      const offset = showFirstDots && this.firstNumber && pageNumbers[0] !== 1 ? 1 : 0
      buttons.push(makePageButton(page, idx + offset))
    })

    // Last ellipsis
    buttons.push(showLastDots ? makeEllipsis(true) : h())

    // Show last page button?
    buttons.push(
      this.lastNumber && pageNumbers[pageNumbers.length - 1] !== numberOfPages
        ? makePageButton({ number: numberOfPages }, -1)
        : h()
    )

    // Goto next page button
    buttons.push(
      makeEndBtn(
        currentPage + 1,
        this.labelNextPage,
        'next-text',
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
        'last-text',
        this.lastText,
        this.lastClass,
        numberOfPages,
        'pagination-goto-last'
      )
    }
    buttons.push($lastPageBtn)

    // Assemble the pagination buttons
    const $pagination = h(
      'ul',
      {
        ref: 'ul',
        staticClass: 'pagination',
        class: ['b-pagination', this.btnSize, this.alignment, this.styleClass],
        attrs: {
          role: 'menubar',
          'aria-disabled': disabled ? 'true' : 'false',
          'aria-label': this.ariaLabel || null
        },
        on: { keydown: this.handleKeyNav }
      },
      buttons
    )

    // If we are `<b-pagination-nav>`, wrap in `<nav>` wrapper
    if (this.isNav) {
      return h(
        'nav',
        {
          attrs: {
            'aria-disabled': disabled ? 'true' : null,
            'aria-hidden': disabled ? 'true' : 'false'
          }
        },
        [$pagination]
      )
    }

    return $pagination
  }
}
