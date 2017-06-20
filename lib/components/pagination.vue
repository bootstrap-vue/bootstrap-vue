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

        <!-- Previous button -->
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

        <!-- Page 1 -->
        <li :class="pageItemClasses(1, false)" v-if="showFirstPage">
            <a :role="buttonRole"
               :class="pageLinkClasses(1)"
               :disabled="disabled"
               :aria-disabled="disabled ? 'true' : 'false'"
               :aria-label="labelPage + ' 1'"
               :aria-current="isActive(1) ? 'true' : 'false'"
               :aria-posinset="1"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="setPage($event, 1)"
               @keydown.enter.prevent="setPage($event, 1)"
               @keydown.space.prevent="setPage($event, 1)"
            >1</a>
        </li>

        <!-- First Ellipsis -->
        <li v-if="showFirstDots" class="page-item disabled" role="seperator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Intermediate pages -->
        <li v-for="(_,idx) in pageLinks" :class="pageItemClasses(idx + offset, true)" :key="idx+offset">
            <a :role="buttonRole"
               :class="pageLinkClasses(idx + offset)"
               :disabled="disabled"
               :aria-disabled="disabled ? 'true' : 'false'"
               :aria-label="labelPage + ' ' + (idx + offset)"
               :aria-current="isActive(idx + offset) ? 'true' : 'false'"
               :aria-posinset="idx + offset"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="setPage($event, idx + offset)"
               @keydown.enter.prevent="setPage($event, idx + offset)"
               @keydown.space.prevent="setPage($event, idx + offset)"
            >{{idx + offset}}</a>
        </li>

        <!-- Last Ellipsis -->
        <li v-if="showLastDots" class="page-item disabled" role="seperator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Last Page -->
        <li :class="pageItemClasses(numberOfPages, false)" v-if="showLastPage">
            <a :role="buttonRole"
               :class="pageLinkClasses(numberOfPages)"
               :disabled="disabled"
               :aria-disabled="disabled ? 'true' : 'false'"
               :aria-label="labelPage + ' ' + numberOfPages"
               :aria-current="isActive(numberOfPages) ? 'true' : 'false'"
               :aria-posinset="numberOfPages"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="setPage($event, numberOfPages)"
               @keydown.enter.prevent="setPage($event, numberOfPages)"
               @keydown.space.prevent="setPage($event, numberOfPages)"
            >{{numberOfPages}}</a>
        </li>

        <!-- Next page -->
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

    </ul>
</template>

<script>
// Determine if an HTML element is visible - Faster than CSS check
function isVisible(el) {
    return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
}

export default {
    data() {
        return {
            offset: 1,
            showFirstPage: false,
            showFirstDots: false,
            showLastPage: false,
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
        pageLinks() {
            // Sanity checks
            if (this.currentPage > this.numberOfPages) {
                this.currentPage = this.numberOfPages;
            } else if (this.currentPage < 1) {
                this.currentPage = 1;
            }

            // Defaults
            this.offset = 1;
            this.showFirstPage = false;
            this.showFirstDots = false;
            this.showLastPage = false;
            this.showLastDots = false;

            // Special case
            if (this.numberOfPages <= this.limit) {
                return this.numberOfPages;
            }

            // Special case
            if (this.limit === 1 || this.limit === 2) {
                this.offset = this.currentPage;
                return 1;
            }

            // Special case
            if (this.limit === 3 || this.limit === 4) {
                this.showFirstDots = true;
                this.showLastDots = true;
                this.offset = this.currentPage;
                return 1;
            }

            if (this.currentPage <= this.limit - 2) {
                // We are at the beginning of the list
                this.showLastPage = true;
                this.showLastDots = true;
                this.offset = 1;
                return this.limit - 2;
            }

            if (this.currentPage > this.numberOfPages - this.limit + 2) {
                // We are at the end of the list
                this.showFirstPage = true;
                this.showFirstDots = true;
                this.offset = this.numberOfPages - this.limit + 3;
                return this.limit - 2;
            }

            // We are somewhere in the middle
            this.showFirstPage = true;
            this.showFirstDots = true;
            this.showLastPage = true;
            this.showLastDots = true;
            limit = this.limit - 4;
            this.offset = this.currentPage - Math.floor(limit / 2);
            return limit;
        }
    },
    methods: {
        isActive(page) {
            return page === this.currentPage;
        },
        pageItemClasses(num, hideXs) {
            const active = this.isActive(num);
            return [
                'page-item',
                this.disabled ? 'disabled' : '',
                active ? 'active' : '',
                (hideXs && !active) ? 'hidden-xs-down' : ''
            ];
        },
        pageLinkClasses(num) {
            const active = this.isActive(num);
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
        ariaLabel: {
            type: String,
            default: 'Pagination'
        },
        labelPrevPage: {
            type: String,
            default: 'Previous Page'
        },
        prevText: {
            type: String,
            default: '&lt;'
        },
        labelNextPage: {
            type: String,
            default: 'Next Page'
        },
        nextText: {
            type: String,
            default: '&gt;'
        },
        labelPage: {
            type: String,
            default: 'Page'
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
