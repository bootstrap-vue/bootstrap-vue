<template>
    <div v-if="localShow"
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
            dismissCountDown: 0,
            localShow: this.show
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
        show(newValue) {
            // Prop validation can't guarantee integers,
            // so use fast bitwise integer casting `~~`
            this.localShow = typeof newValue === "number" ? ~~newValue : newValue
            this.showChanged();
        }
    },
    mounted() {
        this.showChanged();
    },
    methods: {
        dismiss() {
            this.clearCounter();
            this.localShow = false;
            this.$emit("change", this.localShow);
            this.$emit('dismissed');
        },
        countdown() {
            this.localShow--;

            if (this.localShow < 1) {
                return this.dismiss();
            }

            this.$emit("dismiss-count-down", this.localShow);
            this.$emit("change", this.localShow);
        },
        clearCounter() {
            if (this.countDownTimerId) {
                clearInterval(this.countDownTimerId);
            }
        },
        showChanged() {
            // Return early for boolean, or numbers that can't be counted down.
            // Let prop validation take care of non Boolean/Number types.
            // eslint-disable-next-line eqeqeq
            if (typeof this.localShow === "boolean" || (typeof this.localShow === "number" && this.localShow < 1)) {
                return;
            }

            // Show is a countdown number
            // but let's ensure it's an integer.
            this.$emit('dismiss-count-down', this.localShow);
            // Remove any previous interval registered.
            this.clearCounter();
            // Start counter
            this.countDownTimerId = setInterval(this.countdown, 1000);
        }
    }
};
</script>
