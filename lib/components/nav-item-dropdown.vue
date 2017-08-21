<template>
    <li :id="safeId()" :class="dropdownClasses">

        <a :class="['nav-link', dropdownToggle, {disabled}]"
           href="#"
           ref="button"
           :id="safeId('_BV_button_')"
           aria-haspopup="true"
           :aria-expanded="visible ? 'true' : 'false'"
           :disabled="disabled"
           @click.stop.prevent="toggle($event)"
           @keydown.enter.stop.prevent="toggle($event)"
           @keydown.space.stop.prevent="toggle($event)"
        >
            <slot name="button-content"><slot name="text"><span v-html="text"></span></slot></slot>
        </a>

        <div :class="menuClasses"
             role="menu"
             ref="menu"
             :aria-labelledby="safeId('_BV_button_')"
             @mouseover="onMouseOver"
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
    import { idMixin, dropdownMixin } from '../mixins';

    export default {
        mixins: [idMixin, dropdownMixin],
        computed: {
            dropdownToggle() {
                return this.noCaret ? '' : 'dropdown-toggle';
            },
            dropdownClasses() {
                return [
                    'nav-item',
                    'b-nav-dropdown',
                    'dropdown',
                    this.dropup ? 'dropup' : '',
                    this.visible ? 'show' : ''
                ];
            },
            menuClasses() {
                return [
                    'dropdown-menu',
                    this.right ? 'dropdown-menu-right': '',
                    this.visible ? 'show' : ''
                ];
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

<style>
.b-nav-dropdown .dropdown-item:focus:not(.active),
.b-nav-dropdown .dropdown-item:hover:not(.active) {
    /* @See https://github.com/twbs/bootstrap/issues/23329 */
    box-shadow: inset 0px 0px 400px 110px rgba(0, 0, 0, .09);
}
.b-nav-dropdown .dropdown-item:active {
    box-shadow: initial;
}
</style>
