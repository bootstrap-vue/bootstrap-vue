<template>
    <ul :class="['pagination',btnSize]"
        role="group"
        tabindex="0"
        :aria-label="ariaLabel ? ariaLabel : null"
        @focusin.self="focusCurrent"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"
        @keydown.shift.left.prevent="focusFirst"
        @keydown.shift.right.prevent="focusLast"
    >

        <li class="page-item">
            <span v-if="isActive(1)" class="page-link" :aria-label="labelPrevPage">
                <span aria-hidden="true">&laquo;</span>
            </span>
            <a v-else
               role="button"
               class="page-link"
               :aria-label="labelPrevPage"
               tabindex="-1"
               href="#"
               @click.prevent="isActive(1) ? _return : currentPage--"
               @keydown.enter.prevent="isActive(1) ? _return : currentPage--"
               @keydown.space.prevent="isActive(1) ? _return : currentPage--"
            ><span aria-hidden="true">&laquo;</span></a>
        <li>

        <li class="page-item" v-if="showPrev">
            <a role="button"
               :class="['page-link', isActive(1)?'active':'']"
               :aria-label="labelPage + ' 1'"
               :aria-current="isActive(1) ? 'true' : 'false'"
               :aria-posinset="1"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="currentPage = 1"
               @keydown.enter.prevent="currentPage = 1"
               @keydown.space.prevent="currentPage = 1"
            >1</a>
        </li>

        <li class="page-item" v-if="showPrev">
            <span :class="page-link">...</span>
        </li>

        <li class="page-item" v-for="_,index in pageLinks">
            <a role="button"
               :class="['page-link', isActive(index + diff)?'active':'' , isActive(index + diff)?'':'hidden-xs-down']"
               :aria-label="labelPage + ' ' + (index + diff)"
               :aria-current="isActive(index + diff) ? 'true' : 'false'"
               :aria-posinset="index + diff"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="currentPage = index + diff"
               @keydown.enter.prevent="currentPage = index + diff"
               @keydown.space.prevent="currentPage = index + diff"
            >{{index + diff}}</a>
        </li>

        <li class="page-item" v-if="showNext">
            <span class="page-link">...</span>
        </li>

        <li class="page-item" v-if="showNext">
            <a role="button"
               :class="['page-link', isActive(numberOfPages) ? 'active' : '']"
               :aria-label="labelPage + ' ' + numberOfPages"
               :aria-current="isActive(numberOfPages) ? 'true' : 'false'"
               :aria-posinset="numberOfPages"
               :aria-setsize="numberOfPages"
               tabindex="-1"
               @click.prevent="currentPage = numberOfPages"
               @keydown.enter.prevent="currentPage = numberOfPages"
               @keydown.space.prevent="currentPage = numberOfPages"
            >{{numberOfPages}}</a>
        </li>

        <li class="page-item">
            <span v-if="isActive(numberOfPages)" class="page-link" :aria-label="labelNextPage">
                <span aria-hidden="true">&raquo;</span>
            </span>
            <a v-else
               role="button"
               class="page-link""
               :aria-label="labelNextPage"
               tabindex="-1"
               @click.prevent="isActive(numberOfPages) ? _return : currentPage++"
               @keydown.enter.prevent="isActive(numberOfPages) ? _return : currentPage++"
               @keydown.space.prevent="isActive(numberOfPages) ? _return : currentPage++"
            ><span aria-hidden="true">&raquo;</span></a>
        </li>

    </ul>
</template>

<script>
    function isVisible(el) {
        return el && el.offsetWidth > 0 && el.offsetHeight > 0;
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
            getButtons() {
                const buttons = Array.prototype.slice.call(this.$el.querySelectorAll('a'));
                return buttons.filter(btn => {
                    // Return only visible buttons
                    return btn && btn.offsetWidth > 0 && btn.offsetHeight > 0;
                });
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

                // Ensure current button is focused
                this.focusCurrent();
            },
            value(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.currentPage = newValue;
                }
            }
        },
        props: {
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
