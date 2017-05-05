<template>
    <transition @enter="enter" @before-leave="beforeLeave" mode="out-in">
        <div role="tabpanel"
             :class="['tab-pane', {show, fade, disabled, active: localActive}]"
             :aria-hidden="localActive ? 'false' : 'true'"
             :aria-expanded="localActive ? 'true' : 'false'"
             :aria-lablelledby="controlledBy || null"
             v-if="localActive || !lazy"
             v-show="localActive || lazy"
             ref="panel">
             <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
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
                fade: false,
                localActive: false,
                lazy: true,
                show: false
            };
        },
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
