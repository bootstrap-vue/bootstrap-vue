<template>
    <div :id="id || null" :class="dropdownClasses">

        <b-button :class="{'dropdown-toggle': !split}"
                  ref="button"
                  :id="id ? (id + '__BV_button_') : null"
                  :aria-haspopup="split ? null : 'true'"
                  :aria-expanded="split ? null : (visible ? 'true' : 'false')"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
                  @click.stop.prevent="click"
        >
            <slot name="button-content"><slot name="text">{{text}}</slot></slot>
        </b-button>

        <b-button :class="['dropdown-toggle','dropdown-toggle-split']"
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

        <div :class="menuClasses"
             ref="menu"
             role="menu"
             :aria-labelledby="id ? (id + (split ? '__BV_toggle_' : '__BV_button_')) : null"
             @mouseover="onMouseOver"
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
    import { dropdownMixin } from '../mixins';
    import bButton from './button.vue';

    export default {
        mixins: [dropdownMixin],
        components: {bButton},
        props: {
            split: {
                type: Boolean,
                default: false
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
            }
        },
        computed: {
            dropdownClasses() {
                return [
                    'b-dropdown',
                    'dropdown',
                    'btn-group',
                    this.dropup ? 'dropup' : '',
                    this.visible ? 'show' : ''
                ];
            },
            menuClasses() {
                return [
                    'dropdown-menu',
                    this.right ? 'dropdown-menu-right' : '',
                    this.visible ? 'show' : ''
                ];
            }
        }
    };
</script>

<style>
.b-dropdown .dropdown-item:focus:not(.active),
.b-dropdown .dropdown-item:hover:not(.active) {
    /* @See https://github.com/twbs/bootstrap/issues/23329 */
    box-shadow: inset 0px 0px 400px 110px rgba(0, 0, 0, .09);
}

.b-dropdown .dropdown-item:active {
    box-shadow: initial;
}
</style>
