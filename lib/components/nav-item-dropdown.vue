<template>
    <li :class="{'nav-item': true, show: visible,dropdown: !dropup, dropup: dropup}">
        <a @click.stop.prevent="toggle($event)"
           :class="['nav-link', dropdownToggle]"
           href="" aria-haspopup="true"
           :aria-expanded="visible"
           :disabled="disabled">
            <slot name="text">{{ text }}</slot>
        </a>
        <div :class="{'dropdown-menu': true, 'dropdown-menu-right': rightAlignment}">
            <slot></slot>
        </div>
    </li>
</template>

<script>
    import clickOut from '../mixins/clickout';

    export default {
        mixins: [
            clickOut
        ],
        data() {
            return {
                visible: false
            };
        },
        computed: {
            dropdownToggle() {
                return this.caret ? 'dropdown-toggle' : '';
            }
        },
        props: {
            caret: {
                type: Boolean,
                default: true
            },
            text: {
                type: String,
                default: ''
            },
            dropup: {
                type: Boolean,
                default: false
            },
            rightAlignment: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            class: ['class']
        },
        created() {
            // To keep one dropdown opened at page
            this.$root.$on('shown::dropdown', el => {
                if (el !== this) {
                    this.close();
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
            open() {
                this.visible = true;
            },
            close() {
                this.visible = false;
            },
            clickOutListener() {
                this.close();
            }
        }
    };
</script>
