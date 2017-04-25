<template>
    <div :class="['dropdown','btn-group',{dropup, show: visible}]">

        <b-button :class="{'dropdown-toggle': !split, 'btn-link': link}"
                  ref="button"
                  :id="'b_dropdown_button_' + _uid"
                  :aria-haspopup="split ? null : 'true'"
                  :aria-expanded="split ? null : (visible ? 'true' : 'false')"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
                  @click.stop.prevent="click"
        ><slot name="text">{{text}}</slot></b-button>

        <b-button :class="['dropdown-toggle','dropdown-toggle-split',{'btn-link': link}]"
                  v-if="split"
                  ref="toggle"
                  :aria-haspopup="split ? 'true' : null"
                  :aria-expanded="split ? (visible ? 'true' : 'false') : null"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
                  @click.stop.prevent="toggle"
        ><span class="sr-only">{{toggleText}}</span></b-button>

        <div :class="['dropdown-menu',{'dropdown-menu-right': right}]"
             ref="menu"
             role="menu"
             :aria-labelledby="split ? null : 'b_dropdown_button_' + _uid"
             @keyup.esc="onEsc"
             @keydown.tab="onTab"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
        ><slot></slot></div>

    </div>
</template>

<script>
    import clickOut from '../mixins/clickout';
    import dropdown from '../mixins/dropdown';
    import bButton from './button.vue';

    export default {
        mixins: [
            clickOut,
            dropdown
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
            link: {
                type: Boolean,
                default: false
            }
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
            noop() {
                // Do nothing event handler
            }
        }
    };

</script>
