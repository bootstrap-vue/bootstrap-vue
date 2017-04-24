<template>
    <div :class="['dropdown','btn-group',visible?'show':'',dropup?'dropup':'']">

        <b-button :class="[split?'':'dropdown-toggle',link?'btn-link':'']"
                  @click="click"
                  ref="button"
                  :id="'b_dropdown_button_' + _uid"
                  :aria-haspopup="split ? null : 'true'"
                  :aria-expanded="split ? null : (visible ? 'true' : 'false')"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled">
            <slot name="text">{{text}}</slot>
        </b-button>

        <b-button class="dropdown-toggle dropdown-toggle-split"
                  :class="[link?'btn-link':'']"
                  ref="toggle"
                  v-if="split"
                  :aria-haspopup="split ? 'true' : null"
                  :aria-expanded="split ? (visible ? 'true' : 'false') : null"
                  @click="toggle"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
        ><span class="sr-only">{{toggleText}}</span></b-button>

        <div ref="menu"
             role="menu"
             :aria-labelledby="split ? null : 'b_dropdown_button_' + _uid"
             :class="['dropdown-menu',right?'dropdown-menu-right':'']"
             @keyup.esc="onEsc"
             @keydown.tab="onTab"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
        ><slot></slot></div>
    </div>
</template>

<script>
    import clickOut from '../mixins/clickout';
    import bButton from './button.vue';

    const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled]),dropdown-header';
    
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
                    /*
                      If this is a touch-enabled device we add extra
                      empty mouseover listeners to the body's immediate children;
                      only needed because of broken event delegation on iOS
                      https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
                    */
                    if (document && 'ontouchstart' in document.documentElement) {
                        document.body.children.addEventListener('mouseover', this.noop);
                    }
                } else {
                    this.$root.$emit('hidden::dropdown', this);
                    /*
                      If this is a touch-enabled device we remove the extra
                      empty mouseover listeners we added for iOS support
                    */
                    if (document && 'ontouchstart' in document.documentElement) {
                        document.body.children.removeEventListener('mouseover', this.noop);
                    }
                }
            }
        },
        methods: {
            toggle() {
                if (this.disabled) {
                    this.visible = false;
                    return;
                }

                this.visible = !this.visible;
                if (this.visible) {
                    // Focus first non-dsabled item
                    const items = this.getItems();
                    if (items.length > 0) {
                        items[0].focus();
                    }
                }
            },
            clickOutListener() {
                this.visible = false;
            },
            click(e) {
                if (this.disabled) {
                    this.visible = false;
                    return;
                }

                if (this.split) {
                    this.$emit('click', e);
                    this.$root.$emit('shown::dropdown', this);
                } else {
                    this.toggle();
                }
            },
            onEsc(e) {
                if (this.visible) {
                    this.visible = false;
                    e.preventDefault();
                    e.stopPropagation();
                    // Return focus to original button
                    (this.split ? this.$refs.toggle : this.$refs.button).focus();
                }
            },
            onTab() {
                if (this.visible) {
                    this.visible = false;
                }
            },
            focusNext(e, up) {
                if (!this.visible) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                const items = this.getItems();
                if (items.length < 1) {
                    return;
                }

                let index = items.indexOf(e.target);
                if (up && index > 0) {
                    index--;
                } else if (!up && index < items.length - 1) {
                    index++;
                }
                if (index < 0) {
                    index = 0;
                }

                items[index].focus();
            },
            getItems() {
                return [...this.$refs.menu.querySelectorAll(ITEM_SELECTOR)];
            },
            noop() {
                // Do nothing event handler
            }
        }
    };

</script>
