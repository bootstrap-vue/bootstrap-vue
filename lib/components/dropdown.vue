<template>
    <div :class="['dropdown','btn-group',visible?'show':'',dropup?'dropup':'']">

        <b-button :class="[split?'':'dropdown-toggle']"
                  ref="button"
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
                  ref="toggle"
                  @click="toggle"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
        >
            <span class="sr-only">{{toggleText}}</span>
        </b-button>

        <div :class="['dropdown-menu',right?'dropdown-menu-right':'']"
             ref="menu"
             tabindex="-1"
             @keydown.esc="onEsc($event)"
             @keydown.up="onKeyMove($event,true)"
             @keydown.down="onKeyMove($event,false)"
             @keydown.tab="toggle"
        >
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
            },
            closeOnEsc: {
                type: Boolean,
                default: true
            },
            toggleText: {
                type: String,
                default: 'Toggle Dropdown'
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
                if (this.visible) {
                    // focus the dropdown-menu
                    this.$refs.menu.focus();
                }
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
            },
            onEsc(e) {
                if (!this.visible || !this.closeOnEsc) {
                    return;
                }
                this.visble = false;
                // Return focus to button/toggle
                (this.split ? this.$refs.toggle : this.$refs.button).focus();
                // In case dropdown inside Modal
                e.stopPropagation();
            },
            onKeyMove(e, up) {
                if (!this.visible || this.disabled) {
                    return;
                }
                // get current list of enabled dropdown-items
                // if ES6 then items = [...this.$refs.menu.querySelectorAll('.dropdown-item:not(.disabled)')]
                var items = [].slice.call(this.$refs.menu.querySelectorAll('.dropdown-item:not(.disabled)'));
                if (!items.length) {
                    return;
                }
                items.forEach(function(i) {
                    // ensure dropdown-items are not in tab sequence, but still focusable
                    i.setAttribute('tabindex','-1');
                }
                var index = items.indexOf(e.target);
                if (up) {
                    index--;
                } else if (index < items.length) {
                    index++;
                }
                if (index < 0) {
                    index = 0;
                }
                items[index].focus();
            }
        }
    };

</script>
