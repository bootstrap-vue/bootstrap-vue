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
import bLink, { pickLinkProps } from './link';
import { assign } from '../utils/object';
import { paginationMixin } from '../mixins';

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
    // Router specific props
    routerProps
);

export default {
    components: { bLink },
    mixins: [ paginationMixin ],
    props,
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
                href: typeof link === 'string' ? link : void 0,
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
        }
    }
};
</script>
