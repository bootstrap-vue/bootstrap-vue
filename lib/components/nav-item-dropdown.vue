<template>
    <li :id="safeId()" :class="dropdownClasses">

        <a :class="toggleClasses"
           href="#"
           ref="toggle"
           :id="safeId('_BV_button_')"
           aria-haspopup="true"
           :aria-expanded="visible ? 'true' : 'false'"
           :disabled="disabled"
           @click.stop.prevent="toggle"
           @keydown.enter.stop.prevent="toggle"
           @keydown.space.stop.prevent="toggle"
        >
            <slot name="button-content"><slot name="text"><span v-html="text"></span></slot></slot>
        </a>

        <div :class="menuClasses"
             :role="role"
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
            isNav() {
                // Signal to dropdown mixin that we are in a navbar
                return true;
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
            toggleClasses() {
                return [
                    'nav-link',
                    this.noCaret ? '' : 'dropdown-toggle',
                    this.disabled ? disabled : ''
                ];
            },
            menuClasses() {
                return [
                    'dropdown-menu',
                    this.right ? 'dropdown-menu-right': 'dropdown-menu-left',
                    this.visible ? 'show' : ''
                ];
            }
        },
        props: {
            noCaret: {
                type: Boolean,
                default: false
            },
            role: {
                type: String,
                default: 'menu'
            }
        }
    };
</script>

<style>
.b-nav-dropdown .dropdown-item:focus {
    /* @See https://github.com/twbs/bootstrap/issues/23329 */
    box-shadow: inset 0px 0px 400px 110px rgba(0, 0, 0, .09);
}
.b-nav-dropdown .dropdown-item:active {
    box-shadow: initial;
}
</style>
