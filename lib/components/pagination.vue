<template>
    <ul :class="['pagination',btnSize]"
        :role="role"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-label="ariaLabel ? ariaLabel : null"
        @focusin.self="focusCurrent"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"
        @keydown.shift.left.prevent="focusFirst"
        @keydown.shift.right.prevent="focusLast"
    >

        <!-- Goto First Page button -->
        <template v-if="!hideGotoEndButtons">
            <li v-if="isActive(1) || disabled" class="page-item disabled" aria-hidden="true">
                <span class="page-link" v-html="firstText"></span>
            </li>
            <li v-else class="page-item">
                <a :role="buttonRole"
                   class="page-link"
                   :aria-label="labelFirstPage"
                   tabindex="-1"
                   href="#"
                   @click.prevent="setPage($event, 1)"
                   @keydown.enter.prevent="setPage($event, 1)"
                   @keydown.space.prevent="setPage($event, 1)"
                ><span aria-hidden="true" v-html="firstText"></span></a>
            </li>
        </template>

        <!-- Goto Previous page button -->
        <li v-if="isActive(1) || disabled" class="page-item disabled" aria-hidden="true">
            <span class="page-link" v-html="prevText"></span>
        </li>
        <li v-else class="page-item">
            <a :role="buttonRole"
               class="page-link"
               :aria-label="labelPrevPage"
               tabindex="-1"
               href="#"
               @click.prevent="setPage($event, currentPage - 1)"
               @keydown.enter.prevent="setPage($event, currentPage - 1)"
               @keydown.space.prevent="setPage($event, currentPage - 1)"
            ><span aria-hidden="true" v-html="prevText"></span></a>
        </li>

        <!-- First Ellipsis Bookend -->
        <li v-if="showFirstDots" class="page-item disabled hidden-xs-down" role="seperator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Pages links -->
        <li v-for="page in pageList"
            :class="pageItemClasses(page)"
            :key="page.number"
        >
            <a :role="buttonRole"
               :class="pageLinkClasses(page)"
               :disabled="disabled"
               :aria-disabled="disabled ? 'true' : 'false'"
               :aria-label="labelPage + ' ' + page.number"
               :aria-current="isActive(page) ? 'true' : 'false'"
               :aria-posinset="page.number"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="setPage($event, page.number)"
               @keydown.enter.prevent="setPage($event, page.number)"
               @keydown.space.prevent="setPage($event, page.number)"
            >{{ page.number }}</a>
        </li>

        <!-- Last Ellipsis Bookend -->
        <li v-if="showLastDots" class="page-item disabled hidden-xs-down" role="seperator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Goto Next page -->
        <li v-if="isActive(numberOfPages) || disabled" class="page-item disabled" aria-hidden="true">
            <span class="page-link" v-html="nextText"></span>
        </li>
        <li v-else class="page-item">
            <a :role="buttonRole"
               class="page-link"
               :aria-label="labelNextPage"
               tabindex="-1"
               @click.prevent="setPage($event, currentPage + 1)"
               @keydown.enter.prevent="setPage($event, currentPage + 1)"
               @keydown.space.prevent="setPage($event, currentPage + 1)"
            ><span aria-hidden="true" v-html="nextText"></span></a>
        </li>

        <!-- Goto Last page -->
        <template v-if="!hideGotoEndButtons">
            <li v-if="isActive(numberOfPages) || disabled" class="page-item disabled" aria-hidden="true">
                <span class="page-link" v-html="lastText"></span>
            </li>
            <li v-else class="page-item">
                <a :role="buttonRole"
                   class="page-link"
                   :aria-label="labelLastPage"
                   tabindex="-1"
                   @click.prevent="setPage($event, numberOfPages)"
                   @keydown.enter.prevent="setPage($event, numberOfPages)"
                   @keydown.space.prevent="setPage($event, numberOfPages)"
                ><span aria-hidden="true" v-html="lastText"></span></a>
            </li>
        </template>
    </ul>
</template>

<script>
// Determine if an HTML element is visible - Faster than CSS check
function isVisible(el) {
    return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
}

