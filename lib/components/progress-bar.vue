<template>
    <div role="progressbar"
         :class="progressBarClasses"
         :style="progressBarStyles"
         :aria-valuenow="value.toFixed(computedPrecision)"
         aria-valuemin="0"
         :aria-valuemax="computedMax"
    >
        <slot>
            <span v-if="label" v-html="label"></span>
            <template v-else-if="computedShowProgress">{{ progress.toFixed(computedPrecision) }}%</template>
            <template v-else-if="computedShowValue">{{ value.toFixed(computedPrecision) }}</template>
        </slot>
    </div>
</template>

<script>
    export default {
        computed: {
            progressBarClasses() {
                return [
                    'progress-bar',
                    this.computedVariant ? `bg-${this.computedVariant}` : '',
                    (this.computedStriped || this.computedAnimated) ? 'progress-bar-striped' : '',
                    this.computedAnimated ? 'progress-bar-animated' : ''
                ];
            },
            progressBarStyles() {
                return {
                    width: (100 * (this.value / this.computedMax)) + '%',
                    height: this.computedHeight,
                    lineHeight: this.computedHeight
                };
            },
            progress() {
                const p = Math.pow(10, this.computedPrecision);
                return Math.round((100 * p * this.value) / this.computedMax) / p;
            },
            computedMax() {
                // Prefer our max over parent setting
                return typeof this.max === 'number' ? this.max : (this.$parent.max || 100);
            },
            computedHeight() {
                // Prefer parent height over our height
                return this.$parent.height || this.height || '1rem';
            },
            computedVariant() {
                // Prefer our variant over parent setting
                return this.variant || this.$parent.variant;
            },
            computedPrecision() {
                // Prefer our precision over parent setting
                return typeof this.precision === 'number' ? this.precision : (this.$parent.precision || 0);
            },
            computedStriped() {
                // Prefer our striped over parent setting
                return typeof this.striped === 'boolean' ? this.striped : (this.$parent.striped || false);
            },
            computedAnimated() {
                // Prefer our animated over parent setting
                return typeof this.animated === 'boolean' ? this.animated : (this.$parent.animated || false);
            },
            computedShowProgress() {
                // Prefer our showProgress over parent setting
                return typeof this.showProgress === 'boolean' ? this.showProgress : (this.$parent.showProgress || false);
            },
            computedShowValue() {
                // Prefer our showValue over parent setting
                return typeof this.showValue === 'boolean' ? this.showValue : (this.$parent.showValue || false);
            }
        },
        props: {
            value: {
                type: Number,
                default: 0
            },
            label: {
                type: String,
                value: null
            },
            // $parent prop values take precedence over the following props
            // Which is why they are defaulted to null
            max: {
                type: Number,
                default: null
            },
            precision: {
                type: Number,
                default: null
            },
            variant: {
                type: String,
                default: null
            },
            striped: {
                type: Boolean,
                default: null
            },
            animated: {
                type: Boolean,
                default: null
            },
            showProgress: {
                type: Boolean,
                default: null
            },
            showValue: {
                type: Boolean,
                default: null
            },
            height: {
                type: String,
                default: null
            }
        }
    };
</script>
