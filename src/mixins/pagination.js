/*
 * Comon props, computed, data, render function, and methods for b-pagination and b-pagination-nav
 */

import warn from '../utils/warn'
import range from '../utils/range'
import KeyCodes from '../utils/key-codes'
import { isVisible, isDisabled, selectAll, getAttr } from '../utils/dom'
import { stripTags } from '../utils/html'
import BLink from '../components/link/link'

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

// Sanitize the provided numberOfPages value (converting to a number)
function sanitizeNumPages(value) {
  let num = parseInt(value, 10) || 1
  return num < 1 ? 1 : num
}

// Sanitize the provided current page number (converting to a number)
function sanitizeCurPage(value, numPages) {
  let page = parseInt(value, 10) || 1
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
    default: 1,
    validator(value) {
      const num = parseInt(value, 10)
      /* istanbul ignore if */
      if (isNaN(num) || num < 1) {
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
    default: '«'
  },
  labelPrevPage: {
    type: String,
    default: 'Go to previous page'
  },
  prevText: {
    type: String,
    default: '‹'
  },
  labelNextPage: {
    type: String,
    default: 'Go to next page'
  },
  nextText: {
    type: String,
    default: '›'
  },
  labelLastPage: {
    type: String,
    default: 'Go to last page'
  },
  lastText: {
    type: String,
    default: '»'
  },
  labelPage: {
    type: String,
    default: 'Go to page'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: '…'
  }
}

// @vue/component
export default {
  components: { BLink },
  props,
  data() {
    return {
      currentPage: 1,
      localNumPages: 1,
      localLimit: DEFAULT_LIMIT
    }
  },
  computed: {
    btnSize() {
      return this.size ? `pagination-${this.size}` : ''
    },
    alignment() {
      if (this.align === 'center') {
        return 'justify-content-center'
      } else if (this.align === 'end' || this.align === 'right') {
        return 'justify-content-end'
      }
      return ''
    },
    paginationParams() {
      // Determine if we should show the the ellipsis
      const limit = this.limit
      const numPages = this.localNumPages
      const curPage = this.currentPage
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
        startNum = 1
      } else if (startNum > numPages - numLinks) {
        startNum = numPages - numLinks + 1
      }
      return { showFirstDots, showLastDots, numLinks, startNum }
    },
    pageList() {
      // Generates the pageList array
      const { numLinks, startNum } = this.paginationParams

      // Generate list of page numbers
      const pages = makePageArray(startNum, numLinks)
      // We limit to a total of 3 page buttons on XS screens
      // So add classes to page links to hide them for XS breakpoint
      // Note: Ellipsis will also be hidden on XS screens
      // TODO: Make this visual limit configurable based on breakpoint(s)
      if (pages.length > 3) {
        const idx = this.currentPage - startNum
        if (idx === 0) {
          // Keep leftmost 3 buttons visible when current page is first page
          for (let i = 3; i < pages.length; i++) {
            pages[i].classes = 'd-none d-sm-flex'
          }
        } else if (idx === pages.length - 1) {
          // Keep rightmost 3 buttons visible when current page is last page
          for (let i = 0; i < pages.length - 3; i++) {
            pages[i].classes = 'd-none d-sm-flex'
          }
        } else {
          // Hide all except current page, current page - 1 and current page + 1
          for (let i = 0; i < idx - 1; i++) {
            // hide some left button(s)
            pages[i].classes = 'd-none d-sm-flex'
          }
          for (let i = pages.length - 1; i > idx + 1; i--) {
            // hide some right button(s)
            pages[i].classes = 'd-none d-sm-flex'
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
        this.$emit('input', newValue)
      }
    },
    numberOfPages(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localNumPages = sanitizeNumPages(newValue)
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
    this.localNumPages = sanitizeNumPages(this.numberOfPages)
    this.currentPage = sanitizeCurPage(this.value, this.localNumPages)
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
          el => parseInt(getAttr(el, 'aria-posinset'), 10) === this.currentPage
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

    // Helper function
    const isActivePage = pageNum => pageNum === this.currentPage

    // Factory function for prev/next/first/last buttons
    const makeEndBtn = (linkTo, ariaLabel, btnSlot, btnText, pageTest, key) => {
      let button
      const domProps = btnSlot ? {} : { textContent: btnText }
      const staticClass = 'page-item'
      const attrs = {
        role: 'none presentation',
        'aria-hidden': disabled ? 'true' : null
      }
      if (disabled || isActivePage(pageTest) || linkTo < 1 || linkTo > numberOfPages) {
        button = h('li', { key, attrs, staticClass, class: ['disabled'] }, [
          h('span', { staticClass: 'page-link', domProps }, [btnSlot])
        ])
      } else {
        button = h('li', { key, attrs, staticClass }, [
          h(
            'b-link',
            {
              staticClass: 'page-link',
              props: this.linkProps(linkTo),
              attrs: {
                role: 'menuitem',
                tabindex: '-1',
                'aria-label': ariaLabel,
                'aria-controls': this.ariaControls || null
              },
              on: {
                click: evt => {
                  this.onClick(linkTo, evt)
                },
                keydown: onSpaceKey
              }
            },
            [h('span', { domProps }, [btnSlot])]
          )
        ])
      }
      return button
    }

    // Ellipsis factory
    const makeEllipsis = isLast => {
      return h(
        'li',
        {
          key: `elipsis-${isLast ? 'last' : 'first'}`,
          class: ['page-item', 'disabled', 'd-none', 'd-sm-flex'],
          attrs: { role: 'separator' }
        },
        [
          this.$slots['ellipsis-text'] ||
            h('span', {
              class: ['page-link'],
              domProps: { textContent: this.ellipsisText }
            })
        ]
      )
    }

    // Goto First Page button bookend
    buttons.push(
      this.hideGotoEndButtons
        ? h(false)
        : makeEndBtn(
            1,
            this.labelFirstPage,
            this.$slots['first-text'],
            stripTags(this.firstText),
            1,
            'bookend-goto-first'
          )
    )

    // Goto Previous page button bookend
    buttons.push(
      makeEndBtn(
        this.currentPage - 1,
        this.labelPrevPage,
        this.$slots['prev-text'],
        stripTags(this.prevText),
        1,
        'bookend-goto-prev'
      )
    )

    // First Ellipsis Bookend
    buttons.push(showFirstDots ? makeEllipsis(false) : h(false))

    // Individual Page links
    this.pageList.forEach(page => {
      let inner
      const pageText = this.makePage(page.number)
      const active = isActivePage(page.number)
      const staticClass = 'page-link'
      const attrs = {
        role: 'menuitemradio',
        'aria-disabled': disabled ? 'true' : null,
        'aria-controls': this.ariaControls || null,
        'aria-label': `${this.labelPage} ${page.number}`,
        'aria-checked': active ? 'true' : 'false',
        'aria-posinset': page.number,
        'aria-setsize': numberOfPages,
        // ARIA "roving tabindex" method
        tabindex: disabled ? null : active ? '0' : '-1'
      }
      if (disabled) {
        inner = h(
          'span',
          {
            key: `page-${page.number}-link-disabled`,
            staticClass,
            attrs
          },
          pageText
        )
      } else {
        inner = h(
          'b-link',
          {
            key: `page-${page.number}-link`,
            props: this.linkProps(page.number),
            staticClass,
            attrs,
            on: {
              click: evt => {
                this.onClick(page.number, evt)
              },
              keydown: onSpaceKey
            }
          },
          pageText
        )
      }
      buttons.push(
        h(
          'li',
          {
            key: `page-${page.number}`,
            staticClass: 'page-item',
            class: [disabled ? 'disabled' : '', active ? 'active' : '', page.classes],
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
        this.currentPage + 1,
        this.labelNextPage,
        this.$slots['next-text'],
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
            this.$slots['last-text'],
            this.lastText,
            numberOfPages,
            'bookend-goto-last'
          )
    )

    // Assemble the paginatiom buttons
    const pagination = h(
      'ul',
      {
        ref: 'ul',
        class: ['pagination', 'b-pagination', this.btnSize, this.alignment],
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
