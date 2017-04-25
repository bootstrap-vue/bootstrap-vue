<template>
    <li :class="['nav-item',{dropdown: !dropup, dropup: dropup, show: visible}]">

        <a :class="['nav-link', dropdownToggle, {disabled: disabled}]"
           href=""
           ref="button"
           :id="'b_dropdown_button_' + _uid"
           aria-haspopup="true"
           :aria-expanded="visible"
           :disabled="disabled"
           @click.stop.prevent="toggle($event)"
           v-html="text"
        >
            <slot name="text"></slot>
        </a>

        <div :class="['dropdown-menu',{'dropdown-menu-right': right}]"
             role="menu"
             ref="menu"
             :aria-labelledby="'b_dropdown_button_' + _uid"
             @keyup.esc="onEsc"
             @keydown.tab="onTab"
             @keydown.up="focusNext($event,true)"
             @keydown.down="focusNext($event,false)"
        >
            <slot></slot>
        </div>

    </li>
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
            caret: {
                type: Boolean,
                default: true
            },
            class: ['class']
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
            clickOutListener() {
                this.visible = false;
            }
        }
    };
</script>
