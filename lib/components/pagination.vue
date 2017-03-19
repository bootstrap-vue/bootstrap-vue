<template>
    <div class="btn-group pagination" role="group" aria-label="Pagination">

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,btnSize]"
                :disabled="currentPage == 1 "
                @click.prevent="(currentPage == 1) ? _return : currentPage--">
            <span aria-hidden="true">&laquo;</span>
        </button>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,btnSize,currentPage === 1 ?  'active' : '']"
                @click.prevent="currentPage = 1"
                v-show="showPrev">1
        </button>

        <span :class="['btn','btn-'+secondaryVariant,btnSize]" v-show="showPrev">...</span>

        <button type="button"
                :class="['btn',
                btnSize,
                btnVariant(index),
                index + diff === currentPage ? 'active' : '',
                index + diff !== currentPage ? 'hidden-xs-down' : '']"
                v-for="(item,index) in pageLinks"
                @click.prevent="currentPage = index + diff">{{index + diff}}
        </button>

        <span :class="['btn','btn-'+secondaryVariant,btnSize]" v-show="showNext">...</span>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,btnSize,numberOfPages === currentPage ? 'active' : '']"
                v-show="showNext"
                @click.prevent="currentPage = numberOfPages">{{numberOfPages}}
        </button>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,btnSize]"
                :disabled="currentPage == numberOfPages"
                @click.prevent="(currentPage == numberOfPages) ? _return : currentPage++">
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
                return !this.size || this.size === `default` ? `` : `btn-${this.size}`;
            },
            pageLinks() {
                let result = this.limit;
                if (this.currentPage > this.numberOfPages) {
                    this.currentPage = 1;
                }
                this.diff = 1;
                this.showPrev = false;
                this.showNext = false;
                // If less pages than limit just show this pages
                if (this.numberOfPages <= this.limit) {
                    return this.numberOfPages;
                }
                // If at the beggining of the list or at the end show full number of pages within limit - 2
                // -2 is reserves space for two buttons: "..." and "first/last button"
                if (this.currentPage <= this.limit - 2) {
                    this.diff = 1;
                    this.showNext = true;
                    result = this.limit - 2;
                }
                // At the end of the range
                if (this.currentPage > this.numberOfPages - this.limit + 2) {
                    this.diff = this.numberOfPages - this.limit + 3;
                    this.showPrev = true;
                    result = this.limit - 2;
                }
                // If somehere in the middle show just limit - 4 links in the middle and one button on the left with "..." and on button on the right preceeded with "..."
                if (this.currentPage >= this.limit - 2 && this.currentPage <= this.numberOfPages - this.limit + 2) {
                    this.diff = this.currentPage - 1;
                    this.showPrev = true;
                    this.showNext = true;
                    result = this.limit - 4;
                }
                return result;
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
            currentPage(newPage) {
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
                default: 7
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
            }
        }
    };

</script>
