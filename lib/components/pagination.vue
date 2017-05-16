<template>
    <div :class="['btn-group','pagination',btnSize]" 
         role="group"
         tabindex="0"
         :aria-label="ariaLabel ? ariaLabel : null"
         @focusin.self="focusCurrent"
         @keydown.left.prevent="focusPrev"
         @keydown.right.prevent="focusNext"
         @keydown.shift.left.prevent="focusFirst"
         @keydown.shift.right.prevent="focusLast"
    >

        <button type="button"
                :class="['btn','btn-'+secondaryVariant]"
                :disabled="isActive(1)"
                :aria-label="labelPrev"
                tabindex="-1"
                ref="buttonPrev"
                @click.prevent="isActive(1) ? _return : currentPage--"
        >
            <span aria-hidden="true">&laquo;</span>
        </button>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant,isActive(1)?'active':'']"
                :aria-label="labelPage + ' 1'"
                :aria-current="isActive(1) ? 'true' : 'false'"
                :aria-setsize="numberOfPages"
                :aria-posinset="1"
                tabindex="-1"
                ref="buttonFirst"
                v-if="showPrev"
                @click.prevent="currentPage = 1"
        >1</button>

        <span :class="['btn','btn-'+secondaryVariant]" v-show="showPrev">...</span>

        <button type="button"
                :class="['btn',btnVariant(index),isActive(index + diff)?'active':'',isActive(index + diff)?'':'hidden-xs-down']"
                :aria-label="labelPage + ' ' + (index + diff)"
                :aria-current="isActive(index + diff) ? 'true' : 'false'"
                :aria-setsize="numberOfPages"
                :aria-posinset="index + diff"
                tabindex="-1"
                ref="buttonPages"
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
                tabindex="-1"
                ref="buttonLast"
                v-if="showNext"
                @click.prevent="currentPage = numberOfPages"
        >{{numberOfPages}}</button>

        <button type="button"
                :class="['btn','btn-'+secondaryVariant]"
                :disabled="isActive(numberOfPages)"
                :aria-label="labelNext"
                tabindex="-1"
                ref="buttonNext"
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
            btnVariant(index) {
                return (index + this.diff === this.currentPage) ? `btn-${this.variant}` : `btn-${this.secondaryVariant}`;
            },
            getButtons() {
                let buttons = [this.$refs.buttonPrev];
                if (this.showPrev) {
                    buttons.push(this.$refs.buttonFirst);
                }
                buttons = buttons.concat(this.$refs.buttonPages);
                if (this.showNext) {
                    buttons.push(this.$refs.buttonLast);
                }
                buttons.push(this.$refs.buttonNext);
                return buttons;
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
