<template>
    <li :id="id || null" :class="['nav-item','dropdown', {dropup, show: visible}]">

        <a :class="['nav-link', dropdownToggle, {disabled}]"
           href="#"
           ref="button"
           :id="id ? (id + '__BV_button_') : null"
           aria-haspopup="true"
           :aria-expanded="visible ? 'true' : 'false'"
           :disabled="disabled"
           @click.stop.prevent="toggle($event)"
           @keydown.enter.stop.prevent="toggle($event)"
           @keydown.space.stop.prevent="toggle($event)"
        >
            <slot name="button-content"><slot name="text"><span v-html="text"></span></slot></slot>
        </a>

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

    </li>
</template>

<script>
    import dropdown from '../mixins/dropdown';

    export default {
        mixins: [dropdown],
        computed: {
            dropdownToggle() {
                return this.noCaret ? '' : 'dropdown-toggle';
            }
        },
        props: {
            noCaret: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
