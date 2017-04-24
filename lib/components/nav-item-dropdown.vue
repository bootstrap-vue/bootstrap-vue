<template>
    <li :class="{'nav-item': true, show: visible, dropdown: !dropup, dropup: dropup}">

        <a @click.stop.prevent="toggle($event)"
           :class="['nav-link', dropdownToggle]"
           href=""
           ref="button"
           :id="'b_dropdown_button_' + _uid"
           aria-haspopup="true"
           :aria-expanded="visible"
           :disabled="disabled"
        ><slot name="text">{{ text }}</slot></a>

        <div role="menu"
             ref="menu"
             :aria-labelledby="'b_dropdown_button_' + _uid"
             :class="{'dropdown-menu': true, 'dropdown-menu-right': rightAlignment}"
             @keyup.esc="onEsc"
             @keydown.tab="onTab"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
        ><slot></slot></div>

    </li>
</template>

<script>
    import clickOut from '../mixins/clickout';

    const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled]),.dropdown-header';

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
                if (this.disabled) {
                    this.visible = false;
                } else {
                    this.visible = !this.visible;
                    if (this.visible) {
                        // Focus first item
                        const items = getItems();
                        if (items.length > 0) {
                            items[0].focus();
                        }
                    }
                }
            },
            clickOutListener() {
                this.visible = false;
            },
            onEsc(e) {
                if (this.visible) {
                    this.visible = false;
                    e.preventDefault();
                    e.stopPropagation();
                    // Return focus to original button
                    this.$refs.button.focus();
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
            }
        }
    };
</script>
