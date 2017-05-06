<template>
    <div :class="['btn-group','dropdown', {dropup, show: visible}]">

        <b-button :class="{'dropdown-toggle': !split, 'btn-link': link}"
                  ref="button"
                  :id="id ? (id + '__BV_button_') : null"
                  :aria-expanded="visible ? 'true' : 'false'"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
                  @click.stop.prevent="click"
                  @kedown.space.stop.prevent="click"
                  @kedown.enter.stop.prevent="click"
        >
            <slot name="text">{{text}}</slot>
        </b-button>

        <div :class="['dropdown-menu',{'dropdown-menu-right': right}]"
             role="menu"
             ref="menu"
             :aria-labelledby="id ? (id + '__BV_button_') : null"
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

    export default {
        mixins: [
            clickOut,
            dropdown
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
            id: {
                type: String
            },
            caret: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            clickOutListener() {
                this.visible = false;
            }
        }
    };
</script>
