<template>
    <ul :class="['pagination',btnSize]"
        role="group"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-label="ariaLabel ? ariaLabel : null"
        @focusin.self="focusCurrent"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"
        @keydown.shift.left.prevent="focusFirst"
        @keydown.shift.right.prevent="focusLast"
    >

        <li v-if="isActive(1) || disabled" class="page-item disabled" aria-hidden="true">
            <span class="page-link">&laquo;</span>
        </li>
        <li v-else class="page-item">
            <a role="button"
               class="page-link"
               :aria-label="labelPrevPage"
               tabindex="-1"
               href="#"
               @click.prevent="setPage($event, currentPage - 1)"
               @keydown.enter.prevent="setPage($event, currentPage - 1)"
               @keydown.space.prevent="setPage($event, currentPage - 1)"
            ><span aria-hidden="true">&laquo;</span></a>
        <li>

        <li  v-if="showPrev" class="page-item">
            <a role="button"
               :class="['page-link', {disabled}, isActive(1)?'active':'']"
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

        <li v-if="showPrev" class="page-item disabled" role="seperator">
            <span :class="page-link">&hellip;</span>
        </li>

        <li class="page-item" v-for="_,index in pageLinks" :key="index">
            <a role="button"
               :class="['page-link',{disabled},isActive(index + diff)?'active':'',isActive(index + diff)?'':'hidden-xs-down']"
               :disabled="disabled"
               :aria-disabled="disabled ? 'true' : 'false'"
               :aria-label="labelPage + ' ' + (index + diff)"
               :aria-current="isActive(index + diff) ? 'true' : 'false'"
               :aria-posinset="index + diff"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="setPage($event, index + diff)"
               @keydown.enter.prevent="setPage($event, index + diff)"
               @keydown.space.prevent="setPage($event, index + diff)"
            >{{index + diff}}</a>
        </li>

        <li v-if="showNext" class="page-item disabled" role="seperator">
            <span class="page-link">&hellip;</span>
        </li>

        <li class="page-item" v-if="showNext">
            <a role="button"
               :class="['page-link', {disabled}, isActive(numberOfPages) ? 'active' : '']"
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

        <li v-if="isActive(numberOfPages) || disabled" class="page-item disabled" aria-hidden="true">
            <span class="page-link">&raquo;</span>
        </li>
        <li v-else class="page-item">
            <a role="button"
               class="page-link"
               :aria-label="labelNextPage"
               tabindex="-1"
               @click.prevent="setPage($event, currentPage + 1)"
               @keydown.enter.prevent="setPage($event, currentPage + 1)"
               @keydown.space.prevent="setPage($event, currentPage + 1)"
            ><span aria-hidden="true">&raquo;</span></a>
        </li>

    </ul>
</template>

<script>
    function isVisible(el) {
        return el && (el.offsetWidth > 0 || el.offsetHeight > 0);
    }

    export default {
        data() {
            return {
                diff: 1,
                showPrev: false,
                showNext: false,
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
                if (this.currentPage > this.numberOfPages) {
                    this.currentPage = 1;
                }

                // Defaults
                this.diff = 1;
                this.showPrev = false;
                this.showNext = false;

                // If less pages than limit just show this pages
                if (this.numberOfPages <= this.limit) {
                    return this.numberOfPages;
                }

                // If at the beginning of the list
                if (this.currentPage <= this.limit - 2) {
                    this.diff = 1;
                    this.showNext = true;
                    return this.limit - 2;
                }

                // If at the end of the list
                if (this.currentPage > this.numberOfPages - this.limit + 2) {
                    this.diff = this.numberOfPages - this.limit + 3;
                    this.showPrev = true;
                    return this.limit - 2;
                }

                // Else we are somewhere in the middle
                this.diff = this.currentPage - 1;
                this.showPrev = this.currentPage >= this.limit;
                this.showNext = this.currentPage <= this.numberOfPages - this.limit + 1;
                return this.limit;
            }
        },
        methods: {
            isActive(page) {
                return page === this.currentPage;
            },
            setPage(e, num) {
                if (disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.currentPage = num;
                this.$nextTick(() => {
                    // Keep the current button focused if possible
                    if (isVisible(e.target) && e.target.focus) {
                        e.target.focus();
                    } else {
                        this.focusCurrent();
                    }
                });
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
            },
            _return() {

            }
        },
        watch: {
            currentPage(newPage, oldPage) {
                if (newPage === oldPage) {
                    return;
                }

                this.$emit('input', newPage);
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
                default: 3
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
            labelNextPage: {
                type: String,
                default: 'Next Page'
            },
            labelPage: {
                type: String,
                default: 'Page'
            }
        }
    };

</script>

<style scoped>
    .page-item.disabled {
        cursor: not-allowed;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        opacity: .65;
    }
</style>
