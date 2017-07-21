<template>
    <div v-if="show"
         class="alert"
         :class="classObject"
         role="alert"
         aria-live="polite"
         aria-atomic="true">
        <button type="button"
                class="close"
                data-dismiss="alert"
                aria-label="dismissLabel"
                v-if="dismissible"
                @click.stop.prevent="dismiss">
            <span aria-hidden="true">&times;</span>
        </button>
        <slot></slot>
    </div>
</template>

<script>
import { warn } from '../utils';

export default {
    data() {
        return {
            countDownTimerId: null,
            dismissCountDown: 0
        };
    },
    created() {
        if (this.state) {
            // TODO: Remove this prop entirely on next MAJOR version release.
            warn('<b-alert> "state" property is deprecated, please use "variant" property instead.');
        }
    },
    computed: {
        classObject() {
            return [this.alertVariant, { "alert-dismissible": this.dismissible }];
        },
        alertVariant() {
            return `alert-${this.state || this.variant}`;
        }
    },
    model: {
        prop: "show",
        event: "change"
    },
    props: {
        variant: {
            type: String,
            default: 'info'
        },
        state: {
            type: String,
            default: null
        },
        dismissible: {
            type: Boolean,
            default: false
        },
        dismissLabel: {
            type: String,
            default: 'Close'
        },
        show: {
            type: [Boolean, Number],
            default: false
        }
    },
    watch: {
        show() {
            this.showChanged();
        }
    },
    mounted() {
        this.showChanged();
    },
    methods: {
        dismiss() {
            this.clearCounter();
            this.$emit("change", false);
            this.$emit('dismissed');
        },
        countdown() {
            const countdown = ~~this.show - 1;

            if (countdown === 0) {
                return this.dismiss();
            }

            this.$emit("dismiss-count-down", countdown);
            this.$emit("change", countdown);
        },
        clearCounter() {
            if (this.countDownTimerId) {
                clearInterval(this.countDownTimerId);
            }
        },
        showChanged() {
            // No timer for boolean or falsey values
            // eslint-disable-next-line eqeqeq
            if (typeof this.show === "boolean" || this.show == null || this.show <= 0) {
                return;
            }

            // Show is a countdown number
            // but let's ensure it's an integer.
            this.$emit('dismiss-count-down', ~~this.show);
            // Start counter
            this.clearCounter();
            this.countDownTimerId = setInterval(this.countdown, 1000);
        }
    }
};
</script>
