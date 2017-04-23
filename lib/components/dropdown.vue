<template>
    <div :class="['dropdown','btn-group',visible?'show':'',dropup?'dropup':'']">

        <b-button :class="[split?'':'dropdown-toggle',link?'btn-link':'']"
                  @click="click"
                  ref="button"
                  aria-haspopup="true"
                  :aria-expanded="visible"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled">
            <slot name="text">{{text}}</slot>
        </b-button>

        <b-button class="dropdown-toggle dropdown-toggle-split"
                  :class="[link?'btn-link':'']"
                  ref="toggle"
                  v-if="split"
                  @click="toggle"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
        ><span class="sr-only">{{toggleText}}</span></b-button>

        <div ref="menu"
             role="menu"
             :class="['dropdown-menu',right?'dropdown-menu-right':'']"
             @keydown.esc.stop.prevent="onEsc"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
        ><slot></slot></div>
    </div>
</template>

<script>
    import clickOut from '../mixins/clickout';
    import bButton from './button.vue';

    const ITEM_SELECTOR = '.dropdown-item,.dropdown-header,.dropdown-divider';
    
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
            toggleText: {
                type: String,
                default: 'Toggle Dropdown'
            }
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
            link: {
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
                if (this.visible) {
                    // Focus first non-dsabled item
                    const first = this.$refs.menu.querySelector(ITEM_SELECTOR);
                    if (first) {
                        first.focus();
                    }
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
                this.visible = false;
                // Return focus to original button
                (this.split ? this.$refs.toggle : this.$refs.button).focus();
            },
            onNext(e, up) {
                if (!this.visible) {
                    return;
                }
                const items = [...this.$refs.menu.querySelectorAll(ITEM_SELECTOR)];
                if (items.length < 1) {
                    return;
                }
                let index = items.indexOf(e.taqrget);
                if (index < 0) {
                    return;
                }
                if (up) {
                    index--;
                } else if (index < items.length - 2) {
                    index++
                }
                if (index < 0) {
                    index = 0;
                }
                items[index].focus();
            }
        }
    };

</script>
