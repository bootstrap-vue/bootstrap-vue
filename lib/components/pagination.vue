<template>
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
                <a class="page-link"
                   :aria-label="labelFirstPage"
                   :aria-controls="ariaControls || null"
                   role="menuitem"
                   href="#"
                   tabindex="-1"
                   @click.prevent="setPage($event, 1)"
                   @keydown.enter.prevent="setPage($event, 1)"
                   @keydown.space.prevent="setPage($event, 1)"
                ><span aria-hidden="true" v-html="firstText"></span></a>
            </li>
        </template>

        <!-- Goto Previous page button -->
        <li v-if="isActive(1) || disabled" class="page-item disabled" role="none presentation" aria-hidden="true">
            <span class="page-link" v-html="prevText"></span>
        </li>
        <li v-else class="page-item" role="none presentation">
            <a class="page-link"
               :aria-label="labelPrevPage"
               :aria-controls="ariaControls || null"
               role="menuitem"
               href="#"
               tabindex="-1"
               @click.prevent="setPage($event, currentPage - 1)"
               @keydown.enter.prevent="setPage($event, currentPage - 1)"
               @keydown.space.prevent="setPage($event, currentPage - 1)"
            ><span aria-hidden="true" v-html="prevText"></span></a>
        </li>

        <!-- First Ellipsis Bookend -->
        <li v-if="showFirstDots" class="page-item disabled d-none d-sm-flex" role="separator">
            <span class="page-link" v-html="ellipsisText"></span>
        </li>

        <!-- Pages links -->
        <li v-for="page in pageList" role="none presentation" :class="pageItemClasses(page)" :key="page.number">
            <a :class="pageLinkClasses(page)"
               :disabled="disabled"
               :aria-disabled="disabled ? 'true' : null"
               :aria-label="labelPage + ' ' + page.number"
               :aria-checked="isActive(page.number) ? 'true' : 'false'"
               :aria-controls="ariaControls || null"
               :aria-posinset="page.number"
               :aria-setsize="numberOfPages"
               role="menuitemradio"
               href="#"
               tabindex="-1"
               @click.prevent="setPage($event, page.number)"
               @keydown.enter.prevent="setPage($event, page.number)"
               @keydown.space.prevent="setPage($event, page.number)"
            >{{ page.number }}</a>
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
            <a class="page-link"
               :aria-label="labelNextPage"
               :aria-controls="ariaControls || null"
               role="menuitem"
               href="#"
               tabindex="-1"
               @click.prevent="setPage($event, currentPage + 1)"
               @keydown.enter.prevent="setPage($event, currentPage + 1)"
               @keydown.space.prevent="setPage($event, currentPage + 1)"
            ><span aria-hidden="true" v-html="nextText"></span></a>
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
                <a class="page-link"
                   :aria-label="labelLastPage"
                   :aria-controls="ariaControls || null"
                   role="menuitem"
                   href="#"
                   tabindex="-1"
                   @click.prevent="setPage($event, numberOfPages)"
                   @keydown.enter.prevent="setPage($event, numberOfPages)"
                   @keydown.space.prevent="setPage($event, numberOfPages)"
                ><span aria-hidden="true" v-html="lastText"></span></a>
            </li>
        </template>
    </ul>
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
import { paginationMixin } from '../mixins';
import { isVisible } from '../utils/dom';

const props = {
    perPage: {
        type: Number,
        default: 20
    },
    totalRows: {
        type: Number,
        default: 20
    },
    ariaControls: {
        type: String,
        default: null
    }
};

export default {
    mixins: [ paginationMixin ],
    props,
    computed: {
        numberOfPages() {
            const result = Math.ceil(this.totalRows / this.perPage);
            return (result < 1) ? 1 : result;
        }
    },
    methods: {
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
        }
    }
};
</script>
