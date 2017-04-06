<template>
    <transition @enter="enter" @before-leave="beforeLeave" mode="out-in">
        <div role="tabpanel"
             class="tab-pane"
             :class="[{show, fade, disabled, active: localActive}]"
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
        props: {
            id: {
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
