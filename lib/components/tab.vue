<template>
    <transition @enter="enter" @before-leave="beforeLeave" mode="out-in">
        <component :is="tag"
                   :id="safeId()"
                   role="tabpanel"
                   :class="tabClasses"
                   :aria-hidden="localActive ? 'false' : 'true'"
                   :aria-expanded="localActive ? 'true' : 'false'"
                   :aria-lablelledby="controlledBy || null"
                   v-if="localActive || !computedLazy"
                   v-show="localActive || computedLazy"
                   ref="panel"
        >
             <slot></slot>
        </component>
    </transition>
</template>

<script>
    import { idMixin } from '../mixins';

    export default {
        mixins: [idMixin],
        methods: {
            enter() {
                this.show = true;
            },
            beforeLeave() {
                this.show = false;
            }
        },
        data() {
            return {
                localActive: this.active,
                show: false
            };
        },
        computed: {
            tabClasses() {
                return [
                    'tab-pane',
                    this.show ? 'show' : '',
                    this.computedFade ? 'fade' : '',
                    this.disabled ? 'disabled' : '',
                    this.localActive ? 'active' : ''
                ];
            },
            controlledBy() {
                return this.buttonId || this.safeId('__BV_tab_button__');
            },
            computedFade() {
                return this.$parent.fade;
            },
            computedLazy() {
                return this.$parent.lazy;
            }
        },
        props: {
            active: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: 'div'
            },
            buttonId: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            headHtml: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            href: {
                type: String,
                default: '#'
            }
        }
    };

</script>
