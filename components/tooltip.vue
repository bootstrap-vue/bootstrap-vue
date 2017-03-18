<template>
    <div>
        <span ref="trigger"><slot></slot></span>

        <transition name="tooltip">
            <div tabindex="-1" :class="['tooltip','tooltip-' + this.placement,showState?'tooltip-visible':null]"
                 ref="popover" @focus="$emit('focus')" @blur="$emit('blur')"
            >
                <div class="tooltip-inner">
                    <slot name="content"><span v-html="content || title"></span></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
    .tooltip-enter-active, .tooltip-leave-active {
        transition: opacity .5s;
        opacity: 0;
    }

    .tooltip-visible {
        opacity: 1;
    }
</style>

<script>
    import popover from './popover.vue';

    export default {
        extends: popover,
        props: {
            triggers: {
                type: [Boolean, String, Array],
                default: 'hover'
            }
        }
    };
</script>
