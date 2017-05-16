<template>
    <div :id="id || null" :class="['dropdown','btn-group',{dropup, show: visible}]">

        <b-button :class="{'dropdown-toggle': !split, 'btn-link': link}"
                  ref="button"
                  :id="id ? (id + '__BV_button_') : null"
                  :aria-haspopup="split ? null : 'true'"
                  :aria-expanded="split ? null : (visible ? 'true' : 'false')"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
                  @click.stop.prevent="click"
        >
            <slot name="text">{{text}}</slot>
        </b-button>

        <b-button :class="['dropdown-toggle','dropdown-toggle-split',{'btn-link': link}]"
                  v-if="split"
                  ref="toggle"
                  :id="id ? (id + '__BV_toggle_') : null"
                  :aria-haspopup="split ? 'true' : null"
                  :aria-expanded="split ? (visible ? 'true' : 'false') : null"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
                  @click.stop.prevent="toggle"
        >
            <span class="sr-only">{{toggleText}}</span>
        </b-button>

        <div :class="['dropdown-menu',{'dropdown-menu-right': right}]"
             ref="menu"
             role="menu"
             :aria-labelledby="id ? (id + (split ? '__BV_toggle_' : '__BV_button_')) : null"
             @keyup.esc="onEsc"
             @keydown.tab="onTab"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
        >
            <slot></slot>
        </div>

    </div>
</template>

<script>
    import clickOut from '../mixins/clickout';
    import dropdown from '../mixins/dropdown';
    import bButton from './button.vue';

    export default {
        mixins: [clickOut, dropdown],
        components: {bButton},
        data() {
            return {
                visible: false
            };
        },
        props: {
            id: {
                type: String
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
            link: {
                type: Boolean,
                default: false
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
            }
        }
    };

</script>
