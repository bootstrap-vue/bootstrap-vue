/*
 * Comon props, computed, data, amd methods for b-pagination and b-pagination.nav
 */

import { from as arrayFrom } from '../utils/array'
import range from '../utils/range'
import { assign } from '../utils/object';
import { isVisible, isDisabled, selectAll, getAttr } from '../utils/dom';

// Make an array of N to N+X
function makePageArray(startNum, numPages) {
    return range(numPages).map(function(value, index){
        return { number: index + startNum, className: null };
    });
}

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3;

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
};

export default {
    data() {
        return {
            showFirstDots: false,
            showLastDots: false,
            currentPage: this.value
        };
    },
    props,
    watch: {
        currentPage(newPage, oldPage) {
            if (newPage !== oldPage) {
                this.$emit('input', newPage);
            }
        },
        value(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.currentPage = newValue;
            }
        }
    },
    computed: {
        btnSize() {
            return this.size ? `pagination-${this.size}` : '';
        },
        alignment() {
            if (this.align === 'center') {
                return 'justify-content-center';
            } else if  (this.align === 'end' || this.align === 'right') {
                return 'justify-content-end';
            }
            return '';
        },
        pageList() {
            // Sanity checks
            if (this.currentPage > this.numberOfPages) {
              this.currentPage = this.numberOfPages;
            } else if (this.currentPage < 1) {
              this.currentPage = 1;
            }
            // - Hide first ellipsis marker
            this.showFirstDots = false;
            // - Hide last ellipsis marker
            this.showLastDots = false;
            let numLinks = this.limit;
            let startNum = 1;
            if (this.numberOfPages <= this.limit) {
                // Special Case: Less pages available than the limit of displayed pages
                numLinks = this.numberOfPages;
            } else if (this.currentPage < (this.limit - 1) && this.limit > ELLIPSIS_THRESHOLD) {
                // We are near the beginning of the page list
                if (!this.hideEllipsis) {
                    numLinks = this.limit - 1;
                    this.showLastDots = true;
                }
            } else if ((this.numberOfPages - this.currentPage + 2) < this.limit && this.limit > ELLIPSIS_THRESHOLD) {
                // We are near the end of the list
                if (!this.hideEllipsis) {
                    this.showFirstDots = true;
                    numLinks = this.limit - 1;
                }
                startNum = this.numberOfPages - numLinks + 1;
            } else {
                // We are somewhere in the middle of the page list
                if (this.limit > ELLIPSIS_THRESHOLD && !this.hideEllipsis) {
                    this.showFirstDots = true;
                    this.showLastDots = true;
                    numLinks = this.limit - 2;
                }
                startNum = this.currentPage - Math.floor(numLinks / 2);
            }
            // Sanity checks
            if (startNum < 1) {
                startNum = 1;
            } else if (startNum > (this.numberOfPages - numLinks)) {
                startNum = this.numberOfPages - numLinks + 1;
            }
            // Generate list of page numbers
            const pages = makePageArray(startNum, numLinks);
            // We limit to a total of 3 page buttons on small screens
            // Ellipsis will also be hidden on small screens
            if (pages.length > 3) {
                const idx = this.currentPage - startNum;
                if (idx === 0) {
                    // Keep leftmost 3 buttons visible
                    for (let i = 3; i < pages.length; i++) {
                        pages[i].className = 'd-none d-sm-flex';
                    }
                } else if (idx === pages.length - 1) {
                    // Keep rightmost 3 buttons visible
                    for (let i = 0; i < pages.length - 3; i++) {
                        pages[i].className = 'd-none d-sm-flex';
                    }
                } else {
                    // hide left button(s)
                    for (let i = 0; i < idx - 1; i++) {
                        pages[i].className = 'd-none d-sm-flex';
                    }
                    // hide right button(s)
                    for (let i = pages.length - 1; i > idx + 1; i--) {
                        pages[i].className = 'd-none d-sm-flex';
                    }
                }
            }
            return pages;
        }
    },
    methods: {
        isActive(pagenum) {
            return pagenum === this.currentPage;
        },
        pageItemClasses(page) {
            return [
                'page-item',
                this.disabled ? 'disabled' : '',
                this.isActive(page.number) ? 'active' : '',
                page.className
            ];
        },
        pageLinkClasses(page) {
            return [
                'page-link',
                this.disabled ? 'disabled' : '',
                this.isActive(page.number) ? 'active' : ''
            ];
        },
        getButtons() {
            // Return only buttons that are visible
            return selectAll('a.page-link', this.$el).filter(btn => isVisible(btn));
        },
        setBtnFocus(btn) {
            this.$nextTick(() => {
                btn.focus();
            });
        },
        focusFirst() {
            const btn = this.getButtons().find(el => !isDisabled(el));
            if (btn && btn.focus && btn !== document.activeElement) {
                this.setBtnFocus(btn);
            }
        },
        focusLast() {
            const btn = this.getButtons().reverse().find(el => !isDisabled(el));
            if (btn && btn.focus && btn !== document.activeElement) {
                this.setBtnFocus(btn);
            }
        },
        focusCurrent() {
            const btn = this.getButtons().find(el => parseInt(getAttr(el, 'aria-posinset'), 10) === this.currentPage);
            if (btn && btn.focus) {
                this.setBtnFocus(btn);
            } else {
                // Fallback if current page is not in button list
                this.focusFirst();
            }
        },
        focusPrev() {
            const buttons = this.getButtons();
            const idx = buttons.indexOf(document.activeElement);
            if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
                this.setBtnFocus(buttons[idx - 1]);
            }
        },
        focusNext() {
            const buttons = this.getButtons();
            const idx = buttons.indexOf(document.activeElement);
            const cnt = buttons.length - 1;
            if (idx < cnt && !isDisabled(buttons[idx + 1]) && buttons[idx + 1].focus) {
                this.setBtnFocus(buttons[idx + 1]);
            }
        }
    }
};
