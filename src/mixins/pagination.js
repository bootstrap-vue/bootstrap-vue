/*
 * Common props, computed, data, render function, and methods
 * for <b-pagination> and <b-pagination-nav>
 */

import KeyCodes from '../utils/key-codes'
import range from '../utils/range'
import toString from '../utils/to-string'
import warn from '../utils/warn'
import { isFunction, isNull } from '../utils/inspect'
import { isVisible, isDisabled, selectAll, getAttr } from '../utils/dom'
import normalizeSlotMixin from '../mixins/normalize-slot'
import { BLink } from '../components/link/link'

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3

// Default # of buttons limit
const DEFAULT_LIMIT = 5

// Make an array of N to N+X
function makePageArray(startNum, numPages) {
  return range(numPages).map(function(value, index) {
    return { number: index + startNum, classes: null }
  })
}

// Sanitize the provided Limit value (converting to a number)
function sanitizeLimit(value) {
  const limit = parseInt(value, 10) || 1
  return limit < 1 ? DEFAULT_LIMIT : limit
}

// Sanitize the provided current page number (converting to a number)
function sanitizeCurPage(value, numPages) {
  const page = parseInt(value, 10) || 1
  return page > numPages ? numPages : page < 1 ? 1 : page
}

// Links don't normally respond to SPACE, so we add that functionality via this handler
function onSpaceKey(evt) {
  if (evt.keyCode === KeyCodes.SPACE) {
    evt.preventDefault() // Stop page from scrolling
    evt.stopImmediatePropagation()
    evt.stopPropagation()
    // Trigger the click event on the link
    evt.currentTarget.click()
    return false
  }
}

