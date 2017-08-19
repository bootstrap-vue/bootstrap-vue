<template>
    <div role="progressbar"
         :class="progressBarClasses"
         :style="progressBarStyles"
         :aria-valuenow="value"
         :aria-valuemin="0"
         :aria-valuemax="max"
    >
        <slot>
            <template v-if="showProgress">{{ progress.toFixed(this.computedPrecision) }}%</template>
            <template v-else-if="showValue">{{ value.toFixed(this.computedPrecision) }}</template>
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
                    width: this.progress + '%',
                    // We enherit height and line height from parent wrapper
                    height: this.$parent.height || '1rem',
                    lineHeight: this.$parent.height || '1rem'
                };
            },
            progress() {
                const p = Math.pow(10, this.computedPrecison);
                return Math.round((100 * p * this.value) / this.max) / p;
            },
            max() {
                // We get the maximum value from the parent b-progress
                return this.$parent.max || 100;
            },
            computedVariant() {
                // Prefer our variant over parent setting
                return this.variant ? this.variant : this.$parent.variant;
            },
            computedPrecison() {
                // Prefer our precision over parent setting
                return this.precision === null ? (this.$parent.precision || 0) : this.precision;
            },
            computedStriped() {
                // Prefer our striped over parent setting
                return typeof this.striped === 'boolean' ? this.striped : this.$parent.striped;
            },
            computedAnimated() {
                // Prefer our animated over parent setting
                return typeof this.animated === 'boolean' ? this.animated : this.$parent.animated;
            },
            computedShowProgress() {
                // Prefer our showProgress over parent setting
                return typeof this.showProgress === 'boolean' ? this.showProgress : this.$parent.showProgress;
            },
            computedShowValue() {
                // Prefer our showValue over parent setting
                return typeof this.showValue === 'boolean' ? this.showVale : this.$parent.showValue;
            }
        },
        props: {
            value: {
                type: Number,
                default: 0
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
            }
        }
    };
</script>
