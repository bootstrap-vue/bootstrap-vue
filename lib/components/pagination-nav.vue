<template>
<nav>
    <ul :class="['pagination',btnSize,alignment]"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-label="ariaLabel ? ariaLabel : null"
        role="menubar"
        @focusin.self="focusCurrent"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"
        @keydown.shift.left.prevent="focusFirst"
        @keydown.shift.right.prevent="focusLast"
    >

        <!-- Goto First Page button -->
        <template v-if="!hideGotoEndButtons">
            <li v-if="isActive(1) || disabled" class="page-item disabled" role="none presentation" aria-hidden="true">
                <span class="page-link" v-html="firstText"></span>
            </li>
            <li v-else class="page-item" role="none presentation">
                <b-link class="page-link"
                        v-bind="linkProps(1)"
                        :aria-label="labelFirstPage"
                        role="menuitem"
                        tabindex="-1"
                        @click="onClick(1)"
                ><span aria-hidden="true" v-html="firstText"></span></b-link>
            </li>
        </template>

        <!-- Goto Previous page button -->
        <li v-if="isActive(1) || disabled" class="page-item disabled" role="none presentation" aria-hidden="true">
            <span class="page-link" v-html="prevText"></span>
        </li>
        <li v-else class="page-item" role="none presentation">
            <b-link class="page-link"
                    v-bind="linkProps(currentPage - 1)"
                    :aria-label="labelPrevPage"
                    role="menuitem"
                    tabindex="-1"
                    @click="onClick(currentPage - 1)"
            ><span aria-hidden="true" v-html="prevText"></span></b-link>
        </li>

        <!-- First Ellipsis Bookend -->
        <li v-if="showFirstDots" class="page-item disabled d-none d-sm-flex" role="separator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Pages links -->
        <li v-for="page in pageList" role="none presentation" :class="pageItemClasses(page)" :key="page.number">
            <span v-if="disabled" class="page-link">{{ page.number }}</span>
            <b-link v-else
                    v-bind="linkProps(page.number)"
                    :class="pageLinkClasses(page)"
                    :disabled="disabled"
                    :aria-disabled="disabled ? 'true' : null"
                    :aria-label="labelPage + ' ' + page.number"
                    :aria-checked="isActive(page.number) ? 'true' : 'false'"
                    :aria-posinset="page.number"
                    :aria-setsize="numberOfPages"
                    role="menuitemradio"
                    tabindex="-1"
                    @click="onClick(page.number)"
                    v-html="makePage(page.number)"
            ></b-link>
        </li>

        <!-- Last Ellipsis Bookend -->
        <li v-if="showLastDots" class="page-item disabled d-none d-sm-flex" role="separator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Goto Next page -->
        <li v-if="isActive(numberOfPages) || disabled" class="page-item disabled" role="none presentation" aria-hidden="true">
            <span class="page-link" v-html="nextText"></span>
        </li>
        <li v-else class="page-item" role="none presentation">
            <b-link class="page-link"
                    v-bind="linkProps(currentPage + 1)"
                    :aria-label="labelNextPage"
                    role="menuitem"
                    tabindex="-1"
                    @click="onClick(currentPage + 1)"
            ><span aria-hidden="true" v-html="nextText"></span></b-link>
        </li>

        <!-- Goto Last page -->
        <template v-if="!hideGotoEndButtons">
            <li v-if="isActive(numberOfPages) || disabled"
                class="page-item disabled"
                role="none presentation"
                aria-hidden="true"
            >
                <span class="page-link" v-html="lastText"></span>
            </li>
            <li v-else class="page-item" role="none presentation">
                <b-link class="page-link"
                        v-bind="linkProps(numberOfPages)"
                        :aria-label="labelLastPage"
                        role="menuitem"
                        @click="onClick(numberOfPages)"
                ><span aria-hidden="true" v-html="lastText"></span></b-link>
            </li>
        </template>
    </ul>
</nav>
</template>

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

<script>
import bLink from './link';
import { pickLinkProps } from '../mixins/link';
import { from as arrayFrom } from '../utils/array'
import range from '../utils/range'
import { assign } from '../utils/object';

// Determine if an HTML element is visible - Faster than CSS check
function isVisible(el) {
    return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
}

// Make an array of N to N+X
function makePageArray(startNum, numPages) {
    return range(numPages).map(function(value, index){
        return { number: index + startNum, className: null };
    });
}

// Threshold of limit size when we start/stop showing ellipsis
const ELLIPSIS_THRESHOLD = 3;

// Props needed for router links
const routerProps = pickLinkProps('activeClass','exactActiveClass','append','exact','replace','target','rel');

// Props object
const props = assign(
    // pagination-nav specific props
    {
        numberOfPages: {
            type: Number,
            default: 1
        },
        baseUrl: {
            type: String,
            default: '/'
        },
        useRouter: {
            type: Boolean,
            default: false
        },
        linkGen: {
            type: Function,
            default: null
        },
        pageGen: {
            type: Function,
            default: null
        }
    },
    // pagination common props
    {
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
    },
    // Router specific props
    routerProps
);

export default {
    components: { bLink },
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
        onClick(pageNum) {
            this.currentPage = pageNum;
        },
        makeLink(pagenum) {
            if (this.linkGen && typeof this.linkGen === 'function') {
                return this.linkGen(pagenum);
            }
            const link = `${this.baseUrl}${pagenum}`;
            return this.useRouter ? { path: link } : link;
        },
        makePage(pagenum) {
            if (this.pageGen && typeof this.pageGen === 'function') {
                return this.pageGen(pagenum);
            }
            return pagenum;
        },
        linkProps(pagenum) {
            const link = this.makeLink(pagenum);
            let props = {
                href: typeof link === 'string' ? link : null,
                target: this.target || null,
                rel: this.rel || null,
                disabled: this.disabled
            };
            if (this.useRouter || typeof link === 'object') {
                props = assign(props, {
                    to: link,
                    exact: this.exact,
                    activeClass: this.activeClass,
                    exactActiveClass: this.exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            }
            return props;
        },
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
            const buttons = arrayFrom(this.$el.querySelectorAll('a.page-link'));
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
    }
};
</script>