// Props object
const props = {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String],
    default: null,
    validator(value) {
      const num = parseInt(value, 10)
      /* istanbul ignore if */
      if (!isNull(value) && (isNaN(num) || num < 1)) {
        warn('pagination: v-model value must be a number greater than 0')
        return false
      }
      return true
    }
  },
  limit: {
    type: [Number, String],
    default: DEFAULT_LIMIT,
    validator(value) {
      const num = parseInt(value, 10)
      /* istanbul ignore if */
      if (isNaN(num) || num < 1) {
        warn('pagination: prop "limit" must be a number greater than 0')
        return false
      }
      return true
    }
  },
  size: {
    type: String,
    default: 'md'
  },
  align: {
    type: String,
    default: 'left'
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
  labelPrevPage: {
    type: String,
    default: 'Go to previous page'
  },
  prevText: {
    type: String,
    default: '\u2039' // '‹'
  },
  labelNextPage: {
    type: String,
    default: 'Go to next page'
  },
  nextText: {
    type: String,
    default: '\u203A' // '›'
  },
  labelLastPage: {
    type: String,
    default: 'Go to last page'
  },
  lastText: {
    type: String,
    default: '\u00BB' // '»'
  },
  labelPage: {
    type: [String, Function],
    default: 'Go to page'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: '\u2026' // '…'
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
    const curr = parseInt(this.value, 10)
    return {
      // -1 signifies no page initially selected
      currentPage: curr > 0 ? curr : -1,
      localNumPages: 1,
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
        // The page-items will also have 'flex-fill' added.
        // We ad text centering to make the button appearance better in fill mode.
        return 'text-center'
      }
      return ''
    },
    computedCurrentPage() {
      return sanitizeCurPage(this.currentPage, this.localNumPages)
    },
    paginationParams() {
      // Determine if we should show the the ellipsis
      const limit = this.limit
      const numPages = this.localNumPages
      const curPage = this.computedCurrentPage
      const hideEllipsis = this.hideEllipsis
      let showFirstDots = false
      let showLastDots = false
      let numLinks = limit
      let startNum = 1

      if (numPages <= limit) {
        // Special Case: Less pages available than the limit of displayed pages
        numLinks = numPages
      } else if (curPage < limit - 1 && limit > ELLIPSIS_THRESHOLD) {
        // We are near the beginning of the page list
        if (!hideEllipsis) {
          showLastDots = true
          numLinks = limit - 1
        }
      } else if (numPages - curPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
        // We are near the end of the list
        if (!hideEllipsis) {
          numLinks = limit - 1
          showFirstDots = true
        }
        startNum = numPages - numLinks + 1
      } else {
        // We are somewhere in the middle of the page list
        if (limit > ELLIPSIS_THRESHOLD && !hideEllipsis) {
          numLinks = limit - 2
          showFirstDots = showLastDots = true
        }
        startNum = curPage - Math.floor(numLinks / 2)
      }
      // Sanity checks
      if (startNum < 1) {
        /* istanbul ignore next */
        startNum = 1
      } else if (startNum > numPages - numLinks) {
        startNum = numPages - numLinks + 1
      }
      return { showFirstDots, showLastDots, numLinks, startNum }
    },
    pageList() {
      // Generates the pageList array
      const { numLinks, startNum } = this.paginationParams
      const currPage = this.computedCurrentPage
      // Generate list of page numbers
      const pages = makePageArray(startNum, numLinks)
      // We limit to a total of 3 page buttons on XS screens
      // So add classes to page links to hide them for XS breakpoint
      // Note: Ellipsis will also be hidden on XS screens
      // TODO: Make this visual limit configurable based on breakpoint(s)
      if (pages.length > 3) {
        const idx = currPage - startNum
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
        this.currentPage = sanitizeCurPage(newValue, this.localNumPages)
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
        this.currentPage > this.localNumPages ? this.localNumPages : this.currentPage
    })
  },
  methods: {
    getButtons() {
      // Return only buttons that are visible
      return selectAll('a.page-link', this.$el).filter(btn => isVisible(btn))
    },
    setBtnFocus(btn) {
      btn.focus()
    },
    focusCurrent() {
      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons().find(
          el => parseInt(getAttr(el, 'aria-posinset'), 10) === this.computedCurrentPage
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
      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(() => {
        const btn = this.getButtons().find(el => !isDisabled(el))
        if (btn && btn.focus && btn !== document.activeElement) {
          this.setBtnFocus(btn)
        }
      })
    },
    focusLast() {
      // We do this in next tick to ensure buttons have finished rendering
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
      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(() => {
        const buttons = this.getButtons()
        const idx = buttons.indexOf(document.activeElement)
        if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
          this.setBtnFocus(buttons[idx - 1])
        }
      })
    },
    focusNext() {
      // We do this in next tick to ensure buttons have finished rendering
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
    const numberOfPages = this.localNumPages
    const disabled = this.disabled
    const { showFirstDots, showLastDots } = this.paginationParams
    const currPage = this.computedCurrentPage
    const fill = this.align === 'fill'

    // Helper function and flag
    const isActivePage = pageNum => pageNum === currPage
    const noCurrPage = this.currentPage < 1

    // Factory function for prev/next/first/last buttons
    const makeEndBtn = (linkTo, ariaLabel, btnSlot, btnText, pageTest, key) => {
      const isDisabled =
        disabled || isActivePage(pageTest) || noCurrPage || linkTo < 1 || linkTo > numberOfPages
      const pageNum = linkTo < 1 ? 1 : linkTo > numberOfPages ? numberOfPages : linkTo
      const scope = { disabled: isDisabled, page: pageNum, index: pageNum - 1 }
      const btnContent = this.normalizeSlot(btnSlot, scope) || toString(btnText) || h(false)
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
          class: { disabled: isDisabled, 'flex-fill': fill },
          attrs: {
            role: 'none presentation',
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
          class: ['disabled', 'bv-d-xs-down-none', fill ? 'flex-fill' : ''],
          attrs: { role: 'separator' }
        },
        [
          h('span', { staticClass: 'page-link' }, [
            this.normalizeSlot('ellipsis-text', {}) || toString(this.ellipsisText) || h(false)
          ])
        ]
      )
    }

    // Goto First Page button bookend
    buttons.push(
      this.hideGotoEndButtons
        ? h(false)
        : makeEndBtn(1, this.labelFirstPage, 'first-text', this.firstText, 1, 'bookend-goto-first')
    )

    // Goto Previous page button bookend
    buttons.push(
      makeEndBtn(
        currPage - 1,
        this.labelPrevPage,
        'prev-text',
        this.prevText,
        1,
        'bookend-goto-prev'
      )
    )

    // First Ellipsis Bookend
    buttons.push(showFirstDots ? makeEllipsis(false) : h(false))

    // Individual Page links
    this.pageList.forEach((page, idx) => {
      const active = isActivePage(page.number) && !noCurrPage
      // Active page will have tabindex of 0, or if no current page and first page button
      let tabIndex = disabled ? null : active || (noCurrPage && idx === 0) ? '0' : '-1'
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
      buttons.push(
        h(
          'li',
          {
            key: `page-${page.number}`,
            staticClass: 'page-item',
            class: [{ disabled, active, 'flex-fill': fill }, page.classes],
            attrs: { role: 'none presentation' }
          },
          [inner]
        )
      )
    })

    // Last Ellipsis Bookend
    buttons.push(showLastDots ? makeEllipsis(true) : h(false))

    // Goto Next page button bookend
    buttons.push(
      makeEndBtn(
        currPage + 1,
        this.labelNextPage,
        'next-text',
        this.nextText,
        numberOfPages,
        'bookend-goto-next'
      )
    )

    // Goto Last Page button bookend
    buttons.push(
      this.hideGotoEndButtons
        ? h(false)
        : makeEndBtn(
            numberOfPages,
            this.labelLastPage,
            'last-text',
            this.lastText,
            numberOfPages,
            'bookend-goto-last'
          )
    )

    // Assemble the pagination buttons
    const pagination = h(
      'ul',
      {
        ref: 'ul',
        staticClass: 'pagination',
        class: ['b-pagination', this.btnSize, this.alignment],
        attrs: {
          role: 'menubar',
          'aria-disabled': disabled ? 'true' : 'false',
          'aria-label': this.ariaLabel || null
        },
        on: {
          keydown: evt => {
            const keyCode = evt.keyCode
            const shift = evt.shiftKey
            if (keyCode === KeyCodes.LEFT) {
              evt.preventDefault()
              shift ? this.focusFirst() : this.focusPrev()
            } else if (keyCode === KeyCodes.RIGHT) {
              evt.preventDefault()
              shift ? this.focusLast() : this.focusNext()
            }
          }
        }
      },
      buttons
    )

    // if we are pagination-nav, wrap in '<nav>' wrapper
    if (this.isNav) {
      return h(
        'nav',
        {
          attrs: {
            'aria-disabled': disabled ? 'true' : null,
            'aria-hidden': disabled ? 'true' : 'false'
          }
        },
        [pagination]
      )
    } else {
      return pagination
    }
  }
}
