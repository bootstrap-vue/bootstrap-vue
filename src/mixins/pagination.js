/*
 * Comon props, computed, data, render function, and methods for b-pagination and b-pagination-nav
 */

import range from '../utils/range'
import KeyCodes from '../utils/key-codes'
import stripScripts from '../utils/strip-scripts'
import { isVisible, isDisabled, selectAll, getAttr } from '../utils/dom'
import bLink from '../components/link/link'

// Make an array of N to N+X
function makePageArray (startNum, numPages) {
  return range(numPages).map(function (value, index) {
    return { number: index + startNum, className: null }
  })
}

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3

// Props object
const props = {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 5
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
    default: 'Goto first page'
  },
  firstText: {
    type: String,
    default: '&laquo;'
  },
  labelPrevPage: {
    type: String,
    default: 'Goto previous page'
  },
  prevText: {
    type: String,
    default: '&lsaquo;'
  },
  labelNextPage: {
    type: String,
    default: 'Goto next page'
  },
  nextText: {
    type: String,
    default: '&rsaquo;'
  },
  labelLastPage: {
    type: String,
    default: 'Goto last page'
  },
  lastText: {
    type: String,
    default: '&raquo;'
  },
  labelPage: {
    type: String,
    default: 'Goto page'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: '&hellip;'
  }
}

