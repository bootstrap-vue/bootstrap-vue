<template>
    <transition @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @after-leave="afterLeave"
                mode="out-in">
        <component :is="tag"
                   :id="id || null"
                   role="tabpanel"
                   :class="['tab-pane', {show, fade, disabled, active: localActive}]"
                   :aria-hidden="localActive ? 'false' : 'true'"
                   :aria-expanded="localActive ? 'true' : 'false'"
                   :aria-lablelledby="controlledBy || null"
                   v-if="localActive || !lazy"
                   v-show="localActive"
                   ref="panel">
             <slot></slot>
        </component>
    </transition>
</template>

<script>
    export default {
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
                fade: false,
                localActive: this.active && !this.disabled,
                lazy: true,
                show: false
            };
        },
        mounted() {
            this.show = this.localActive;
        }
        computed: {
            controlledBy() {
                return this.buttonId || (this.id ? (this.id + '__BV_tab_button__') : null);
            }
        },
        props: {
            id: {
                type: String,
                default: ''
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
            active: {
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
