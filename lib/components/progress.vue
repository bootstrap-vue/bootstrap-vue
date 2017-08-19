<template>
    <div class="progress" :style="progressStyles">
        <slot>
            <b-progress-bar :value="value"></b-progress-bar>
        </slot>
    </div>
</template>

<script>
    import bProgressBar from './progress-bar.vue';

    export default {
        components: { bProgressBar },
        computed: {
            progressStyles() {
                return {
                    height: this.height || '1rem',
                    lineHeight: this.height || '1rem'
                };
            }
        },
        props: {
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
            value: {
                type: Number,
                default: 0
            }
        }
    };
</script>