export default {
  components: { bLink },
  data () {
    return {
      showFirstDots: false,
      showLastDots: false,
      currentPage: this.value
    }
  },
  props,
  render (h) {
    const buttons = []

    // Factory function for prev/next/first/last buttons
    const makeEndBtns = (linkTo, ariaLabel, btnText, pageTest) => {
      let button
      pageTest = pageTest || linkTo // Page # to test against to disable
      if (this.disabled || this.isActive(pageTest)) {
        button = h(
          'li',
          {
            class: ['page-item', 'disabled'],
            attrs: { role: 'none presentation', 'aria-hidden': 'true' }
          },
          [
            h('span', {
              class: ['page-link'],
              domProps: { innerHTML: stripScripts(btnText) }
            })
          ]
        )
      } else {
        button = h(
          'li',
          {
            class: ['page-item'],
            attrs: { role: 'none presentation' }
          },
          [
            h(
              'b-link',
              {
                class: ['page-link'],
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
                  keydown: evt => {
                    // Links don't normally respond to SPACE, so we add that functionality
                    if (evt.keyCode === KeyCodes.SPACE) {
                      evt.preventDefault()
                      this.onClick(linkTo, evt)
                    }
                  }
                }
              },
              [
                h('span', {
                  attrs: { 'aria-hidden': 'true' },
                  domProps: { innerHTML: stripScripts(btnText) }
                })
              ]
            )
          ]
        )
      }
      return button
    }

    // Ellipsis factory
    const makeEllipsis = () => {
      return h(
        'li',
        {
          class: ['page-item', 'disabled', 'd-none', 'd-sm-flex'],
          attrs: { role: 'separator' }
        },
        [
          h('span', {
            class: ['page-link'],
            domProps: { innerHTML: stripScripts(this.ellipsisText) }
          })
        ]
      )
    }

    // Goto First Page button
    buttons.push(
      this.hideGotoEndButtons
        ? h(false)
        : makeEndBtns(1, this.labelFirstPage, stripScripts(this.firstText))
    )

    // Goto Previous page button
    buttons.push(makeEndBtns(this.currentPage - 1, this.labelPrevPage, this.prevText, 1))

    // First Ellipsis Bookend
    buttons.push(this.showFirstDots ? makeEllipsis() : h(false))

    // Individual Page links
    this.pageList.forEach(page => {
      let inner
      let pageNum = stripScripts(this.makePage(page.number))
      if (this.disabled) {
        inner = h('span', {
          class: ['page-link'],
          domProps: { innerHTML: pageNum }
        })
      } else {
        const active = this.isActive(page.number)
        inner = h('b-link', {
          class: this.pageLinkClasses(page),
          props: this.linkProps(page.number),
          attrs: {
            role: 'menuitemradio',
            tabindex: active ? '0' : '-1',
            'aria-controls': this.ariaControls || null,
            'aria-label': `${this.labelPage} ${page.number}`,
            'aria-checked': active ? 'true' : 'false',
            'aria-posinset': page.number,
            'aria-setsize': this.numberOfPages
          },
          domProps: { innerHTML: pageNum },
          on: {
            click: evt => {
              this.onClick(page.number, evt)
            },
            keydown: evt => {
              if (evt.keyCode === KeyCodes.SPACE) {
                evt.preventDefault()
                this.onClick(page.number, evt)
              }
            }
          }
        })
      }
      buttons.push(
        h(
          'li',
          {
            key: page.number,
            class: this.pageItemClasses(page),
            attrs: { role: 'none presentation' }
          },
          [inner]
        )
      )
    })

    // Last Ellipsis Bookend
    buttons.push(this.showLastDots ? makeEllipsis() : h(false))

    // Goto Next page button
    buttons.push(
      makeEndBtns(
        this.currentPage + 1,
        this.labelNextPage,
        this.nextText,
        this.numberOfPages
      )
    )

    // Goto Last Page button
    buttons.push(
      this.hideGotoEndButtons
        ? h(false)
        : makeEndBtns(this.numberOfPages, this.labelLastPage, this.lastText)
    )

    // Assemble the paginatiom buttons
    const pagination = h(
      'ul',
      {
        ref: 'ul',
        class: ['pagination', 'b-pagination', this.btnSize, this.alignment],
        attrs: {
          role: 'menubar',
          'aria-disabled': this.disabled ? 'true' : 'false',
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
    return this.isNav ? h('nav', {}, [pagination]) : pagination
  },
  watch: {
    currentPage (newPage, oldPage) {
      if (newPage !== oldPage) {
        this.$emit('input', newPage)
      }
    },
    value (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentPage = newValue
      }
    }
  },
  computed: {
    btnSize () {
      return this.size ? `pagination-${this.size}` : ''
    },
    alignment () {
      if (this.align === 'center') {
        return 'justify-content-center'
      } else if (this.align === 'end' || this.align === 'right') {
        return 'justify-content-end'
      }
      return ''
    },
    pageList () {
      // Sanity checks
      if (this.currentPage > this.numberOfPages) {
        this.currentPage = this.numberOfPages
      } else if (this.currentPage < 1) {
        this.currentPage = 1
      }
      // - Hide first ellipsis marker
      this.showFirstDots = false
      // - Hide last ellipsis marker
      this.showLastDots = false
      let numLinks = this.limit
      let startNum = 1
      if (this.numberOfPages <= this.limit) {
        // Special Case: Less pages available than the limit of displayed pages
        numLinks = this.numberOfPages
      } else if (
        this.currentPage < this.limit - 1 &&
        this.limit > ELLIPSIS_THRESHOLD
      ) {
        // We are near the beginning of the page list
        if (!this.hideEllipsis) {
          numLinks = this.limit - 1
          this.showLastDots = true
        }
      } else if (
        this.numberOfPages - this.currentPage + 2 < this.limit &&
        this.limit > ELLIPSIS_THRESHOLD
      ) {
        // We are near the end of the list
        if (!this.hideEllipsis) {
          this.showFirstDots = true
          numLinks = this.limit - 1
        }
        startNum = this.numberOfPages - numLinks + 1
      } else {
        // We are somewhere in the middle of the page list
        if (this.limit > ELLIPSIS_THRESHOLD && !this.hideEllipsis) {
          this.showFirstDots = true
          this.showLastDots = true
          numLinks = this.limit - 2
        }
        startNum = this.currentPage - Math.floor(numLinks / 2)
      }
      // Sanity checks
      if (startNum < 1) {
        startNum = 1
      } else if (startNum > this.numberOfPages - numLinks) {
        startNum = this.numberOfPages - numLinks + 1
      }
      // Generate list of page numbers
      const pages = makePageArray(startNum, numLinks)
      // We limit to a total of 3 page buttons on small screens
      // Ellipsis will also be hidden on small screens
      if (pages.length > 3) {
        const idx = this.currentPage - startNum
        if (idx === 0) {
          // Keep leftmost 3 buttons visible
          for (let i = 3; i < pages.length; i++) {
            pages[i].className = 'd-none d-sm-flex'
          }
        } else if (idx === pages.length - 1) {
          // Keep rightmost 3 buttons visible
          for (let i = 0; i < pages.length - 3; i++) {
            pages[i].className = 'd-none d-sm-flex'
          }
        } else {
          // hide left button(s)
          for (let i = 0; i < idx - 1; i++) {
            pages[i].className = 'd-none d-sm-flex'
          }
          // hide right button(s)
          for (let i = pages.length - 1; i > idx + 1; i--) {
            pages[i].className = 'd-none d-sm-flex'
          }
        }
      }
      return pages
    }
  },
  methods: {
    isActive (pagenum) {
      return pagenum === this.currentPage
    },
    pageItemClasses (page) {
      return [
        'page-item',
        this.disabled ? 'disabled' : '',
        this.isActive(page.number) ? 'active' : '',
        page.className
      ]
    },
    pageLinkClasses (page) {
      return [
        'page-link',
        this.disabled ? 'disabled' : '',
      ]
    },
    getButtons () {
      // Return only buttons that are visible
      return selectAll('a.page-link', this.$el).filter(btn => isVisible(btn))
    },
    setBtnFocus (btn) {
      this.$nextTick(() => {
        btn.focus()
      })
    },
    focusCurrent () {
      const btn = this.getButtons().find(
        el => parseInt(getAttr(el, 'aria-posinset'), 10) === this.currentPage
      )
      if (btn && btn.focus) {
        this.setBtnFocus(btn)
      } else {
        // Fallback if current page is not in button list
        this.focusFirst()
      }
    },
    focusFirst () {
      const btn = this.getButtons().find(el => !isDisabled(el))
      if (btn && btn.focus && btn !== document.activeElement) {
        this.setBtnFocus(btn)
      }
    },
    focusLast () {
      const btn = this.getButtons()
        .reverse()
        .find(el => !isDisabled(el))
      if (btn && btn.focus && btn !== document.activeElement) {
        this.setBtnFocus(btn)
      }
    },
    focusPrev () {
      const buttons = this.getButtons()
      const idx = buttons.indexOf(document.activeElement)
      if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
        this.setBtnFocus(buttons[idx - 1])
      }
    },
    focusNext () {
      const buttons = this.getButtons()
      const idx = buttons.indexOf(document.activeElement)
      const cnt = buttons.length - 1
      if (
        idx < cnt &&
        !isDisabled(buttons[idx + 1]) &&
        buttons[idx + 1].focus
      ) {
        this.setBtnFocus(buttons[idx + 1])
      }
    }
  }
}
