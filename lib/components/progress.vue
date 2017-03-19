<template>
    <div class="progress">
        <transition>
            <div role="progressbar"
                 :class="classObject"
                 :aria-valuenow="value"
                 :aria-valuemin="0"
                 :aria-valuemax="max"
                 :style="styleObject"
            >
                <slot>
                    <template v-if="showProgress">{{progress}}%</template>
                    <template v-else-if="showValue">{{value}}</template>
                </slot>
            </div>
        </transition>
    </div>
</template>

<style>
    .progress-bar {
        transition: all .5s;
    }
</style>

<script>
    export default {
        computed: {
            classObject() {
                return [
                    'progress-bar',
                    this.progressVariant,
                    (this.striped || this.animated) ? 'progress-bar-striped' : '',
                    this.animated ? 'progress-bar-animated' : ''
                ];
            },
            styleObject() {
                return {
                    width: this.progress + '%'
                };
            },
            progressVariant() {
                return this.variant ? `bg-${this.variant}` : null;
            },
            progress() {
                const p = Math.pow(10, this.precision);
                return Math.round((100 * p * this.value) / this.max) / p;
            }
        },
        props: {
            striped: {
                type: Boolean,
                default: false
            },
            animated: {
                type: Boolean,
                default: false
            },
            precision: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            variant: {
                type: String,
                default: null
            },
            showProgress: {
                type: Boolean,
                default: false
            },
            showValue: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
