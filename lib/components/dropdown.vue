<template>
    <div :class="['dropdown','btn-group',visible?'show':'',dropup?'dropup':'']">

        <b-button :class="[split?'':'dropdown-toggle']"
                  @click="click"
                  aria-haspopup="true"
                  :aria-expanded="visible"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled">
            <slot name="text">{{text}}</slot>
        </b-button>

        <b-button class="dropdown-toggle dropdown-toggle-split"
                  v-if="split"
                  @click="toggle"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
        >
            <span class="sr-only">Toggle Dropdown</span>
        </b-button>

        <div :class="['dropdown-menu',right?'dropdown-menu-right':'']">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    import clickOut from '../mixins/clickout';
    import bButton from './button.vue';

    export default {
        mixins: [
            clickOut
        ],
        components: {
            bButton
        },
        data() {
            return {
                visible: false
            };
        },
        props: {
            split: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: null
            },
            variant: {
                type: String,
                default: null
            },
            dropup: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            right: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.$root.$on('shown::dropdown', el => {
                if (el !== this) {
                    this.visible = false;
                }
            });
        },
        watch: {
            visible(state, old) {
                if (state === old) {
                    return; // Avoid duplicated emits
                }

                if (state) {
                    this.$root.$emit('shown::dropdown', this);
                } else {
                    this.$root.$emit('hidden::dropdown', this);
                }
            }
        },
        methods: {
            toggle() {
                this.visible = !this.visible;
            },
            clickOutListener() {
                this.visible = false;
            },
            click(e) {
                if (this.split) {
                    this.$emit('click', e);
                    this.$root.$emit('shown::dropdown', this);
                } else {
                    this.toggle();
                }
            }
        }
    };

</script>