// Make an aray of N to N+X
function makePageArray(startNum, numPages) {
    return Array.apply(null, {length: numPages}).map(function(value, index){
        return { number: index + startNum, className: null };
    });
}

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3;

export default {
    data() {
        return {
            showFirstDots: false,
            showLastDots: false,
            currentPage: this.value
        };
    },
    computed: {
        numberOfPages() {
            const result = Math.ceil(this.totalRows / this.perPage);
            return (result < 1) ? 1 : result;
        },
        btnSize() {
            return this.size ? `pagination-${this.size}` : '';
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
                        pages[i].className = 'hidden-xs-down';
                    }
                } else if (idx === pages.length - 1) {
                    // Keep rightmost 3 buttons visible
                    for (let i = 0; i < pages.length - 3; i++) {
                        pages[i].className = 'hidden-xs-down';
                    }
                } else {
                    // hide left button(s)
                    for (let i = 0; i < idx - 1; i++) {
                        pages[i].className = 'hidden-xs-down';
                    }
                    // hide right button(s)
                    for (let i = pages.length - 1; i > idx + 1; i--) {
                        pages[i].className = 'hidden-xs-down';
                    }
                }
            }
            
            return pages;
        }
    },
    methods: {
        isActive(page) {
            return page === this.currentPage;
        },
        pageItemClasses(page) {
            const active = this.isActive(page.number);
            return [
                'page-item',
                this.disabled ? 'disabled' : '',
                active ? 'active' : '',
                page.className
            ];
        },
        pageLinkClasses(page) {
            const active = this.isActive(page.number);
            return [
                'page-link',
                this.disabled ? 'disabled' : '',
                active ? 'active' : ''
            ];
        },
        setPage(e, num) {
            if (this.disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (num > this.numberOfPages) {
                this.currentPage = this.numberOfPages;
            } else if (num < 1) {
                this.currentpage = 1;
            } else {
                this.currentPage = num;
            }
            this.$nextTick(() => {
                // Keep the current button focused if possible
                if (isVisible(e.target) && e.target.focus) {
                    e.target.focus();
                } else {
                    this.focusCurrent();
                }
            });
            this.$emit('change', this.currentPage);
        },
        getButtons() {
            const buttons = Array.prototype.slice.call(this.$el.querySelectorAll('a.page-link'));
            // Return only buttons that are visible
            return buttons.filter(btn => isVisible(btn));
        },
        setBtnFocus(btn) {
            this.$nextTick(() => {
                btn.focus();
            });
        },
        focusFirst() {
            const btn = this.getButtons().find(el => !el.disabled);
            if (btn && btn.focus && btn !== document.activeElement) {
                this.setBtnFocus(btn);
            }
        },
        focusLast() {
            const btn = this.getButtons().reverse().find(el => !el.disabled);
            if (btn && btn.focus && btn !== document.activeElement) {
                this.setBtnFocus(btn);
            }
        },
        focusCurrent() {
            const btn = this.getButtons().find(el => parseInt(el.getAttribute('aria-posinset'), 10) === this.currentPage);
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
            if (idx > 0 && !buttons[idx - 1].disabled && buttons[idx - 1].focus) {
                this.setBtnFocus(buttons[idx - 1]);
            }
        },
        focusNext() {
            const buttons = this.getButtons();
            const idx = buttons.indexOf(document.activeElement);
            const cnt = buttons.length - 1;
            if (idx < cnt && !buttons[idx + 1].disabled && buttons[idx + 1].focus) {
                this.setBtnFocus(buttons[idx + 1]);
            }
        }
    },
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
    props: {
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
        perPage: {
            type: Number,
            default: 20
        },
        totalRows: {
            type: Number,
            default: 20
        },
        size: {
            type: String,
            default: 'md'
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
            default: '&laquo'
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
        },
        role: {
            type: String,
            default: 'group'
        },
        buttonRole: {
            type: String,
            default: 'button'
        }
    }
};
</script>

<style scoped>
    .page-item {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .page-item.disabled {
        cursor: not-allowed;
        opacity: .65;
    }
</style>
