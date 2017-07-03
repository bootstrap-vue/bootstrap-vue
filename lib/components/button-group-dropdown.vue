<template>
    <div :id="id || null" :class="['btn-group','dropdown', {dropup, show: visible}]">

        <b-button :class="{'dropdown-toggle': !split}"
                  ref="button"
                  :id="id ? (id + '__BV_button_') : null"
                  :aria-haspopup="split ? null : 'true'"
                  :aria-expanded="visible ? 'true' : 'false'"
                  :variant="variant"
                  :disabled="disabled"
                  @click.stop.prevent="click"
                  @kedown.space.stop.prevent="click"
                  @kedown.enter.stop.prevent="click"
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
                  @kedown.space.stop.prevent="toggle"
                  @kedown.enter.stop.prevent="toggle"
        >
            <span class="sr-only">{{toggleText}}</span>
        </b-button>

        <div :class="['dropdown-menu',{'dropdown-menu-right': right}]"
             role="menu"
             ref="menu"
             :aria-labelledby="id ? (id + '__BV_button_') : null"
             @keyup.esc="onEsc"
             @keydown.tab="onTab"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
             @mouseover="focusHovered($event)"
        >
            <slot></slot>
        </div>

    </div>
</template>

<script>
    import dropdown from '../mixins/dropdown';
    import bButton from './button.vue';

    export default {
        mixins: [dropdown],
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
            variant: {
                type: String,
                default: null
            }
        }
    };
</script>
