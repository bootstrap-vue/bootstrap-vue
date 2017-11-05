<template>
    <div class="progress" :style="progressHeight">
        <slot>
            <b-progress-bar :value="value"
                            :max="max"
                            :precision="precision"
                            :variant="variant"
                            :animated="animated"
                            :striped="striped"
                            :show-progress="showProgress"
                            :show-value="showValue"
            ></b-progress-bar>
        </slot>
    </div>
</template>

<style>
    /*
     * Temporary fix, as BS V4.beta.2 mistakenly removed progress-bar transition.
     * This should be able to be removed once V4.beta.3 is released.
     */
    .progress-bar {
        transition: width .6s ease;
    }
</style>

<script>
    import bProgressBar from './progress-bar.vue';

    export default {
        components: { bProgressBar },
        props: {
            // These props can be inherited via the child b-progress-bar(s)
            variant: {
                type: String,
                default: null
            },
            striped: {
                type: Boolean,
                default: false
            },
            animated: {
                type: Boolean,
                default: false
            },
            height: {
                type: String,
                default: '1rem'
            },
            precision: {
                type: Number,
                default: 0
            },
            showProgress: {
                type: Boolean,
                default: false
            },
            showValue: {
                type: Boolean,
                default: false
            },
            max: {
                type: Number,
                default: 100
            },
            // This prop is not inherited by child b-progress-bar(s)
            value: {
                type: Number,
                default: 0
            }
        },
        computed: {
            progressHeight() {
              return this.height ? { height: this.height } : {};
            }
        }
    };
</script>
