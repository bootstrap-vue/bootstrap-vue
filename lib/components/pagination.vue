<template>
    <div :class="['btn-group','pagination',btnSize]" 
         role="group"
         :aria-label="ariaLabel ? ariaLabel : null"
    >

        <button type="button"
                :class="['btn','btn-'+secondaryVariant]"
                :disabled="currentPage == 1 "
                :aria-label="labelPrevPage"
                @click.prevent="(currentPage == 1) ? _return : currentPage--"
        >
            <span aria-hidden="true">&laquo;</span>
        </button>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,isActive(1)?'active':'']"
                :aria-label="labelPage + ' 1'"
                :aria-current="isActive(1) ? 'true' : 'false'"
                :aria-setsize="numberOfPages"
                :aria-posinset="1"
                @click.prevent="currentPage = 1"
                v-show="showPrev"
        >1</button>

        <span:class="['btn','btn-'+secondaryVariant]" v-show="showPrev">...</span>

        <button type="button"
                class="btn"
                :class="[btnVariant(index),isActive(index + diff)?'active':'',isActive(index + diff)?'':'hidden-xs-down']"
                :aria-label="labelPage + ' ' + (index + diff)"
                :aria-current="isActive(index + diff) ? 'true' : 'false'"
                :aria-setsize="numberOfPages"
                :aria-posinset="index + diff"
                v-for="_,index in pageLinks"
                @click.prevent="currentPage = index + diff"
        >{{index + diff}}</button>

        <span :class="['btn','btn-'+secondaryVariant]" v-show="showNext">...</span>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,isActive(numberOfPages) ? 'active' : '']"
                :aria-label="labelPage + ' ' + numberOfPages"
                :aria-current="isActive(numberOfPages) ? 'true' : 'false'"
                :aria-setsize="numberOfPages"
                :aria-posinset="numberOfPages"
                v-show="showNext"
                @click.prevent="currentPage = numberOfPages"
        >{{numberOfPages}}</button>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant]"
                :disabled="currentPage == numberOfPages"
                :aria-label="labelNextPage"
                @click.prevent="isActive(numberOfPages) ? _return : currentPage++"
        >
            <span aria-hidden="true">&raquo;</span>
        </button>

    </div>
</template>

<script>
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
                return !this.size || this.size === `default` ? `` : `pagination-${this.size}`;
            },
            isActive(page) {
                return page === currentPage ? true : false;
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
            btnVariant(index) {
                return (index + this.diff === this.currentPage) ? `btn-${this.variant}` : `btn-${this.secondaryVariant}`;
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
            variant: {
                type: String,
                default: 'primary'
            },
            secondaryVariant: {
                type: String,
                default: 'secondary'
            },
            ariaLabel {
                type: String,
                default: 'Pagination'
            },
            labelPrevPage: {
                type: String,
                default: 'First Page'
            },
            labelNextPage: {
                type: String,
                default: 'Last Page'
            },
            labelPage: {
                type: String,
                default: 'Page'
            }
        }
    };

</script>
