<template>
    <transition @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @after-leave="afterLeave"
                mode="out-in">
        <component :is="tag"
                   :id="safeId()"
                   role="tabpanel"
                   :class="tabClasses"
                   :aria-hidden="localActive ? 'false' : 'true'"
                   :aria-expanded="localActive ? 'true' : 'false'"
                   :aria-lablelledby="controlledBy || null"
                   v-if="localActive || !computedLazy"
                   v-show="localActive"
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
            beforeEnter() {
                this.show = false;
            },
            afterEnter() {
                this.show = true;
            },
            afterLeave() {
                this.show = false;
            }
        },
        data() {
            return {
                localActive: this.active && !this.disabled,
                show: false
            };
        },
        mounted() {
            this.show = this.localActive;
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
            },
            _isTab() {
                // For parent sniffing of child
                return true;
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
